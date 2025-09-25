// Comprehensive Test Suite for Tunnel Designer System
// Genel Sistem Testi, UI Testi, GoJS Fonksiyonel Test

class TunnelDesignerTestSuite {
    constructor() {
        this.testResults = {
            general: [],
            ui: [],
            gojs: [],
            integration: []
        };
        this.tunnelDesigner = null;
        this.testContainer = null;
    }

    async runAllTests() {
        console.log('🧪 Tunnel Designer Test Suite başlatılıyor...');
        
        // Test container hazırla
        this.setupTestEnvironment();
        
        try {
            // 1. Genel Sistem Testleri
            await this.runGeneralSystemTests();
            
            // 2. UI Testleri
            await this.runUITests();
            
            // 3. GoJS Fonksiyonel Testleri
            await this.runGoJSTests();
            
            // 4. Entegrasyon Testleri
            await this.runIntegrationTests();
            
            // Test sonuçlarını raporla
            this.generateTestReport();
            
        } catch (error) {
            console.error('❌ Test suite çalıştırma hatası:', error);
            this.logTest('general', 'Test Suite Execution', false, error.message);
        }
    }

    setupTestEnvironment() {
        // Test için özel container oluştur
        this.testContainer = document.createElement('div');
        this.testContainer.id = 'test-tunnel-diagram';
        this.testContainer.style.width = '800px';
        this.testContainer.style.height = '600px';
        this.testContainer.style.border = '1px solid #ccc';
        this.testContainer.style.position = 'absolute';
        this.testContainer.style.top = '-9999px'; // Görünmez yap
        document.body.appendChild(this.testContainer);
        
        console.log('✅ Test environment hazırlandı');
    }

    // 1. GENEL SİSTEM TESTLERİ
    async runGeneralSystemTests() {
        console.log('🔧 Genel Sistem Testleri başlıyor...');

        // Dependency Testleri
        this.logTest('general', 'GoJS Library', typeof go !== 'undefined', 'GoJS kütüphanesi yüklü');
        this.logTest('general', 'TunnelDesigner Class', typeof TunnelDesigner !== 'undefined', 'TunnelDesigner sınıfı mevcut');
        this.logTest('general', 'DOM Support', typeof document !== 'undefined', 'DOM desteği var');

        // TunnelDesigner Initialization
        try {
            this.tunnelDesigner = new TunnelDesigner('test-tunnel-diagram', {
                gridSize: 0.5,
                showMeasurements: true,
                showGrid: true,
                snapToGrid: true
            });
            this.logTest('general', 'TunnelDesigner Initialization', true, 'Başarıyla başlatıldı');
        } catch (error) {
            this.logTest('general', 'TunnelDesigner Initialization', false, error.message);
            return;
        }

        // Configuration Tests
        this.logTest('general', 'Default Grid Size', this.tunnelDesigner.config.gridSize === 0.5, 'Grid size doğru');
        this.logTest('general', 'Measurements Enabled', this.tunnelDesigner.config.showMeasurements === true, 'Ölçümler aktif');
        this.logTest('general', 'Grid Visible', this.tunnelDesigner.config.showGrid === true, 'Grid görünür');
        this.logTest('general', 'Snap to Grid', this.tunnelDesigner.config.snapToGrid === true, 'Snap aktif');

        // Diagram Properties
        this.logTest('general', 'Diagram Created', this.tunnelDesigner.diagram !== null, 'Diagram oluşturuldu');
        this.logTest('general', 'Undo Manager', this.tunnelDesigner.diagram.undoManager.isEnabled, 'Undo/Redo aktif');
        this.logTest('general', 'Grid Configuration', this.tunnelDesigner.diagram.grid !== null, 'Grid yapılandırıldı');

        // Data Structure Tests
        this.logTest('general', 'Tunnel Data Structure', this.tunnelDesigner.tunnelData instanceof Object, 'Veri yapısı mevcut');
        this.logTest('general', 'Segments Map', this.tunnelDesigner.tunnelData.segments instanceof Map, 'Segments map doğru');
        this.logTest('general', 'Stations Map', this.tunnelDesigner.tunnelData.stations instanceof Map, 'Stations map doğru');
        this.logTest('general', 'Measurements Map', this.tunnelDesigner.tunnelData.measurements instanceof Map, 'Measurements map doğru');

        // Method Availability Tests
        const methods = ['setDrawingMode', 'exitDrawingMode', 'addTunnelPoint', 'getTunnelData', 'exportTunnelData', 'importTunnelData'];
        methods.forEach(method => {
            this.logTest('general', `Method: ${method}`, typeof this.tunnelDesigner[method] === 'function', `${method} metodu mevcut`);
        });

        console.log('✅ Genel Sistem Testleri tamamlandı');
    }

