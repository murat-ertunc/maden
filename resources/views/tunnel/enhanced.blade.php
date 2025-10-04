@extends('layouts.app')

@section('title', 'Gelişmiş Tünel Tasarım Arayüzü')

@push('styles')
<link href="{{ asset('css/enhanced-tunnel-designer.css') }}" rel="stylesheet">
<style>
    .drawing-mode-selector {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        padding: 20px;
        color: white;
        margin-bottom: 20px;
    }
    
    .mode-button {
        background: rgba(255,255,255,0.1);
        border: 2px solid rgba(255,255,255,0.3);
        color: white;
        border-radius: 8px;
        padding: 12px 20px;
        margin: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        min-width: 120px;
    }
    
    .mode-button:hover {
        background: rgba(255,255,255,0.2);
        border-color: rgba(255,255,255,0.5);
        transform: translateY(-2px);
    }
    
    .mode-button.active {
        background: rgba(255,255,255,0.3);
        border-color: white;
        box-shadow: 0 4px 15px rgba(255,255,255,0.3);
    }
    
    .mode-icon {
        font-size: 24px;
    }
    
    .mode-title {
        font-weight: 600;
        font-size: 14px;
    }
    
    .mode-desc {
        font-size: 11px;
        opacity: 0.8;
        text-align: center;
    }
</style>
@endpush

