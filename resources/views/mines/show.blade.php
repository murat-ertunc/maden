@extends('layouts.app')

@section('content')
<div class="container-fluid p-0">
    <!-- Header -->
    <div class="bg-dark text-white p-3">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <h4 class="mb-0">{{ $mine->name }} - 3D Görünüm</h4>
                <small class="text-muted">
                    <i class="fas fa-map-marker-alt"></i> {{ $mine->location ?? 'Konum belirtilmemiş' }}
                    <span class="ms-3">
                        <i class="fas fa-info-circle"></i> 
                        {{ $mine->layers->count() }} Katman, {{ $mine->models->count() }} Model
                    </span>
                </small>
            </div>
            <div>
                <span class="badge bg-{{ $mine->status === 'active' ? 'success' : ($mine->status === 'planning' ? 'warning' : 'secondary') }} me-2">
                    {{ ucfirst($mine->status) }}
                </span>
                <a href="{{ route('mines.index') }}" class="btn btn-outline-light btn-sm">
                    <i class="fas fa-arrow-left"></i> Geri Dön
                </a>
                <a href="{{ route('mines.edit', $mine) }}" class="btn btn-outline-light btn-sm">
                    <i class="fas fa-edit"></i> Düzenle
                </a>
            </div>
        </div>
    </div>

    <!-- 3D Viewer Container -->
    <div class="position-relative" style="height: calc(100vh - 120px);">
        <!-- Loading State -->
        <div id="loading-container" class="d-flex justify-content-center align-items-center h-100 bg-light">
            <div class="text-center">
                <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">Yükleniyor...</span>
                </div>
                <h5>3D Sahne Hazırlanıyor...</h5>
                <p class="text-muted">Three.js kütüphanesi yükleniyor ve 3D sahne oluşturuluyor</p>
            </div>
        </div>

        <!-- 3D Scene Container -->
        <div id="mine-3d-container" class="w-100 h-100"></div>

        <!-- Quick Actions Panel -->
        <div class="position-absolute top-0 start-0 m-3">
            <div class="card shadow-sm" style="width: 250px;">
                <div class="card-header py-2">
                    <h6 class="mb-0">Hızlı İşlemler</h6>
                </div>
                <div class="card-body py-2">
                    <div class="d-grid gap-1">
                        <button class="btn btn-outline-primary btn-sm" id="add-layer-btn">
                            <i class="fas fa-layer-group"></i> Katman Ekle
                        </button>
                        <button class="btn btn-outline-secondary btn-sm" id="add-model-btn">
                            <i class="fas fa-cube"></i> Model Ekle
                        </button>
                        <button class="btn btn-outline-warning btn-sm" id="draw-path-btn">
                            <i class="fas fa-route"></i> <span id="path-btn-text">Yol Çiz</span>
                        </button>
                        <button class="btn btn-outline-info btn-sm" id="reset-camera-btn">
                            <i class="fas fa-video"></i> Kamerayı Sıfırla
                        </button>
                        <button class="btn btn-outline-success btn-sm" id="export-scene-btn">
                            <i class="fas fa-download"></i> Sahneyi Dışa Aktar
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Path Drawing Controls -->
            <div class="card shadow-sm mt-2" id="path-controls" style="width: 250px; display: none;">
                <div class="card-header py-2">
                    <h6 class="mb-0">Yol Ayarları</h6>
                </div>
                <div class="card-body py-2">
                    <div class="mb-2">
                        <label class="form-label form-label-sm">Yol Tipi</label>
                        <select class="form-select form-select-sm" id="path-type">
                            <option value="tunnel">Tünel</option>
                            <option value="road">Yol</option>
                            <option value="rail">Ray</option>
                            <option value="conveyor">Konveyör</option>
                        </select>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label class="form-label form-label-sm">Genişlik (m)</label>
                            <input type="number" class="form-control form-control-sm" id="path-width" value="3" min="0.5" max="20" step="0.5">
                        </div>
                        <div class="col-6">
                            <label class="form-label form-label-sm">Yükseklik (m)</label>
                            <input type="number" class="form-control form-control-sm" id="path-height" value="3" min="0.5" max="20" step="0.5">
                        </div>
                    </div>
                    <div class="mt-2">
                        <label class="form-label form-label-sm">Renk</label>
                        <input type="color" class="form-control form-control-sm" id="path-color" value="#808080">
                    </div>
                    <div class="mt-2">
                        <label class="form-label form-label-sm">İsim</label>
                        <input type="text" class="form-control form-control-sm" id="path-name" placeholder="Yol adı">
                    </div>
                    <div class="d-grid gap-1 mt-2">
                        <button class="btn btn-success btn-sm" id="finish-path-btn">
                            <i class="fas fa-check"></i> Tamamla
                        </button>
                        <button class="btn btn-secondary btn-sm" id="cancel-path-btn">
                            <i class="fas fa-times"></i> İptal
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Object Info Panel -->
        <div class="position-absolute bottom-0 start-0 m-3" id="object-info-panel" style="display: none;">
            <div class="card shadow-sm" style="width: 320px; max-height: 400px; overflow-y: auto;">
                <div class="card-header py-2">
                    <h6 class="mb-0">
                        <i class="fas fa-info-circle"></i> Seçili Obje
                        <button type="button" class="btn-close btn-sm float-end" onclick="window.mineViewer?.hideObjectInfo()"></button>
                    </h6>
                </div>
                <div class="card-body" id="object-info-content">
                    <!-- Object details will be populated here -->
                </div>
            </div>
        </div>

        <!-- Help Panel -->
        <div class="position-absolute bottom-0 end-0 m-3">
            <div class="card shadow-sm" style="width: 250px;">
                <div class="card-header py-2">
                    <h6 class="mb-0">Kontroller</h6>
                </div>
                <div class="card-body py-2">
                    <small class="text-muted">
                        <div class="mb-1"><strong>Sol Tık:</strong> Obje seç</div>
                        <div class="mb-1"><strong>Sürükle:</strong> Kamerayı döndür</div>
                        <div class="mb-1"><strong>Tekerlek:</strong> Yakınlaştır/Uzaklaştır</div>
                        <div class="mb-1"><strong>Sağ Tık + Sürükle:</strong> Kamerayı kaydır</div>
                        <div><strong>Ctrl + Scroll:</strong> Hızlı zoom</div>
                    </small>
                </div>
            </div>
        </div>
    </div>

    <!-- Error Modal -->
    <div class="modal fade" id="errorModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Hata</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body" id="error-content">
                    <!-- Error message will be populated here -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
                    <button type="button" class="btn btn-primary" onclick="location.reload()">Tekrar Dene</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Mine data for JavaScript -->
