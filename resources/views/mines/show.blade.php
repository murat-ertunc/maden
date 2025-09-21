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
            
            <!-- Kamera Kontrolleri -->
            <div class="d-flex align-items-center me-3">
                <div class="me-4">
                    <small class="text-muted d-block mb-1">Kamera Pozisyonu</small>
                    <div class="d-flex gap-2">
                        <div class="text-center" style="min-width: 60px;">
                            <label class="form-label text-warning mb-1" style="font-size: 0.75rem;">X</label>
                            <input type="range" id="camera-x" class="form-range" min="-50" max="50" value="15" step="1"
                                   style="width: 60px; height: 20px;">
                            <small class="text-light d-block" id="camera-x-value" style="font-size: 0.7rem;">15</small>
                        </div>
                        <div class="text-center" style="min-width: 60px;">
                            <label class="form-label text-success mb-1" style="font-size: 0.75rem;">Y</label>
                            <input type="range" id="camera-y" class="form-range" min="-70" max="30" value="5" step="1"
                                   style="width: 60px; height: 20px;">
                            <small class="text-light d-block" id="camera-y-value" style="font-size: 0.7rem;">5</small>
                        </div>
                        <div class="text-center" style="min-width: 60px;">
                            <label class="form-label text-info mb-1" style="font-size: 0.75rem;">Z</label>
                            <input type="range" id="camera-z" class="form-range" min="-50" max="50" value="25" step="1"
                                   style="width: 60px; height: 20px;">
                            <small class="text-light d-block" id="camera-z-value" style="font-size: 0.7rem;">25</small>
                        </div>
                    </div>
                </div>
                
                <div class="me-4">
                    <small class="text-muted d-block mb-1">Zoom & Hız</small>
                    <div class="d-flex gap-2">
                        <div class="text-center" style="min-width: 70px;">
                            <label class="form-label text-primary mb-1" style="font-size: 0.75rem;">Zoom</label>
                            <input type="range" id="camera-zoom" class="form-range" min="2" max="1000" value="30" step="1"
                                   style="width: 70px; height: 20px;">
                            <small class="text-light d-block" id="camera-zoom-value" style="font-size: 0.7rem;">30</small>
                        </div>
                        <div class="text-center" style="min-width: 70px;">
                            <label class="form-label text-secondary mb-1" style="font-size: 0.75rem;">Hız</label>
                            <input type="range" id="camera-speed" class="form-range" min="0.1" max="2.0" value="1.0" step="0.1"
                                   style="width: 70px; height: 20px;">
                            <small class="text-light d-block" id="camera-speed-value" style="font-size: 0.7rem;">1.0</small>
                        </div>
                    </div>
                </div>
                
                <div class="text-center">
                    <button class="btn btn-outline-warning btn-sm mb-1" id="camera-reset-btn" title="Kamerayı Sıfırla">
                        <i class="fas fa-undo"></i>
                    </button>
                    <button class="btn btn-outline-info btn-sm" id="camera-auto-btn" title="Otomatik Döndür">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
                
                <div class="dropdown">
                    <button class="btn btn-outline-success btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <i class="fas fa-camera"></i> Presets
                    </button>
                    <ul class="dropdown-menu dropdown-menu-dark">
                        <li><a class="dropdown-item camera-preset" data-preset="default" href="#"><i class="fas fa-home me-2"></i>Varsayılan</a></li>
                        <li><a class="dropdown-item camera-preset" data-preset="overview" href="#"><i class="fas fa-eye me-2"></i>Genel Görünüm</a></li>
                        <li><a class="dropdown-item camera-preset" data-preset="side" href="#"><i class="fas fa-arrows-alt-h me-2"></i>Yan Görünüm</a></li>
                        <li><a class="dropdown-item camera-preset" data-preset="top" href="#"><i class="fas fa-arrows-alt-v me-2"></i>Üst Görünüm</a></li>
                        <li><a class="dropdown-item camera-preset" data-preset="underground" href="#"><i class="fas fa-hard-hat me-2"></i>Yeraltı</a></li>
                        <li><a class="dropdown-item camera-preset" data-preset="close" href="#"><i class="fas fa-search-plus me-2"></i>Yakın Plan</a></li>
                    </ul>
                </div>
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

        <!-- Mining Control Panel -->
        <div class="position-absolute top-0 start-0 m-3">
            <div class="card shadow-lg border-0" style="width: 280px; background: linear-gradient(145deg, #2a2a2a, #1a1a1a); color: #fff;">
                <div class="card-header py-3 border-0" style="background: linear-gradient(145deg, #ff6b00, #cc5500);">
                    <h6 class="mb-0 fw-bold">
                        <i class="fas fa-hard-hat me-2"></i>Maden Kontrol Paneli
                    </h6>
                </div>
                <div class="card-body py-3">
                    <div class="mb-3">
                        <h6 class="text-warning mb-2">
                            <i class="fas fa-tools me-2"></i>Çizim Araçları
                        </h6>
                        <div class="d-grid gap-2">
                            <button class="btn btn-outline-warning btn-sm mining-tool-btn" data-tool="tunnel">
                                <i class="fas fa-mountain me-2"></i>Tünel Kaz
                            </button>
                            <button class="btn btn-outline-info btn-sm mining-tool-btn" data-tool="road">
                                <i class="fas fa-road me-2"></i>Yol İnşa Et
                            </button>
                            <button class="btn btn-outline-success btn-sm mining-tool-btn" data-tool="rail">
                                <i class="fas fa-train me-2"></i>Ray Döşe
                            </button>
                            <button class="btn btn-outline-danger btn-sm mining-tool-btn" data-tool="conveyor">
                                <i class="fas fa-conveyor-belt me-2"></i>Konveyör Kur
                            </button>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <h6 class="text-success mb-2">
                            <i class="fas fa-eye me-2"></i>Görünüm Kontrolleri
                        </h6>
                        <div class="d-grid gap-1">
                            <button class="btn btn-outline-primary btn-sm" id="reset-camera-btn">
                                <i class="fas fa-video me-1"></i>Kamera Sıfırla
                            </button>
                        </div>
                    </div>
                    <div class="mb-3">
                        <h6 class="text-secondary mb-2">
                            <i class="fas fa-compress-alt me-2"></i>Path Basitleştirme
                        </h6>
                        <div class="small mb-1 d-flex justify-content-between">
                            <span>Tolerans</span>
                            <span id="simplify-value" class="fw-semibold">1.0x</span>
                        </div>
                        <input type="range" min="0" max="3" step="0.1" value="1" id="simplify-range" class="form-range">
                        <div class="form-text">Daha yüksek değer = daha agresif azaltma.</div>
                    </div>
                    
                    <div>
                        <h6 class="text-purple mb-2">
                            <i class="fas fa-save me-2"></i>Dosya İşlemleri
                        </h6>
                        <div class="d-grid gap-1">
                            <button class="btn btn-outline-success btn-sm" id="export-scene-btn">
                                <i class="fas fa-download me-1"></i>Sahne Dışa Aktar
                            </button>
                            <button class="btn btn-outline-warning btn-sm" id="save-path-btn" disabled>
                                <i class="fas fa-save me-1"></i>Path Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 3D Distance Display -->
        <div class="position-absolute top-0 end-0 m-3">
            <div class="card shadow-lg border-0" style="background: rgba(0,0,0,0.8); color: #fff; min-width: 200px;" id="distance-display" style="display: none;">
                <div class="card-body py-2 px-3">
                    <small class="text-warning">Mesafe</small>
                    <div class="h5 mb-0 text-light" id="distance-value">0.0m</div>
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