@section('content')
<div class="container-fluid">
    <!-- Header -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h2 class="mb-1">🚇 Gelişmiş Tünel Tasarım Arayüzü</h2>
                    <p class="text-muted mb-0">Kolay çizim araçları ile profesyonel tünel tasarımı</p>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-primary btn-sm" id="btn-help">
                        <i class="fas fa-question-circle"></i> Yardım
                    </button>
                    <button class="btn btn-outline-secondary btn-sm" id="btn-settings">
                        <i class="fas fa-cog"></i> Ayarlar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Drawing Mode Selector -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="drawing-mode-selector">
                <h5 class="mb-3">
                    <i class="fas fa-pencil-alt"></i> Çizim Modu Seçin
                </h5>
                <div class="d-flex flex-wrap justify-content-center">
                    <div class="mode-button" data-mode="tunnel_drag">
                        <div class="mode-icon">🖱️</div>
                        <div class="mode-title">Sürükle & Çiz</div>
                        <div class="mode-desc">Farenizi sürükleyerek<br>tünel çizin</div>
                    </div>
                    <div class="mode-button" data-mode="tunnel_point">
                        <div class="mode-icon">📍</div>
                        <div class="mode-title">Nokta & Yol</div>
                        <div class="mode-desc">Noktalara tıklayarak<br>uzun yollar çizin</div>
                    </div>
                    <div class="mode-button" data-mode="station">
                        <div class="mode-icon">🚉</div>
                        <div class="mode-title">İstasyon</div>
                        <div class="mode-desc">Maden istasyonları<br>ekleyin</div>
                    </div>
                    <div class="mode-button" data-mode="off" id="mode-off">
                        <div class="mode-icon">⏹️</div>
                        <div class="mode-title">Çizimi Durdur</div>
                        <div class="mode-desc">Seçim moduna<br>dönün</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Design Area -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <!-- Enhanced Controls -->
                <div class="card-header bg-light">
                    <div class="tunnel-controls">
                        <div class="d-flex flex-wrap align-items-center justify-content-between">
                            <!-- Drawing Status -->
                            <div class="d-flex align-items-center gap-3">
                                <div class="drawing-mode-indicator" id="current-mode">
                                    <span id="mode-text">Pasif Mod</span>
                                </div>
                                
                                <!-- Quick Actions -->
                                <div class="btn-group btn-group-sm" role="group">
                                    <button type="button" class="btn btn-outline-success" id="btn-undo">
                                        <i class="fas fa-undo"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning" id="btn-clear">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-info" id="btn-center">
                                        <i class="fas fa-crosshairs"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Tunnel Parameters -->
                            <div class="tunnel-params">
                                <div class="param-group">
                                    <label>Giriş Genişliği</label>
                                    <input type="number" id="tunnel-start-width" value="1.0" step="0.1" min="0.1" max="20">
                                    <span class="unit">m</span>
                                </div>

                                <div class="param-group">
                                    <label>Çıkış Genişliği</label>
                                    <input type="number" id="tunnel-end-width" value="1.0" step="0.1" min="0.1" max="20">
                                    <span class="unit">m</span>
                                </div>

                                <div class="param-group">
                                    <label>Genişlik</label>
                                    <input type="number" id="tunnel-width" value="3.0" step="0.5" min="1" max="10">
                                    <span class="unit">m</span>
                                </div>
                                
                                <div class="param-group">
                                    <label>Yükseklik</label>
                                    <input type="number" id="tunnel-height" value="3.0" step="0.5" min="1" max="10">
                                    <span class="unit">m</span>
                                </div>
                                
                                <div class="param-group">
                                    <label>Kesit</label>
                                    <select id="cross-section">
                                        <option value="circle">🔵 Daire</option>
                                        <option value="rectangle">▭ Dikdörtgen</option>
                                        <option value="horseshoe">🏛️ At Nalı</option>
                                    </select>
                                </div>
                            </div>
                            
                            <!-- File Operations -->
                            <div class="quick-tools">
                                <button type="button" class="btn btn-sm btn-outline-primary btn-icon" id="btn-save">
                                    <i class="fas fa-save"></i> <span>Kaydet</span>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-secondary btn-icon" id="btn-load">
                                    <i class="fas fa-folder-open"></i> <span>Yükle</span>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-success btn-icon" id="btn-export">
                                    <i class="fas fa-download"></i> <span>Dışa Aktar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Diagram Area with Enhanced Container -->
                <div class="card-body p-0">
                    <div class="tunnel-designer-container">
                        <div id="tunnel-diagram" style="height: 650px; width: 100%;"></div>
                        
                        <!-- Keyboard Shortcuts Help -->
                        <div class="shortcuts-help" id="shortcuts-help" style="display: none;">
                            <h6>⌨️ Klavye Kısayolları</h6>
                            <div class="shortcut">
                                <span>Çizimi İptal Et</span>
                                <kbd class="key">ESC</kbd>
                            </div>
                            <div class="shortcut">
                                <span>Yolu Bitir</span>
                                <kbd class="key">Çift Tık</kbd>
                            </div>
                            <div class="shortcut">
                                <span>Geri Al</span>
                                <kbd class="key">Ctrl+Z</kbd>
                            </div>
                            <div class="shortcut">
                                <span>Merkeze Al</span>
                                <kbd class="key">Space</kbd>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Enhanced Status Bar -->
                <div class="card-footer">
                    <div class="tunnel-status">
                        <div class="row">
                            <div class="col-md-2">
                                <div class="status-item">
                                    <i class="fas fa-project-diagram text-info"></i>
                                    <span>Segmentler:</span>
                                    <span class="status-value" id="total-segments">0</span>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="status-item">
                                    <i class="fas fa-ruler text-success"></i>
                                    <span>Toplam:</span>
                                    <span class="status-value" id="total-length">0</span>
                                    <span class="status-unit">m</span>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="status-item">
                                    <i class="fas fa-subway text-warning"></i>
                                    <span>İstasyonlar:</span>
                                    <span class="status-value" id="total-stations">0</span>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="status-item">
                                    <i class="fas fa-crosshairs text-primary"></i>
                                    <span>Grid:</span>
                                    <span class="status-value" id="grid-status">Açık</span>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="status-item">
                                    <i class="fas fa-magnet text-danger"></i>
                                    <span>Manyetik:</span>
                                    <span class="status-value" id="magnetic-status">Açık</span>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="status-item">
                                    <i class="fas fa-mouse-pointer text-secondary"></i>
                                    <span>Konum:</span>
                                    <span class="status-value" id="mouse-coords">0, 0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Settings Modal -->