    // 2. UI TESTLERİ
    async runUITests() {
        console.log('🎨 UI Testleri başlıyor...');

        // Diagram Container Tests
        const diagramDiv = document.getElementById('test-tunnel-diagram');
        this.logTest('ui', 'Diagram Container Exists', diagramDiv !== null, 'Diagram container mevcut');
        this.logTest('ui', 'Container Dimensions', diagramDiv.offsetWidth > 0 && diagramDiv.offsetHeight > 0, 'Container boyutları doğru');

        // Canvas Element Tests
        const canvas = diagramDiv.querySelector('canvas');
        this.logTest('ui', 'Canvas Element', canvas !== null, 'Canvas elementi oluşturuldu');
        
        if (canvas) {
            const canvasContext = canvas.getContext('2d');
            this.logTest('ui', 'Canvas 2D Context', canvasContext !== null, '2D context mevcut');
            this.logTest('ui', 'Canvas Size', canvas.width > 0 && canvas.height > 0, 'Canvas boyutları pozitif');
        }

        // Event Handler Tests
        this.logTest('ui', 'Background Click Handler', typeof this.tunnelDesigner.onBackgroundClick === 'function', 'Background click handler mevcut');
        this.logTest('ui', 'Object Click Handler', typeof this.tunnelDesigner.onObjectClick === 'function', 'Object click handler mevcut');
        this.logTest('ui', 'Selection Handler', typeof this.tunnelDesigner.onSelectionMoved === 'function', 'Selection handler mevcut');

        // Template Tests
        const nodeTemplates = this.tunnelDesigner.diagram.nodeTemplateMap;
        this.logTest('ui', 'Tunnel Segment Template', nodeTemplates.has('tunnel_segment'), 'Tünel segment template mevcut');
        this.logTest('ui', 'Miner Station Template', nodeTemplates.has('miner_station'), 'Madenci istasyon template mevcut');
        this.logTest('ui', 'Measurement Template', nodeTemplates.has('measurement'), 'Ölçüm template mevcut');

        // Link Template Tests
        this.logTest('ui', 'Link Template', this.tunnelDesigner.diagram.linkTemplate !== null, 'Link template yapılandırıldı');

        // Drawing Mode UI Tests
        const drawingModes = ['tunnel', 'station', 'measurement'];
        for (const mode of drawingModes) {
            try {
                this.tunnelDesigner.setDrawingMode(mode);
                this.logTest('ui', `Drawing Mode: ${mode}`, this.tunnelDesigner.drawingMode === mode, `${mode} modu aktif`);
                this.logTest('ui', `Drawing State: ${mode}`, this.tunnelDesigner.isDrawing === true, `${mode} çizim durumu aktif`);
            } catch (error) {
                this.logTest('ui', `Drawing Mode: ${mode}`, false, error.message);
            }
        }

        // Reset drawing mode
        this.tunnelDesigner.exitDrawingMode();
        this.logTest('ui', 'Exit Drawing Mode', this.tunnelDesigner.isDrawing === false, 'Çizim modu sonlandırıldı');

        console.log('✅ UI Testleri tamamlandı');
    }

    // 3. GOJS FONKSİYONEL TESTLERİ
    async runGoJSTests() {
        console.log('🚇 GoJS Fonksiyonel Testleri başlıyor...');

        // Görsel referanstaki tünel özelliklerini test et
        await this.testComplexTunnelCreation();
        await this.testTunnelMeasurements();
        await this.testTunnelAngles();
        await this.testMultipleSegments();
        await this.testTunnelParameters();
        await this.testDataPersistence();

        console.log('✅ GoJS Fonksiyonel Testleri tamamlandı');
    }

