// WebGL2 ve Collision Detection Özellikleri Kullanım Örnekleri

// 🚀 WebGL2 Enhanced Renderer ile 3D Viewer Başlatma
const viewer = new SimpleMine3DViewer('mine-3d-container', 1, {
    // WebGL2 özellikleri
    enableWebGL2: true,
    enableCollisionDetection: true,
    enableAdvancedShaders: true,
    enablePerformanceMonitoring: true,
    
    // Debug modları
    debugCollisions: false,  // Collision visualization
    debugPerformance: true, // Performance panel
    
    // Performans ayarları
    powerPreference: 'high-performance',
    antialias: true,
    logarithmicDepthBuffer: true
});

// 🔍 Collision Detection Event Listeners
viewer.collisionSystem?.onCollision((obj1, obj2, collision) => {
    console.log('🔍 Collision detected:', {
        object1: obj1.userData.id,
        object2: obj2.userData.id,
        penetration: collision.penetration,
        point: collision.point
    });
    
    // Collision response
    if (collision.penetration > 1.0) {
        alert('Critical tunnel overlap detected! Please adjust placement.');
    }
});

// 📊 Performance Monitoring
viewer.performanceMonitor?.onAlert((type, alerts) => {
    alerts.forEach(alert => {
        if (alert.type === 'fps' && alert.severity === 'warning') {
            console.warn('Low FPS detected, enabling auto-optimization');
            
            // Auto-optimize by reducing quality
            enableLODMode();
            reduceShadowQuality();
        }
        
        if (alert.type === 'memory') {
            console.warn('High memory usage detected');
            triggerGarbageCollection();
        }
    });
});

// 🎨 Advanced Shader Usage Examples
function createTunnelWithAdvancedShader(position, width, height, length) {
    const geometry = new THREE.CylinderGeometry(width/2, width/2, length, 16);
    
    // Use advanced tunnel shader instead of basic material
    const material = viewer.shaderManager?.createMaterial('tunnel', {
        diffuse: new THREE.Color(0x808080),
        roughness: 0.8,
        metalness: 0.1,
        normalMap: loadTexture('/textures/tunnel-normal.jpg'),
        roughnessMap: loadTexture('/textures/tunnel-roughness.jpg')
    });
    
    const tunnel = new THREE.Mesh(geometry, material);
    tunnel.position.copy(position);
    
    // Register with collision system
    viewer.collisionSystem?.registerObject(tunnel, 'static', {
        type: 'tunnel',
        dimensions: { width, height, length }
    });
    
    viewer.scene.add(tunnel);
    return tunnel;
}

// 🔧 Collision Validation Example
function validateTunnelPlacement(newTunnel) {
    const existingTunnels = getExistingTunnels();
    const validation = viewer.collisionSystem?.validateTunnelPlacement(newTunnel, existingTunnels);
    
    if (!validation.isValid) {
        const conflicts = validation.conflicts;
        
        console.warn('Tunnel placement conflicts:', conflicts);
        
        // Show conflict visualization
        conflicts.forEach(conflict => {
            visualizeCollisionPoint(conflict.collision.point, conflict.severity);
        });
        
        // Suggest alternative placement
        const suggestion = suggestAlternativePlacement(newTunnel, conflicts);
        return { valid: false, suggestion };
    }
    
    return { valid: true };
}

// 📈 Performance Optimization Functions
function enableLODMode() {
    // Enable Level of Detail for distant objects
    viewer.scene.traverse(object => {
        if (object.isMesh && object.userData.highGeometry) {
            const distance = object.position.distanceTo(viewer.camera.position);
            if (distance > 50) {
                object.geometry = object.userData.lowGeometry;
            }
        }
    });
}

function reduceShadowQuality() {
    // Reduce shadow map resolution for better performance
    viewer.scene.traverse(light => {
        if (light.shadow) {
            light.shadow.mapSize.width = Math.max(512, light.shadow.mapSize.width / 2);
            light.shadow.mapSize.height = Math.max(512, light.shadow.mapSize.height / 2);
        }
    });
}

function triggerGarbageCollection() {
    // Force garbage collection of unused geometries and materials
    viewer.scene.traverse(object => {
        if (object.isMesh && object.userData.disposed) {
            object.geometry.dispose();
            if (object.material.dispose) {
                object.material.dispose();
            }
        }
    });
}

