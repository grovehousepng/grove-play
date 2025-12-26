<?php
/**
 * Plugin Name: Grove Games Core (v66 - GraphQL Fix)
 * Description: Orijinal v66 yapısına GraphQL eksikleri (thumbnailUrl, totalPlays, gameCategories vb.) eklendi.
 * Version:     66.0.1
 * Author:      GrovePlay
 */

if (!defined('ABSPATH')) exit;

// ======================================================
// 1. CPT VE AYARLAR (Orijinal v54 Yapısı)
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

// Orijinal Kolon Yapısı (v54'ten alındı)
add_filter('manage_games_posts_columns', function($columns) {
    $columns['game_tech_type'] = 'Teknik Tür';
    $columns['game_cats_col'] = 'Kategori';
    $columns['total_plays'] = 'İzlenme';
    return $columns;
});

add_action('manage_games_posts_custom_column', function($column, $post_id) {
    if ($column === 'game_tech_type') {
        $type = get_post_meta($post_id, 'game_type', true);
        if (in_array($type, ['emulator', 'rom', 'retro'])) {
            echo '<span style="background:#8e44ad; color:white; padding:4px 8px; border-radius:4px; font-weight:bold;">🕹️ EMULATOR</span>';
        } elseif ($type === 'xml') {
            echo '<span style="background:#34495e; color:white; padding:4px 8px; border-radius:4px; font-weight:bold;">🤖 EMBED (BOT)</span>';
        } else {
            echo '<span style="background:#27ae60; color:white; padding:4px 8px; border-radius:4px; font-weight:bold;">🌐 EMBED (MANUEL)</span>';
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
// 2. CSV SENKRONİZASYONU (Yeni Eklenen Kısım)
// ======================================================
function grove_v66_bulk_csv_import() {
    if (!isset($_FILES['csv_file']) || $_FILES['csv_file']['error'] !== UPLOAD_ERR_OK) return "Hata: Dosya yüklenemedi.";
    $default_type = sanitize_text_field($_POST['csv_default_type']); 
    $file = $_FILES['csv_file']['tmp_name'];
    $handle = fopen($file, "r");
    $stats = ['added' => 0, 'updated' => 0];
    fgetcsv($handle); 

    while (($data = fgetcsv($handle, 10000, ",")) !== FALSE) {
        if (empty($data[0]) || empty($data[1])) continue;
        $title = sanitize_text_field($data[0]);
        $url   = esc_url_raw($data[1]);
        $type  = (!empty($data[4])) ? sanitize_text_field($data[4]) : $default_type;

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
            update_post_meta($pid, 'game_type', $type);
            update_post_meta($pid, 'total_plays', 0);
            if (!empty($data[3])) wp_set_object_terms($pid, explode('|', $data[3]), 'category');
            $existing ? $stats['updated']++ : $stats['added']++;
        }
    }
    fclose($handle);
    return "✅ Yeni: {$stats['added']}, 🔄 Güncellendi: {$stats['updated']}";
}

// ======================================================
// 3. ORİJİNAL v54 FONKSİYONLARI (Dokunulmadı)
// ======================================================
function grove_v66_add_manual() {
    if (empty($_POST['m_title']) || empty($_POST['m_url'])) return "Hata: Başlık ve Link zorunlu.";
    $pid = wp_insert_post(['post_title'=>sanitize_text_field($_POST['m_title']), 'post_content'=>wp_kses_post($_POST['m_desc']), 'post_status'=>'publish', 'post_type'=>'games']);
    if ($pid) {
        update_post_meta($pid, 'game_url', esc_url_raw($_POST['m_url']));
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
// 4. PANEL ARAYÜZÜ (v54 Görünümü + CSV Sekmesi)
// ======================================================
add_action('admin_menu', function() {
    add_menu_page('Grove Panel', '► OYUN PANELİ', 'manage_options', 'grove-panel-v54', 'grove_v66_ui', 'dashicons-database', 2);
});

function grove_v66_ui() {
    $csv_res = isset($_POST['run_csv']) ? grove_v66_bulk_csv_import() : null;
    $add_res = isset($_POST['add_manual']) ? grove_v66_add_manual() : null;
    $rand = isset($_POST['run_rand']) ? grove_v66_randomize() : null;
    $reset = isset($_POST['run_rst']) ? grove_v66_reset() : null;
    $tab = $_GET['tab'] ?? 'csv';
    ?>
    <div class="wrap">
        <h1 style="background:#2271b1; color:#fff; padding:10px;">GROVE GAMES CORE v66</h1>
        <h2 class="nav-tab-wrapper">
            <a href="?page=grove-panel-v54&tab=csv" class="nav-tab <?php echo $tab=='csv'?'nav-tab-active':''; ?>">📄 CSV YÜKLE</a>
            <a href="?page=grove-panel-v54&tab=manual" class="nav-tab <?php echo $tab=='manual'?'nav-tab-active':''; ?>">➕ MANUEL EKLE</a>
            <a href="?page=grove-panel-v54&tab=tools" class="nav-tab <?php echo $tab=='tools'?'nav-tab-active':''; ?>">🛠️ ARAÇLAR</a>
        </h2>

        <div style="display:flex; gap:20px; margin-top:20px;">
            <div class="card" style="flex:2; padding:20px;">
                <?php if ($tab == 'csv'): ?>
                    <h2>CSV ile İçe Aktar</h2>
                    <form method="post" enctype="multipart/form-data">
                        <p>Tür: <select name="csv_default_type"><option value="emulator">Emulator</option><option value="embed">Embed</option></select></p>
                        <input type="file" name="csv_file" accept=".csv" required><br><br>
                        <input type="submit" name="run_csv" class="button button-primary" value="🚀 YÜKLE">
                    </form>
                    <?php if ($csv_res) echo "<p>$csv_res</p>"; ?>

                <?php elseif ($tab == 'manual'): ?>
                    <h2>Manuel Ekle</h2>
                    <form method="post">
                        <input type="text" name="m_title" style="width:100%; margin-bottom:10px;" placeholder="Oyun Başlığı..." required>
                        <select name="m_tech_type" style="width:100%; margin-bottom:10px;"><option value="embed">🌐 EMBED</option><option value="emulator">🕹️ EMULATOR</option></select>
                        <input type="text" name="m_cat" style="width:100%; margin-bottom:10px;" placeholder="Kategori (Örn: Macera)">
                        <textarea name="m_desc" style="width:100%; height:80px; margin-bottom:10px;" placeholder="Açıklama..."></textarea>
                        <input type="url" name="m_url" style="width:100%; margin-bottom:10px;" placeholder="Oyun Linki" required>
                        <input type="url" name="m_thumb" style="width:100%; margin-bottom:10px;" placeholder="Resim Linki">
                        <input type="submit" name="add_manual" class="button button-primary" value="💾 KAYDET">
                    </form>
                <?php endif; ?>
            </div>

            <div class="card" style="flex:1; padding:20px;">
                <h3>Araçlar</h3>
                <form method="post"><input type="submit" name="run_rand" class="button" style="width:100%;" value="📈 Şişir"></form><br>
                <form method="post"><input type="submit" name="run_rst" class="button" style="width:100%;" value="♻️ Sıfırla"></form>
            </div>
        </div>
    </div>
    <?php
}

// ======================================================
// 5. GRAPHQL KAYITLARI (GÜNCELLENDİ)
// ======================================================
add_action('graphql_register_types', function() {
    // 1. Standart Alanlar
    register_graphql_field('Game', 'gameUrl', [
        'type' => 'String', 
        'resolve' => fn($p) => (string)get_post_meta($p->databaseId, 'game_url', true)
    ]);
    
    register_graphql_field('Game', 'gameType', [
        'type' => 'String', 
        'resolve' => fn($p) => (in_array(get_post_meta($p->databaseId, 'game_type', true), ['emulator', 'rom', 'retro']) ? 'emulator' : 'embed')
    ]);

    // 2. Eksik Alanlar (Frontend'in Çalışması İçin Gereklidir)
    register_graphql_field('Game', 'thumbnailUrl', [
        'type' => 'String',
        'resolve' => fn($p) => (string)get_post_meta($p->databaseId, 'thumbnail_url', true)
    ]);

    register_graphql_field('Game', 'totalPlays', [
        'type' => 'Int',
        'resolve' => fn($p) => (int)get_post_meta($p->databaseId, 'total_plays', true)
    ]);

    register_graphql_field('Game', 'gameCategories', [
        'type' => ['list_of' => 'String'],
        'resolve' => function($p) {
            $terms = get_the_terms($p->databaseId, 'category');
            return !empty($terms) ? wp_list_pluck($terms, 'name') : [];
        }
    ]);
    
    register_graphql_field('Game', 'gameWidth', [
        'type' => 'Int',
        'resolve' => fn($p) => (int)get_post_meta($p->databaseId, 'game_width', true)
    ]);
    
    register_graphql_field('Game', 'gameHeight', [
        'type' => 'Int',
        'resolve' => fn($p) => (int)get_post_meta($p->databaseId, 'game_height', true)
    ]);
});