<script>
window.mineData = {
    id: {{ $mine->id }},
    name: @json($mine->name),
    configuration: @json($mine->configuration ?? []),
    layersCount: {{ $mine->layers->count() }},
    modelsCount: {{ $mine->models->count() }}
};
</script>

@push('styles')
<style>
#mine-3d-container {
    background: linear-gradient(135deg, #87CEEB 0%, #E0F6FF 100%);
}

.card {
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.9);
}

#loading-container {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.spinner-border {
    animation-duration: 1s;
}

/* Custom scrollbar for panels */
.card-body::-webkit-scrollbar {
    width: 4px;
}

.card-body::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.card-body::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
}

.card-body::-webkit-scrollbar-thumb:hover {
    background: #555;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .position-absolute .card {
        width: 200px !important;
    }
    
    .card-body {
        font-size: 0.875rem;
    }
}
</style>
@endpush

@push('scripts')
<!-- 3D viewer bundle -->
@vite(['resources/js/simple-mine3d.js'])

<!-- Görüntüleyiciyi başlatan script -->
<script type="module">
    document.addEventListener('DOMContentLoaded', () => {
        const containerId = 'mine-3d-container';
        const mineId = window.mineData.id;
        let viewer = null;

        try {
            if (typeof SimpleMine3DViewer === 'undefined') {
                console.error('SimpleMine3DViewer global bulunamadı. Vite derlemesi yüklenmemiş olabilir.');
                return;
            }
            console.log(`[Bootstrapper] SimpleMine3DViewer başlatılıyor (mine #${mineId})`);
            viewer = new SimpleMine3DViewer(containerId, mineId);
            
            // Global olarak erişilebilir yap
            window.mineViewer = viewer;
            
        } catch (e) {
            console.error('3D başlatma hatası:', e);
        }

        // UI Event Handlers
        setupUIEventHandlers(viewer);
    });

    function setupUIEventHandlers(viewer) {
        if (!viewer) return;

        // Yol çizim butonu
        const drawPathBtn = document.getElementById('draw-path-btn');
        const pathBtnText = document.getElementById('path-btn-text');
        const pathControls = document.getElementById('path-controls');
        const finishPathBtn = document.getElementById('finish-path-btn');
        const cancelPathBtn = document.getElementById('cancel-path-btn');

        let isDrawingMode = false;

        drawPathBtn?.addEventListener('click', () => {
            if (!isDrawingMode) {
                startPathDrawingMode();
            } else {
                stopPathDrawingMode();
            }
        });

        finishPathBtn?.addEventListener('click', () => {
            viewer.completeCurrentPath();
            stopPathDrawingMode();
        });

        cancelPathBtn?.addEventListener('click', () => {
            viewer.stopPathDrawing();
            stopPathDrawingMode();
        });

        function startPathDrawingMode() {
            isDrawingMode = true;
            pathBtnText.textContent = 'Çizimi Durdur';
            drawPathBtn.classList.remove('btn-outline-warning');
            drawPathBtn.classList.add('btn-warning');
            pathControls.style.display = 'block';
            
            viewer.startPathDrawing();
        }

        function stopPathDrawingMode() {
            isDrawingMode = false;
            pathBtnText.textContent = 'Yol Çiz';
            drawPathBtn.classList.remove('btn-warning');
            drawPathBtn.classList.add('btn-outline-warning');
            pathControls.style.display = 'none';
            
            if (viewer.isPathDrawingMode) {
                viewer.stopPathDrawing();
            }
        }

        // Kamera sıfırlama
        document.getElementById('reset-camera-btn')?.addEventListener('click', () => {
            if (viewer.camera && viewer.controls) {
                viewer.camera.position.set(15, 5, 25);
                viewer.controls.target.set(0, -3, 0);
                viewer.controls.update();
            }
        });

        // Diğer butonlar için placeholder event handler'lar
        document.getElementById('add-layer-btn')?.addEventListener('click', () => {
            alert('Katman ekleme özelliği yakında gelecek!');
        });

        document.getElementById('add-model-btn')?.addEventListener('click', () => {
            alert('Model ekleme özelliği yakında gelecek!');
        });

        document.getElementById('export-scene-btn')?.addEventListener('click', () => {
            alert('Sahne dışa aktarma özelliği yakında gelecek!');
        });

        // Klavye kısayolları
        document.addEventListener('keydown', (event) => {
            if (event.key === 'p' || event.key === 'P') {
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    drawPathBtn.click();
                }
            }
        });
    }
</script>
@endpush
@endsection
