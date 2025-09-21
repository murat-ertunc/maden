// Advanced WebGL2 Shaders for Mine3D
import * as THREE from 'three';

export class AdvancedShaderManager {
    constructor(renderer) {
        this.renderer = renderer;
        this.isWebGL2 = renderer.capabilities?.isWebGL2 || false;
        this.shaders = new Map();
        this.uniformBuffers = new Map();
        
        console.log(`🎨 Shader Manager initialized with WebGL${this.isWebGL2 ? '2' : '1'}`);
        this.initializeShaders();
    }

    initializeShaders() {
        // Initialize all custom shaders
        this.createTunnelShader();
        this.createRockShader();
        this.createMetalShader();
        this.createConveyorShader();
        this.createDepthBasedFogShader();
        
        if (this.isWebGL2) {
            this.createInstancedShader();
            this.createVolumetricShader();
        }
    }

    createTunnelShader() {
        const vertexShader = `
            ${this.isWebGL2 ? '#version 300 es' : ''}
            ${this.isWebGL2 ? 'in' : 'attribute'} vec3 position;
            ${this.isWebGL2 ? 'in' : 'attribute'} vec3 normal;
            ${this.isWebGL2 ? 'in' : 'attribute'} vec2 uv;
            
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            uniform mat3 normalMatrix;
            uniform float time;
            uniform vec3 cameraPosition;
            
            ${this.isWebGL2 ? 'out' : 'varying'} vec3 vNormal;
            ${this.isWebGL2 ? 'out' : 'varying'} vec2 vUv;
            ${this.isWebGL2 ? 'out' : 'varying'} vec3 vWorldPosition;
            ${this.isWebGL2 ? 'out' : 'varying'} vec3 vViewPosition;
            ${this.isWebGL2 ? 'out' : 'varying'} float vDepth;
            
            void main() {
                vUv = uv;
                vNormal = normalize(normalMatrix * normal);
                
                vec4 worldPosition = modelViewMatrix * vec4(position, 1.0);
                vWorldPosition = worldPosition.xyz;
                vViewPosition = -worldPosition.xyz;
                
                gl_Position = projectionMatrix * worldPosition;
                vDepth = gl_Position.z / gl_Position.w;
                
                // Subtle tunnel wall movement for realism
                vec3 pos = position;
                pos += normal * sin(time * 0.5 + position.x * 0.1) * 0.01;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `;

        const fragmentShader = `
            ${this.isWebGL2 ? '#version 300 es' : ''}
            precision highp float;
            
            uniform vec3 diffuse;
            uniform float opacity;
            uniform float roughness;
            uniform float metalness;
            uniform float time;
            uniform vec3 cameraPosition;
            uniform sampler2D normalMap;
            uniform sampler2D roughnessMap;
            
            ${this.isWebGL2 ? 'in' : 'varying'} vec3 vNormal;
            ${this.isWebGL2 ? 'in' : 'varying'} vec2 vUv;
            ${this.isWebGL2 ? 'in' : 'varying'} vec3 vWorldPosition;
            ${this.isWebGL2 ? 'in' : 'varying'} vec3 vViewPosition;
            ${this.isWebGL2 ? 'in' : 'varying'} float vDepth;
            
            ${this.isWebGL2 ? 'out vec4 fragColor;' : ''}
            
            // Advanced lighting calculations
            vec3 calculateTunnelLighting(vec3 normal, vec3 viewDir, vec3 lightDir) {
                float NdotL = max(dot(normal, lightDir), 0.0);
                vec3 reflectDir = reflect(-lightDir, normal);
                float specular = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
                
                // Tunnel-specific ambient occlusion
                float ao = 1.0 - smoothstep(0.0, 2.0, length(vWorldPosition.xz));
                ao = mix(0.3, 1.0, ao);
                
                return diffuse * NdotL * ao + vec3(specular * 0.3);
            }
            
            // Moisture and humidity effects
            vec3 addHumidityEffect(vec3 color, vec3 normal, vec3 viewDir) {
                float humidity = sin(time * 0.3 + vWorldPosition.x * 0.5) * 0.5 + 0.5;
                humidity *= smoothstep(0.5, 1.0, abs(dot(normal, viewDir)));
                
                vec3 moistureColor = vec3(0.1, 0.2, 0.3);
                return mix(color, moistureColor, humidity * 0.2);
            }
            
            void main() {
                vec3 normal = normalize(vNormal);
                vec3 viewDir = normalize(cameraPosition - vWorldPosition);
                vec3 lightDir = normalize(vec3(1.0, 1.0, 0.5));
                
                // Sample normal map for surface detail
                vec3 normalMap = texture${this.isWebGL2 ? '' : '2D'}(normalMap, vUv * 4.0).rgb * 2.0 - 1.0;
                normal = normalize(normal + normalMap * 0.3);
                
                // Calculate base lighting
                vec3 color = calculateTunnelLighting(normal, viewDir, lightDir);
                
                // Add humidity effects
                color = addHumidityEffect(color, normal, viewDir);
                
                // Depth-based fog
                float fogFactor = 1.0 - exp(-abs(vDepth) * 0.1);
                vec3 fogColor = vec3(0.1, 0.1, 0.15);
                color = mix(color, fogColor, fogFactor * 0.6);
                
                // Output
                ${this.isWebGL2 ? 'fragColor' : 'gl_FragColor'} = vec4(color, opacity);
            }
        `;

        this.shaders.set('tunnel', {
            vertexShader,
            fragmentShader,
            uniforms: {
                diffuse: { value: new THREE.Color(0x808080) },
                opacity: { value: 1.0 },
                roughness: { value: 0.8 },
                metalness: { value: 0.1 },
                time: { value: 0.0 },
                cameraPosition: { value: new THREE.Vector3() },
                normalMap: { value: null },
                roughnessMap: { value: null }
            }
        });
    }

