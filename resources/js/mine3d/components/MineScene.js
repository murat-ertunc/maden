import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class MineScene {
    constructor(container, configuration = {}) {
        this.container = container;
        this.config = {
            camera: {
                position: [0, 10, 20],
                target: [0, 0, 0],
                fov: 75,
                near: 0.1,
                far: 1000
            },
            scene: {
                background: '#87CEEB'
            },
            lighting: {
                ambient: 0.4,
                directional: 0.8
            },
            ...configuration
        };

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.raycaster = null;
        this.mouse = null;
        
        // Object management
        this.models = new Map();
        this.layers = new Map();
        this.selectedObject = null;
        
        // Event handlers
        this.onObjectSelect = null;
        this.onObjectHover = null;
        
        this.init();
    }

    init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createLights();
        this.createControls();
        this.createHelpers();
        this.setupEventListeners();
        this.startRenderLoop();
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.config.scene.background);
        
        // Fog ekle
        this.scene.fog = new THREE.Fog(this.config.scene.background, 50, 200);
    }

    createCamera() {
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(
            this.config.camera.fov,
            aspect,
            this.config.camera.near,
            this.config.camera.far
        );
        
        const [x, y, z] = this.config.camera.position;
        this.camera.position.set(x, y, z);
        
        const [tx, ty, tz] = this.config.camera.target;
        this.camera.lookAt(tx, ty, tz);
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        
        this.container.appendChild(this.renderer.domElement);
    }

    createLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, this.config.lighting.ambient);
        this.scene.add(ambientLight);
        
        // Directional light (güneş ışığı)
        const directionalLight = new THREE.DirectionalLight(0xffffff, this.config.lighting.directional);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -20;
        directionalLight.shadow.camera.right = 20;
        directionalLight.shadow.camera.top = 20;
        directionalLight.shadow.camera.bottom = -20;
        this.scene.add(directionalLight);
        
        // Hemisphere light (doğal aydınlatma)
        const hemisphereLight = new THREE.HemisphereLight(0x87CEEB, 0x8B4513, 0.3);
        this.scene.add(hemisphereLight);
    }

    createControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 100;
        
        const [tx, ty, tz] = this.config.camera.target;
        this.controls.target.set(tx, ty, tz);
    }

    createHelpers() {
        // Grid helper
        const gridHelper = new THREE.GridHelper(50, 50, 0x444444, 0x444444);
        this.scene.add(gridHelper);
        
        // Axes helper
        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);
        
        // Raycaster for object picking
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
    }

    setupEventListeners() {
        // Window resize
        window.addEventListener('resize', this.onWindowResize.bind(this));
        
        // Mouse events
        this.renderer.domElement.addEventListener('click', this.onMouseClick.bind(this));
        this.renderer.domElement.addEventListener('mousemove', this.onMouseMove.bind(this));
        
        // Container resize observer
        if (window.ResizeObserver) {
            this.resizeObserver = new ResizeObserver(this.onContainerResize.bind(this));
            this.resizeObserver.observe(this.container);
        }
    }

    onWindowResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    onContainerResize() {
        this.onWindowResize();
    }

    onMouseClick(event) {
        this.updateMousePosition(event);
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        
        if (intersects.length > 0) {
            const object = this.getSelectableObject(intersects[0].object);
            this.selectObject(object);
        } else {
            this.selectObject(null);
        }
    }

    onMouseMove(event) {
        this.updateMousePosition(event);
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        
        if (intersects.length > 0) {
            const object = this.getSelectableObject(intersects[0].object);
            this.hoverObject(object);
            this.renderer.domElement.style.cursor = 'pointer';
        } else {
            this.hoverObject(null);
            this.renderer.domElement.style.cursor = 'default';
        }
    }

    updateMousePosition(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    getSelectableObject(object) {
        let current = object;
        while (current) {
            if (current.userData && (current.userData.type === 'model' || current.userData.type === 'layer')) {
                return current;
            }
            current = current.parent;
        }
        return null;
    }

    selectObject(object) {
        // Eski seçimi temizle
        if (this.selectedObject) {
            this.highlightObject(this.selectedObject, false);
        }
        
        this.selectedObject = object;
        
        // Yeni seçimi vurgula
        if (this.selectedObject) {
            this.highlightObject(this.selectedObject, true);
        }
        
        // Callback çağır
        if (this.onObjectSelect) {
            this.onObjectSelect(this.selectedObject);
        }
    }

    hoverObject(object) {
        if (this.onObjectHover) {
            this.onObjectHover(object);
        }
    }

    highlightObject(object, highlight) {
        object.traverse((child) => {
            if (child.isMesh && child.material) {
                if (highlight) {
                    child.material.emissive.setHex(0x333333);
                } else {
                    child.material.emissive.setHex(0x000000);
                }
            }
        });
    }

    // Model yönetimi
    addModel(id, mesh, data) {
        mesh.userData = { 
            type: 'model', 
            id: id, 
            data: data 
        };
        this.scene.add(mesh);
        this.models.set(id, mesh);
        return mesh;
    }

    removeModel(id) {
        const model = this.models.get(id);
        if (model) {
            this.scene.remove(model);
            this.models.delete(id);
            
            if (this.selectedObject === model) {
                this.selectObject(null);
            }
        }
    }

    getModel(id) {
        return this.models.get(id);
    }

    // Katman yönetimi
    addLayer(id, mesh, data) {
        mesh.userData = { 
            type: 'layer', 
            id: id, 
            data: data 
        };
        this.scene.add(mesh);
        this.layers.set(id, mesh);
        return mesh;
    }

    removeLayer(id) {
        const layer = this.layers.get(id);
        if (layer) {
            this.scene.remove(layer);
            this.layers.delete(id);
            
            if (this.selectedObject === layer) {
                this.selectObject(null);
            }
        }
    }

    getLayer(id) {
        return this.layers.get(id);
    }

    // Render loop
    startRenderLoop() {
        const animate = () => {
            requestAnimationFrame(animate);
            
            if (this.controls) {
                this.controls.update();
            }
            
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }

    // Konfigürasyon kaydetme
    saveConfiguration() {
        return {
            camera: {
                position: this.camera.position.toArray(),
                target: this.controls.target.toArray()
            },
            scene: {
                background: this.scene.background.getHexString()
            }
        };
    }

    // Temizlik
    destroy() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        
        window.removeEventListener('resize', this.onWindowResize.bind(this));
        
        if (this.renderer) {
            this.renderer.dispose();
            this.container.removeChild(this.renderer.domElement);
        }
        
        if (this.controls) {
            this.controls.dispose();
        }
    }
}