/* Path save button states */
#save-path-btn.dirty {
    animation: pulseDirty 1.2s infinite;
    border-color: #ff9800 !important;
    color: #ff9800 !important;
}

#save-path-btn.saved-once {
    box-shadow: 0 0 0 0 rgba(76,175,80,0.6);
    animation: savedFlash 0.4s ease;
}

@keyframes pulseDirty {
    0% { box-shadow: 0 0 0 0 rgba(255,152,0,0.5); }
    70% { box-shadow: 0 0 0 6px rgba(255,152,0,0); }
    100% { box-shadow: 0 0 0 0 rgba(255,152,0,0); }
}

@keyframes savedFlash {
    from { background-color: #4caf50; color: #fff; }
    to { background-color: transparent; }
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

        // Dispose & unsaved warning
        window.addEventListener('beforeunload', (e) => {
            if (window.mineViewer && window.mineViewer._dirtyPaths && window.mineViewer._dirtyPaths.size > 0) {
                e.preventDefault();
                e.returnValue = 'Kaydedilmemiş yol değişiklikleri var. Çıkmak istediğinize emin misiniz?';
            }
            if (window.mineViewer) window.mineViewer.dispose?.();
        });
    });

    function setupUIEventHandlers(viewer) {
        if (!viewer) return;

        // Yol çizim butonu
        const drawPathBtn = document.getElementById('draw-path-btn');
        const pathBtnText = document.getElementById('path-btn-text');
        const pathControls = document.getElementById('path-controls');
        const finishPathBtn = document.getElementById('finish-path-btn');
        const cancelPathBtn = document.getElementById('cancel-path-btn');
        const simplifyRange = document.getElementById('simplify-range');
        const simplifyValue = document.getElementById('simplify-value');

        // Global simplification multiplier
        viewer.pathSimplifyMultiplier = 1.0;
        simplifyRange?.addEventListener('input', () => {
            viewer.pathSimplifyMultiplier = parseFloat(simplifyRange.value);
            if (simplifyValue) simplifyValue.textContent = simplifyRange.value + 'x';
        });

        let isDrawingMode = false;

        drawPathBtn?.addEventListener('click', () => {
            if (!isDrawingMode) {
                startPathDrawingMode();
            } else {
                stopPathDrawingMode();
            }
        });

        finishPathBtn?.addEventListener('click', () => {
        // Path kaydet butonu (manuel save)
        const savePathBtn = document.getElementById('save-path-btn');
        savePathBtn?.addEventListener('click', async () => {
            if (!viewer || !viewer.selectedObject) return;
            const data = viewer.selectedObject.userData.objectData;
            if (!data || data.type !== 'path') return;
            savePathBtn.disabled = true;
            try {
                await viewer.updatePathToServer(data.id, { points: data.points });
            } catch (e) {
                console.error('Path manuel kaydetme hatası:', e);
            } finally {
                setTimeout(()=> savePathBtn.disabled = false, 800);
            }
        });
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

        // Yeni kamera kontrolleri
        setupCameraControls(viewer);

        // Diğer butonlar için placeholder event handler'lar
        document.getElementById('add-layer-btn')?.addEventListener('click', () => {
            alert('Katman ekleme özelliği yakında gelecek!');
        });

        document.getElementById('add-model-btn')?.addEventListener('click', () => {
            alert('Model ekleme özelliği yakında gelecek!');
        });

        document.getElementById('export-scene-btn')?.addEventListener('click', async () => {
            if (!viewer) return;
            try {
                const exportData = buildExportJSON(viewer);
                const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = `mine-scene-${Date.now()}.json`;
                a.click();
                URL.revokeObjectURL(a.href);
            } catch (e) {
                console.error('Export JSON hatası', e);
                alert('Export sırasında hata oluştu: ' + e.message);
            }
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

    function buildExportJSON(viewer) {
        // Paths
        const paths = [];
        viewer.pathDrawer?.paths?.forEach((group, id) => {
            const data = group.userData.pathData || {};
            paths.push({
                id,
                type: data.type,
                width: data.width,
                height: data.height,
                color: data.color,
                points: (data.points || data.path_points || []).map(p=>({x:p.x,y:p.y,z:p.z}))
            });
        });
        // Models (simplistic traversal)
        const models = [];
        if (viewer.objectCreator?.createdObjects) {
            viewer.objectCreator.createdObjects.forEach((obj, key) => {
                if (!obj) return;
                models.push({
                    id: key,
                    type: obj.userData?.objectData?.modelType || 'generic',
                    position: { x: obj.position.x, y: obj.position.y, z: obj.position.z },
                    rotation: { x: obj.rotation.x, y: obj.rotation.y, z: obj.rotation.z },
                    scale: { x: obj.scale.x, y: obj.scale.y, z: obj.scale.z }
                });
            });
        }
        // Selection snapshot
        const selected = [];
        if (viewer.objectSelector?.selectedObjects?.size) {
            viewer.objectSelector.selectedObjects.forEach(o => {
                selected.push(o.userData?.objectData?.id || o.userData?.objectData?.pathId || 'unknown');
            });
        }
        return {
            mineId: viewer.mineId,
            exportedAt: new Date().toISOString(),
            camera: viewer.camera ? {
                position: { x: viewer.camera.position.x, y: viewer.camera.position.y, z: viewer.camera.position.z },
                target: viewer.controls ? { x: viewer.controls.target.x, y: viewer.controls.target.y, z: viewer.controls.target.z } : null
            } : null,
            simplifyMultiplier: viewer.pathSimplifyMultiplier || 1.0,
            counts: { paths: paths.length, models: models.length },
            selection: selected,
            paths,
            models
        };
    }

    function setupCameraControls(viewer) {
        if (!viewer || !viewer.camera || !viewer.controls) return;

        // Range input referansları
        const cameraX = document.getElementById('camera-x');
        const cameraY = document.getElementById('camera-y');
        const cameraZ = document.getElementById('camera-z');
        const cameraZoom = document.getElementById('camera-zoom');
        const cameraSpeed = document.getElementById('camera-speed');
        
        const cameraXValue = document.getElementById('camera-x-value');
        const cameraYValue = document.getElementById('camera-y-value');
        const cameraZValue = document.getElementById('camera-z-value');
        const cameraZoomValue = document.getElementById('camera-zoom-value');
        const cameraSpeedValue = document.getElementById('camera-speed-value');

        const cameraResetBtn = document.getElementById('camera-reset-btn');
        const cameraAutoBtn = document.getElementById('camera-auto-btn');

        // İlk değerleri güncelle
        updateCameraUI();

        // X pozisyon kontrolü
        cameraX?.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            cameraXValue.textContent = value;
            viewer.camera.position.x = value;
            viewer.controls.update();
        });

        // Y pozisyon kontrolü
        cameraY?.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            cameraYValue.textContent = value;
            viewer.camera.position.y = value;
            viewer.controls.update();
        });

        // Z pozisyon kontrolü
        cameraZ?.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            cameraZValue.textContent = value;
            viewer.camera.position.z = value;
            viewer.controls.update();
        });

        // Zoom kontrolü (kamera mesafesi)
        cameraZoom?.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            cameraZoomValue.textContent = value;
            
            // Mevcut pozisyondan hedef pozisyona doğru normalize edilmiş vektör
            const direction = viewer.camera.position.clone().sub(viewer.controls.target).normalize();
            const newPosition = viewer.controls.target.clone().add(direction.multiplyScalar(value));
            
            viewer.camera.position.copy(newPosition);
            viewer.controls.update();
        });

        // Hız kontrolü
        cameraSpeed?.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            cameraSpeedValue.textContent = value;
            
            // OrbitControls hız ayarları
            viewer.controls.rotateSpeed = value;
            viewer.controls.zoomSpeed = value;
            viewer.controls.panSpeed = value;
            viewer.controls.dampingFactor = 0.1 * value; // Daha responsif
        });

        // Reset butonu
        cameraResetBtn?.addEventListener('click', () => {
            viewer.camera.position.set(15, 5, 25);
            viewer.controls.target.set(0, -3, 0);
            viewer.controls.update();
            updateCameraUI();
        });

        // Auto-rotate toggle
        let autoRotating = false;
        cameraAutoBtn?.addEventListener('click', () => {
            autoRotating = !autoRotating;
            viewer.controls.autoRotate = autoRotating;
            cameraAutoBtn.classList.toggle('btn-outline-info', !autoRotating);
            cameraAutoBtn.classList.toggle('btn-info', autoRotating);
        });

        // UI'yi kamera pozisyonuyla senkronize et
        function updateCameraUI() {
            if (cameraX && cameraXValue) {
                cameraX.value = Math.round(viewer.camera.position.x);
                cameraXValue.textContent = Math.round(viewer.camera.position.x);
            }
            if (cameraY && cameraYValue) {
                cameraY.value = Math.round(viewer.camera.position.y);
                cameraYValue.textContent = Math.round(viewer.camera.position.y);
            }
            if (cameraZ && cameraZValue) {
                cameraZ.value = Math.round(viewer.camera.position.z);
                cameraZValue.textContent = Math.round(viewer.camera.position.z);
            }
            
            // Zoom değerini hesapla (kamera ile target arası mesafe)
            if (cameraZoom && cameraZoomValue) {
                const distance = viewer.camera.position.distanceTo(viewer.controls.target);
                cameraZoom.value = Math.round(distance);
                cameraZoomValue.textContent = Math.round(distance);
            }
        }

        // Kamera hareket ettiğinde UI'yi güncelle
        viewer.controls.addEventListener('change', updateCameraUI);

        // Kamera preset'leri
        document.querySelectorAll('.camera-preset').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const preset = e.currentTarget.getAttribute('data-preset');
                viewer.setCameraPreset(preset);
                setTimeout(updateCameraUI, 100); // UI'yi güncelle
            });
        });
    }
</script>
@endpush
@endsection