<div class="modal fade" id="settingsModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="fas fa-cog"></i> Çizim Ayarları
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="show-grid" checked>
                            <label class="form-check-label" for="show-grid">
                                Grid Çizgilerini Göster
                            </label>
                        </div>
                        
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="snap-to-grid" checked>
                            <label class="form-check-label" for="snap-to-grid">
                                Grid'e Yasla
                            </label>
                        </div>
                        
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="magnetic-snap" checked>
                            <label class="form-check-label" for="magnetic-snap">
                                Manyetik Yakalama
                            </label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="show-measurements" checked>
                            <label class="form-check-label" for="show-measurements">
                                Ölçümleri Göster
                            </label>
                        </div>
                        
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="show-preview" checked>
                            <label class="form-check-label" for="show-preview">
                                Çizim Önizlemesi
                            </label>
                        </div>
                        
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="show-shortcuts" checked>
                            <label class="form-check-label" for="show-shortcuts">
                                Klavye Kısayolları
                            </label>
                        </div>
                    </div>
                </div>
                
                <hr>
                
                <div class="mb-3">
                    <label for="grid-size" class="form-label">Grid Boyutu (metre)</label>
                    <input type="range" class="form-range" id="grid-size" min="0.25" max="2" step="0.25" value="0.5">
                    <div class="form-text">Değer: <span id="grid-size-value">0.5</span>m</div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
                <button type="button" class="btn btn-primary" id="save-settings">Ayarları Kaydet</button>
            </div>
        </div>
    </div>
</div>

<!-- Help Modal -->
<div class="modal fade" id="helpModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="fas fa-question-circle"></i> Kullanım Kılavuzu
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <h6>🖱️ Sürükle & Çiz Modu</h6>
                        <ul class="small">
                            <li>Farenizi basılı tutup sürükleyerek tünel çizin</li>
                            <li>Otomatik olarak grid'e yaslanır</li>
                            <li>En kısa 0.5m tünel çizebilirsiniz</li>
                            <li>Çizim sırasında canlı önizleme görürsünüz</li>
                        </ul>
                        
                        <h6>📍 Nokta & Yol Modu</h6>
                        <ul class="small">
                            <li>Noktalara tıklayarak uzun yollar çizin</li>
                            <li>Her tıklama yeni bir segment oluşturur</li>
                            <li>Çift tıklayarak çizimi bitirin</li>
                            <li>ESC ile çizimi iptal edebilirsiniz</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h6>🚉 İstasyon Modu</h6>
                        <ul class="small">
                            <li>Maden istasyonları ekleyin</li>
                            <li>İstasyonlar otomatik numaralandırılır</li>
                            <li>İstasyonları sürükleyerek taşıyabilirsiniz</li>
                        </ul>
                        
                        <h6>⚙️ Ayarlar</h6>
                        <ul class="small">
                            <li><strong>Grid:</strong> Yaslama çizgilerini açık/kapalı</li>
                            <li><strong>Manyetik:</strong> Tünel uçlarına otomatik yakalama</li>
                            <li><strong>Önizleme:</strong> Çizim sırasında canlı görüntü</li>
                            <li><strong>Ölçümler:</strong> Tünel uzunluklarını göster</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Segment Extension Modal -->
<div class="modal fade" id="extendSegmentModal" tabindex="-1" aria-labelledby="extendSegmentModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="extendSegmentModalLabel">
                    <i class="fas fa-plus"></i> Segment Uzatma
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label for="extend-angle" class="form-label">Açı (°)</label>
                    <input type="number" class="form-control" id="extend-angle" step="0.1" value="0">
                    <div class="form-text">Pozitif değerler saat yönünde, negatif değerler saat yönünün tersinde döndürür.</div>
                    <div class="text-muted small mt-2" id="extend-angle-reference"></div>
                </div>
                <div class="mb-3">
                    <label for="extend-length" class="form-label">Uzunluk (m)</label>
                    <input type="number" class="form-control" id="extend-length" step="0.1" min="0.1" value="5">
                </div>
                <div class="alert alert-info" role="alert">
                    Yeni segmentin giriş ve çıkış genişlikleri, kontrol panelindeki değerler kullanılarak uygulanır.
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
                <button type="button" class="btn btn-primary" id="extend-segment-confirm">Segment Oluştur</button>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script src="{{ asset('js/enhanced-tunnel-designer.js') }}"></script>
