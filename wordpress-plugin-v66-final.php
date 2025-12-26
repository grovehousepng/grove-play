<?php
/**
 * Plugin Name: Grove Games Core (v66 - Final / CSV Fix)
 * Description: CSV yüklerken "Türe Zorla" seçeneği eklendi. GraphQL şeması tam uyumlu.
 * Version:     66.0.2
 * Author:      GrovePlay
 */

if (!defined('ABSPATH')) exit;

// ======================================================
// 1. CPT VE AYARLAR
// ======================================================
add_action('init', 'grove_v66_cpt');
function grove_v66_cpt() {
    register_post_type('games', [
        'labels' => ['name' => 'Oyunlar', 'singular_name' => 'Oyun', 'menu_name' => 'Oyun Listesi'],
        'public' => true,
        'has_archive' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'Game',
        'graphql_plural_name' => 'Games',
        'supports' => ['title', 'editor', 'thumbnail', 'comments', 'custom-fields'],
        'taxonomies' => ['category'],
        'menu_icon' => 'dashicons-games'
    ]);
}

add_action('admin_init', 'grove_v66_settings');
function grove_v66_settings() {
    register_setting('grove_xml_settings', 'grove_xml_links');
}

add_filter('manage_games_posts_columns', function($columns) {
    $columns['game_tech_type'] = 'Teknik Tür';
    $columns['game_cats_col'] = 'Kategori';
    $columns['total_plays'] = 'İzlenme';
    return $columns;
});

add_action('manage_games_posts_custom_column', function($column, $post_id) {
    if ($column === 'game_tech_type') {
        $type = get_post_meta($post_id, 'game_type', true); // 'emulator', 'embed', 'html5' vb.
        if (in_array($type, ['emulator', 'rom', 'retro'])) {
            echo '<span style="background:#8e44ad; color:white; padding:4px 8px; border-radius:4px; font-weight:bold;">🕹️ EMULATOR</span>';
        } elseif ($type === 'xml') {
            echo '<span style="background:#34495e; color:white; padding:4px 8px; border-radius:4px; font-weight:bold;">🤖 EMBED (BOT)</span>';
        } else {
            // html5, embed veya boş gelirse buraya düşer
            echo '<span style="background:#27ae60; color:white; padding:4px 8px; border-radius:4px; font-weight:bold;">🌐 HTML5 / EMBED</span>';
        }
    }
    if ($column === 'game_cats_col') {
        $terms = get_the_terms($post_id, 'category');
        if (!empty($terms)) echo implode(', ', wp_list_pluck($terms, 'name'));
        else echo '<span style="color:#ccc;">-</span>';
    }
    if ($column === 'total_plays') echo number_format((int)get_post_meta($post_id, 'total_plays', true));
}, 10, 2);

