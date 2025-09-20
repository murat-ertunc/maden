// Basit 3D Maden Görüntüleyici (ESM sürümü)
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Yol çizimi için yardımcı sınıf
class MinePathDrawer {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.isDrawing = false;
        this.currentPath = [];
        this.tempPath = null;
        this.paths = new Map(); // ID -> Path objesi
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -2); // Y=-2 seviyesinde (zemin altında)
        
        this.drawingCallbacks = {
            onPathStart: null,
            onPathUpdate: null,
            onPathComplete: null
        };
    }

    startDrawing(callbacks = {}) {
        this.isDrawing = true;
        this.currentPath = [];
        this.drawingCallbacks = { ...this.drawingCallbacks, ...callbacks };
        console.log('[MinePathDrawer] Yol çizimi başladı');
    }

    stopDrawing() {
        if (this.isDrawing && this.currentPath.length > 1) {
            this.completePath();
        }
        this.isDrawing = false;
        this.currentPath = [];
        this.removeTempPath();
        console.log('[MinePathDrawer] Yol çizimi durdu');
    }

    handleClick(event) {
        if (!this.isDrawing) return;

        this.updateMousePosition(event);
        const point = this.getGroundIntersection();
        
        if (point) {
            this.currentPath.push(point);
            this.updateTempPath();
            
            if (this.drawingCallbacks.onPathUpdate) {
                this.drawingCallbacks.onPathUpdate(this.currentPath);
            }
        }
    }

    handleMouseMove(event) {
        if (!this.isDrawing || this.currentPath.length === 0) return;

        this.updateMousePosition(event);
        const point = this.getGroundIntersection();
        
        if (point) {
            const previewPath = [...this.currentPath, point];
            this.updateTempPath(previewPath);
        }
    }

    updateMousePosition(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    getGroundIntersection() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersection = new THREE.Vector3();
        const intersected = this.raycaster.ray.intersectPlane(this.groundPlane, intersection);
        return intersected ? intersection : null;
    }

    updateTempPath(pathPoints = null) {
        this.removeTempPath();
        
        const points = pathPoints || this.currentPath;
        if (points.length < 2) return;

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ 
            color: 0xff0000, 
            linewidth: 3,
            opacity: 0.8,
            transparent: true 
        });
        
        this.tempPath = new THREE.Line(geometry, material);
        this.scene.add(this.tempPath);
    }

    removeTempPath() {
        if (this.tempPath) {
            this.scene.remove(this.tempPath);
            this.tempPath.geometry.dispose();
            this.tempPath.material.dispose();
            this.tempPath = null;
        }
    }

    completePath() {
        if (this.currentPath.length < 2) return null;

        this.removeTempPath();
        
        if (this.drawingCallbacks.onPathComplete) {
            this.drawingCallbacks.onPathComplete(this.currentPath);
        }
        
        return this.currentPath;
    }

    createPath(pathData) {
        const { id, points, width = 3, height = 3, color = '#808080', type = 'tunnel' } = pathData;
        
        if (!points || points.length < 2) return null;

        const path = this.createPathMesh(points, width, height, color, type);
        path.userData = { id, type, pathData };
        
        this.paths.set(id, path);
        this.scene.add(path);
        
        console.log(`[MinePathDrawer] Yol oluşturuldu: ${id}`);
        return path;
    }

    createPathMesh(points, width, height, color, type) {
        const group = new THREE.Group();
        
        // Ana yol geometrisi - geliştirilmiş tüp
        const pathGeometry = this.createTubeGeometry(points, width, height);
        const material = this.createPathMaterial(color, type);
        
        const pathMesh = new THREE.Mesh(pathGeometry, material);
        pathMesh.castShadow = true;
        pathMesh.receiveShadow = true;
        group.add(pathMesh);

        // İç duvar malzemesi (tunnel için)
        if (type === 'tunnel') {
            const innerMaterial = new THREE.MeshPhongMaterial({
                color: new THREE.Color(color).multiplyScalar(0.8),
                transparent: true,
                opacity: 0.9,
                shininess: 10
            });
            const innerMesh = new THREE.Mesh(pathGeometry.clone(), innerMaterial);
            innerMesh.scale.set(0.95, 0.95, 0.95);
            group.add(innerMesh);
        }

        // Kenar çizgileri - daha ince ve yumuşak
        const edgesGeometry = new THREE.EdgesGeometry(pathGeometry);
        const edgesMaterial = new THREE.LineBasicMaterial({ 
            color: new THREE.Color(color).multiplyScalar(0.5),
            opacity: 0.6,
            transparent: true,
            linewidth: 1
        });
        const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
        group.add(edges);

        // Tip-spesifik eklemeler
        if (type === 'conveyor') {
            this.addConveyorBelt(group, points, width);
        } else if (type === 'rail') {
            this.addRailTracks(group, points, width);
        }

        return group;
    }

    createPathMaterial(color, type) {
        const baseColor = new THREE.Color(color);
        
        switch (type) {
            case 'tunnel':
                return new THREE.MeshPhongMaterial({
                    color: baseColor,
                    transparent: true,
                    opacity: 0.9,
                    shininess: 30,
                    specular: 0x444444
                });
            
            case 'road':
                return new THREE.MeshLambertMaterial({
                    color: baseColor.multiplyScalar(0.7),
                    transparent: true,
                    opacity: 0.95
                });
            
            case 'rail':
                return new THREE.MeshPhongMaterial({
                    color: baseColor,
                    metalness: 0.7,
                    roughness: 0.3,
                    transparent: true,
                    opacity: 0.9
                });
            
            case 'conveyor':
                return new THREE.MeshPhongMaterial({
                    color: baseColor,
                    transparent: true,
                    opacity: 0.8,
                    shininess: 50,
                    specular: 0x888888
                });
            
            default:
                return new THREE.MeshLambertMaterial({
                    color: baseColor,
                    transparent: true,
                    opacity: 0.9
                });
        }
    }

    createTubeGeometry(points, width, height) {
        if (points.length < 2) return new THREE.BoxGeometry(1, 1, 1);

        // Daha yumuşak curve ve daha fazla segment
        const curve = new THREE.CatmullRomCurve3(points);
        curve.tension = 0.3; // Yumuşak geçişler
        
        // Segment sayısını artır
        const tubularSegments = Math.max(points.length * 4, 16);
        const radialSegments = 12; // Daha dairesel kesit
        
        // Eliptik kesit için özel geometri
        const tubeGeometry = new THREE.TubeGeometry(
            curve, 
            tubularSegments, 
            Math.max(width, height) / 2, 
            radialSegments, 
            false
        );
        
        // Eliptik şekil için vertex'leri düzenle
        const positions = tubeGeometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];
            
            // Eliptik ölçekleme
            const distance = Math.sqrt(x * x + z * z);
            if (distance > 0) {
                const angle = Math.atan2(z, x);
                const ellipseRadius = (width * height) / Math.sqrt(
                    (height * Math.cos(angle)) ** 2 + (width * Math.sin(angle)) ** 2
                );
                const scale = ellipseRadius / (Math.max(width, height) / 2);
                positions[i] = x * scale;
                positions[i + 2] = z * scale;
            }
        }
        
        tubeGeometry.attributes.position.needsUpdate = true;
        tubeGeometry.computeVertexNormals();
        
        return tubeGeometry;
    }

    addConveyorBelt(group, points, width) {
        // Konveyör bandı efekti
        const curve = new THREE.CatmullRomCurve3(points);
        const beltGeometry = new THREE.TubeGeometry(curve, points.length * 2, width / 3, 8, false);
        const beltMaterial = new THREE.MeshPhongMaterial({
            color: 0x333333,
            shininess: 100,
            transparent: true,
            opacity: 0.8
        });
        
        const belt = new THREE.Mesh(beltGeometry, beltMaterial);
        belt.position.y += 0.1; // Tünelin üstünde
        group.add(belt);
    }

    addRailTracks(group, points, width) {
        // Ray izi efekti
        const curve = new THREE.CatmullRomCurve3(points);
        
        // Sol ray
        const leftRailGeometry = new THREE.TubeGeometry(curve, points.length * 4, 0.05, 6, false);
        const railMaterial = new THREE.MeshPhongMaterial({
            color: 0x666666,
            metalness: 0.8,
            roughness: 0.2
        });
        
        const leftRail = new THREE.Mesh(leftRailGeometry, railMaterial.clone());
        leftRail.position.x -= width / 3;
        leftRail.position.y += 0.05;
        group.add(leftRail);
        
        // Sağ ray
        const rightRail = new THREE.Mesh(leftRailGeometry.clone(), railMaterial.clone());
        rightRail.position.x += width / 3;
        rightRail.position.y += 0.05;
        group.add(rightRail);
    }

    removePath(id) {
        const path = this.paths.get(id);
        if (path) {
            this.scene.remove(path);
            path.traverse((child) => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(material => material.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
            });
            this.paths.delete(id);
            console.log(`[MinePathDrawer] Yol silindi: ${id}`);
        }
    }

    clearAllPaths() {
        for (const [id, path] of this.paths) {
            this.removePath(id);
        }
        console.log('[MinePathDrawer] Tüm yollar silindi');
    }

    getPath(id) {
        return this.paths.get(id);
    }

    getAllPaths() {
        return Array.from(this.paths.values());
    }
}