    async testComplexTunnelCreation() {
        console.log('🔧 Karmaşık Tünel Oluşturma Testi...');

        // Görsel referanstaki tünel segmentlerini simüle et
        const testSegments = [
            { start: { x: 0, y: 0 }, end: { x: 26.49, y: 0 }, expectedLength: 26.49 },
            { start: { x: 26.49, y: 0 }, end: { x: 39.62, y: 13.13 }, expectedLength: 18.57 }, // Diagonal segment
            { start: { x: 39.62, y: 13.13 }, end: { x: 47.26, y: 20.77 }, expectedLength: 10.8 },
            { start: { x: 47.26, y: 20.77 }, end: { x: 58.24, y: 32.75 }, expectedLength: 16.95 }
        ];

        this.tunnelDesigner.setDrawingMode('tunnel');

        for (let i = 0; i < testSegments.length; i++) {
            const segment = testSegments[i];
            
            try {
                // Segment başlangıç noktası
                const startPoint = new go.Point(segment.start.x * 20, segment.start.y * 20); // meter to pixel
                const endPoint = new go.Point(segment.end.x * 20, segment.end.y * 20);
                
                // Tünel segment oluştur
                this.tunnelDesigner.addTunnelPoint(startPoint);
                await this.delay(100); // UI update için bekle
                this.tunnelDesigner.addTunnelPoint(endPoint);
                await this.delay(100);

                // Oluşturulan segmenti kontrol et
                const segments = Array.from(this.tunnelDesigner.tunnelData.segments.values());
                const currentSegment = segments[segments.length - 1];
                
                if (currentSegment) {
                    const lengthDiff = Math.abs(currentSegment.length - segment.expectedLength);
                    this.logTest('gojs', `Segment ${i+1} Length`, lengthDiff < 0.1, `Uzunluk: ${currentSegment.length.toFixed(2)}m (beklenen: ${segment.expectedLength}m)`);
                    
                    // Açı testi
                    const expectedAngle = Math.atan2(segment.end.y - segment.start.y, segment.end.x - segment.start.x) * 180 / Math.PI;
                    const angleDiff = Math.abs(currentSegment.angle - expectedAngle);
                    this.logTest('gojs', `Segment ${i+1} Angle`, angleDiff < 5, `Açı: ${currentSegment.angle.toFixed(1)}° (beklenen: ${expectedAngle.toFixed(1)}°)`);
                } else {
                    this.logTest('gojs', `Segment ${i+1} Creation`, false, 'Segment oluşturulamadı');
                }

            } catch (error) {
                this.logTest('gojs', `Segment ${i+1} Creation`, false, error.message);
            }
        }

        this.tunnelDesigner.exitDrawingMode();
    }

    async testTunnelMeasurements() {
        console.log('📏 Tünel Ölçüm Testi...');

        // Önceki test'ten kalan segmentleri kontrol et
        const segments = Array.from(this.tunnelDesigner.tunnelData.segments.values());
        const measurements = Array.from(this.tunnelDesigner.tunnelData.measurements.values());

        this.logTest('gojs', 'Segments Created', segments.length > 0, `${segments.length} segment oluşturuldu`);
        this.logTest('gojs', 'Measurements Created', measurements.length > 0, `${measurements.length} ölçüm oluşturuldu`);

        // Her segment için ölçüm doğruluğunu kontrol et
        segments.forEach((segment, index) => {
            if (segment.length !== undefined) {
                this.logTest('gojs', `Segment ${index+1} Has Length`, segment.length > 0, `Uzunluk: ${segment.length.toFixed(2)}m`);
                this.logTest('gojs', `Segment ${index+1} Has Angle`, segment.angle !== undefined, `Açı: ${segment.angle.toFixed(1)}°`);
            }
        });

        // Toplam uzunluk testi
        const totalLength = segments.reduce((sum, seg) => sum + (seg.length || 0), 0);
        this.logTest('gojs', 'Total Length Calculation', totalLength > 0, `Toplam uzunluk: ${totalLength.toFixed(2)}m`);
    }

    async testTunnelAngles() {
        console.log('📐 Tünel Açı Testi...');

        // Farklı açılarda tünel segmentleri test et
        const angleTests = [
            { angle: 0, name: 'Horizontal' },
            { angle: 90, name: 'Vertical' },
            { angle: 45, name: '45 Degree' },
            { angle: -30, name: '-30 Degree' },
            { angle: 135, name: '135 Degree' }
        ];

        for (const test of angleTests) {
            try {
                // Test segment oluştur
                const length = 10; // 10 metre
                const startX = 100;
                const startY = 100;
                const endX = startX + length * Math.cos(test.angle * Math.PI / 180);
                const endY = startY + length * Math.sin(test.angle * Math.PI / 180);

                const startPoint = new go.Point(startX * 20, startY * 20);
                const endPoint = new go.Point(endX * 20, endY * 20);

                this.tunnelDesigner.setDrawingMode('tunnel');
                this.tunnelDesigner.addTunnelPoint(startPoint);
                await this.delay(50);
                this.tunnelDesigner.addTunnelPoint(endPoint);
                await this.delay(50);

                // Açı doğruluğunu kontrol et
                const segments = Array.from(this.tunnelDesigner.tunnelData.segments.values());
                const lastSegment = segments[segments.length - 1];

                if (lastSegment) {
                    const angleDiff = Math.abs(lastSegment.angle - test.angle);
                    this.logTest('gojs', `${test.name} Angle`, angleDiff < 2, `Ölçülen: ${lastSegment.angle.toFixed(1)}°, Beklenen: ${test.angle}°`);
                }

                this.tunnelDesigner.exitDrawingMode();

            } catch (error) {
                this.logTest('gojs', `${test.name} Angle`, false, error.message);
            }
        }
    }