// ======================================================
// 2. CSV SENKRONİZASYONU (GELİŞMİŞ)
// ======================================================
function grove_v66_bulk_csv_import() {
    if (!isset($_FILES['csv_file']) || $_FILES['csv_file']['error'] !== UPLOAD_ERR_OK) return "Hata: Dosya yüklenemedi.";
    
    $default_type = sanitize_text_field($_POST['csv_default_type']); // 'emulator' veya 'embed'
    $force_type = isset($_POST['csv_force_type']); // "Türe Zorla" seçili mi?

    $file = $_FILES['csv_file']['tmp_name'];
    $handle = fopen($file, "r");
    $stats = ['added' => 0, 'updated' => 0];
    fgetcsv($handle); // Başlık satırını atla

    while (($data = fgetcsv($handle, 10000, ",")) !== FALSE) {
        if (empty($data[0]) || empty($data[1])) continue; // Başlık veya URL yoksa atla
        
        $title = sanitize_text_field($data[0]);
        $url   = sanitize_text_field($data[1]);
        
        // Mantık: Eğer "Zorla" seçiliyse dropdown değerini kullan. 
        // Seçili değilse: CSV'de 5. sütun varsa onu, yoksa dropdown değerini kullan.
        if ($force_type) {
            $type = $default_type;
        } else {
            $type = (!empty($data[4])) ? sanitize_text_field($data[4]) : $default_type;
        }

        $existing = get_page_by_title($title, OBJECT, 'games');
        $pid = wp_insert_post([
            'ID'           => $existing ? $existing->ID : 0,
            'post_title'   => $title,
            'post_content' => isset($data[5]) ? wp_kses_post($data[5]) : '',
            'post_status'  => 'publish',
            'post_type'    => 'games'
        ]);

        if ($pid) {
            update_post_meta($pid, 'game_url', $url);
            update_post_meta($pid, 'thumbnail_url', isset($data[2]) ? esc_url_raw($data[2]) : '');
            
            // Türü kaydet
            update_post_meta($pid, 'game_type', $type);
            
            update_post_meta($pid, 'total_plays', 0);
            if (!empty($data[3])) wp_set_object_terms($pid, explode('|', $data[3]), 'category');
            
            $existing ? $stats['updated']++ : $stats['added']++;
        }
    }
    fclose($handle);
    return "✅ İşlem Tamam! (Tip: $default_type" . ($force_type ? " [ZORLANDI]" : "") . ") | Yeni: {$stats['added']}, Güncel: {$stats['updated']}";
}

// ======================================================
// 3. XML VE DİĞER FONKSİYONLAR
// ======================================================

// XML Analiz
function grove_v66_analyze_xml() {
    if (!isset($_FILES['xml_file']) || $_FILES['xml_file']['error'] !== UPLOAD_ERR_OK) return ["error" => "Dosya yüklenemedi."];
    
    $xml = simplexml_load_file($_FILES['xml_file']['tmp_name'], 'SimpleXMLElement', LIBXML_NOCDATA);
    if ($xml === false) return ["error" => "Geçersiz XML formatı."];

    $count = 0;
    $games = [];
    
    // Basit yapı kontrolü: <channel><item> veya root'ta <game>
    $items = $xml->xpath('//item') ?: $xml->xpath('//game');
    
    foreach ($items as $item) {
        $games[] = [
            'title' => (string)$item->title,
            'url'   => (string)($item->url ?: $item->link),
            'type'  => (string)$item->type
        ];
        $count++;
    }
    
    return ["count" => $count, "preview" => array_slice($games, 0, 5), "file_path" => $_FILES['xml_file']['tmp_name']]; // Geçici yol sorunu olabilir, işlem anında yapılmalı
}

// XML İçe Aktar
function grove_v66_import_xml() {
    if (!isset($_FILES['xml_file']) || $_FILES['xml_file']['error'] !== UPLOAD_ERR_OK) return "Dosya yok.";
    
    $xml = simplexml_load_file($_FILES['xml_file']['tmp_name'], 'SimpleXMLElement', LIBXML_NOCDATA);
    $items = $xml->xpath('//item') ?: $xml->xpath('//game'); // Geniş kapsamlı arama
    
    $stats = ['added' => 0, 'updated' => 0];
    
    foreach ($items as $item) {
        $title = sanitize_text_field((string)$item->title);
        $url   = sanitize_text_field((string)($item->url ?: $item->link));
        // Description için: desc, description, content:encoded
        $desc  = (string)($item->description ?: $item->children('content', true)->encoded); 
        $thumb = esc_url_raw((string)($item->thumbnail ?: $item->image));
        $type  = sanitize_text_field((string)$item->type) ?: 'emulator'; // Varsayılan emulator olsun
        $cat   = sanitize_text_field((string)($item->category ?: $item->categories));

        if (empty($title) || empty($url)) continue;

        $existing = get_page_by_title($title, OBJECT, 'games');
        $pid = wp_insert_post([
            'ID'           => $existing ? $existing->ID : 0,
            'post_title'   => $title,
            'post_content' => wp_kses_post($desc),
            'post_status'  => 'publish',
            'post_type'    => 'games'
        ]);

        if ($pid) {
            update_post_meta($pid, 'game_url', $url);
            update_post_meta($pid, 'thumbnail_url', $thumb);
            update_post_meta($pid, 'game_type', $type);
            update_post_meta($pid, 'total_plays', 0);
            if ($cat) wp_set_object_terms($pid, explode('|', $cat), 'category');
            
            $existing ? $stats['updated']++ : $stats['added']++;
        }
    }
    return "✅ XML Yüklendi! Yeni: {$stats['added']}, Güncel: {$stats['updated']}";
}