// Obje seçimi ve düzenleme için yardımcı sınıf
class ObjectSelector {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.selectedObject = null;
        this.selectableObjects = new Set();
        this.highlightMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xff4444, 
            transparent: true, 
            opacity: 0.3,
            depthTest: false
        });
        this.outlineColor = 0xff0000;
        
        this.callbacks = {
            onObjectSelect: null,
            onObjectDeselect: null,
            onObjectDelete: null
        };
    }

    setCallbacks(callbacks) {
        this.callbacks = { ...this.callbacks, ...callbacks };
    }

    addSelectableObject(object, data = {}) {
        object.userData.selectable = true;
        object.userData.objectData = data;
        this.selectableObjects.add(object);
    }

    removeSelectableObject(object) {
        this.selectableObjects.delete(object);
        if (this.selectedObject === object) {
            this.deselectObject();
        }
    }

    handleClick(event) {
        this.updateMousePosition(event);
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const selectableArray = Array.from(this.selectableObjects);
        const intersects = this.raycaster.intersectObjects(selectableArray, true);

        if (intersects.length > 0) {
            // En yakın selectable objeyi bul
            let targetObject = null;
            for (const intersect of intersects) {
                let obj = intersect.object;
                while (obj && !obj.userData.selectable) {
                    obj = obj.parent;
                }
                if (obj && this.selectableObjects.has(obj)) {
                    targetObject = obj;
                    break;
                }
            }

            if (targetObject) {
                this.selectObject(targetObject);
            }
        } else {
            this.deselectObject();
        }
    }

    updateMousePosition(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    selectObject(object) {
        if (this.selectedObject === object) return;

        this.deselectObject();
        this.selectedObject = object;
        
        // Highlight efekti ekle
        this.addHighlight(object);
        
        if (this.callbacks.onObjectSelect) {
            this.callbacks.onObjectSelect(object, object.userData.objectData);
        }
    }

    deselectObject() {
        if (this.selectedObject) {
            this.removeHighlight(this.selectedObject);
            
            if (this.callbacks.onObjectDeselect) {
                this.callbacks.onObjectDeselect(this.selectedObject);
            }
            
            this.selectedObject = null;
        }
    }

    deleteSelectedObject() {
        if (this.selectedObject) {
            const objectToDelete = this.selectedObject;
            this.deselectObject();
            
            if (this.callbacks.onObjectDelete) {
                this.callbacks.onObjectDelete(objectToDelete);
            }
        }
    }

    addHighlight(object) {
        // Outline efekti için edge geometry oluştur
        object.traverse((child) => {
            if (child.isMesh && child.geometry) {
                const edges = new THREE.EdgesGeometry(child.geometry);
                const outline = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ 
                    color: this.outlineColor,
                    linewidth: 3
                }));
                outline.name = 'highlight_outline';
                child.add(outline);
            }
        });
    }

    removeHighlight(object) {
        object.traverse((child) => {
            const outline = child.getObjectByName('highlight_outline');
            if (outline) {
                child.remove(outline);
                outline.geometry.dispose();
                outline.material.dispose();
            }
        });
    }

    getSelectedObject() {
        return this.selectedObject;
    }

    clearSelection() {
        this.deselectObject();
    }
}