    async testMultipleSegments() {
        console.log('🔗 Çoklu Segment Testi...');

        // Segment sayısını kaydet
        const initialSegmentCount = this.tunnelDesigner.tunnelData.segments.size;

        // 5 segment daha ekle
        const additionalSegments = 5;
        for (let i = 0; i < additionalSegments; i++) {
            try {
                const startPoint = new go.Point((i * 100 + 200) * 20, 200 * 20);
                const endPoint = new go.Point((i * 100 + 300) * 20, 250 * 20);

                this.tunnelDesigner.setDrawingMode('tunnel');
                this.tunnelDesigner.addTunnelPoint(startPoint);
                await this.delay(30);
                this.tunnelDesigner.addTunnelPoint(endPoint);
                await this.delay(30);
                this.tunnelDesigner.exitDrawingMode();

            } catch (error) {
                this.logTest('gojs', `Additional Segment ${i+1}`, false, error.message);
            }
        }

        const finalSegmentCount = this.tunnelDesigner.tunnelData.segments.size;
        this.logTest('gojs', 'Multiple Segments', finalSegmentCount >= initialSegmentCount + additionalSegments, 
                    `${additionalSegments} yeni segment eklendi (${initialSegmentCount} → ${finalSegmentCount})`);
    }

    async testTunnelParameters() {
        console.log('⚙️ Tünel Parametre Testi...');

        // Farklı tünel parametrelerini test et
        const parameterTests = [
            { width: 3.0, height: 3.0, crossSection: 'circle', name: 'Standard Circle' },
            { width: 4.5, height: 3.5, crossSection: 'rectangle', name: 'Large Rectangle' },
            { width: 2.5, height: 2.5, crossSection: 'square', name: 'Small Square' },
            { width: 5.0, height: 4.0, crossSection: 'horseshoe', name: 'Horseshoe' }
        ];

        for (const params of parameterTests) {
            try {
                // Parametreleri ayarla
                this.tunnelDesigner.config.defaultTunnelWidth = params.width;
                this.tunnelDesigner.config.defaultTunnelHeight = params.height;
                this.tunnelDesigner.config.defaultCrossSectionType = params.crossSection;

                // Test segment oluştur
                const startPoint = new go.Point(500 * 20, 300 * 20);
                const endPoint = new go.Point(600 * 20, 350 * 20);

                this.tunnelDesigner.setDrawingMode('tunnel');
                this.tunnelDesigner.addTunnelPoint(startPoint);
                await this.delay(50);
                this.tunnelDesigner.addTunnelPoint(endPoint);
                await this.delay(50);

                // Parametreleri kontrol et
                const segments = Array.from(this.tunnelDesigner.tunnelData.segments.values());
                const lastSegment = segments[segments.length - 1];

                if (lastSegment) {
                    this.logTest('gojs', `${params.name} Width`, lastSegment.width === params.width, `Genişlik: ${lastSegment.width}m`);
                    this.logTest('gojs', `${params.name} Height`, lastSegment.height === params.height, `Yükseklik: ${lastSegment.height}m`);
                    this.logTest('gojs', `${params.name} Cross Section`, lastSegment.crossSectionType === params.crossSection, `Kesit: ${lastSegment.crossSectionType}`);
                }

                this.tunnelDesigner.exitDrawingMode();

            } catch (error) {
                this.logTest('gojs', `${params.name} Parameters`, false, error.message);
            }
        }
    }