function grove_v66_add_manual() {
    if (empty($_POST['m_title']) || empty($_POST['m_url'])) return "Hata: Başlık ve Link zorunlu.";
    $pid = wp_insert_post(['post_title'=>sanitize_text_field($_POST['m_title']), 'post_content'=>wp_kses_post($_POST['m_desc']), 'post_status'=>'publish', 'post_type'=>'games']);
    if ($pid) {
        update_post_meta($pid, 'game_url', sanitize_text_field($_POST['m_url']));
        update_post_meta($pid, 'thumbnail_url', esc_url_raw($_POST['m_thumb']));
        update_post_meta($pid, 'game_type', sanitize_text_field($_POST['m_tech_type']));
        update_post_meta($pid, 'total_plays', 0);
        if (!empty($_POST['m_cat'])) wp_set_object_terms($pid, explode(',', $_POST['m_cat']), 'category');
        return "Başarılı! Oyun Eklendi.";
    }
    return "Hata.";
}

function grove_v66_randomize() { $g=get_posts(['post_type'=>'games','numberposts'=>-1]); foreach($g as $p) update_post_meta($p->ID,'total_plays',rand(5000,85000)); return count($g); }
function grove_v66_reset() { $g=get_posts(['post_type'=>'games','numberposts'=>-1]); foreach($g as $p) update_post_meta($p->ID,'total_plays',0); return count($g); }

// ======================================================
// 4. PANEL ARAYÜZÜ
// ======================================================
add_action('admin_menu', function() {
    add_menu_page('Grove Panel', '► OYUN PANELİ', 'manage_options', 'grove-panel-v54', 'grove_v66_ui', 'dashicons-database', 2);
});