    createRockShader() {
        const vertexShader = `
            ${this.isWebGL2 ? '#version 300 es' : ''}
            ${this.isWebGL2 ? 'in' : 'attribute'} vec3 position;
            ${this.isWebGL2 ? 'in' : 'attribute'} vec3 normal;
            ${this.isWebGL2 ? 'in' : 'attribute'} vec2 uv;
            
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            uniform mat3 normalMatrix;
            uniform float time;
            
            ${this.isWebGL2 ? 'out' : 'varying'} vec3 vNormal;
            ${this.isWebGL2 ? 'out' : 'varying'} vec2 vUv;
            ${this.isWebGL2 ? 'out' : 'varying'} vec3 vWorldPosition;
            ${this.isWebGL2 ? 'out' : 'varying'} float vElevation;
            
            // Procedural noise function
            vec3 random3(vec3 c) {
                float j = 4096.0 * sin(dot(c, vec3(17.0, 59.4, 15.0)));
                vec3 r;
                r.z = fract(512.0 * j);
                j *= .125;
                r.x = fract(512.0 * j);
                j *= .125;
                r.y = fract(512.0 * j);
                return r - 0.5;
            }
            
            float simplex3d(vec3 p) {
                const float F3 = 0.3333333;
                const float G3 = 0.1666667;
                
                vec3 s = floor(p + dot(p, vec3(F3)));
                vec3 x = p - s + dot(s, vec3(G3));
                
                vec3 e = step(vec3(0.0), x - x.yzx);
                vec3 i1 = e * (1.0 - e.zxy);
                vec3 i2 = 1.0 - e.zxy * (1.0 - e);
                
                vec3 x1 = x - i1 + G3;
                vec3 x2 = x - i2 + 2.0 * G3;
                vec3 x3 = x - 1.0 + 3.0 * G3;
                
                vec4 w, d;
                
                w.x = dot(x, x);
                w.y = dot(x1, x1);
                w.z = dot(x2, x2);
                w.w = dot(x3, x3);
                
                w = max(0.6 - w, 0.0);
                
                d.x = dot(random3(s), x);
                d.y = dot(random3(s + i1), x1);
                d.z = dot(random3(s + i2), x2);
                d.w = dot(random3(s + 1.0), x3);
                
                w *= w;
                w *= w;
                d *= w;
                
                return dot(d, vec4(52.0));
            }
            
            void main() {
                vUv = uv;
                vNormal = normalize(normalMatrix * normal);
                
                // Add procedural rock displacement
                vec3 pos = position;
                float noise = simplex3d(position * 0.5 + time * 0.1);
                pos += normal * noise * 0.1;
                
                vec4 worldPosition = modelViewMatrix * vec4(pos, 1.0);
                vWorldPosition = worldPosition.xyz;
                vElevation = position.y;
                
                gl_Position = projectionMatrix * worldPosition;
            }
        `;

        const fragmentShader = `
            ${this.isWebGL2 ? '#version 300 es' : ''}
            precision highp float;
            
            uniform vec3 baseColor;
            uniform vec3 accentColor;
            uniform float roughness;
            uniform float time;
            
            ${this.isWebGL2 ? 'in' : 'varying'} vec3 vNormal;
            ${this.isWebGL2 ? 'in' : 'varying'} vec2 vUv;
            ${this.isWebGL2 ? 'in' : 'varying'} vec3 vWorldPosition;
            ${this.isWebGL2 ? 'in' : 'varying'} float vElevation;
            
            ${this.isWebGL2 ? 'out vec4 fragColor;' : ''}
            
            vec3 calculateRockColor(vec3 normal, vec2 uv) {
                // Stratified rock layers
                float layers = sin(vElevation * 0.5) * 0.5 + 0.5;
                vec3 layerColor = mix(baseColor, accentColor, layers);
                
                // Weathering effects
                float weathering = pow(abs(dot(normal, vec3(0, 1, 0))), 2.0);
                vec3 weatheredColor = layerColor * 0.7;
                
                return mix(layerColor, weatheredColor, weathering * 0.4);
            }
            
            void main() {
                vec3 normal = normalize(vNormal);
                vec3 color = calculateRockColor(normal, vUv);
                
                // Add subtle brightness variation
                float brightness = 0.8 + 0.2 * sin(vWorldPosition.x * 0.1 + time * 0.5);
                color *= brightness;
                
                ${this.isWebGL2 ? 'fragColor' : 'gl_FragColor'} = vec4(color, 1.0);
            }
        `;

        this.shaders.set('rock', {
            vertexShader,
            fragmentShader,
            uniforms: {
                baseColor: { value: new THREE.Color(0x8B4513) },
                accentColor: { value: new THREE.Color(0x654321) },
                roughness: { value: 0.9 },
                time: { value: 0.0 }
            }
        });
    }