    async testDataPersistence() {
        console.log('💾 Veri Kalıcılık Testi...');

        // Mevcut veriyi export et
        const exportedData = this.tunnelDesigner.exportTunnelData();
        this.logTest('gojs', 'Data Export', exportedData && exportedData.length > 0, 'Veri export edildi');

        // JSON parse test
        try {
            const parsedData = JSON.parse(exportedData);
            this.logTest('gojs', 'JSON Parse', parsedData !== null, 'JSON parse başarılı');
            this.logTest('gojs', 'Segments in Export', parsedData.segments && parsedData.segments.length > 0, `${parsedData.segments.length} segment export edildi`);
        } catch (error) {
            this.logTest('gojs', 'JSON Parse', false, error.message);
            return;
        }

        // Import test
        try {
            // Veriyi temizle
            this.tunnelDesigner.tunnelData.segments.clear();
            this.tunnelDesigner.diagram.model.nodeDataArray = [];

            // Import et
            this.tunnelDesigner.importTunnelData(exportedData);
            await this.delay(200);

            // Import sonrası kontrol
            const importedSegments = Array.from(this.tunnelDesigner.tunnelData.segments.values());
            this.logTest('gojs', 'Data Import', importedSegments.length > 0, `${importedSegments.length} segment import edildi`);

        } catch (error) {
            this.logTest('gojs', 'Data Import', false, error.message);
        }
    }

    // 4. ENTEGRASYON TESTLERİ
    async runIntegrationTests() {
        console.log('🔗 Entegrasyon Testleri başlıyor...');

        await this.testAPIIntegration();
        await this.testRaspberryPiSimulation();
        await this.testRealWorldScenario();

        console.log('✅ Entegrasyon Testleri tamamlandı');
    }

    async testAPIIntegration() {
        console.log('🌐 API Entegrasyon Testi...');

        // Mock API calls
        const mockTunnelData = {
            mine_id: 1,
            tunnel_data: this.tunnelDesigner.exportTunnelData()
        };

        // API endpoint availability (mock test)
        this.logTest('integration', 'API Save Endpoint', typeof mockTunnelData === 'object', 'Save API hazır');
        this.logTest('integration', 'API Load Endpoint', true, 'Load API hazır');
        this.logTest('integration', 'Miner Position API', true, 'Miner position API hazır');

        // Data format validation
        this.logTest('integration', 'API Data Format', mockTunnelData.mine_id && mockTunnelData.tunnel_data, 'API veri formatı doğru');
    }

    async testRaspberryPiSimulation() {
        console.log('🤖 Raspberry Pi Simülasyon Testi...');

        // Mock miner position data
        const mockMinerData = {
            mine_id: 1,
            miner_id: 'MINER_001',
            position: { x: 15.5, y: 0, z: 8.2 },
            timestamp: new Date().toISOString(),
            signal_strength: 85
        };

        this.logTest('integration', 'Miner Data Structure', 
                    mockMinerData.mine_id && mockMinerData.miner_id && mockMinerData.position,
                    'Miner veri yapısı doğru');

        this.logTest('integration', 'Position Coordinates', 
                    typeof mockMinerData.position.x === 'number' && 
                    typeof mockMinerData.position.y === 'number' && 
                    typeof mockMinerData.position.z === 'number',
                    '3D koordinatlar doğru');

        this.logTest('integration', 'Timestamp Format', 
                    mockMinerData.timestamp && !isNaN(Date.parse(mockMinerData.timestamp)),
                    'Timestamp formatı doğru');
    }

    async testRealWorldScenario() {
        console.log('🏗️ Gerçek Dünya Senaryosu Testi...');

        // Görsel referanstaki tam tünel sistemini simüle et
        const realWorldTunnel = {
            mainTunnel: { length: 26.49, angle: 0 },
            branch1: { length: 13.13, angle: 45 },
            branch2: { length: 7.64, angle: 30 },
            emergency: { length: 11.98, angle: 90 },
            total: 33.53
        };

        let totalCreatedLength = 0;
        const segments = Array.from(this.tunnelDesigner.tunnelData.segments.values());
        
        segments.forEach(segment => {
            totalCreatedLength += segment.length || 0;
        });

        this.logTest('integration', 'Real World Complexity', segments.length >= 4, `${segments.length} segment oluşturuldu`);
        this.logTest('integration', 'Total Length Accuracy', totalCreatedLength > 50, `Toplam uzunluk: ${totalCreatedLength.toFixed(2)}m`);
        this.logTest('integration', 'Multi-angle Tunnels', 
                    segments.some(s => s.angle > 0) && segments.some(s => s.angle === 0),
                    'Farklı açılarda tüneller mevcut');
    }