class SimpleMine3DViewer {
    constructor(containerId, mineId) {
        console.log(`%c[SimpleMine3DViewer] Constructor called`, 'color: blue; font-weight: bold;');
        console.log('[SimpleMine3DViewer] Parameters:', { containerId, mineId });
        
        this.containerId = containerId;
        this.mineId = mineId;
        this.container = document.getElementById(containerId);
        
        console.log('[SimpleMine3DViewer] Container element:', this.container);
        
        if (!this.container) {
            const error = `Container with id "${containerId}" not found`;
            console.error('[SimpleMine3DViewer]', error);
            throw new Error(error);
        }

        console.log('[SimpleMine3DViewer] THREE.js (ESM) version:', THREE.REVISION);

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.pathDrawer = null;
        this.isPathDrawingMode = false;
        this.selectedObject = null;
        this.objectSelector = null;
        
        console.log('[SimpleMine3DViewer] Starting initialization...');
        this.init();
    }

    async init() {
        try {
            console.log('%c[SimpleMine3DViewer] Initializing 3D system...', 'color: green; font-weight: bold;');
            
            // Hide loading screen and show 3D container
            const loadingContainer = document.getElementById('loading-container');
            if (loadingContainer) {
                loadingContainer.style.opacity = '0';
                loadingContainer.style.pointerEvents = 'none';
                loadingContainer.style.transition = 'opacity .3s';
                setTimeout(()=>{ if(loadingContainer) loadingContainer.style.display='none'; },350);
            }
            this.container.style.display = 'block';

            // Container size check
            console.log('[SimpleMine3DViewer] Container dimensions:', {
                clientWidth: this.container.clientWidth,
                clientHeight: this.container.clientHeight,
                offsetWidth: this.container.offsetWidth,
                offsetHeight: this.container.offsetHeight
            });
            
            if (this.container.clientWidth === 0 || this.container.clientHeight === 0) {
                console.warn('[SimpleMine3DViewer] Container has zero dimensions, using default sizes');
            }
            
            // Create scene
            console.log('[SimpleMine3DViewer] Creating scene...');
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x87CEEB);
            console.log('[SimpleMine3DViewer] Scene created:', this.scene);
            
            // Create camera
            console.log('[SimpleMine3DViewer] Creating camera...');
            const aspect = this.container.clientWidth / this.container.clientHeight || 16/9;
            this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 500);
            this.camera.position.set(15, 5, 25);
            this.camera.lookAt(0, -2, 0); // Zemin altına odaklan
            console.log('[SimpleMine3DViewer] Camera created:', {
                fov: this.camera.fov,
                aspect: this.camera.aspect,
                position: this.camera.position,
                near: this.camera.near,
                far: this.camera.far
            });
            
