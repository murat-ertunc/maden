// Performance Monitoring System for Mine3D
export class PerformanceMonitor {
    constructor(options = {}) {
        this.options = {
            enableGPUTiming: true,
            enableMemoryMonitoring: true,
            enableFrameAnalysis: true,
            sampleSize: 60, // frames to average
            alertThresholds: {
                fps: 30,
                memoryMB: 500,
                drawCalls: 1000
            },
            ...options
        };
        
        this.metrics = {
            fps: 0,
            frameTime: 0,
            drawCalls: 0,
            triangles: 0,
            memoryMB: 0,
            gpuTime: 0
        };
        
        this.samples = {
            frameTimes: [],
            drawCalls: [],
            memoryUsage: []
        };
        
        this.callbacks = new Set();
        this.isMonitoring = false;
        
        // GPU timing (WebGL2 extension)
        this.gpuTimer = null;
        this.gpuQueries = [];
        
        this.init();
    }

    init() {
        // Initialize GPU timing if available
        if (this.options.enableGPUTiming) {
            this.initGPUTiming();
        }
        
        console.log('📊 Performance Monitor initialized');
    }

    initGPUTiming() {
        // This would require WebGL2 context access
        // Implementation depends on renderer integration
        console.log('⏱️ GPU timing monitoring initialized');
    }

    startMonitoring(renderer) {
        this.renderer = renderer;
        this.isMonitoring = true;
        this.lastTime = performance.now();
        this.frameCount = 0;
        
        console.log('📊 Performance monitoring started');
    }

    stopMonitoring() {
        this.isMonitoring = false;
        console.log('📊 Performance monitoring stopped');
    }

    update() {
        if (!this.isMonitoring) return;
        
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastTime;
        
        this.frameCount++;
        
        // Update frame timing
        this.updateFrameMetrics(deltaTime);
        
        // Update render metrics
        if (this.renderer) {
            this.updateRenderMetrics();
        }
        
        // Update memory metrics
        if (this.options.enableMemoryMonitoring) {
            this.updateMemoryMetrics();
        }
        
        // Check thresholds and trigger alerts
        this.checkThresholds();
        
        this.lastTime = currentTime;
    }

    updateFrameMetrics(deltaTime) {
        // Add to samples
        this.samples.frameTimes.push(deltaTime);
        
        // Keep only recent samples
        if (this.samples.frameTimes.length > this.options.sampleSize) {
            this.samples.frameTimes.shift();
        }
        
        // Calculate FPS
        if (this.samples.frameTimes.length > 0) {
            const avgFrameTime = this.samples.frameTimes.reduce((a, b) => a + b) / this.samples.frameTimes.length;
            this.metrics.fps = Math.round(1000 / avgFrameTime);
            this.metrics.frameTime = avgFrameTime;
        }
    }

    updateRenderMetrics() {
        const info = this.renderer.info;
        
        this.metrics.drawCalls = info.render.calls;
        this.metrics.triangles = info.render.triangles;
        
        // Add to samples
        this.samples.drawCalls.push(info.render.calls);
        
        if (this.samples.drawCalls.length > this.options.sampleSize) {
            this.samples.drawCalls.shift();
        }
    }

    updateMemoryMetrics() {
        if (this.renderer) {
            const info = this.renderer.info;
            const memoryMB = (info.memory.geometries + info.memory.textures) * 0.001;
            
            this.metrics.memoryMB = memoryMB;
            
            // Add to samples
            this.samples.memoryUsage.push(memoryMB);
            
            if (this.samples.memoryUsage.length > this.options.sampleSize) {
                this.samples.memoryUsage.shift();
            }
        }
        
        // Browser memory API (if available)
        if (performance.memory) {
            this.metrics.jsHeapMB = performance.memory.usedJSHeapSize / (1024 * 1024);
        }
    }

    checkThresholds() {
        const alerts = [];
        
        // Check FPS threshold
        if (this.metrics.fps < this.options.alertThresholds.fps) {
            alerts.push({
                type: 'fps',
                message: `Low FPS detected: ${this.metrics.fps}`,
                severity: 'warning'
            });
        }
        
        // Check memory threshold
        if (this.metrics.memoryMB > this.options.alertThresholds.memoryMB) {
            alerts.push({
                type: 'memory',
                message: `High memory usage: ${this.metrics.memoryMB.toFixed(1)}MB`,
                severity: 'warning'
            });
        }
        
        // Check draw calls threshold
        if (this.metrics.drawCalls > this.options.alertThresholds.drawCalls) {
            alerts.push({
                type: 'drawCalls',
                message: `High draw calls: ${this.metrics.drawCalls}`,
                severity: 'info'
            });
        }
        
        // Trigger callbacks for alerts
        if (alerts.length > 0) {
            this.triggerCallbacks('alert', alerts);
        }
    }

    getMetrics() {
        return { ...this.metrics };
    }

    getDetailedReport() {
        return {
            metrics: this.getMetrics(),
            samples: {
                frameTimes: [...this.samples.frameTimes],
                drawCalls: [...this.samples.drawCalls],
                memoryUsage: [...this.samples.memoryUsage]
            },
            analysis: this.analyzePerformance()
        };
    }

