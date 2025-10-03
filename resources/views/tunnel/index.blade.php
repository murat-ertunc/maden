@extends('layouts.app')

@section('title', 'Enhanced Tunnel Designer')

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
    
    #mode-instructions {
        animation: slideDown 0.3s ease-out;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .instruction-step {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        padding: 8px 12px;
        background: rgba(255,255,255,0.7);
        border-radius: 6px;
        border-left: 4px solid #17a2b8;
    }
    
    .instruction-step .step-number {
        background: #17a2b8;
        color: white;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        margin-right: 12px;
        flex-shrink: 0;
    }
    
    .instruction-step .step-text {
        flex: 1;
        font-size: 14px;
        line-height: 1.4;
    }
    
    .instruction-tips {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        border-radius: 6px;
        padding: 12px;
        margin-top: 15px;
    }
    
    .instruction-tips .tips-title {
        font-weight: bold;
        color: #856404;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        font-size: 13px;
    }
    
    .instruction-tips .tips-title i {
        margin-right: 6px;
    }
    
    .instruction-tips ul {
        margin: 0;
        padding-left: 20px;
        color: #856404;
        font-size: 13px;
    }
    
    .instruction-tips li {
        margin-bottom: 4px;
    }
    
    /* Monitoring Mode - Fullscreen Styles */
    .monitoring-mode {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 9999 !important;
        background: #fff !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    
    .monitoring-mode .card {
        height: 100vh !important;
        margin: 0 !important;
        border: none !important;
        border-radius: 0 !important;
    }
    
    .monitoring-mode .card-body {
        height: 100vh !important;
        padding: 0 !important;
    }
    
    .monitoring-mode #tunnel-diagram {
        height: 100vh !important;
        width: 100vw !important;
    }
    
    .monitoring-mode #tunnel-diagram canvas {
        height: 100vh !important;
        width: 100vw !important;
    }
    
    .monitoring-exit-btn {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: rgba(220, 53, 69, 0.95);
        color: white;
        border: 2px solid white;
        padding: 12px 24px;
        font-size: 16px;
        font-weight: bold;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
        display: none;
    }
    
    .monitoring-exit-btn:hover {
        background: rgba(200, 35, 51, 1);
        transform: scale(1.05);
        box-shadow: 0 6px 20px rgba(0,0,0,0.4);
    }
    
    .monitoring-exit-btn i {
        margin-right: 8px;
    }
    
    .monitoring-mode .monitoring-exit-btn {
        display: block;
    }
    
    /* Hide header and footer in monitoring mode */
    body.monitoring-active .container-fluid > .row:not(.monitoring-canvas-row) {
        display: none !important;
    }
    
    body.monitoring-active {
        overflow: hidden;
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
                    <h2 class="mb-1">🚇 Kolay Tünel Tasarım Arayüzü</h2>
                </div>
                <div class="d-flex gap-2">
                    <button type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#minesListModal">
                        <i class="fas fa-mountain"></i> Madenler
                    </button>
                    <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#createMineModal">
                        <i class="fas fa-plus"></i> Yeni Maden
                    </button>
                </div>
            </div>
        </div>
    </div>

    @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    @endif

    <!-- Drawing Mode Selector -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="drawing-mode-selector">
                <h5 class="mb-3">
                    <i class="fas fa-pencil-alt"></i> 🎯 Çizim Modu Seçin - Artık Çok Kolay!
                </h5>
                <div class="d-flex flex-wrap justify-content-center">
                    {{-- Drag & Draw mode hidden by request --}}
                    <div class="mode-button" data-mode="tunnel_drag">
                        <div class="mode-icon">�</div>
                        <div class="mode-title">Serbest Tünel</div>
                        <div class="mode-desc">Nokta-nokta tıklayarak<br>serbest tünel çizin!</div>
                    </div>
                    <div class="mode-button" data-mode="tunnel_point">
                        <div class="mode-icon">📍</div>
                        <div class="mode-title">Nokta & Yol</div>
                        <div class="mode-desc">Noktalara tıklayarak<br>uzun yollar çizin</div>
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

    <!-- Mode Instructions Panel -->
    <div class="row mb-4" id="mode-instructions" style="display: none;">
        <div class="col-12">
            <div class="card border-info">
                <div class="card-header bg-info text-white">
                    <h6 class="mb-0">
                        <i class="fas fa-info-circle"></i> 
                        <span id="instruction-title">Nasıl Kullanılır?</span>
                    </h6>
                </div>
                <div class="card-body bg-light">
                    <div id="instruction-content">
                        <!-- Dynamic content will be inserted here -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Design Area -->
    <div class="row monitoring-canvas-row">
        <div class="col-12">
            <div class="card" id="monitoring-card">
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
                                    <button type="button" class="btn btn-outline-success" id="btn-undo" title="Geri Al">
                                        <i class="fas fa-undo"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-warning" id="btn-clear" title="Temizle">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-info" id="btn-center" title="Merkeze Al">
                                        <i class="fas fa-crosshairs"></i>
                                    </button>
                                </div>
                                
                                <!-- Mine Selection -->
                                <div class="input-group input-group-sm" style="width: 200px;">
                                    <span class="input-group-text">Maden</span>
                                    <select id="selected-mine" class="form-select">
                                        <option value="">Seçiniz</option>
                                        @foreach($mines as $mine)
                                            <option value="{{ $mine->id }}">{{ $mine->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            
                            <!-- Tunnel Parameters (only visible in tunnel_point mode) -->
                            <div class="tunnel-params" id="tunnel-params" style="display: none;">
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
                                
                                <div class="param-group" id="cross-section-group">
                                    <label>Kesit</label>
                                    <select id="cross-section" class="form-select form-select-sm" style="min-width: 180px; height: 36px; font-size: 14px;">
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
                                <button type="button" class="btn btn-sm btn-outline-info btn-icon" id="btn-monitoring">
                                    <i class="fas fa-expand"></i> <span>İzleme Modu</span>
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
                        <!-- Cover for GoJS watermark area (bottom-left). Note: For production, purchase a license. -->
                        <div id="gojs-watermark-cover" style="position:absolute; left:8px; bottom:8px; width:220px; height:60px; background:linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0)); pointer-events:none;"></div>
                        
                        <!-- Monitoring Mode Exit Button -->
                        <button type="button" class="monitoring-exit-btn" id="btn-exit-monitoring">
                            <i class="fas fa-times"></i> Çıkış
                        </button>
                        
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

<!-- Import Modal -->
<div class="modal fade" id="importModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Tünel Verisi İçe Aktar</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label for="import-file" class="form-label">JSON Dosyası Seçin</label>
                    <input type="file" class="form-control" id="import-file" accept=".json">
                </div>
                <div class="mb-3">
                    <label for="import-text" class="form-label">Veya JSON Metni Yapıştırın</label>
                    <textarea class="form-control" id="import-text" rows="8" placeholder="JSON verisini buraya yapıştırın..."></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
                <button type="button" class="btn btn-primary" id="btn-import-confirm">İçe Aktar</button>
            </div>
        </div>
    </div>
</div>

<!-- Mines List Modal -->
<div class="modal fade" id="minesListModal" tabindex="-1" aria-labelledby="minesListModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="minesListModalLabel">
                    <i class="fas fa-mountain"></i> Madenler
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                @if($mines->count() > 0)
                    <div class="table-responsive">
                        <table class="table table-hover align-middle">
                            <thead class="table-light">
                                <tr>
                                    <th style="width: 30%;">Maden Adı</th>
                                    <th style="width: 40%;">Açıklama</th>
                                    <th style="width: 10%;" class="text-center">Tüneller</th>
                                    <th style="width: 20%;" class="text-end">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($mines as $mine)
                                    <tr>
                                        <td>
                                            <strong>{{ $mine->name }}</strong>
                                        </td>
                                        <td>
                                            <small class="text-muted">
                                                {{ $mine->description ? Str::limit($mine->description, 60) : '-' }}
                                            </small>
                                        </td>
                                        <td class="text-center">
                                            <span class="badge bg-info">{{ $mine->paths->count() }}</span>
                                        </td>
                                        <td class="text-end">
                                            <button class="btn btn-danger" onclick="confirmDeleteMine({{ $mine->id }}, '{{ $mine->name }}')" title="Sil">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @else
                    <div class="text-center py-5">
                        <i class="fas fa-mountain fa-3x text-muted mb-3"></i>
                        <p class="text-muted">Henüz hiç maden eklenmemiş.</p>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createMineModal" onclick="closeMinesListModal()">
                            <i class="fas fa-plus"></i> İlk Madeni Ekle
                        </button>
                    </div>
                @endif
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
            </div>
        </div>
    </div>
</div>

<!-- Edit Mine Modal -->
<div class="modal fade" id="editMineModal" tabindex="-1" aria-labelledby="editMineModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="edit-mine-form">
                <input type="hidden" id="edit-mine-id">
                <div class="modal-header">
                    <h5 class="modal-title" id="editMineModalLabel">
                        <i class="fas fa-edit"></i> Maden Düzenle
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="edit-mine-name" class="form-label">Maden Adı</label>
                        <input type="text" class="form-control" id="edit-mine-name" name="name" placeholder="Örn: Kuzey Galeri" required>
                    </div>
                    <div class="mb-3">
                        <label for="edit-mine-description" class="form-label">Açıklama (opsiyonel)</label>
                        <textarea class="form-control" id="edit-mine-description" name="description" rows="3" placeholder="Kısa açıklama..."></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i> Güncelle
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Create Mine Modal -->
<div class="modal fade" id="createMineModal" tabindex="-1" aria-labelledby="createMineModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="create-mine-form">
                <div class="modal-header">
                    <h5 class="modal-title" id="createMineModalLabel">Yeni Maden Oluştur</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="mine-name" class="form-label">Maden Adı</label>
                        <input type="text" class="form-control" id="mine-name" name="name" placeholder="Örn: Kuzey Galeri" required>
                    </div>
                    <div class="mb-3">
                        <label for="mine-description" class="form-label">Açıklama (opsiyonel)</label>
                        <textarea class="form-control" id="mine-description" name="description" rows="3" placeholder="Kısa açıklama..."></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
                    <button type="submit" class="btn btn-primary" id="btn-create-mine">
                        <i class="fas fa-save"></i> Oluştur
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection

@push('scripts')
<!-- GoJS Library -->
<script src="https://unpkg.com/gojs@3.0.26/release/go.js"></script>

<!-- Enhanced TunnelDesigner Implementation -->
<script src="{{ asset('js/enhanced-tunnel-designer.js') }}?v={{ time() }}" 
        onload="console.log('✅ Enhanced Tunnel Designer JS loaded')"
        onerror="console.error('❌ Failed to load Enhanced Tunnel Designer JS')"></script>

<script>
    let tunnelDesigner = null;
    let currentMineId = null;
    
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 Enhanced Tunnel Designer Loading...');
        
        // Wait for scripts to load
        function waitForDependencies() {
            if (typeof go === 'undefined') {
                console.log('⏳ Waiting for GoJS...');
                setTimeout(waitForDependencies, 100);
                return;
            }
            
            if (typeof EnhancedTunnelDesigner === 'undefined') {
                console.log('⏳ Waiting for EnhancedTunnelDesigner...');
                setTimeout(waitForDependencies, 100);
                return;
            }
            
            console.log('✅ All dependencies loaded');
            
            // Initialize enhanced tunnel designer
            initializeTunnelDesigner();
            
            // Setup UI event handlers
            setupUIHandlers();
            
            // Setup keyboard shortcuts
            setupKeyboardShortcuts();
            
            console.log('✅ Enhanced Tunnel Designer Ready!');
            showMessage('🎯 Kolay tünel çizimi aktif! Nokta & Yol moduyla çizime başlayın.', 'success');

            // Auto-select last mine and load on refresh; if none, pick the first mine automatically
            const sel = document.getElementById('selected-mine');
            const lastMine = localStorage.getItem('lastMineId');
            if (sel) {
                if (lastMine) {
                    sel.value = lastMine;
                    currentMineId = lastMine;
                } else if (sel.options.length > 1) { // first option is 'Seçiniz'
                    sel.selectedIndex = 1;
                    currentMineId = sel.options[1].value;
                    localStorage.setItem('lastMineId', currentMineId);
                }
                if (currentMineId) {
                    highlightSelectedMineCard(currentMineId);
                    loadMineTunnelDataFromServer();
                }
            }
        }
        
        waitForDependencies();
    });
    
    function initializeTunnelDesigner() {
        // Check dependencies
        if (typeof go === 'undefined') {
            console.error('❌ GoJS library not loaded');
            showMessage('GoJS kütüphanesi yüklenemedi!', 'error');
            return;
        }
        
        if (typeof EnhancedTunnelDesigner === 'undefined') {
            console.error('❌ EnhancedTunnelDesigner class not found');
            showMessage('Enhanced Tunnel Designer class bulunamadı!', 'error');
            return;
        }
        
        try {
            console.log('🔧 Initializing EnhancedTunnelDesigner...');
            
            tunnelDesigner = new EnhancedTunnelDesigner('tunnel-diagram', {
                gridSize: 0.5,
                showGrid: true,
                snapToGrid: true,
                showMeasurements: true,
                magneticSnap: true,
                showPreview: true,
                defaultTunnelWidth: 3.0,
                defaultTunnelHeight: 3.0,
                defaultCrossSectionType: 'circle'
            });
            
            // Set callbacks
            tunnelDesigner.onTunnelCreated = onTunnelCreated;
            tunnelDesigner.onTunnelModified = onTunnelModified;
            tunnelDesigner.onStationAdded = onStationAdded;
            
            console.log('✅ TunnelDesigner initialized successfully');
            
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
        ['tunnel-width', 'tunnel-height', 'cross-section'].forEach(id => {
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
    document.getElementById('btn-monitoring').addEventListener('click', enterMonitoringMode);
    document.getElementById('btn-exit-monitoring').addEventListener('click', exitMonitoringMode);
    document.getElementById('btn-load').addEventListener('click', loadMineTunnelDataFromServer);
    document.getElementById('btn-export').addEventListener('click', exportTunnelData);
        
        // Mine selection (guard when no mines exist)
        const mineSelect = document.getElementById('selected-mine');
        if (mineSelect) {
            mineSelect.addEventListener('change', (e) => {
                currentMineId = e.target.value;
                if (currentMineId) {
                    localStorage.setItem('lastMineId', currentMineId);
                    loadMineTunnelDataFromServer();
                }
            });
        }

        // Create Mine form submit
        const createMineForm = document.getElementById('create-mine-form');
        if (createMineForm) {
            createMineForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await createMine();
            });
        }
        
        // Mouse coordinates tracking with DOM events
        if (tunnelDesigner && tunnelDesigner.diagram) {
            tunnelDesigner.diagram.div.addEventListener('mousemove', (e) => {
                const rect = tunnelDesigner.diagram.div.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const docPoint = tunnelDesigner.diagram.transformViewToDoc(new go.Point(x, y));
                
                const realCoords = {
                    x: (docPoint.x / 20).toFixed(1),
                    y: (docPoint.y / 20).toFixed(1)
                };
                document.getElementById('mouse-coords').textContent = `${realCoords.x}, ${realCoords.y}`;
            });
        }
    }
    
    function setupKeyboardShortcuts() {
        // Capture-phase ESC to guarantee cancel works even when focus is inside diagram canvas
        window.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && tunnelDesigner && tunnelDesigner.isDrawing) {
                e.preventDefault();
                e.stopPropagation();
                tunnelDesigner.cancelDrawing();
                selectDrawingMode('off');
            }
        }, true);

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
        console.log(`🎯 Setting drawing mode: ${mode}`);
        
        // tunnel_drag artık serbest nokta-nokta çizimi için aktif
        if (mode === 'tunnel_drag') {
            console.log('🎯 Serbest tünel çizimi modu aktif');
        }

        if (!tunnelDesigner) {
            console.error('❌ TunnelDesigner not initialized');
            showMessage('Tünel tasarım aracı henüz hazır değil!', 'warning');
            return;
        }
        
        try {
            // Update UI
            document.querySelectorAll('.mode-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            if (mode === 'off') {
                if (typeof tunnelDesigner.exitDrawingMode === 'function') {
                    tunnelDesigner.exitDrawingMode();
                }
                document.getElementById('mode-off').classList.add('active');
                document.getElementById('current-mode').classList.remove('active');
                document.getElementById('mode-text').textContent = 'Pasif Mod';
                document.querySelector('.tunnel-designer-container').classList.remove('drawing-mode');
                document.getElementById('shortcuts-help').style.display = 'none';
                
                // Hide instructions
                document.getElementById('mode-instructions').style.display = 'none';
                // Hide params panel when off
                const params = document.getElementById('tunnel-params');
                if (params) params.style.display = 'none';
            } else {
                if (typeof tunnelDesigner.setDrawingMode === 'function') {
                    tunnelDesigner.setDrawingMode(mode);
                } else {
                    console.error('❌ setDrawingMode method not found');
                    showMessage('Çizim modu fonksiyonu bulunamadı!', 'error');
                    return;
                }
                
                document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
                document.getElementById('current-mode').classList.add('active');
                document.querySelector('.tunnel-designer-container').classList.add('drawing-mode');
                
                const modeNames = {
                    'tunnel_drag': '� Serbest Tünel',
                    'tunnel_point': '📍 Nokta & Yol'
                };
                
                document.getElementById('mode-text').textContent = modeNames[mode] || mode;
                document.getElementById('shortcuts-help').style.display = 'block';
                
                // Show params only in tunnel_point
                const params = document.getElementById('tunnel-params');
                if (params) params.style.display = (mode === 'tunnel_point') ? 'flex' : 'none';
                
                // Show mode instructions
                showModeInstructions(mode);
            }
            
            console.log(`✅ Drawing mode set to: ${mode}`);
            
        } catch (error) {
            console.error('❌ Error setting drawing mode:', error);
            showMessage('Çizim modu ayarlanırken hata oluştu: ' + error.message, 'error');
        }
    }
    
    function showModeInstructions(mode) {
        const instructionsPanel = document.getElementById('mode-instructions');
        const titleEl = document.getElementById('instruction-title');
        const contentEl = document.getElementById('instruction-content');
        
        const instructions = {
            'tunnel_drag': {
                title: '� Serbest Tünel Çizimi - Kullanım Talimatları',
                content: `
                    <div class="instruction-step">
                        <div class="step-number">1</div>
                        <div class="step-text">İlk nokta için herhangi bir yere <strong>tıklayın</strong> - kırmızı pointer belirir</div>
                    </div>
                    <div class="instruction-step">
                        <div class="step-number">2</div>
                        <div class="step-text">Farenizi hareket ettirin - <strong>dotted çizgi</strong> ve <strong>mesafe</strong> görünür</div>
                    </div>
                    <div class="instruction-step">
                        <div class="step-number">3</div>
                        <div class="step-text">İkinci nokta için <strong>tıklayın</strong> - tünel segment oluşur</div>
                    </div>
                    <div class="instruction-step">
                        <div class="step-number">4</div>
                        <div class="step-text">İstediğiniz kadar nokta ekleyin - <strong>çift tıklayın</strong> veya <strong>ESC</strong> ile bitirin</div>
                    </div>
                    <div class="instruction-tips">
                        <div class="tips-title">
                            <i class="fas fa-lightbulb"></i> İpuçları
                        </div>
                        <ul>
                            <li><strong>Kırmızı nokta:</strong> Aktif çizim noktasını gösterir</li>
                            <li><strong>Dotted çizgi:</strong> Bir sonraki segment önizlemesi</li>
                            <li><strong>Mesafe gösterimi:</strong> Mouse yanında anlık mesafe</li>
                            <li><strong>Minimum mesafe:</strong> 0.5m'den kısa segmentler kabul edilmez</li>
                            <li><strong>Sürekli çizim:</strong> Sayısız nokta ile istediğiniz gibi çizin</li>
                        </ul>
                    </div>
                `
            },
            'tunnel_point': {
                title: '📍 Nokta & Yol Modu - Kullanım Talimatları',
                content: `
                    <div class="instruction-step">
                        <div class="step-number">1</div>
                        <div class="step-text">İlk noktaya <strong>tek tıklayın</strong> - başlangıç noktası işaretlenir</div>
                    </div>
                    <div class="instruction-step">
                        <div class="step-number">2</div>
                        <div class="step-text">İkinci noktaya <strong>tek tıklayın</strong> - tünel segmenti oluşturulur</div>
                    </div>
                    <div class="instruction-step">
                        <div class="step-number">3</div>
                        <div class="step-text">Devam etmek için <strong>yeni noktalara tıklamaya</strong> devam edin</div>
                    </div>
                    <div class="instruction-step">
                        <div class="step-number">4</div>
                        <div class="step-text">Bitirmek için <strong>çift tıklayın</strong> veya ESC tuşuna basın</div>
                    </div>
                    <div class="instruction-tips">
                        <div class="tips-title">
                            <i class="fas fa-lightbulb"></i> İpuçları
                        </div>
                        <ul>
                            <li><strong>Uzun tüneller için ideal:</strong> Birden fazla segment ile karmaşık yollar</li>
                            <li><strong>Hassas çizim:</strong> Her noktayı tek tek kontrol edebilirsiniz</li>
                            <li><strong>Bağlantılı segmentler:</strong> Her segment öncekine otomatik bağlanır</li>
                            <li><strong>Çift tık bitir:</strong> Yolu tamamlamak için herhangi bir yere çift tıklayın</li>
                        </ul>
                    </div>
                `
            },
            
        };
        
        const modeInstruction = instructions[mode];
        if (modeInstruction) {
            titleEl.textContent = modeInstruction.title;
            contentEl.innerHTML = modeInstruction.content;
            instructionsPanel.style.display = 'block';
            
            // Smooth scroll to instructions (deferred for layout)
            setTimeout(() => {
                instructionsPanel.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 100);
        }
    }
    function updateTunnelParams() {
        const width = parseFloat(document.getElementById('tunnel-width').value);
        const height = parseFloat(document.getElementById('tunnel-height').value);
        const crossSection = document.getElementById('cross-section').value;

        // Update defaults
        tunnelDesigner.config.defaultTunnelWidth = width;
        tunnelDesigner.config.defaultTunnelHeight = height;
        tunnelDesigner.config.defaultCrossSectionType = crossSection;

        // If a segment is selected, apply to it immediately
        try {
            const selParts = tunnelDesigner.diagram.selection.toArray();
            selParts.forEach(p => {
                const d = p.data;
                if (d && d.category === 'tunnel_segment') {
                    const model = tunnelDesigner.diagram.model;
                    model.startTransaction('setCrossSection');
                    model.setDataProperty(d, 'crossSectionType', crossSection);
                    // initialize sensible defaults
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
            });
            if (typeof tunnelDesigner.refreshHorseshoeHandlesForSelection === 'function') {
                tunnelDesigner.refreshHorseshoeHandlesForSelection();
            }
        } catch (e) { console.warn(e); }

        console.log(`⚙️ Tunnel params updated: ${width}×${height}m, ${crossSection}`);
    }
    
    function updateStats() {
        if (!tunnelDesigner) return;
        
        const data = tunnelDesigner.getTunnelData();
        
        document.getElementById('total-segments').textContent = data.segments.length;
        
        const totalLength = data.segments.reduce((sum, seg) => sum + (seg.length || 0), 0);
        document.getElementById('total-length').textContent = totalLength.toFixed(1);
        
        document.getElementById('total-stations').textContent = data.stations.length;
        
        // Debug: Check measurements
        console.log('📊 Stats Update:', {
            segments: data.segments.length,
            measurements: data.measurements.length,
            totalLength: totalLength.toFixed(1)
        });
    }
    
    function clearAll() {
        tunnelDesigner.diagram.model.nodeDataArray = [];
        tunnelDesigner.tunnelData.segments.clear();
        tunnelDesigner.tunnelData.stations.clear();
        tunnelDesigner.tunnelData.measurements.clear();
        updateStats();
        showMessage('Tüm çizimler temizlendi', 'info');
    }
    
    // Monitoring Mode Functions
    function enterMonitoringMode() {
        console.log('🖥️ Entering monitoring mode...');
        
        // Add monitoring mode class to body
        document.body.classList.add('monitoring-active');
        
        // Add monitoring mode class to card
        const card = document.getElementById('monitoring-card');
        if (card) {
            card.classList.add('monitoring-mode');
        }
        
        // Resize diagram to fit new dimensions
        setTimeout(() => {
            if (tunnelDesigner && tunnelDesigner.diagram) {
                // Force diagram to recalculate dimensions
                const diagramDiv = document.getElementById('tunnel-diagram');
                if (diagramDiv) {
                    // Get actual viewport dimensions
                    diagramDiv.style.width = '100vw';
                    diagramDiv.style.height = '100vh';
                }
                
                // Request update and zoom to fit
                tunnelDesigner.diagram.requestUpdate();
                setTimeout(() => {
                    tunnelDesigner.diagram.zoomToFit();
                }, 100);
            }
        }, 300);
        
        // Change button icon and text
        const monitoringBtn = document.getElementById('btn-monitoring');
        if (monitoringBtn) {
            monitoringBtn.innerHTML = '<i class="fas fa-compress"></i> <span>Normal Mod</span>';
            monitoringBtn.classList.remove('btn-outline-info');
            monitoringBtn.classList.add('btn-outline-warning');
        }
        
        showMessage('🖥️ İzleme modu aktif - Tam ekran görünüm', 'success');
        
        // Add ESC key listener for exit
        document.addEventListener('keydown', monitoringEscapeHandler);
    }
    
    function exitMonitoringMode() {
        console.log('🖥️ Exiting monitoring mode...');
        
        // Remove monitoring mode class from body
        document.body.classList.remove('monitoring-active');
        
        // Remove monitoring mode class from card
        const card = document.getElementById('monitoring-card');
        if (card) {
            card.classList.remove('monitoring-mode');
        }
        
        // Reset diagram div dimensions
        const diagramDiv = document.getElementById('tunnel-diagram');
        if (diagramDiv) {
            diagramDiv.style.width = '';
            diagramDiv.style.height = '';
        }
        
        // Resize diagram to fit new dimensions
        setTimeout(() => {
            if (tunnelDesigner && tunnelDesigner.diagram) {
                tunnelDesigner.diagram.requestUpdate();
                setTimeout(() => {
                    tunnelDesigner.diagram.zoomToFit();
                }, 100);
            }
        }, 300);
        
        // Change button back to original
        const monitoringBtn = document.getElementById('btn-monitoring');
        if (monitoringBtn) {
            monitoringBtn.innerHTML = '<i class="fas fa-expand"></i> <span>İzleme Modu</span>';
            monitoringBtn.classList.remove('btn-outline-warning');
            monitoringBtn.classList.add('btn-outline-info');
        }
        
        showMessage('Normal görünüme dönüldü', 'info');
        
        // Remove ESC key listener
        document.removeEventListener('keydown', monitoringEscapeHandler);
    }
    
    // ESC key handler for monitoring mode
    function monitoringEscapeHandler(e) {
        if (e.key === 'Escape' && document.body.classList.contains('monitoring-active')) {
            // Only exit monitoring if not drawing
            if (!tunnelDesigner || !tunnelDesigner.isDrawing) {
                exitMonitoringMode();
            }
        }
    }
    
    // API Functions
    async function saveTunnelData() {
        if (!currentMineId) {
            showMessage('Lütfen önce bir maden seçin!', 'warning');
            return;
        }
        
        try {
            const tunnelData = tunnelDesigner.exportTunnelData();
            const saveBtn = document.getElementById('btn-save');
            saveBtn.disabled = true;
            saveBtn.classList.add('disabled');

            const tokenMeta = document.querySelector('meta[name="csrf-token"]');
            const csrf = tokenMeta ? tokenMeta.content : undefined;
            const response = await fetch('/api/tunnel-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(csrf ? { 'X-CSRF-TOKEN': csrf } : {}),
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({
                    mine_id: currentMineId,
                    tunnel_data: tunnelData
                })
            });
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`HTTP ${response.status}: ${text.substring(0,200)}`);
            }
            const result = await response.json();

            if (result.success) {
                showMessage(`${result.segments_saved} segment kaydedildi`, 'success');
                // Sunucudan tekrar yükle ve aynı görünümü sağla
                await loadMineTunnelDataFromServer();
            } else {
                throw new Error(result.message || 'Kaydetme başarısız');
            }
            
        } catch (error) {
            console.error('Kaydetme hatası:', error);
            showMessage('Kaydetme hatası: ' + error.message, 'error');
        } finally {
            const saveBtn = document.getElementById('btn-save');
            saveBtn.disabled = false;
            saveBtn.classList.remove('disabled');
        }
    }

    // Sunucudan mevcut tünel verilerini yükle
    async function loadMineTunnelDataFromServer() {
        if (!currentMineId) return;
        if (!tunnelDesigner) {
            console.warn('TunnelDesigner not initialized yet; skipping load.');
            return;
        }
        
        try {
            const response = await fetch(`/api/mines/${currentMineId}/tunnel-data`);
            const tunnelData = await response.json();
            
            console.log('📥 Loading tunnel data:', tunnelData);
            tunnelDesigner.loadTunnelData(tunnelData);
            updateStats();
            showMessage('Tünel verileri yüklendi', 'info');
            
        } catch (error) {
            console.error(error);
            showMessage('Yükleme hatası');
        }
    }

    // Create Mine via API, update UI or reload when necessary
    async function createMine() {
        const nameInput = document.getElementById('mine-name');
        const descInput = document.getElementById('mine-description');
        const name = nameInput.value.trim();
        const description = descInput.value.trim();

        if (!name) {
            showMessage('Lütfen maden adı girin', 'warning');
            nameInput.focus();
            return;
        }

        try {
            const tokenMeta = document.querySelector('meta[name="csrf-token"]');
            const csrf = tokenMeta ? tokenMeta.content : undefined;
            const payload = { name, description };

            const endpoints = ['/api/mines', '/mines'];
            let created = null;

            for (const url of endpoints) {
                try {
                    const res = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                            ...(csrf ? { 'X-CSRF-TOKEN': csrf } : {})
                        },
                        body: JSON.stringify(payload)
                    });
                    if (!res.ok) {
                        const text = await res.text();
                        throw new Error(`HTTP ${res.status}: ${text.substring(0,200)}`);
                    }
                    window.location.reload();
                    const result = await res.json();
                    const id = result?.id ?? result?.mine?.id ?? result?.data?.id;
                    const nm = result?.name ?? result?.mine?.name ?? result?.data?.name ?? name;
                    if (id) {
                        created = { id: String(id), name: nm };
                        break;
                    }
                } catch (inner) {
                    // try next endpoint
                    continue;
                }
            }

            if (!created) {
                throw new Error('Maden oluşturulamadı. Lütfen Madenler sayfasından deneyin.');
            }

            // Close modal
            try {
                const modalEl = document.getElementById('createMineModal');
                if (window.bootstrap && modalEl) {
                    const instance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                    instance.hide();
                }
            } catch {}

            showMessage('Maden oluşturuldu', 'success');

            const mineSelect2 = document.getElementById('selected-mine');
            if (mineSelect2) {
                // Add option and select it
                const opt = document.createElement('option');
                opt.value = created.id;
                opt.textContent = created.name;
                mineSelect2.appendChild(opt);
                mineSelect2.value = created.id;
                currentMineId = created.id;
                localStorage.setItem('lastMineId', currentMineId);
                highlightSelectedMineCard(currentMineId);
                await loadMineTunnelDataFromServer();
            } else {
                // No selection UI on server-render (0 mines initially). Reload to render it.
                window.location.reload();
            }

        } catch (err) {
            console.error('Maden oluşturma hatası:', err);
            showMessage('Maden oluşturma hatası: ' + err.message, 'error');
        }
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
    
    // Dosyadan JSON import (isteğe bağlı araca bağlı)
    function importTunnelDataFromFile() {
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
    
    // Global functions for mine cards
    window.loadMineForDesign = function(mineId) {
        const sel = document.getElementById('selected-mine');
        if (sel) sel.value = mineId;
        currentMineId = String(mineId);
        localStorage.setItem('lastMineId', currentMineId);
        highlightSelectedMineCard(currentMineId);
        loadMineTunnelDataFromServer();
    };

    function highlightSelectedMineCard(mineId) {
        document.querySelectorAll('.mine-card').forEach(card => card.classList.remove('selected'));
        const card = document.querySelector(`.mine-card[onclick="loadMineForDesign(${mineId})"]`);
        if (card) card.classList.add('selected');
    }

    // Close mines list modal
    window.closeMinesListModal = function() {
        const modal = document.getElementById('minesListModal');
        if (modal && window.bootstrap) {
            const instance = bootstrap.Modal.getInstance(modal);
            if (instance) instance.hide();
        }
    };

    // Edit Mine Modal handlers
    window.openEditMineModal = function(id, name, description) {
        // Close mines list modal first
        closeMinesListModal();
        
        // Open edit modal
        const modal = document.getElementById('editMineModal');
        if (!modal) return;
        document.getElementById('edit-mine-id').value = id;
        document.getElementById('edit-mine-name').value = name || '';
        document.getElementById('edit-mine-description').value = description || '';
        
        setTimeout(() => {
            if (window.bootstrap) {
                (bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal)).show();
            }
        }, 300);
    };

    window.confirmDeleteMine = async function(id, name) {
        if (!confirm(`'${name}' madenini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`)) return;
        try {
            const tokenMeta = document.querySelector('meta[name="csrf-token"]');
            const csrf = tokenMeta ? tokenMeta.content : undefined;
            const endpoints = [
                `/api/mines/${id}`,
                `/mines/${id}`
            ];
            let ok = false;
            for (const url of endpoints) {
                try {
                    const res = await fetch(url, {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                            ...(csrf ? { 'X-CSRF-TOKEN': csrf } : {})
                        }
                    });
                    if (res.ok) { ok = true; break; }
                } catch {}
            }
            if (!ok) throw new Error('Silme başarısız');
            showMessage('Maden silindi', 'success');
            window.location.reload();
        } catch (e) {
            showMessage('Maden silinemedi: ' + e.message, 'error');
        }
    };

    // Submit edit mine form
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('edit-mine-form');
        if (form) {
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                const id = document.getElementById('edit-mine-id').value;
                const name = document.getElementById('edit-mine-name').value.trim();
                const description = document.getElementById('edit-mine-description').value.trim();
                if (!name) { showMessage('Maden adı zorunlu', 'warning'); return; }
                try {
                    const tokenMeta = document.querySelector('meta[name="csrf-token"]');
                    const csrf = tokenMeta ? tokenMeta.content : undefined;
                    const payload = { name, description };
                    const endpoints = [
                        { url: `/api/mines/${id}`, method: 'PUT' },
                        { url: `/mines/${id}`, method: 'PUT' }
                    ];
                    let ok = false;
                    for (const ep of endpoints) {
                        try {
                            const res = await fetch(ep.url, {
                                method: ep.method,
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'X-Requested-With': 'XMLHttpRequest',
                                    ...(csrf ? { 'X-CSRF-TOKEN': csrf } : {})
                                },
                                body: JSON.stringify(payload)
                            });
                            if (res.ok) { ok = true; break; }
                        } catch {}
                    }
                    if (!ok) throw new Error('Güncelleme başarısız');
                    showMessage('Maden güncellendi', 'success');
                    window.location.reload();
                } catch (e) {
                    showMessage('Güncelleme hatası: ' + e.message, 'error');
                }
            });
        }
    });
</script>
@endpush