            // Create renderer
            console.log('[SimpleMine3DViewer] Creating renderer...');
            this.renderer = new THREE.WebGLRenderer({ 
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            });
            const width = this.container.clientWidth || 800;
            const height = this.container.clientHeight || 600;
            this.renderer.setSize(width, height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            // Gelişmiş gölge ayarları
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.renderer.shadowMap.autoUpdate = true;
            
            // Ton mapping ve renk uzayı
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.2;
            this.renderer.outputColorSpace = THREE.SRGBColorSpace;
            
            // Performans ayarları
            this.renderer.domElement.style.width = '100%';
            this.renderer.domElement.style.height = '100%';
            this.renderer.domElement.style.display = 'block';
            this.renderer.domElement.style.position = 'relative';
            
            console.log('[SimpleMine3DViewer] Renderer created:', {
                width,
                height,
                shadowMap: this.renderer.shadowMap.enabled,
                toneMapping: this.renderer.toneMapping,
                domElement: this.renderer.domElement
            });
            
            // Append to container
            console.log('[SimpleMine3DViewer] Appending renderer to container...');
            this.container.appendChild(this.renderer.domElement);
            console.log('[SimpleMine3DViewer] Renderer appended successfully');
            
            // Add lights
            console.log('[SimpleMine3DViewer] Adding lights...');
            this.addLights();
            
            // Add basic geometry for testing
            console.log('[SimpleMine3DViewer] Adding test geometry...');
            this.addTestGeometry();
            
            // Add controls if available
            console.log('[SimpleMine3DViewer] Setting up controls...');
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.enableZoom = true;
            this.controls.enablePan = true;
            this.controls.enableRotate = true;
            
            // Kamera limitleri
            this.controls.maxPolarAngle = Math.PI; // Tamamen alttan bakabilir
            this.controls.minDistance = 2;
            this.controls.maxDistance = 200;
            
            // Otomatik rotate
            this.controls.autoRotate = false;
            this.controls.autoRotateSpeed = 0.5;
            
            // Target - zemin altındaki yollara odaklan
            this.controls.target.set(0, -3, 0);
            this.controls.update();
            
            console.log('[SimpleMine3DViewer] OrbitControls initialized:', this.controls);
            
            // Initialize path drawer
            console.log('[SimpleMine3DViewer] Initializing path drawer...');
            this.pathDrawer = new MinePathDrawer(this.scene, this.camera, this.renderer);
            this.setupPathDrawingEvents();
            
            // Initialize object selector
            console.log('[SimpleMine3DViewer] Initializing object selector...');
            this.objectSelector = new ObjectSelector(this.scene, this.camera, this.renderer);
            this.setupObjectSelection();
            
            // Load mine data
            console.log('[SimpleMine3DViewer] Loading mine data...');
            await this.loadMineData();
            
            // Start render loop
            console.log('[SimpleMine3DViewer] Starting render loop...');
            this.animate();
            
            console.log('%c[SimpleMine3DViewer] Initialization completed successfully!', 'color: green; font-weight: bold; font-size: 14px;');
            // Final safety hide (in case earlier hide didn't work)
            const lc2 = document.getElementById('loading-container');
            if (lc2 && lc2.style.display !== 'none') {
                console.log('[SimpleMine3DViewer] Forcing loading container hide at end');
                lc2.remove();
            }
            
        } catch (error) {
            console.error('%c[SimpleMine3DViewer] Initialization failed:', 'color: red; font-weight: bold;', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
            throw error;
        }
    }
    