    createMetalShader() {
        const vertexShader = `
            ${this.isWebGL2 ? '#version 300 es' : ''}
            ${this.isWebGL2 ? 'in' : 'attribute'} vec3 position;
            ${this.isWebGL2 ? 'in' : 'attribute'} vec3 normal;
            ${this.isWebGL2 ? 'in' : 'attribute'} vec2 uv;
            
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            uniform mat3 normalMatrix;
            
            ${this.isWebGL2 ? 'out' : 'varying'} vec3 vNormal;
            ${this.isWebGL2 ? 'out' : 'varying'} vec2 vUv;
            ${this.isWebGL2 ? 'out' : 'varying'} vec3 vReflect;
            ${this.isWebGL2 ? 'out' : 'varying'} vec3 vViewPosition;
            
            void main() {
                vUv = uv;
                vNormal = normalize(normalMatrix * normal);
                
                vec4 worldPosition = modelViewMatrix * vec4(position, 1.0);
                vViewPosition = -worldPosition.xyz;
                
                // Calculate reflection vector for environment mapping
                vec3 worldNormal = normalize(mat3(modelViewMatrix) * normal);
                vReflect = reflect(normalize(worldPosition.xyz), worldNormal);
                
                gl_Position = projectionMatrix * worldPosition;
            }
        `;

        const fragmentShader = `
            ${this.isWebGL2 ? '#version 300 es' : ''}
            precision highp float;
            
            uniform vec3 metalColor;
            uniform float metalness;
            uniform float roughness;
            uniform samplerCube envMap;
            uniform float envMapIntensity;
            
            ${this.isWebGL2 ? 'in' : 'varying'} vec3 vNormal;
            ${this.isWebGL2 ? 'in' : 'varying'} vec2 vUv;
            ${this.isWebGL2 ? 'in' : 'varying'} vec3 vReflect;
            ${this.isWebGL2 ? 'in' : 'varying'} vec3 vViewPosition;
            
            ${this.isWebGL2 ? 'out vec4 fragColor;' : ''}
            
            void main() {
                vec3 normal = normalize(vNormal);
                vec3 viewDir = normalize(vViewPosition);
                
                // Base metal color
                vec3 baseColor = metalColor;
                
                // Environment reflection
                vec3 reflectVec = reflect(-viewDir, normal);
                vec3 envColor = textureCube(envMap, reflectVec).rgb;
                
                // Fresnel effect
                float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.0);
                
                // Combine base color with environment
                vec3 finalColor = mix(baseColor, envColor * envMapIntensity, metalness * fresnel);
                
                // Add subtle surface imperfections
                float imperfection = sin(vUv.x * 100.0) * sin(vUv.y * 100.0) * 0.05 + 0.95;
                finalColor *= imperfection;
                
                ${this.isWebGL2 ? 'fragColor' : 'gl_FragColor'} = vec4(finalColor, 1.0);
            }
        `;

        this.shaders.set('metal', {
            vertexShader,
            fragmentShader,
            uniforms: {
                metalColor: { value: new THREE.Color(0x888888) },
                metalness: { value: 0.9 },
                roughness: { value: 0.1 },
                envMap: { value: null },
                envMapIntensity: { value: 1.0 }
            }
        });
    }