<script>
    let tunnelDesigner = null;
    let currentMineId = null;
    let extendSegmentModalInstance = null;
    let pendingSegmentExtension = null;
    let extendAngleReferenceEl = null;
    
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 Enhanced Tunnel Designer Loading...');
        
        // Initialize enhanced tunnel designer
        initializeTunnelDesigner();
        
        // Setup UI event handlers
        setupUIHandlers();
        
        // Setup keyboard shortcuts
        setupKeyboardShortcuts();
        
        console.log('✅ Enhanced Tunnel Designer Ready!');
    });
    
    function initializeTunnelDesigner() {
        try {
            const startWidth = parseFloat(document.getElementById('tunnel-start-width')?.value) || 1.0;
            const endWidth = parseFloat(document.getElementById('tunnel-end-width')?.value) || 1.0;

            tunnelDesigner = new EnhancedTunnelDesigner('tunnel-diagram', {
                gridSize: 0.5,
                showGrid: true,
                snapToGrid: true,
                showMeasurements: true,
                magneticSnap: true,
                showPreview: true,
                defaultTunnelWidth: 3.0,
                defaultTunnelHeight: 3.0,
                defaultCrossSectionType: 'circle',
                defaultStartWidth: startWidth,
                defaultEndWidth: endWidth
            });
            
            // Set callbacks
            tunnelDesigner.onTunnelCreated = onTunnelCreated;
            tunnelDesigner.onTunnelModified = onTunnelModified;
            tunnelDesigner.onStationAdded = onStationAdded;
            
        } catch (error) {
            console.error('❌ TunnelDesigner initialization failed:', error);
            showMessage('Tünel tasarım aracı yüklenemedi: ' + error.message, 'error');
        }
    }
    
    function setupUIHandlers() {
        // Drawing mode buttons
        document.querySelectorAll('.mode-button').forEach(button => {
            button.addEventListener('click', function() {
                const mode = this.dataset.mode;
                selectDrawingMode(mode);
            });
        });
        
        // Parameter changes
        ['tunnel-start-width', 'tunnel-end-width', 'tunnel-width', 'tunnel-height', 'cross-section'].forEach(id => {
            document.getElementById(id).addEventListener('change', updateTunnelParams);
        });
        
        // Control buttons
        document.getElementById('btn-undo').addEventListener('click', () => {
            tunnelDesigner.diagram.commandHandler.undo();
        });
        
        document.getElementById('btn-clear').addEventListener('click', () => {
            if (confirm('Tüm çizimleri silmek istediğinizden emin misiniz?')) {
                clearAll();
            }
        });
        
        document.getElementById('btn-center').addEventListener('click', () => {
            tunnelDesigner.diagram.zoomToFit();
        });
        
        // File operations
        document.getElementById('btn-save').addEventListener('click', saveTunnelData);
        document.getElementById('btn-load').addEventListener('click', loadTunnelData);
        document.getElementById('btn-export').addEventListener('click', exportTunnelData);
        
        // Modal buttons
        document.getElementById('btn-help').addEventListener('click', () => {
            new bootstrap.Modal(document.getElementById('helpModal')).show();
        });
        
        document.getElementById('btn-settings').addEventListener('click', () => {
            loadSettings();
            new bootstrap.Modal(document.getElementById('settingsModal')).show();
        });
        
        document.getElementById('save-settings').addEventListener('click', saveSettings);
        
        // Settings controls
        document.getElementById('grid-size').addEventListener('input', function() {
            document.getElementById('grid-size-value').textContent = this.value;
        });

        // Segment extension modal setup
        const extendModalEl = document.getElementById('extendSegmentModal');
        if (extendModalEl) {
            extendSegmentModalInstance = new bootstrap.Modal(extendModalEl);
            extendAngleReferenceEl = document.getElementById('extend-angle-reference');
            const confirmButton = document.getElementById('extend-segment-confirm');

            if (confirmButton) {
                confirmButton.addEventListener('click', () => {
                    if (!pendingSegmentExtension || typeof pendingSegmentExtension.onConfirm !== 'function') {
                        return;
                    }

                    const angleInput = document.getElementById('extend-angle');
                    const lengthInput = document.getElementById('extend-length');
                    const angleDelta = angleInput ? parseFloat(angleInput.value) : 0;
                    const lengthValue = lengthInput ? parseFloat(lengthInput.value) : 0;

                    if (isNaN(lengthValue) || lengthValue <= 0) {
                        showMessage('Lütfen 0.1 metreden büyük bir uzunluk değeri girin.', 'warning');
                        return;
                    }

                    pendingSegmentExtension.onConfirm(isNaN(angleDelta) ? 0 : angleDelta, lengthValue);
                    pendingSegmentExtension = null;
                    extendSegmentModalInstance.hide();
                });
            }

            extendModalEl.addEventListener('hidden.bs.modal', () => {
                pendingSegmentExtension = null;
            });
        }
        
        // Mouse coordinates tracking
        if (tunnelDesigner && tunnelDesigner.diagram) {
            tunnelDesigner.diagram.addDiagramListener("DocumentMouseMove", (e) => {
                const point = e.diagram.lastInput.documentPoint;
                const realCoords = {
                    x: (point.x / 20).toFixed(1),
                    y: (point.y / 20).toFixed(1)
                };
                document.getElementById('mouse-coords').textContent = `${realCoords.x}, ${realCoords.y}`;
            });
        }
    }
    
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // ESC - Cancel drawing
            if (e.key === 'Escape' && tunnelDesigner.isDrawing) {
                tunnelDesigner.cancelDrawing();
                selectDrawingMode('off');
            }
            
            // Space - Center view
            if (e.key === ' ' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                tunnelDesigner.diagram.zoomToFit();
            }
            
            // Ctrl+Z - Undo
            if (e.ctrlKey && e.key === 'z') {
                e.preventDefault();
                tunnelDesigner.diagram.commandHandler.undo();
            }
            
            // Delete - Remove selected
            if (e.key === 'Delete') {
                tunnelDesigner.diagram.commandHandler.deleteSelection();
                updateStats();
            }
        });
    }
    
    function selectDrawingMode(mode) {
        // Update UI
        document.querySelectorAll('.mode-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (mode === 'off') {
            tunnelDesigner.exitDrawingMode();
            document.getElementById('mode-off').classList.add('active');
            document.getElementById('current-mode').classList.remove('active');
            document.getElementById('mode-text').textContent = 'Pasif Mod';
            document.querySelector('.tunnel-designer-container').classList.remove('drawing-mode');
        } else {
            tunnelDesigner.setDrawingMode(mode);
            document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
            document.getElementById('current-mode').classList.add('active');
            document.querySelector('.tunnel-designer-container').classList.add('drawing-mode');
            
            const modeNames = {
                'tunnel_drag': 'Sürükle & Çiz',
                'tunnel_point': 'Nokta & Yol',
                'station': 'İstasyon Ekle'
            };
            
            document.getElementById('mode-text').textContent = modeNames[mode] || mode;
        }
        
        // Show/hide shortcuts
        const showShortcuts = document.getElementById('show-shortcuts').checked;
        document.getElementById('shortcuts-help').style.display = 
            (mode !== 'off' && showShortcuts) ? 'block' : 'none';
        
        console.log(`🎨 Drawing mode selected: ${mode}`);
    }
    
    function updateTunnelParams() {
        const startWidth = parseFloat(document.getElementById('tunnel-start-width').value) || 1.0;
        const endWidth = parseFloat(document.getElementById('tunnel-end-width').value) || 1.0;
        const width = parseFloat(document.getElementById('tunnel-width').value);
        const height = parseFloat(document.getElementById('tunnel-height').value);
        const crossSection = document.getElementById('cross-section').value;
        
        tunnelDesigner.config.defaultStartWidth = startWidth;
        tunnelDesigner.config.defaultEndWidth = endWidth;
        tunnelDesigner.config.defaultTunnelWidth = width;
        tunnelDesigner.config.defaultTunnelHeight = height;
        tunnelDesigner.config.defaultCrossSectionType = crossSection;
        try {
            const selParts = tunnelDesigner.diagram.selection.toArray();
            selParts.forEach(p => {
                const d = p.data;
                if (d && d.category === 'tunnel_segment') {
                    const model = tunnelDesigner.diagram.model;
                    model.startTransaction('setCrossSection');
                    model.setDataProperty(d, 'startWidth', startWidth);
                    model.setDataProperty(d, 'endWidth', endWidth);
                    model.setDataProperty(d, 'crossSectionType', crossSection);
                    const cp = {
                        diameter: height,
                        leftWidth: width * 0.4,
                        rightWidth: width * 0.4,
                        legHeight: height * 0.4,
                        archRise: height * 0.35,
                        archAngle: 180
                    };
                    model.setDataProperty(d, 'crossParams', cp);
                    if (crossSection === 'circle') {
                        model.setDataProperty(d, 'width', height);
                        model.setDataProperty(d, 'height', height);
                    } else {
                        model.setDataProperty(d, 'width', width);
                        model.setDataProperty(d, 'height', height);
                    }
                    model.commitTransaction('setCrossSection');
                }
                if (d && d.category === 'free_tunnel_segment') {
                    const model = tunnelDesigner.diagram.model;
                    model.startTransaction('setFreeWidth');
                    model.setDataProperty(d, 'startWidth', startWidth);
                    model.setDataProperty(d, 'endWidth', endWidth);
                    if (d.from && d.to) {
                        const from = go.Point.parse(d.from);
                        const to = go.Point.parse(d.to);
                        const shape = tunnelDesigner.computeFreeSegmentGeometry(from, to, startWidth, endWidth);
                        if (shape) {
                            model.setDataProperty(d, 'geometryString', shape.geometry);
                            model.setDataProperty(d, 'pos', go.Point.stringify(shape.position));
                        }
                    }
                    model.commitTransaction('setFreeWidth');
                }
            });
        } catch (e) {}

        console.log(`⚙️ Tunnel params updated: giriş ${startWidth}m, çıkış ${endWidth}m, kesit ${crossSection}, gövde ${width}×${height}m`);
    }

    window.openSegmentExtensionDialog = function(anchorContext, onConfirm) {
        if (!extendSegmentModalInstance) {
            extendSegmentModalInstance = new bootstrap.Modal(document.getElementById('extendSegmentModal'));
        }

        pendingSegmentExtension = {
            context: anchorContext,
            onConfirm
        };

        const angleInput = document.getElementById('extend-angle');
        const lengthInput = document.getElementById('extend-length');
        if (angleInput) {
            angleInput.value = '0';
        }
        if (lengthInput) {
            lengthInput.value = '5';
        }

        if (extendAngleReferenceEl && anchorContext && typeof anchorContext.baseAngleDeg === 'number') {
            const normalized = ((anchorContext.baseAngleDeg % 360) + 360) % 360;
            const anchorLabel = anchorContext.anchorKey === 'start' ? 'Başlangıç ucu' : 'Bitiş ucu';
            let widthInfo = '';
            if (typeof anchorContext.startWidth === 'number' && typeof anchorContext.endWidth === 'number') {
                widthInfo = ` | Genişlik (giriş/çıkış): ${anchorContext.startWidth.toFixed(2)}m / ${anchorContext.endWidth.toFixed(2)}m`;
            }
            extendAngleReferenceEl.textContent = `${anchorLabel} | Referans açı: ${normalized.toFixed(1)}°${widthInfo}`;
        } else if (extendAngleReferenceEl) {
            extendAngleReferenceEl.textContent = '';
        }

        extendSegmentModalInstance.show();
    };
    
    function updateStats() {
        if (!tunnelDesigner) return;
        
        const data = tunnelDesigner.getTunnelData();
        
        document.getElementById('total-segments').textContent = data.segments.length;
        
        const totalLength = data.segments.reduce((sum, seg) => sum + (seg.length || 0), 0);
        document.getElementById('total-length').textContent = totalLength.toFixed(1);
        
        document.getElementById('total-stations').textContent = data.stations.length;
    }
    
    function clearAll() {
        tunnelDesigner.diagram.model.nodeDataArray = [];
        tunnelDesigner.tunnelData.segments.clear();
        tunnelDesigner.tunnelData.stations.clear();
        tunnelDesigner.tunnelData.measurements.clear();
        updateStats();
        showMessage('Tüm çizimler temizlendi', 'info');
    }
    
    function saveTunnelData() {
        const data = tunnelDesigner.exportTunnelData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tunnel-design-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showMessage('Tünel tasarımı kaydedildi', 'success');
    }
    
    function loadTunnelData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        tunnelDesigner.importTunnelData(e.target.result);
                        updateStats();
                        showMessage('Tünel tasarımı yüklendi', 'success');
                    } catch (error) {
                        showMessage('Dosya yüklenirken hata oluştu: ' + error.message, 'error');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }
    
    function exportTunnelData() {
        const data = tunnelDesigner.getTunnelData();
        const exportData = {
            metadata: {
                created: new Date().toISOString(),
                version: '2.0',
                tool: 'Enhanced Tunnel Designer'
            },
            tunnels: data.segments,
            stations: data.stations,
            measurements: data.measurements,
            summary: {
                totalSegments: data.segments.length,
                totalLength: data.segments.reduce((sum, seg) => sum + (seg.length || 0), 0),
                totalStations: data.stations.length
            }
        };
        
        const json = JSON.stringify(exportData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `enhanced-tunnel-export-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showMessage('Detaylı rapor dışa aktarıldı', 'success');
    }
    
    function loadSettings() {
        document.getElementById('show-grid').checked = tunnelDesigner.config.showGrid;
        document.getElementById('snap-to-grid').checked = tunnelDesigner.config.snapToGrid;
        document.getElementById('magnetic-snap').checked = tunnelDesigner.config.magneticSnap;
        document.getElementById('show-measurements').checked = tunnelDesigner.config.showMeasurements;
        document.getElementById('show-preview').checked = tunnelDesigner.config.showPreview;
        document.getElementById('grid-size').value = tunnelDesigner.config.gridSize;
        document.getElementById('grid-size-value').textContent = tunnelDesigner.config.gridSize;
    }
    
    function saveSettings() {
        tunnelDesigner.config.showGrid = document.getElementById('show-grid').checked;
        tunnelDesigner.config.snapToGrid = document.getElementById('snap-to-grid').checked;
        tunnelDesigner.config.magneticSnap = document.getElementById('magnetic-snap').checked;
        tunnelDesigner.config.showMeasurements = document.getElementById('show-measurements').checked;
        tunnelDesigner.config.showPreview = document.getElementById('show-preview').checked;
        tunnelDesigner.config.gridSize = parseFloat(document.getElementById('grid-size').value);
        
        // Apply settings
        tunnelDesigner.diagram.grid.visible = tunnelDesigner.config.showGrid;
        
        // Update status bar
        document.getElementById('grid-status').textContent = tunnelDesigner.config.showGrid ? 'Açık' : 'Kapalı';
        document.getElementById('magnetic-status').textContent = tunnelDesigner.config.magneticSnap ? 'Açık' : 'Kapalı';
        
        bootstrap.Modal.getInstance(document.getElementById('settingsModal')).hide();
        showMessage('Ayarlar kaydedildi', 'success');
    }
    
    function showMessage(text, type = 'info') {
        const message = document.createElement('div');
        message.className = `tunnel-message ${type}`;
        message.textContent = text;
        
        const container = document.querySelector('.tunnel-designer-container');
        container.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
    
    // Callbacks
    function onTunnelCreated(segment) {
        updateStats();
        showMessage(`Tünel oluşturuldu: ${segment.length.toFixed(2)}m`, 'success');
    }
    
    function onTunnelModified(data) {
        updateStats();
        showMessage('Tünel güncellendi', 'info');
    }
    
    function onStationAdded(station) {
        updateStats();
        showMessage(`İstasyon eklendi: ${station.stationId}`, 'success');
    }
</script>
@endpush