function grove_v66_ui() {
    $csv_res = isset($_POST['run_csv']) ? grove_v66_bulk_csv_import() : null;
    $xml_res = isset($_POST['run_xml_import']) ? grove_v66_import_xml() : null;
    $xml_check = isset($_POST['check_xml']) ? grove_v66_analyze_xml() : null;
    $add_res = isset($_POST['add_manual']) ? grove_v66_add_manual() : null;
    $rand = isset($_POST['run_rand']) ? grove_v66_randomize() : null;
    $reset = isset($_POST['run_rst']) ? grove_v66_reset() : null;
    $tab = $_GET['tab'] ?? 'csv';
    ?>
    <div class="wrap">
        <h1 style="background:#2271b1; color:#fff; padding:10px;">GROVE GAMES CORE v66.5 (XML & Local ROMs)</h1>
        <h2 class="nav-tab-wrapper">
            <a href="?page=grove-panel-v54&tab=csv" class="nav-tab <?php echo $tab=='csv'?'nav-tab-active':''; ?>">📄 CSV YÜKLE</a>
            <a href="?page=grove-panel-v54&tab=xml" class="nav-tab <?php echo $tab=='xml'?'nav-tab-active':''; ?>">🌐 XML YÜKLE</a>
            <a href="?page=grove-panel-v54&tab=manual" class="nav-tab <?php echo $tab=='manual'?'nav-tab-active':''; ?>">➕ MANUEL EKLE</a>
            <a href="?page=grove-panel-v54&tab=tools" class="nav-tab <?php echo $tab=='tools'?'nav-tab-active':''; ?>">🛠️ ARAÇLAR</a>
        </h2>

        <div style="display:flex; gap:20px; margin-top:20px;">
            <div class="card" style="flex:2; padding:20px;">
                <?php if ($tab == 'csv'): ?>
                    <h2>CSV ile Toplu Oyun Yükle</h2>
                    <div style="background:#fff3cd; padding:10px; border-left:4px solid #ffba00; margin-bottom:15px;">
                        <strong>Örnek Şablon:</strong>
                        <br>
                        <code>Başlık, Oyun Linki (/roms/...), Resim Linki, Kategoriler (Macera|Aksiyon), Tür (emulator), Açıklama</code>
                        <br><br>
                        <a href="data:text/csv;charset=utf-8,Title,GameURL,ThumbnailURL,Category,Type,Description%0ASuper Mario,/roms/mario.md,http://site.com/img.jpg,Action|Platform,emulator,Mantar kralligi" download="ornek_oyun_sablonu.csv" class="button">📥 Örnek Şablonu İndir</a>
                    </div>

                    <form method="post" enctype="multipart/form-data" style="background:#f0f0f1; padding:15px; border-radius:5px;">
                        <p><strong>1. Varsayılan Oyun Türü:</strong></p>
                        <select name="csv_default_type" style="width:100%; max-width:300px;">
                            <option value="emulator">🕹️ Emulator (ROM/Retro)</option>
                            <option value="embed">🌐 HTML5 / Embed</option>
                        </select>
                        
                        <p>
                            <label>
                                <input type="checkbox" name="csv_force_type" value="1"> 
                                <strong>⚠️ CSV'deki türü yoksay ve üstteki seçimi ZORLA</strong>
                            </label>
                        </p>

                        <p><strong>2. Dosya Seçin:</strong></p>
                        <input type="file" name="csv_file" accept=".csv" required>
                        <br><br>
                        <input type="submit" name="run_csv" class="button button-primary button-large" value="🚀 YÜKLE BAŞLAT">
                    </form>
                    <?php if ($csv_res) echo "<div class='notice notice-success is-dismissible'><p>$csv_res</p></div>"; ?>

                <?php elseif ($tab == 'xml'): ?>
                    <h2>XML ile Toplu Oyun Yükle</h2>
                    <p>XML yapısı <code>&lt;game&gt;</code> veya <code>&lt;item&gt;</code> etiketleri içermelidir (title, url, category, description).</p>
                    
                    <form method="post" enctype="multipart/form-data" style="background:#eaf2fa; padding:15px; border-radius:5px; border:1px solid #c3d9ef;">
                        <p><strong>XML Dosyası Seçin:</strong></p>
                        <input type="file" name="xml_file" accept=".xml" required>
                        <br><br>
                        <input type="submit" name="check_xml" class="button" value="1. ANALİZ ET & SAY (Önce Bunu Yap)">
                        <span style="margin:0 10px; color:#999;">|</span>
                        <input type="submit" name="run_xml_import" class="button button-primary" value="2. DİREKT YÜKLE (Görmeden)">
                    </form>

                    <?php if ($xml_check): ?>
                        <div style="margin-top:20px; background:#fff; padding:15px; border:1px solid #ddd;">
                            <h3>📊 Analiz Sonucu</h3>
                            <?php if (isset($xml_check['error'])): ?>
                                <p style="color:red;"><?php echo $xml_check['error']; ?></p>
                            <?php else: ?>
                                <p><strong>Bulunan Oyun Sayısı:</strong> <?php echo $xml_check['count']; ?></p>
                                <p><strong>İlk 5 Örnek:</strong></p>
                                <ul>
                                    <?php foreach ($xml_check['preview'] as $p): ?>
                                        <li>[<?php echo $p['type'] ?: '?'; ?>] <strong><?php echo $p['title']; ?></strong> - <em><?php echo $p['url']; ?></em></li>
                                    <?php endforeach; ?>
                                </ul>
                                <p><em>Her şey yolundaysa yukarıdan tekrar dosyayı seçip "Görmeden Yükle" veya aşağıdaki butonu kullanabilirsiniz (Dosyayı tekrar seçmeniz gerekebilir).</em></p>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                    
                    <?php if ($xml_res) echo "<div class='notice notice-success is-dismissible'><p>$xml_res</p></div>"; ?>

                <?php elseif ($tab == 'manual'): ?>
                    <h2>Tek Tek Oyun Ekle</h2>
                    <?php if ($add_res) echo "<div class='notice notice-success'><p>$add_res</p></div>"; ?>
                    <form method="post">
                        <input type="text" name="m_title" style="width:100%; margin-bottom:10px;" placeholder="Oyun Başlığı..." required>
                        <select name="m_tech_type" style="width:100%; margin-bottom:10px;">
                            <option value="emulator">🕹️ Emulator (ROM)</option>
                            <option value="embed">🌐 HTML5 / Embed</option>
                        </select>
                        <input type="text" name="m_cat" style="width:100%; margin-bottom:10px;" placeholder="Kategori (Örn: Macera, Aksiyon)">
                        <textarea name="m_desc" style="width:100%; height:80px; margin-bottom:10px;" placeholder="Oyun Açıklaması..."></textarea>
                        <input type="text" name="m_url" style="width:100%; margin-bottom:10px;" placeholder="Oyun Linki (URL veya /roms/dosya.md)" required>
                        <input type="url" name="m_thumb" style="width:100%; margin-bottom:10px;" placeholder="Kapak Resmi (Thumbnail) Linki">
                        <input type="submit" name="add_manual" class="button button-primary" value="💾 KAYDET">
                    </form>
                <?php endif; ?>
            </div>

            <div class="card" style="flex:1; padding:20px;">
                <h3>Hızlı İşlemler</h3>
                <form method="post"><input type="submit" name="run_rand" class="button" style="width:100%; margin-bottom:5px;" value="📈 Tüm İzlenmeleri Rastgele Artır"></form>
                <form method="post"><input type="submit" name="run_rst" class="button" style="width:100%;" value="♻️ Sayaçları Sıfırla"></form>
                <hr>
                <p><strong>İpucu:</strong><br>VPS kullanıyorsanız oyun linklerine <code>/roms/oyunadi.md</code> yazın.</p>
            </div>
        </div>
    </div>
    <?php
}