    createConveyorShader() {
        const vertexShader = `
            ${this.isWebGL2 ? '#version 300 es' : ''}
            ${this.isWebGL2 ? 'in' : 'attribute'} vec3 position;
            ${this.isWebGL2 ? 'in' : 'attribute'} vec3 normal;
            ${this.isWebGL2 ? 'in' : 'attribute'} vec2 uv;
            
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            uniform mat3 normalMatrix;
            uniform float time;
            uniform float beltSpeed;
            
            ${this.isWebGL2 ? 'out' : 'varying'} vec3 vNormal;
            ${this.isWebGL2 ? 'out' : 'varying'} vec2 vUv;
            ${this.isWebGL2 ? 'out' : 'varying'} vec2 vMovingUv;
            
            void main() {
                vNormal = normalize(normalMatrix * normal);
                vUv = uv;
                
                // Animated UV for moving belt effect
                vMovingUv = uv + vec2(time * beltSpeed, 0.0);
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            ${this.isWebGL2 ? '#version 300 es' : ''}
            precision highp float;
            
            uniform vec3 beltColor;
            uniform float metalness;
            uniform float roughness;
            uniform sampler2D beltTexture;
            
            ${this.isWebGL2 ? 'in' : 'varying'} vec3 vNormal;
            ${this.isWebGL2 ? 'in' : 'varying'} vec2 vUv;
            ${this.isWebGL2 ? 'in' : 'varying'} vec2 vMovingUv;
            
            ${this.isWebGL2 ? 'out vec4 fragColor;' : ''}
            
            void main() {
                vec3 normal = normalize(vNormal);
                
                // Sample moving belt texture
                vec3 beltPattern = texture${this.isWebGL2 ? '' : '2D'}(beltTexture, vMovingUv).rgb;
                
                // Combine with base color
                vec3 color = beltColor * beltPattern;
                
                // Add belt segmentation lines
                float segments = sin(vMovingUv.x * 20.0) * 0.1 + 0.9;
                color *= segments;
                
                // Simple lighting
                float lighting = max(dot(normal, vec3(0.0, 1.0, 0.5)), 0.3);
                color *= lighting;
                
                ${this.isWebGL2 ? 'fragColor' : 'gl_FragColor'} = vec4(color, 1.0);
            }
        `;

        this.shaders.set('conveyor', {
            vertexShader,
            fragmentShader,
            uniforms: {
                beltColor: { value: new THREE.Color(0x333333) },
                metalness: { value: 0.3 },
                roughness: { value: 0.7 },
                time: { value: 0.0 },
                beltSpeed: { value: 0.5 },
                beltTexture: { value: null }
            }
        });
    }

    createDepthBasedFogShader() {
        if (!this.isWebGL2) return;

        const vertexShader = `
            #version 300 es
            in vec3 position;
            
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            
            out float vDepth;
            
            void main() {
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                vDepth = -mvPosition.z;
                gl_Position = projectionMatrix * mvPosition;
            }
        `;

        const fragmentShader = `
            #version 300 es
            precision highp float;
            
            uniform vec3 fogColor;
            uniform float fogNear;
            uniform float fogFar;
            uniform float fogDensity;
            
            in float vDepth;
            out vec4 fragColor;
            
            void main() {
                float fogFactor = 1.0 - exp(-fogDensity * vDepth);
                fogFactor = clamp(fogFactor, 0.0, 1.0);
                
                fragColor = vec4(fogColor, fogFactor);
            }
        `;

        this.shaders.set('depthFog', {
            vertexShader,
            fragmentShader,
            uniforms: {
                fogColor: { value: new THREE.Color(0x606060) },
                fogNear: { value: 10.0 },
                fogFar: { value: 100.0 },
                fogDensity: { value: 0.02 }
            }
        });
    }

