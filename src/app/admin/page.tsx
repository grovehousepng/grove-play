'use client';

import { useState, useEffect } from 'react';
import styles from './admin.module.css';

interface Game {
    id: number;
    title: string;
    slug: string;
    gameUrl: string;
    gameType: string;
    thumbnailUrl: string;
    description: string;
    categories: string;
}

interface Comment {
    id: number;
    content: string;
    author: string;
    createdAt: string;
    approved: boolean;
    game: { title: string };
}

export default function AdminPage() {
    const [games, setGames] = useState<Game[]>([]);
    const [activeTab, setActiveTab] = useState('list'); // list, add, csv, xml, files, comments
    const [isLoading, setIsLoading] = useState(false);

    // Forms & State
    const [form, setForm] = useState<Partial<Game>>({ gameType: 'emulator' });
    const [isEditing, setIsEditing] = useState(false);

    // Import State
    const [importPreview, setImportPreview] = useState<any[]>([]);
    const [importStats, setImportStats] = useState<string>('');
    const [importError, setImportError] = useState<string>('');
    const [xmlUrl, setXmlUrl] = useState('');

    // Import Overrides
    const [overrideType, setOverrideType] = useState('emulator');
    const [overrideCat, setOverrideCat] = useState('');
    const [forceOverride, setForceOverride] = useState(false);

    // Bulk Selection State
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // Bulk File Upload State
    const [uploadedFiles, setUploadedFiles] = useState<{ name: string, url: string }[]>([]);

    // Search State
    const [searchTerm, setSearchTerm] = useState('');

    // Comments State
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        const res = await fetch('/api/games');
        if (res.ok) setGames(await res.json());
        setSelectedIds([]);
    };

    // Filtered Games Logic
    const filteredGames = games.filter(g =>
        g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.id.toString().includes(searchTerm)
    );

    const fetchComments = async () => {
        const res = await fetch('/api/comments?admin=true');
        if (res.ok) setComments(await res.json());
    };

    // --- MANUEL CRUD ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const slug = form.slug || form.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `/api/games/${form.id}` : '/api/games';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, slug })
        });

        setIsLoading(false);
        if (res.ok) {
            setForm({ gameType: 'emulator', title: '', slug: '', gameUrl: '', thumbnailUrl: '', description: '', categories: '' });
            setIsEditing(false);
            fetchGames();
            setActiveTab('list');
        } else {
            alert('İşlem başarısız.');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Bu oyunu silmek istediğine emin misin?')) return;
        await fetch(`/api/games/${id}`, { method: 'DELETE' });
        fetchGames();
    };

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) return;
        if (!confirm(`${selectedIds.length} oyunu silmek istediğinize emin misiniz?`)) return;

        setIsLoading(true);
        await fetch('/api/games/bulk', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: selectedIds })
        });
        setIsLoading(false);
        fetchGames();
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'gameUrl' | 'thumbnailUrl') => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                const data = await res.json();
                setForm(prev => ({ ...prev, [field]: data.url }));
            }
        } finally {
            setIsLoading(false);
        }
    };

    // --- BULK FILE UPLOAD ---
    const handleBulkFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsLoading(true);
        const results: { name: string; url: string }[] = [];
        const count = files.length;

        for (let i = 0; i < count; i++) {
            const file = files[i];
            const formData = new FormData();
            formData.append('file', file);

            try {
                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                if (res.ok) {
                    const data = await res.json();
                    results.push({ name: file.name, url: data.url });
                }
            } catch (e) { console.error(e) }
        }

        setUploadedFiles(prev => [...prev, ...results]);
        setIsLoading(false);
        alert(`${results.length} dosya yüklendi!`);
    };

    // --- COMMENT MANAGEMENT ---
    const handleApproveComment = async (id: number, approved: boolean) => {
        await fetch('/api/comments', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, approved })
        });
        fetchComments();
    };

    const handleDeleteComment = async (id: number) => {
        if (!confirm('Yorumu silmek istiyor musunuz?')) return;
        await fetch(`/api/comments?id=${id}`, { method: 'DELETE' });
        fetchComments();
    };

    const handleEdit = (game: Game) => {
        setForm(game);
        setIsEditing(true);
        setActiveTab('add');
    };

    // --- SELECTION LOGIC ---
    const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(filteredGames.map(g => g.id));
        } else {
            setSelectedIds([]);
        }
    };

    const toggleSelect = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    // --- IMPORT LOGIC ---
    const parseXmlString = (text: string) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        const items = xmlDoc.getElementsByTagName(xmlDoc.getElementsByTagName("item").length ? "item" : "game");
        const parsedGames: any[] = [];

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const title = item.getElementsByTagName("title")[0]?.textContent || "";
            const url = item.getElementsByTagName("url")[0]?.textContent || item.getElementsByTagName("link")[0]?.textContent || "";
            const desc = item.getElementsByTagName("description")[0]?.textContent || "";
            const thumb = item.getElementsByTagName("thumbnail")[0]?.textContent || item.getElementsByTagName("image")[0]?.textContent || "";
            const cat = item.getElementsByTagName("category")[0]?.textContent || "";
            const gType = item.getElementsByTagName("type")[0]?.textContent || "emulator";

            if (title && url) {
                parsedGames.push({ title, gameUrl: url, description: desc, thumbnailUrl: thumb, categories: cat, gameType: gType });
            }
        }
        return parsedGames;
    };

    const handleFileAnalyze = async (e: React.ChangeEvent<HTMLInputElement>, type: 'csv' | 'xml') => {
        const file = e.target.files?.[0];
        if (!file) return;

        const text = await file.text();
        let parsedGames: any[] = [];

        if (type === 'xml') {
            parsedGames = parseXmlString(text);
        } else {
            // CSV Parser respecting quotes
            const parseCSVLine = (str: string) => {
                const arr = [];
                let quote = false;
                let col = '';
                for (let c of str) {
                    if (c === '"') { quote = !quote; continue; }
                    if (c === ',' && !quote) { arr.push(col); col = ''; continue; }
                    col += c;
                }
                arr.push(col);
                return arr;
            };

            const lines = text.split(/\r?\n/);
            lines.forEach((line, index) => {
                if (index === 0 || !line.trim()) return; // Skip header and empty lines

                const cols = parseCSVLine(line);
                const title = cols[0]?.trim();
                const gameUrl = cols[1]?.trim();

                // Validation: Skip if Title or URL is missing
                if (title && gameUrl) {
                    parsedGames.push({
                        title: title,
                        gameUrl: gameUrl,
                        thumbnailUrl: cols[2]?.trim(),
                        categories: cols[3]?.trim(),
                        gameType: (cols[4]?.trim() || 'emulator').toLowerCase(),
                        description: cols[5]?.trim() || ''
                    });
                }
            });
        }

        // Apply Overrides
        const finalGames = parsedGames.map(g => ({
            ...g,
            gameType: forceOverride ? overrideType : (g.gameType || overrideType),
            categories: forceOverride ? (overrideCat || g.categories) : (g.categories || overrideCat)
        }));

        setImportPreview(finalGames);
        setImportStats(`${finalGames.length} oyun bulundu.`);
    };

    const handleUrlXmlAnalyze = async () => {
        if (!xmlUrl) return;
        setIsLoading(true);
        try {
            const res = await fetch(xmlUrl);
            const text = await res.text();
            const parsedGames = parseXmlString(text);

            // Apply Overrides
            const finalGames = parsedGames.map(g => ({
                ...g,
                gameType: forceOverride ? overrideType : (g.gameType || overrideType),
                categories: forceOverride ? (overrideCat || g.categories) : (g.categories || overrideCat)
            }));

            setImportPreview(finalGames);
            setImportStats(`${finalGames.length} oyun bulundu (URL'den).`);
        } catch (e) {
            alert('XML linkinden veri çekilemedi. CORS hatası olabilir.');
        }
        setIsLoading(false);
    };

    const handleBulkImport = async () => {
        if (importPreview.length === 0) return;
        setIsLoading(true);
        setImportError('');

        const BATCH_SIZE = 50;
        const total = importPreview.length;
        let successCount = 0;
        let lastError = "";

        // Chunk the array
        for (let i = 0; i < total; i += BATCH_SIZE) {
            const chunk = importPreview.slice(i, i + BATCH_SIZE);
            setImportStats(`Yükleniyor... (${Math.round((i / total) * 100)}%) - ${i}/${total}`);

            try {
                const res = await fetch('/api/games', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(chunk)
                });

                if (res.ok) {
                    const data = await res.json();
                    successCount += data.count || 0;
                } else {
                    const errData = await res.json();
                    console.error('Batch failed:', i, errData);
                    lastError = errData.error || "Sunucu hatası";
                    setImportError(lastError);
                }
            } catch (e) {
                console.error('Network error on batch:', i, e);
            }
        }

        setIsLoading(false);
        setImportStats(`${successCount} / ${total} oyun başarıyla eklendi.`);
        alert(`İşlem Tamamlandı!\nToplam Başarılı: ${successCount}\n(Varsa hata verenler atlandı)\n\n${lastError ? "SON HATA: " + lastError : ""}`);

        // Cleanup if fully successful or just refresh list
        if (successCount > 0) {
            setImportPreview([]);
            setXmlUrl('');
            fetchGames();
            setActiveTab('list');
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.title}>Grove Admin</div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>{games.length} Oyun Mevcut</div>
            </header>

            {/* TABS */}
            <div className={styles.tabs}>
                <button className={`${styles.tab} ${activeTab === 'list' ? styles.activeTab : ''}`} onClick={() => setActiveTab('list')}>Oyun Listesi</button>
                <button className={`${styles.tab} ${activeTab === 'add' ? styles.activeTab : ''}`} onClick={() => { setActiveTab('add'); setForm({ gameType: 'emulator' }); setIsEditing(false); }}>+ Yeni Ekle</button>
                <button className={`${styles.tab} ${activeTab === 'csv' ? styles.activeTab : ''}`} onClick={() => { setActiveTab('csv'); setImportPreview([]); setOverrideCat(''); setForceOverride(false); setOverrideType('emulator'); }}>CSV Import</button>
                <button className={`${styles.tab} ${activeTab === 'xml' ? styles.activeTab : ''}`} onClick={() => { setActiveTab('xml'); setImportPreview([]); setOverrideCat(''); setForceOverride(false); setOverrideType('html5'); }}>XML Import</button>
                <button className={`${styles.tab} ${activeTab === 'files' ? styles.activeTab : ''}`} onClick={() => setActiveTab('files')}>Toplu Dosya</button>
                <button className={`${styles.tab} ${activeTab === 'comments' ? styles.activeTab : ''}`} onClick={() => { setActiveTab('comments'); fetchComments(); }}>Yorumlar</button>
            </div>

            <div className={styles.content}>
                {/* ---------------- LIST TAB ---------------- */}
                {activeTab === 'list' && (
                    <div style={{ gridColumn: '1 / -1' }}>
                        <div className={styles.card}>
                            {/* Search and Bulk Actions Bar */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
                                {/* Search Input */}
                                <input
                                    type="text"
                                    placeholder="🔍 Oyun ara..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={styles.input}
                                    style={{ maxWidth: '300px', margin: 0 }}
                                />

                                {selectedIds.length > 0 && (
                                    <div style={{ padding: '10px', background: '#3c1f1f', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>{selectedIds.length} oyun seçili</span>
                                        <button onClick={handleBulkDelete} className={`${styles.button} ${styles.buttonDanger}`} style={{ padding: '6px 12px' }}>
                                            SEÇİLENLERİ SİL
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className={styles.tableContainer}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '40px' }}><input type="checkbox" onChange={toggleSelectAll} checked={selectedIds.length === filteredGames.length && filteredGames.length > 0} /></th>
                                            <th>ID</th>
                                            <th>Oyun</th>
                                            <th>Tür</th>
                                            <th>Link</th>
                                            <th style={{ textAlign: 'right' }}>İşlem</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredGames.map(game => (
                                            <tr key={game.id} style={{ background: selectedIds.includes(game.id) ? 'rgba(255,255,255,0.05)' : 'transparent' }}>
                                                <td><input type="checkbox" checked={selectedIds.includes(game.id)} onChange={() => toggleSelect(game.id)} /></td>
                                                <td>#{game.id}</td>
                                                <td>
                                                    <div style={{ fontWeight: 'bold', color: '#fff' }}>{game.title}</div>
                                                    <div style={{ fontSize: '12px', opacity: 0.6 }}>{game.categories}</div>
                                                </td>
                                                <td>
                                                    <span className={`${styles.badge} ${game.gameType === 'emulator' ? styles.badgeEmulator : styles.badgeEmbed}`}>
                                                        {game.gameType}
                                                    </span>
                                                </td>
                                                <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'monospace', color: '#888' }}>
                                                    {game.gameUrl}
                                                </td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <button className={styles.actionBtn} onClick={() => handleEdit(game)} title="Düzenle">✏️</button>
                                                    <button className={styles.actionBtn} onClick={() => handleDelete(game.id)} title="Sil" style={{ color: '#ef4444' }}>🗑️</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ---------------- ADD TAB ---------------- */}
                {activeTab === 'add' && (
                    <div style={{ gridColumn: 'inherit' }}>
                        <div className={styles.card}>
                            <h2 style={{ marginBottom: '1rem' }}>{isEditing ? 'Oyunu Düzenle' : 'Yeni Oyun Ekle'}</h2>
                            <form onSubmit={handleSubmit} className={styles.formGroup}>
                                <input className={styles.input} placeholder="Oyun Başlığı" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} required />
                                <input className={styles.input} placeholder="Slug (Otomatik)" value={form.slug || ''} onChange={e => setForm({ ...form, slug: e.target.value })} />
                                <select className={styles.select} value={form.gameType || 'emulator'} onChange={e => setForm({ ...form, gameType: e.target.value })}>
                                    <option value="emulator">Emulator (ROM)</option>
                                    <option value="embed">HTML5 (Embed/Iframe)</option>
                                </select>

                                {/* File Uploader for Game URL */}
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <input className={styles.input} placeholder="Oyun Dosya Yolu (/roms/sonic.md)" value={form.gameUrl || ''} onChange={e => setForm({ ...form, gameUrl: e.target.value })} required style={{ flex: 1 }} />
                                    <label className={styles.button} style={{ cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', background: '#444' }}>
                                        📁 Yükle (ROM)
                                        <input type="file" hidden onChange={(e) => handleFileUpload(e, 'gameUrl')} />
                                    </label>
                                </div>

                                {/* File Uploader for Thumbnail */}
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <input className={styles.input} placeholder="Resim URL" value={form.thumbnailUrl || ''} onChange={e => setForm({ ...form, thumbnailUrl: e.target.value })} style={{ flex: 1 }} />
                                    <label className={styles.button} style={{ cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', background: '#444' }}>
                                        🖼️ Yükle (Resim)
                                        <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload(e, 'thumbnailUrl')} />
                                    </label>
                                </div>

                                <input className={styles.input} placeholder="Kategoriler (Macera, Aksiyon)" value={form.categories || ''} onChange={e => setForm({ ...form, categories: e.target.value })} />
                                <textarea className={styles.textarea} placeholder="Açıklama" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} />

                                <button type="submit" className={`${styles.button} ${styles.buttonPrimary}`} disabled={isLoading}>
                                    {isLoading ? 'Kaydediliyor...' : (isEditing ? 'Güncelle' : 'Kaydet')}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* ---------------- CSV IMPORT TAB ---------------- */}
                {activeTab === 'csv' && (
                    <div style={{ gridColumn: 'inherit' }}>
                        <div className={styles.card}>
                            <h2>CSV ile Yükle</h2>
                            <p style={{ marginBottom: '1rem', color: '#888' }}>Virgülle ayrılmış .csv dosyanızı seçin.</p>

                            {/* OVERRIDES */}
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                                <h4 style={{ margin: '0 0 10px 0', color: '#ccc' }}>Varsayılan Ayarlar</h4>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <select className={styles.select} value={overrideType} onChange={e => setOverrideType(e.target.value)} style={{ flex: 1 }}>
                                        <option value="emulator">Emulator (ROM)</option>
                                        <option value="embed">HTML5 (Embed)</option>
                                    </select>
                                    <input className={styles.input} placeholder="Varsayılan Kategori (Opsiyonel)" value={overrideCat} onChange={e => setOverrideCat(e.target.value)} style={{ flex: 2 }} />
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: '#aaa', fontSize: '0.9rem' }}>
                                        <input type="checkbox" checked={forceOverride} onChange={e => setForceOverride(e.target.checked)} />
                                        <span>ZORLA?</span>
                                    </label>
                                </div>
                                <small style={{ color: '#666' }}>* "ZORLA" seçerseniz dosyadaki tür/kategori yerine buradaki kullanılır.</small>
                            </div>

                            <input type="file" accept=".csv" onChange={(e) => handleFileAnalyze(e, 'csv')} className={styles.input} style={{ width: 'auto', marginBottom: '1rem' }} />

                            {importStats && <div style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '1rem' }}>{importStats}</div>}

                            {importError && (
                                <div style={{
                                    background: '#3f1515',
                                    border: '1px solid #ef4444',
                                    color: '#fca5a5',
                                    padding: '15px',
                                    borderRadius: '8px',
                                    marginBottom: '20px',
                                    whiteSpace: 'pre-wrap',
                                    fontFamily: 'monospace',
                                    fontSize: '0.85rem',
                                    maxHeight: '300px',
                                    overflowY: 'auto'
                                }}>
                                    <strong>SON HATA DETAYI:</strong><br />
                                    {importError}
                                </div>
                            )}

                            {importPreview.length > 0 && (
                                <button onClick={handleBulkImport} className={`${styles.button} ${styles.buttonPrimary}`} disabled={isLoading}>
                                    {isLoading ? 'Yükleniyor...' : `🚀 ${importPreview.length} Oyunu Yükle`}
                                </button>
                            )}

                            <div style={{ marginTop: '2rem', borderTop: '1px solid #333', paddingTop: '1rem' }}>
                                <a href="data:text/csv;charset=utf-8,Title,GameURL,ThumbnailURL,Category,Type,Description%0ASuper Custom Game,/roms/custom.md,http://site.com/img.jpg,Action,emulator,My Description" download="sablon.csv" className={styles.button} style={{ textDecoration: 'none', fontSize: '0.9rem', display: 'inline-block' }}>
                                    📥 Örnek CSV İndir
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* ---------------- XML IMPORT TAB ---------------- */}
                {activeTab === 'xml' && (
                    <div style={{ gridColumn: 'inherit' }}>
                        <div className={styles.card}>
                            <h2>XML ile Yükle</h2>
                            <p style={{ marginBottom: '1rem', color: '#888' }}>Bilgisayardan dosya seçin VEYA bir XML linki yapıştırın.</p>

                            {/* OVERRIDES */}
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                                <h4 style={{ margin: '0 0 10px 0', color: '#ccc' }}>Varsayılan Ayarlar</h4>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <select className={styles.select} value={overrideType} onChange={e => setOverrideType(e.target.value)} style={{ flex: 1 }}>
                                        <option value="html5">HTML5 (XML Default)</option>
                                        <option value="emulator">Emulator</option>
                                    </select>
                                    <input className={styles.input} placeholder="Varsayılan Kategori (Opsiyonel)" value={overrideCat} onChange={e => setOverrideCat(e.target.value)} style={{ flex: 2 }} />
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: '#aaa', fontSize: '0.9rem' }}>
                                        <input type="checkbox" checked={forceOverride} onChange={e => setForceOverride(e.target.checked)} />
                                        <span>ZORLA?</span>
                                    </label>
                                </div>
                                <small style={{ color: '#666' }}>* XML'de genelde tür HTML5 olur, buradan değiştirebilirsiniz.</small>
                            </div>

                            {/* URL Input */}
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
                                <input className={styles.input} placeholder="https://site.com/feed.xml" value={xmlUrl} onChange={e => setXmlUrl(e.target.value)} />
                                <button onClick={handleUrlXmlAnalyze} className={`${styles.button} ${styles.buttonPrimary}`} disabled={isLoading}>
                                    Linkten Çek
                                </button>
                            </div>

                            <div style={{ textAlign: 'center', margin: '10px 0', color: '#555' }}>- VEYA -</div>

                            {/* File Input */}
                            <input type="file" accept=".xml" onChange={(e) => handleFileAnalyze(e, 'xml')} className={styles.input} style={{ width: 'auto', marginBottom: '1rem' }} />

                            {importStats && <div style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '1rem' }}>{importStats}</div>}

                            {importPreview.length > 0 && (
                                <button onClick={handleBulkImport} className={`${styles.button} ${styles.buttonPrimary}`} disabled={isLoading}>
                                    {isLoading ? 'Yükleniyor...' : `🚀 ${importPreview.length} Oyunu Yükle`}
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* ---------------- FILES TAB ---------------- */}
                {activeTab === 'files' && (
                    <div style={{ gridColumn: 'inherit' }}>
                        <div className={styles.card}>
                            <h2>Toplu Dosya Yükle</h2>
                            <p style={{ marginBottom: '1rem', color: '#888' }}>
                                Birden fazla dosya seçebilirsiniz. Yüklenen dosyaların adresleri aşağıda listelenir.
                            </p>

                            <label className={styles.button} style={{ display: 'block', textAlign: 'center', padding: '2rem', border: '2px dashed #444', background: 'rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '10px' }}>📁</span>
                                Dosyaları Seçmek İçin Tıkla (veya Sürükle)
                                <input type="file" multiple hidden onChange={handleBulkFileUpload} />
                            </label>

                            {isLoading && <div style={{ marginTop: '1rem', color: '#f59e0b' }}>Yükleniyor...</div>}

                            {uploadedFiles.length > 0 && (
                                <div style={{ marginTop: '2rem' }}>
                                    <h3>Yüklenen Dosyalar ({uploadedFiles.length})</h3>
                                    <div className={styles.tableContainer} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                        <table className={styles.table}>
                                            <thead><tr><th>Dosya Adı</th><th>URL (Kopyala)</th></tr></thead>
                                            <tbody>
                                                {uploadedFiles.map((file, i) => (
                                                    <tr key={i}>
                                                        <td>{file.name}</td>
                                                        <td style={{ fontFamily: 'monospace', color: '#4ade80', userSelect: 'all' }}>{file.url}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <button onClick={() => setUploadedFiles([])} className={styles.button} style={{ marginTop: '1rem', fontSize: '0.8rem' }}>Listeyi Temizle</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ---------------- COMMENTS TAB ---------------- */}
                {activeTab === 'comments' && (
                    <div style={{ gridColumn: 'inherit' }}>
                        <div className={styles.card}>
                            <h2>Yorum Yönetimi</h2>
                            <p style={{ marginBottom: '1rem', color: '#888' }}>Onay bekleyen ve onaylanmış yorumlar.</p>

                            <div className={styles.tableContainer}>
                                <table className={styles.table}>
                                    <thead><tr><th>Oyun</th><th>Yazar</th><th>Yorum</th><th>Tarih</th><th style={{ textAlign: 'right' }}>Durum / İşlem</th></tr></thead>
                                    <tbody>
                                        {comments.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>Hiç yorum yok.</td></tr>}
                                        {comments.map(comment => (
                                            <tr key={comment.id} style={{ background: comment.approved ? 'transparent' : 'rgba(255,165,0,0.05)' }}>
                                                <td style={{ fontWeight: 'bold' }}>{comment.game?.title}</td>
                                                <td>{comment.author}</td>
                                                <td style={{ maxWidth: '300px', color: '#ccc', fontSize: '0.9rem' }}>{comment.content}</td>
                                                <td style={{ fontSize: '0.8rem', color: '#666' }}>{new Date(comment.createdAt).toLocaleDateString()}</td>
                                                <td style={{ textAlign: 'right' }}>
                                                    {!comment.approved && (
                                                        <button onClick={() => handleApproveComment(comment.id, true)} className={styles.button} style={{ background: '#10b981', color: '#fff', marginRight: '5px', padding: '5px 10px', fontSize: '0.8rem' }}>✓ Onayla</button>
                                                    )}
                                                    {comment.approved && (
                                                        <button onClick={() => handleApproveComment(comment.id, false)} className={styles.button} style={{ background: '#444', color: '#fff', marginRight: '5px', padding: '5px 10px', fontSize: '0.8rem' }}>Gizle</button>
                                                    )}
                                                    <button onClick={() => handleDeleteComment(comment.id)} className={styles.button} style={{ background: '#ef4444', color: '#fff', padding: '5px 10px', fontSize: '0.8rem' }}>Sil</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
