// WebGL2 Enhanced Renderer ve Advanced Features
import * as THREE from 'three';

export class WebGL2EnhancedRenderer {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: true,
            depth: true,
            logarithmicDepthBuffer: true, // WebGL2 özelliği
            ...options
        };
        
        this.renderer = null;
        this.isWebGL2Supported = false;
        this.capabilities = {};
        this.extensions = new Map();
        
        this.init();
    }

    init() {
        // WebGL2 context oluşturmaya çalış
        const canvas = document.createElement('canvas');
        const gl2 = canvas.getContext('webgl2', this.options);
        
        if (gl2) {
            this.isWebGL2Supported = true;
            console.log('✅ WebGL2 supported and initialized');
            
            // WebGL2 context ile Three.js renderer oluştur
            this.renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                context: gl2,
                ...this.options
            });
            
            this.setupWebGL2Features();
        } else {
            // Fallback to WebGL1
            console.warn('⚠️ WebGL2 not supported, falling back to WebGL1');
            this.isWebGL2Supported = false;
            this.renderer = new THREE.WebGLRenderer(this.options);
        }
        
        this.setupRenderer();
        this.container.appendChild(this.renderer.domElement);
    }

    setupWebGL2Features() {
        if (!this.isWebGL2Supported) return;
        
        const gl = this.renderer.getContext();
        
        // WebGL2 capabilities
        this.capabilities = {
            maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
            maxCubeMapTextureSize: gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE),
            maxArrayTextureLayers: gl.getParameter(gl.MAX_ARRAY_TEXTURE_LAYERS),
            max3DTextureSize: gl.getParameter(gl.MAX_3D_TEXTURE_SIZE),
            maxVertexUniformBlocks: gl.getParameter(gl.MAX_VERTEX_UNIFORM_BLOCKS),
            maxFragmentUniformBlocks: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_BLOCKS),
            maxUniformBlockSize: gl.getParameter(gl.MAX_UNIFORM_BLOCK_SIZE),
            maxVertexOutputComponents: gl.getParameter(gl.MAX_VERTEX_OUTPUT_COMPONENTS),
            maxFragmentInputComponents: gl.getParameter(gl.MAX_FRAGMENT_INPUT_COMPONENTS)
        };
        
        // WebGL2 extensions
        const availableExtensions = gl.getSupportedExtensions();
        availableExtensions.forEach(ext => {
            if (ext.includes('EXT_') || ext.includes('WEBGL_') || ext.includes('OES_')) {
                try {
                    const extension = gl.getExtension(ext);
                    if (extension) {
                        this.extensions.set(ext, extension);
                    }
                } catch (e) {
                    console.warn(`Failed to load extension: ${ext}`);
                }
            }
        });
        
        console.log('📊 WebGL2 Capabilities:', this.capabilities);
        console.log('🔧 Available Extensions:', Array.from(this.extensions.keys()));
        
        // Advanced features
        this.setupAdvancedFeatures();
    }

    setupAdvancedFeatures() {
        const renderer = this.renderer;
        
        // Enhanced shadow mapping (WebGL2)
        if (this.isWebGL2Supported) {
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
            renderer.shadowMap.autoUpdate = true;
        }
        
        // Color space and tone mapping
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        
        // Advanced culling
        renderer.sortObjects = true;
        renderer.setClearColor(0x87CEEB, 1.0);
    }

    setupRenderer() {
        // Basic renderer setup
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Performance optimizations
        this.renderer.info.autoReset = false;
        
        // Debug info
        this.setupDebugInfo();
    }

    setupDebugInfo() {
        // Performance monitoring
        this.performanceMonitor = {
            frameCount: 0,
            lastTime: performance.now(),
            fps: 0,
            drawCalls: 0,
            triangles: 0,
            points: 0,
            lines: 0
        };
        
        // Debug panel
        if (this.options.debug) {
            this.createDebugPanel();
        }
    }

    createDebugPanel() {
        const panel = document.createElement('div');
        panel.id = 'webgl2-debug-panel';
        panel.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(0,0,0,0.8);
            color: #00ff00;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            padding: 10px;
            border-radius: 5px;
            z-index: 10000;
            min-width: 200px;
        `;
        
        panel.innerHTML = `
            <div><strong>🚀 WebGL${this.isWebGL2Supported ? '2' : '1'} Renderer</strong></div>
            <div id="fps-counter">FPS: --</div>
            <div id="draw-calls">Draw Calls: --</div>
            <div id="triangles">Triangles: --</div>
            <div id="memory-usage">Memory: --</div>
            <div id="webgl-version">Version: ${this.isWebGL2Supported ? 'WebGL2' : 'WebGL1'}</div>
        `;
        
        document.body.appendChild(panel);
        this.debugPanel = panel;
    }

    updateDebugInfo() {
        if (!this.debugPanel) return;
        
        const monitor = this.performanceMonitor;
        const info = this.renderer.info;
        
        monitor.frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - monitor.lastTime >= 1000) {
            monitor.fps = Math.round((monitor.frameCount * 1000) / (currentTime - monitor.lastTime));
            monitor.frameCount = 0;
            monitor.lastTime = currentTime;
            
            // Update debug panel
            document.getElementById('fps-counter').textContent = `FPS: ${monitor.fps}`;
            document.getElementById('draw-calls').textContent = `Draw Calls: ${info.render.calls}`;
            document.getElementById('triangles').textContent = `Triangles: ${info.render.triangles}`;
            
            // Memory usage (approximate)
            const memoryMB = (info.memory.geometries + info.memory.textures) * 0.001;
            document.getElementById('memory-usage').textContent = `Memory: ${memoryMB.toFixed(1)}MB`;
        }
    }

    // Advanced material creation with WebGL2 features
    createAdvancedMaterial(type, options = {}) {
        const baseOptions = {
            transparent: options.transparent || false,
            opacity: options.opacity || 1.0,
            color: options.color || 0xffffff,
            ...options
        };

        let material;

        switch (type) {
            case 'tunnel':
                material = new THREE.MeshPhysicalMaterial({
                    ...baseOptions,
                    metalness: 0.1,
                    roughness: 0.8,
                    clearcoat: 0.1,
                    clearcoatRoughness: 0.2,
                    reflectivity: 0.1,
                    sheen: 0.1,
                    sheenColor: 0x444444
                });
                break;

            case 'rock':
                material = new THREE.MeshStandardMaterial({
                    ...baseOptions,
                    metalness: 0.05,
                    roughness: 0.95,
                    normalScale: new THREE.Vector2(0.5, 0.5)
                });
                break;

            case 'metal':
                material = new THREE.MeshPhysicalMaterial({
                    ...baseOptions,
                    metalness: 0.9,
                    roughness: 0.1,
                    clearcoat: 1.0,
                    clearcoatRoughness: 0.1,
                    reflectivity: 0.9
                });
                break;

            case 'conveyor':
                material = new THREE.MeshPhysicalMaterial({
                    ...baseOptions,
                    metalness: 0.3,
                    roughness: 0.4,
                    clearcoat: 0.8,
                    clearcoatRoughness: 0.2,
                    sheen: 0.2,
                    sheenColor: 0xffaa00
                });
                break;

            default:
                material = new THREE.MeshStandardMaterial(baseOptions);
        }

        // WebGL2 specific enhancements
        if (this.isWebGL2Supported) {
            // Add advanced features like instance rendering support
            material.defines = material.defines || {};
            material.defines.USE_WEBGL2 = '';
        }

        return material;
    }

    // Create enhanced lighting system
    createAdvancedLighting(scene) {
        const lighting = {
            ambient: null,
            directional: null,
            shadows: []
        };

        // Enhanced ambient light
        lighting.ambient = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(lighting.ambient);

        // Main directional light with shadows
        lighting.directional = new THREE.DirectionalLight(0xffffff, 0.8);
        lighting.directional.position.set(50, 50, 25);
        lighting.directional.castShadow = true;

        if (this.isWebGL2Supported) {
            // Enhanced shadow settings for WebGL2
            lighting.directional.shadow.mapSize.width = 4096;
            lighting.directional.shadow.mapSize.height = 4096;
            lighting.directional.shadow.camera.near = 0.1;
            lighting.directional.shadow.camera.far = 200;
            lighting.directional.shadow.camera.left = -50;
            lighting.directional.shadow.camera.right = 50;
            lighting.directional.shadow.camera.top = 50;
            lighting.directional.shadow.camera.bottom = -50;
            lighting.directional.shadow.bias = -0.0001;
            lighting.directional.shadow.normalBias = 0.02;
        } else {
            // Basic shadow settings for WebGL1
            lighting.directional.shadow.mapSize.width = 2048;
            lighting.directional.shadow.mapSize.height = 2048;
        }

        scene.add(lighting.directional);

        // Additional point lights for underground illumination
        const pointLight1 = new THREE.PointLight(0xffa500, 0.5, 30);
        pointLight1.position.set(-10, -5, 10);
        pointLight1.castShadow = this.isWebGL2Supported;
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffa500, 0.5, 30);
        pointLight2.position.set(15, -5, -10);
        pointLight2.castShadow = this.isWebGL2Supported;
        scene.add(pointLight2);

        lighting.shadows.push(pointLight1, pointLight2);

        return lighting;
    }

    render(scene, camera) {
        this.renderer.render(scene, camera);
        
        if (this.options.debug) {
            this.updateDebugInfo();
        }
        
        // Reset renderer info for next frame
        this.renderer.info.reset();
    }

    resize(width, height) {
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    dispose() {
        if (this.debugPanel) {
            document.body.removeChild(this.debugPanel);
        }
        
        this.renderer.dispose();
        this.extensions.clear();
    }

    // WebGL2 specific features
    supportsInstancedRendering() {
        return this.isWebGL2Supported;
    }

    supportsVolumeRendering() {
        return this.isWebGL2Supported && this.extensions.has('EXT_texture_3D');
    }

    getMaxTextureUnits() {
        return this.capabilities.maxTextureSize || 16;
    }
}