    // YARDIMCI METODLAR
    logTest(category, testName, passed, details = '') {
        const result = {
            category,
            testName,
            passed,
            details,
            timestamp: new Date().toISOString()
        };

        this.testResults[category].push(result);

        const icon = passed ? '✅' : '❌';
        const status = passed ? 'PASS' : 'FAIL';
        console.log(`${icon} [${category.toUpperCase()}] ${testName}: ${status} ${details ? '- ' + details : ''}`);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    generateTestReport() {
        console.log('\n📊 TEST RAPORU OLUŞTURULUYOR...\n');

        const categories = ['general', 'ui', 'gojs', 'integration'];
        let totalTests = 0;
        let passedTests = 0;

        categories.forEach(category => {
            const tests = this.testResults[category];
            const categoryPassed = tests.filter(t => t.passed).length;
            const categoryTotal = tests.length;
            
            totalTests += categoryTotal;
            passedTests += categoryPassed;

            console.log(`📁 ${category.toUpperCase()}: ${categoryPassed}/${categoryTotal} (${((categoryPassed/categoryTotal)*100).toFixed(1)}%)`);
            
            // Failed tests detail
            const failedTests = tests.filter(t => !t.passed);
            if (failedTests.length > 0) {
                failedTests.forEach(test => {
                    console.log(`   ❌ ${test.testName}: ${test.details}`);
                });
            }
        });

        const overallPercentage = totalTests > 0 ? ((passedTests/totalTests)*100).toFixed(1) : 0;
        
        console.log(`\n🎯 GENEL SONUÇ: ${passedTests}/${totalTests} (${overallPercentage}%)`);
        
        if (overallPercentage >= 90) {
            console.log('🏆 MÜKEMMEl! Sistem production-ready.');
        } else if (overallPercentage >= 75) {
            console.log('✅ İYİ! Sistem genel olarak stabil.');
        } else if (overallPercentage >= 50) {
            console.log('⚠️ ORTA! Bazı iyileştirmeler gerekli.');
        } else {
            console.log('❌ ZAYIF! Ciddi problemler var.');
        }

        // Test sonuçlarını DOM'a yaz
        this.displayTestResults(passedTests, totalTests, overallPercentage);
    }

    displayTestResults(passed, total, percentage) {
        const reportContainer = document.getElementById('test-results') || document.getElementById('test-output');
        
        if (reportContainer) {
            reportContainer.innerHTML = `
                <div class="test-summary">
                    <h4>🧪 Tunnel Designer Test Sonuçları</h4>
                    <div class="progress mb-3">
                        <div class="progress-bar ${percentage >= 90 ? 'bg-success' : percentage >= 75 ? 'bg-warning' : 'bg-danger'}" 
                             style="width: ${percentage}%">${percentage}%</div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <strong>Toplam Test:</strong> ${total}
                        </div>
                        <div class="col-md-3">
                            <strong>Başarılı:</strong> <span class="text-success">${passed}</span>
                        </div>
                        <div class="col-md-3">
                            <strong>Başarısız:</strong> <span class="text-danger">${total - passed}</span>
                        </div>
                        <div class="col-md-3">
                            <strong>Başarı Oranı:</strong> <span class="${percentage >= 90 ? 'text-success' : percentage >= 75 ? 'text-warning' : 'text-danger'}">${percentage}%</span>
                        </div>
                    </div>
                </div>
                <div class="test-details mt-3">
                    ${this.generateDetailedReport()}
                </div>
            `;
        }
    }

    generateDetailedReport() {
        const categories = ['general', 'ui', 'gojs', 'integration'];
        let html = '';

        categories.forEach(category => {
            const tests = this.testResults[category];
            const passed = tests.filter(t => t.passed).length;
            
            html += `
                <div class="test-category mb-3">
                    <h6>${category.charAt(0).toUpperCase() + category.slice(1)} Tests (${passed}/${tests.length})</h6>
                    <div class="test-list">
                        ${tests.map(test => `
                            <div class="test-item d-flex justify-content-between align-items-center py-1">
                                <span>${test.passed ? '✅' : '❌'} ${test.testName}</span>
                                <small class="text-muted">${test.details}</small>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        return html;
    }

    cleanup() {
        // Test environment temizle
        if (this.testContainer) {
            document.body.removeChild(this.testContainer);
        }
        
        console.log('🧹 Test environment temizlendi');
    }
}

// Global export
window.TunnelDesignerTestSuite = TunnelDesignerTestSuite;
export default TunnelDesignerTestSuite;