    createInstancedShader() {
        if (!this.isWebGL2) return;

        const vertexShader = `
            #version 300 es
            in vec3 position;
            in vec3 normal;
            in vec2 uv;
            in mat4 instanceMatrix;
            in vec3 instanceColor;
            
            uniform mat4 projectionMatrix;
            uniform mat4 viewMatrix;
            uniform mat3 normalMatrix;
            
            out vec3 vNormal;
            out vec2 vUv;
            out vec3 vInstanceColor;
            
            void main() {
                vUv = uv;
                vInstanceColor = instanceColor;
                vNormal = normalize(normalMatrix * normal);
                
                vec4 worldPosition = instanceMatrix * vec4(position, 1.0);
                gl_Position = projectionMatrix * viewMatrix * worldPosition;
            }
        `;

        const fragmentShader = `
            #version 300 es
            precision highp float;
            
            in vec3 vNormal;
            in vec2 vUv;
            in vec3 vInstanceColor;
            
            out vec4 fragColor;
            
            void main() {
                vec3 normal = normalize(vNormal);
                float lighting = max(dot(normal, vec3(0.0, 1.0, 0.5)), 0.3);
                
                vec3 color = vInstanceColor * lighting;
                fragColor = vec4(color, 1.0);
            }
        `;

        this.shaders.set('instanced', {
            vertexShader,
            fragmentShader,
            uniforms: {}
        });
    }

    createVolumetricShader() {
        if (!this.isWebGL2) return;

        const vertexShader = `
            #version 300 es
            in vec3 position;
            
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            
            out vec3 vPosition;
            
            void main() {
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            #version 300 es
            precision highp float;
            
            uniform sampler3D volumeTexture;
            uniform vec3 cameraPosition;
            uniform float stepSize;
            uniform int maxSteps;
            uniform float opacity;
            
            in vec3 vPosition;
            out vec4 fragColor;
            
            void main() {
                vec3 rayDirection = normalize(vPosition - cameraPosition);
                vec3 rayStart = vPosition;
                
                vec4 color = vec4(0.0);
                
                for (int i = 0; i < maxSteps; i++) {
                    vec3 samplePos = rayStart + rayDirection * float(i) * stepSize;
                    
                    // Sample 3D texture
                    vec4 sample = texture(volumeTexture, samplePos * 0.5 + 0.5);
                    
                    // Alpha blending
                    color.rgb += sample.rgb * sample.a * (1.0 - color.a);
                    color.a += sample.a * (1.0 - color.a);
                    
                    if (color.a > 0.95) break;
                }
                
                fragColor = vec4(color.rgb, color.a * opacity);
            }
        `;

        this.shaders.set('volumetric', {
            vertexShader,
            fragmentShader,
            uniforms: {
                volumeTexture: { value: null },
                cameraPosition: { value: new THREE.Vector3() },
                stepSize: { value: 0.1 },
                maxSteps: { value: 64 },
                opacity: { value: 1.0 }
            }
        });
    }

    // Create material from shader
    createMaterial(shaderName, additionalUniforms = {}) {
        const shader = this.shaders.get(shaderName);
        if (!shader) {
            console.warn(`Shader '${shaderName}' not found`);
            return new THREE.MeshBasicMaterial();
        }

        const uniforms = THREE.UniformsUtils.merge([
            shader.uniforms,
            additionalUniforms
        ]);

        return new THREE.ShaderMaterial({
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader,
            uniforms: uniforms,
            transparent: true,
            side: THREE.DoubleSide
        });
    }

    // Update shader uniforms
    updateShaderUniforms(time, camera) {
        this.shaders.forEach((shader, name) => {
            if (shader.uniforms.time) {
                shader.uniforms.time.value = time;
            }
            if (shader.uniforms.cameraPosition) {
                shader.uniforms.cameraPosition.value.copy(camera.position);
            }
        });
    }

    // Get available shaders
    getAvailableShaders() {
        return Array.from(this.shaders.keys());
    }

    // Dispose all shaders
    dispose() {
        this.shaders.clear();
        this.uniformBuffers.clear();
    }
}