    addLights() {
        console.log('[SimpleMine3DViewer] Adding lights to scene...');
        
        // Ambient light - daha yumuşak
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);
        console.log('[SimpleMine3DViewer] Ambient light added:', ambientLight);
        
        // Directional light - ana güneş ışığı
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 50, 50);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 4096;
        directionalLight.shadow.mapSize.height = 4096;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        directionalLight.shadow.camera.left = -50;
        directionalLight.shadow.camera.right = 50;
        directionalLight.shadow.camera.top = 50;
        directionalLight.shadow.camera.bottom = -50;
        this.scene.add(directionalLight);
        console.log('[SimpleMine3DViewer] Directional light added:', directionalLight);
        
        // Hemisphere light - daha doğal ışıklandırma
        const hemisphereLight = new THREE.HemisphereLight(0x87CEEB, 0x8B4513, 0.4);
        hemisphereLight.position.set(0, 20, 0);
        this.scene.add(hemisphereLight);
        console.log('[SimpleMine3DViewer] Hemisphere light added:', hemisphereLight);
        
        // Point light - maden içi aydınlatma simülasyonu
        const pointLight = new THREE.PointLight(0xffaa00, 0.6, 30);
        pointLight.position.set(0, -1, 0);
        pointLight.castShadow = true;
        this.scene.add(pointLight);
        console.log('[SimpleMine3DViewer] Point light added:', pointLight);
        
        console.log('[SimpleMine3DViewer] All lights added successfully');
    }
    
    addTestGeometry() {
        console.log('[SimpleMine3DViewer] Adding test geometry...');
        
        try {
            // Ground plane - daha gerçekçi toprak/çim malzemesi
            console.log('[SimpleMine3DViewer] Creating ground plane...');
            const planeGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
            
            // Daha gerçekçi malzeme
            const planeMaterial = new THREE.MeshLambertMaterial({ 
                color: 0x567d46,
                transparent: false
            });
            
            const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.rotation.x = -Math.PI / 2;
            plane.position.y = -5;
            plane.receiveShadow = true;
            this.scene.add(plane);
            console.log('[SimpleMine3DViewer] Ground plane added:', plane);
            
            // Underground layer - toprak tabakası
            const undergroundGeometry = new THREE.PlaneGeometry(100, 100);
            const undergroundMaterial = new THREE.MeshLambertMaterial({ 
                color: 0x8B4513,
                transparent: true,
                opacity: 0.8
            });
            const underground = new THREE.Mesh(undergroundGeometry, undergroundMaterial);
            underground.rotation.x = -Math.PI / 2;
            underground.position.y = -10;
            underground.receiveShadow = true;
            this.scene.add(underground);
            
            console.log('[SimpleMine3DViewer] Test geometry added successfully');
            console.log('[SimpleMine3DViewer] Scene children count:', this.scene.children.length);
            
        } catch (error) {
            console.error('[SimpleMine3DViewer] Error adding test geometry:', error);
            throw error;
        }
    }
    
    async loadMineData() {
        console.log('[SimpleMine3DViewer] Loading mine data for mine ID:', this.mineId);
        
        try {
            const url = `/api/mines/${this.mineId}/scene-data`;
            console.log('[SimpleMine3DViewer] Fetching from URL:', url);
            
            const response = await fetch(url);
            console.log('[SimpleMine3DViewer] Fetch response:', {
                ok: response.ok,
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries())
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('[SimpleMine3DViewer] Mine data loaded successfully:', data);
            
            // Process mine data here
            if (data && data.models) {
                console.log('[SimpleMine3DViewer] Processing', data.models.length, 'models');
            }
            if (data && data.layers) {
                console.log('[SimpleMine3DViewer] Processing', data.layers.length, 'layers');
            }
            if (data && data.paths) {
                console.log('[SimpleMine3DViewer] Processing', data.paths.length, 'paths');
                this.loadPaths(data.paths);
            }
            
        } catch (error) {
            console.warn('[SimpleMine3DViewer] Could not load mine data:', {
                message: error.message,
                stack: error.stack
            });
            console.log('[SimpleMine3DViewer] Continuing with test geometry only');
        }
    }

    loadPaths(paths) {
        console.log('[SimpleMine3DViewer] Loading paths:', paths);
        
        paths.forEach(pathData => {
            if (pathData.path_points && pathData.path_points.length > 1) {
                const points = pathData.path_points.map(p => new THREE.Vector3(p.x, p.y, p.z));
                
                const path = this.pathDrawer.createPath({
                    id: pathData.id,
                    points: points,
                    width: pathData.width || 3,
                    height: pathData.height || 3,
                    color: pathData.color || '#808080',
                    type: pathData.type || 'tunnel'
                });

                // Objeyi seçilebilir yap
                if (path && this.objectSelector) {
                    this.objectSelector.addSelectableObject(path, {
                        id: pathData.id,
                        type: 'path',
                        name: pathData.name,
                        pathType: pathData.type,
                        width: pathData.width,
                        height: pathData.height,
                        color: pathData.color,
                        material: pathData.material,
                        points: pathData.path_points,
                        length: this.calculatePathLength(pathData.path_points)
                    });
                }
            }
        });
    }

    calculatePathLength(points) {
        if (!points || points.length < 2) return 0;

        let totalLength = 0;
        for (let i = 1; i < points.length; i++) {
            const p1 = points[i - 1];
            const p2 = points[i];
            
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dz = p2.z - p1.z;
            
            totalLength += Math.sqrt(dx * dx + dy * dy + dz * dz);
        }

        return totalLength;
    }
    
    animate() {
        const frameStart = performance.now();
        
        requestAnimationFrame(() => this.animate());
        
        try {
            if (this.controls) {
                this.controls.update();
            }
            
            if (this.renderer && this.scene && this.camera) {
                this.renderer.render(this.scene, this.camera);
            } else {
                console.error('[SimpleMine3DViewer] Missing components for rendering:', {
                    renderer: !!this.renderer,
                    scene: !!this.scene,
                    camera: !!this.camera
                });
            }
            
        } catch (error) {
            console.error('[SimpleMine3DViewer] Render error:', error);
        }
        
        const frameEnd = performance.now();
        const frameTime = frameEnd - frameStart;
        
        // Log performance every 60 frames (roughly 1 second at 60fps)
        if (!this.frameCount) this.frameCount = 0;
        this.frameCount++;
        
        if (this.frameCount % 60 === 0) {
            console.log(`[SimpleMine3DViewer] Performance - Frame ${this.frameCount}, Frame time: ${frameTime.toFixed(2)}ms`);
        }
    }
    
    destroy() {
        if (this.renderer) {
            this.container.removeChild(this.renderer.domElement);
            this.renderer.dispose();
        }
    }

    // Yol çizimi event handler'ları
    setupPathDrawingEvents() {
        const canvas = this.renderer.domElement;
        
        this.boundHandlers = {
            click: (event) => this.handleCanvasClick(event),
            mousemove: (event) => this.handleCanvasMouseMove(event),
            keydown: (event) => this.handleKeyDown(event)
        };

        canvas.addEventListener('click', this.boundHandlers.click);
        canvas.addEventListener('mousemove', this.boundHandlers.mousemove);
        document.addEventListener('keydown', this.boundHandlers.keydown);
    }

    handleCanvasClick(event) {
        if (this.isPathDrawingMode) {
            event.stopPropagation();
            this.pathDrawer.handleClick(event);
        } else {
            // Normal mod - obje seçimi
            this.objectSelector.handleClick(event);
        }
    }

    handleCanvasMouseMove(event) {
        if (this.isPathDrawingMode) {
            this.pathDrawer.handleMouseMove(event);
        }
    }

    handleKeyDown(event) {
        if (event.key === 'Escape' && this.isPathDrawingMode) {
            this.stopPathDrawing();
        } else if (event.key === 'Enter' && this.isPathDrawingMode) {
            this.completeCurrentPath();
        } else if (event.key === 'Delete' || event.key === 'Backspace') {
            // Seçili objeyi sil
            if (this.objectSelector.getSelectedObject()) {
                this.objectSelector.deleteSelectedObject();
            }
        }
    }

    // Object selection setup
    setupObjectSelection() {
        this.objectSelector.setCallbacks({
            onObjectSelect: (object, data) => this.onObjectSelected(object, data),
            onObjectDeselect: (object) => this.onObjectDeselected(object),
            onObjectDelete: (object) => this.onObjectDelete(object)
        });
    }

    onObjectSelected(object, data) {
        console.log('[SimpleMine3DViewer] Object selected:', data);
        this.selectedObject = object;
        this.showObjectInfo(data);
    }

    onObjectDeselected(object) {
        console.log('[SimpleMine3DViewer] Object deselected');
        this.selectedObject = null;
        this.hideObjectInfo();
    }

    async onObjectDelete(object) {
        console.log('[SimpleMine3DViewer] Deleting object:', object.userData.objectData);
        
        const data = object.userData.objectData;
        if (data && data.id && data.type === 'path') {
            try {
                // Sunucudan sil
                const response = await fetch(`/api/mines/${this.mineId}/paths/${data.id}`, {
                    method: 'DELETE',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // 3D sahneden kaldır
                    this.pathDrawer.removePath(data.id);
                    this.objectSelector.removeSelectableObject(object);
                    console.log('[SimpleMine3DViewer] Path deleted successfully');
                } else {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
            } catch (error) {
                console.error('[SimpleMine3DViewer] Error deleting path:', error);
                this.showError('Yol silinemedi: ' + error.message);
            }
        }
    }

    // Yol çizimi kontrol metodları
    startPathDrawing() {
        this.isPathDrawingMode = true;
        this.controls.enabled = false; // OrbitControls'u devre dışı bırak
        
        this.pathDrawer.startDrawing({
            onPathStart: () => console.log('[SimpleMine3DViewer] Yol çizimi başladı'),
            onPathUpdate: (points) => console.log('[SimpleMine3DViewer] Yol güncellendi, nokta sayısı:', points.length),
            onPathComplete: (points) => this.onPathDrawingComplete(points)
        });
        
        // UI feedback
        this.showPathDrawingUI(true);
        console.log('[SimpleMine3DViewer] Yol çizim modu aktif');
    }

    stopPathDrawing() {
        this.isPathDrawingMode = false;
        this.controls.enabled = true; // OrbitControls'u yeniden aktifleştir
        this.pathDrawer.stopDrawing();
        this.showPathDrawingUI(false);
        console.log('[SimpleMine3DViewer] Yol çizim modu pasif');
    }

    completeCurrentPath() {
        if (this.isPathDrawingMode) {
            const pathPoints = this.pathDrawer.completePath();
            if (pathPoints && pathPoints.length > 1) {
                this.stopPathDrawing();
            }
        }
    }

    onPathDrawingComplete(points) {
        console.log('[SimpleMine3DViewer] Yol çizimi tamamlandı:', points);
        
        // Yolu sunucuya kaydet
        this.savePathToServer(points).then((savedPath) => {
            if (savedPath) {
                // Geçici yolu kaldır ve kalıcı yolu ekle
                const path = this.pathDrawer.createPath({
                    id: savedPath.id,
                    points: points,
                    width: savedPath.width || 3,
                    height: savedPath.height || 3,
                    color: savedPath.color || '#808080',
                    type: savedPath.type || 'tunnel'
                });

                // Yeni yolu seçilebilir yap
                if (path && this.objectSelector) {
                    this.objectSelector.addSelectableObject(path, {
                        id: savedPath.id,
                        type: 'path',
                        name: savedPath.name,
                        pathType: savedPath.type,
                        width: savedPath.width,
                        height: savedPath.height,
                        color: savedPath.color,
                        material: savedPath.material,
                        points: points.map(p => ({ x: p.x, y: p.y, z: p.z })),
                        length: this.calculatePathLength(points.map(p => ({ x: p.x, y: p.y, z: p.z })))
                    });
                }
            }
        }).catch((error) => {
            console.error('[SimpleMine3DViewer] Yol kaydetme hatası:', error);
            // Hata durumunda kullanıcıya bilgi ver
            this.showError('Yol kaydedilemedi: ' + error.message);
        });
    }

    async savePathToServer(points) {
        try {
            const pathData = {
                mine_id: this.mineId,
                name: `Yol ${Date.now()}`,
                type: 'tunnel',
                path_points: points.map(p => ({ x: p.x, y: p.y, z: p.z })),
                width: 3.0,
                height: 3.0,
                color: '#808080',
                status: 'active'
            };

            const response = await fetch(`/api/mines/${this.mineId}/paths`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(pathData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            const savedPath = result.data || result;
            console.log('[SimpleMine3DViewer] Yol başarıyla kaydedildi:', savedPath);
            return savedPath;
        } catch (error) {
            console.error('[SimpleMine3DViewer] Yol kaydetme hatası:', error);
            throw error;
        }
    }

    showPathDrawingUI(show) {
        // UI feedback ekle
        const existingOverlay = document.getElementById('path-drawing-overlay');
        
        if (show && !existingOverlay) {
            const overlay = document.createElement('div');
            overlay.id = 'path-drawing-overlay';
            overlay.innerHTML = `
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                           background: rgba(0,0,0,0.8); color: white; padding: 20px; border-radius: 10px;
                           text-align: center; z-index: 1000;">
                    <h5>Yol Çizim Modu</h5>
                    <p>Yol noktalarını tıklayarak belirleyin</p>
                    <small>Enter: Tamamla | Escape: İptal</small>
                </div>
            `;
            this.container.appendChild(overlay);
        } else if (!show && existingOverlay) {
            existingOverlay.remove();
        }
    }

    showError(message) {
        // Basit error gösterimi
        const errorEl = document.getElementById('error-content');
        if (errorEl) {
            errorEl.textContent = message;
            const modal = new bootstrap.Modal(document.getElementById('errorModal'));
            modal.show();
        } else {
            alert(message);
        }
    }

    showObjectInfo(data) {
        const panel = document.getElementById('object-info-panel');
        const content = document.getElementById('object-info-content');
        
        if (panel && content) {
            let infoHtml = `
                <h6 class="mb-2">${data.name || 'Seçili Obje'}</h6>
                <div class="mb-2">
                    <small class="text-muted">Tip:</small><br>
                    <span class="badge bg-primary">${this.getTypeDisplayName(data.pathType)}</span>
                </div>
            `;

            if (data.type === 'path') {
                infoHtml += `
                    <div class="mb-2">
                        <small class="text-muted">Fiziksel Özellikler:</small><br>
                        <div class="row">
                            <div class="col-6"><small>Genişlik: ${data.width}m</small></div>
                            <div class="col-6"><small>Yükseklik: ${data.height}m</small></div>
                        </div>
                        <small>Uzunluk: ${data.length.toFixed(2)}m</small><br>
                        <small>Malzeme: ${data.material || 'N/A'}</small>
                    </div>
                    <div class="mb-2">
                        <small class="text-muted">Renk:</small><br>
                        <span class="badge" style="background-color: ${data.color}; color: white;">${data.color}</span>
                    </div>
                    <div class="mb-2">
                        <small class="text-muted">Nokta Sayısı:</small><br>
                        <span>${data.points.length} nokta</span>
                    </div>
                    <div class="mb-2">
                        <small class="text-muted">Segmentler:</small><br>
                `;

                // Her segment için uzunluk hesapla
                for (let i = 1; i < data.points.length; i++) {
                    const p1 = data.points[i - 1];
                    const p2 = data.points[i];
                    const dx = p2.x - p1.x;
                    const dy = p2.y - p1.y;
                    const dz = p2.z - p1.z;
                    const segmentLength = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    
                    infoHtml += `<small>Segment ${i}: ${segmentLength.toFixed(2)}m</small><br>`;
                }

                infoHtml += `
                    </div>
                    <div class="d-grid gap-1">
                        <button class="btn btn-outline-warning btn-sm" onclick="window.mineViewer.editSelectedObject()">
                            <i class="fas fa-edit"></i> Düzenle
                        </button>
                        <button class="btn btn-outline-danger btn-sm" onclick="window.mineViewer.deleteSelectedObject()">
                            <i class="fas fa-trash"></i> Sil
                        </button>
                    </div>
                `;
            }

            content.innerHTML = infoHtml;
            panel.style.display = 'block';
        }
    }

    hideObjectInfo() {
        const panel = document.getElementById('object-info-panel');
        if (panel) {
            panel.style.display = 'none';
        }
    }

    getTypeDisplayName(type) {
        const types = {
            tunnel: 'Tünel',
            road: 'Yol',
            rail: 'Ray',
            conveyor: 'Konveyör'
        };
        return types[type] || type;
    }

    editSelectedObject() {
        if (this.selectedObject) {
            const data = this.selectedObject.userData.objectData;
            console.log('[SimpleMine3DViewer] Editing object:', data);
            // TODO: Edit modal açılabilir
            alert('Düzenleme özelliği yakında gelecek!');
        }
    }

    deleteSelectedObject() {
        if (this.selectedObject) {
            if (confirm('Bu objeyi silmek istediğinizden emin misiniz?')) {
                this.objectSelector.deleteSelectedObject();
            }
        }
    }
}

// Global olarak erişilebilir yap
window.SimpleMine3DViewer = SimpleMine3DViewer;