    analyzePerformance() {
        const analysis = {
            overallScore: 'good', // good, fair, poor
            bottlenecks: [],
            recommendations: []
        };
        
        // Analyze FPS stability
        if (this.samples.frameTimes.length > 10) {
            const frameTimeVariance = this.calculateVariance(this.samples.frameTimes);
            if (frameTimeVariance > 5) {
                analysis.bottlenecks.push('Frame time instability');
                analysis.recommendations.push('Consider reducing scene complexity or enabling LOD');
            }
        }
        
        // Analyze draw calls
        const avgDrawCalls = this.samples.drawCalls.reduce((a, b) => a + b, 0) / this.samples.drawCalls.length;
        if (avgDrawCalls > 100) {
            analysis.bottlenecks.push('High draw call count');
            analysis.recommendations.push('Consider object instancing or batching');
        }
        
        // Analyze memory usage trend
        if (this.samples.memoryUsage.length > 30) {
            const memoryTrend = this.calculateTrend(this.samples.memoryUsage);
            if (memoryTrend > 0.1) {
                analysis.bottlenecks.push('Memory usage increasing');
                analysis.recommendations.push('Check for memory leaks in geometry/texture disposal');
            }
        }
        
        // Overall score calculation
        let score = 100;
        if (this.metrics.fps < 30) score -= 30;
        if (this.metrics.memoryMB > 200) score -= 20;
        if (this.metrics.drawCalls > 500) score -= 20;
        
        if (score > 80) analysis.overallScore = 'excellent';
        else if (score > 60) analysis.overallScore = 'good';
        else if (score > 40) analysis.overallScore = 'fair';
        else analysis.overallScore = 'poor';
        
        return analysis;
    }

    calculateVariance(samples) {
        const mean = samples.reduce((a, b) => a + b) / samples.length;
        const variance = samples.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / samples.length;
        return Math.sqrt(variance);
    }

    calculateTrend(samples) {
        if (samples.length < 2) return 0;
        
        const firstHalf = samples.slice(0, Math.floor(samples.length / 2));
        const secondHalf = samples.slice(Math.floor(samples.length / 2));
        
        const firstAvg = firstHalf.reduce((a, b) => a + b) / firstHalf.length;
        const secondAvg = secondHalf.reduce((a, b) => a + b) / secondHalf.length;
        
        return (secondAvg - firstAvg) / firstAvg;
    }

    // Optimization suggestions
    suggestOptimizations() {
        const suggestions = [];
        const analysis = this.analyzePerformance();
        
        if (this.metrics.fps < 30) {
            suggestions.push({
                type: 'performance',
                priority: 'high',
                message: 'Enable WebGL2 LOD system for distant objects',
                action: 'enableLOD'
            });
            
            suggestions.push({
                type: 'performance',
                priority: 'medium',
                message: 'Reduce shadow map resolution',
                action: 'reduceShadowQuality'
            });
        }
        
        if (this.metrics.drawCalls > 100) {
            suggestions.push({
                type: 'optimization',
                priority: 'medium',
                message: 'Use instanced rendering for repeated objects',
                action: 'enableInstancing'
            });
        }
        
        if (this.metrics.memoryMB > 200) {
            suggestions.push({
                type: 'memory',
                priority: 'high',
                message: 'Implement texture compression',
                action: 'compressTextures'
            });
        }
        
        return suggestions;
    }

    // Event system
    onAlert(callback) {
        this.callbacks.add(callback);
    }

    offAlert(callback) {
        this.callbacks.delete(callback);
    }

    triggerCallbacks(type, data) {
        this.callbacks.forEach(callback => {
            try {
                callback(type, data);
            } catch (error) {
                console.error('Performance monitor callback error:', error);
            }
        });
    }

    // Auto-optimization features
    enableAutoOptimization() {
        this.autoOptimization = true;
        
        // Monitor and auto-adjust quality
        setInterval(() => {
            if (this.metrics.fps < 20) {
                this.triggerCallbacks('autoOptimize', {
                    action: 'reduceQuality',
                    reason: 'Low FPS detected'
                });
            }
        }, 5000);
    }

    // Benchmarking
    runBenchmark(duration = 10000) {
        return new Promise((resolve) => {
            const startTime = performance.now();
            const startMetrics = { ...this.metrics };
            
            setTimeout(() => {
                const endMetrics = { ...this.metrics };
                const benchmarkResult = {
                    duration: duration,
                    startMetrics,
                    endMetrics,
                    avgFPS: this.metrics.fps,
                    minFPS: Math.min(...this.samples.frameTimes.map(ft => 1000 / ft)),
                    maxFPS: Math.max(...this.samples.frameTimes.map(ft => 1000 / ft)),
                    stability: 100 - this.calculateVariance(this.samples.frameTimes),
                    score: this.analyzePerformance().overallScore
                };
                
                resolve(benchmarkResult);
            }, duration);
        });
    }

    dispose() {
        this.stopMonitoring();
        this.callbacks.clear();
        this.samples = { frameTimes: [], drawCalls: [], memoryUsage: [] };
    }
}