// ======================================================
// 5. GRAPHQL SCHEMA (FRONTEND İÇİN KRİTİK)
// ======================================================
add_action('graphql_register_types', function() {
    register_graphql_field('Game', 'gameUrl', [
        'type' => 'String', 'resolve' => fn($p) => (string)get_post_meta($p->databaseId, 'game_url', true)
    ]);
    
    // Frontend 'emulator' stringine bakıyor. Geri kalan her şey embed/iframe olarak işlenir.
    register_graphql_field('Game', 'gameType', [
        'type' => 'String', 
        'resolve' => fn($p) => (in_array(get_post_meta($p->databaseId, 'game_type', true), ['emulator', 'rom', 'retro']) ? 'emulator' : 'embed')
    ]);

    register_graphql_field('Game', 'thumbnailUrl', [
        'type' => 'String', 'resolve' => fn($p) => (string)get_post_meta($p->databaseId, 'thumbnail_url', true)
    ]);

    register_graphql_field('Game', 'totalPlays', [
        'type' => 'Int', 'resolve' => fn($p) => (int)get_post_meta($p->databaseId, 'total_plays', true)
    ]);

    register_graphql_field('Game', 'gameCategories', [
        'type' => ['list_of' => 'String'],
        'resolve' => function($p) {
            $terms = get_the_terms($p->databaseId, 'category');
            return !empty($terms) ? wp_list_pluck($terms, 'name') : [];
        }
    ]);
    
    register_graphql_field('Game', 'gameWidth', [
        'type' => 'Int', 'resolve' => fn($p) => (int)get_post_meta($p->databaseId, 'game_width', true)
    ]);
    
    register_graphql_field('Game', 'gameHeight', [
        'type' => 'Int', 'resolve' => fn($p) => (int)get_post_meta($p->databaseId, 'game_height', true)
    ]);
});