// 🎯 Advanced Path Intersection Detection
function detectPathIntersections() {
    const paths = Array.from(viewer.pathDrawer.paths.values());
    const intersections = [];
    
    for (let i = 0; i < paths.length; i++) {
        for (let j = i + 1; j < paths.length; j++) {
            const pathIntersections = viewer.collisionSystem?.detectPathIntersections(paths[i], paths[j]);
            
            if (pathIntersections.length > 0) {
                intersections.push({
                    path1: paths[i],
                    path2: paths[j],
                    intersections: pathIntersections
                });
                
                // Visualize intersections
                pathIntersections.forEach(intersection => {
                    createIntersectionMarker(intersection.point);
                });
            }
        }
    }
    
    return intersections;
}

// 📊 Performance Benchmarking
async function runPerformanceBenchmark() {
    console.log('🔄 Running performance benchmark...');
    
    const result = await viewer.performanceMonitor?.runBenchmark(10000);
    
    console.log('📊 Benchmark Results:', {
        avgFPS: result.avgFPS,
        minFPS: result.minFPS,
        maxFPS: result.maxFPS,
        stability: result.stability,
        score: result.score
    });
    
    // Generate optimization suggestions
    const suggestions = viewer.performanceMonitor?.suggestOptimizations();
    
    if (suggestions.length > 0) {
        console.log('💡 Optimization Suggestions:');
        suggestions.forEach(suggestion => {
            console.log(`- ${suggestion.message} (Priority: ${suggestion.priority})`);
        });
    }
    
    return result;
}

// 🎨 Real-time Shader Parameter Updates
function animateShaderEffects() {
    const time = performance.now() * 0.001;
    
    // Update tunnel shader parameters
    viewer.scene.traverse(object => {
        if (object.material && object.material.uniforms) {
            if (object.material.uniforms.time) {
                object.material.uniforms.time.value = time;
            }
            
            if (object.material.uniforms.cameraPosition) {
                object.material.uniforms.cameraPosition.value.copy(viewer.camera.position);
            }
            
            // Dynamic humidity effects for tunnels
            if (object.userData.type === 'tunnel') {
                const humidity = 0.5 + 0.3 * Math.sin(time * 0.5);
                if (object.material.uniforms.humidity) {
                    object.material.uniforms.humidity.value = humidity;
                }
            }
        }
    });
}

// 🔍 Collision-Aware Path Drawing
function startCollisionAwarePath() {
    viewer.pathDrawer.startDrawing({
        onPathUpdate: (points) => {
            // Real-time collision checking during path drawing
            if (points.length > 1) {
                const tempPath = createTemporaryPath(points);
                const conflicts = checkPathConflicts(tempPath);
                
                if (conflicts.length > 0) {
                    // Show warning overlay
                    showPathConflictWarning(conflicts);
                } else {
                    hidePathConflictWarning();
                }
                
                tempPath.dispose();
            }
        },
        
        onPathComplete: (points) => {
            const validation = validateNewPath(points);
            
            if (validation.hasConflicts) {
                const proceed = confirm(
                    `Path intersects with ${validation.conflicts.length} existing paths. Continue anyway?`
                );
                
                if (!proceed) {
                    return; // Cancel path creation
                }
            }
            
            // Create path with collision registration
            const pathData = {
                id: generatePathId(),
                points: points,
                width: 3.0,
                height: 3.0,
                type: 'tunnel'
            };
            
            const path = viewer.pathDrawer.createPath(pathData);
            
            // Advanced collision callbacks
            viewer.collisionSystem?.registerCollisionCallback(path.userData.id, (obj1, obj2, collision) => {
                handlePathCollision(obj1, obj2, collision);
            });
        }
    });
}

// 🎯 WebGL2 Specific Features
function demonstrateWebGL2Features() {
    if (viewer.webgl2Renderer?.isWebGL2Supported) {
        console.log('✅ WebGL2 Features Available:');
        
        // Instanced rendering for repeated objects
        if (viewer.webgl2Renderer.supportsInstancedRendering()) {
            createInstancedRocks();
        }
        
        // Volume rendering for geological data
        if (viewer.webgl2Renderer.supportsVolumeRendering()) {
            createVolumetricGeology();
        }
        
        // Advanced lighting with multiple shadow cascades
        setupAdvancedLighting();
    } else {
        console.log('⚠️ WebGL2 not supported, using fallback features');
    }
}

// Export for global usage
window.MineAdvancedFeatures = {
    validateTunnelPlacement,
    detectPathIntersections,
    runPerformanceBenchmark,
    animateShaderEffects,
    startCollisionAwarePath,
    demonstrateWebGL2Features
};

console.log('🚀 Mine3D Advanced Features Demo loaded successfully!');
console.log('Available functions:', Object.keys(window.MineAdvancedFeatures));
