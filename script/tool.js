// Tool Categories and their tools
const toolCategories = {
    textTools: {
        name: "Text Tools",
        icon: "fas fa-font",
        tools: {
            contentRewriter: {
                name: "Content Rewriter",
                description: "Rewrite your content in a unique and engaging way",
                icon: "fas fa-sync",
                template: `
                    <div class="tool-interface">
                        <textarea class="form-control mb-3" rows="5" placeholder="Enter your text to rewrite..."></textarea>
                        <button class="btn btn-primary" onclick="handleContentRewrite(this)">Rewrite Content</button>
                        <div class="tool-output mt-3"></div>
                    </div>
                `
            },
            summarizer: {
                name: "Content Summarizer",
                description: "Generate concise summaries of long texts",
                icon: "fas fa-compress-alt",
                template: `
                    <div class="tool-interface">
                        <textarea class="form-control mb-3" rows="5" placeholder="Enter your text to summarize..."></textarea>
                        <button class="btn btn-primary" onclick="handleSummarize(this)">Summarize</button>
                        <div class="tool-output mt-3"></div>
                    </div>
                `
            },
            grammarChecker: {
                name: "Grammar Checker",
                description: "Check and correct grammar errors in your text",
                icon: "fas fa-check-double",
                template: `
                    <div class="tool-interface">
                        <textarea class="form-control mb-3" rows="5" placeholder="Enter text to check grammar..."></textarea>
                        <button class="btn btn-primary" onclick="handleGrammarCheck(this)">Check Grammar</button>
                        <div class="tool-output mt-3"></div>
                    </div>
                `
            }
        }
    },
    contentTools: {
        name: "Content Creation",
        icon: "fas fa-pencil-alt",
        tools: {
            paragraphGenerator: {
                name: "Paragraph Generator",
                description: "Generate unique paragraphs based on your topic",
                icon: "fas fa-paragraph",
                template: `
                    <div class="tool-interface">
                        <input type="text" class="form-control mb-3" placeholder="Enter your topic...">
                        <button class="btn btn-primary" onclick="handleParagraphGeneration(this)">Generate Paragraph</button>
                        <div class="tool-output mt-3"></div>
                    </div>
                `
            },
            promptGenerator: {
                name: "AI Prompt Generator",
                description: "Generate creative prompts for AI models",
                icon: "fas fa-robot",
                template: `
                    <div class="tool-interface">
                        <input type="text" class="form-control mb-3" placeholder="Enter your topic or theme...">
                        <button class="btn btn-primary" onclick="handlePromptGeneration(this)">Generate Prompt</button>
                        <div class="tool-output mt-3"></div>
                    </div>
                `
            }
        }
    },
    // Add more categories and tools here...
};

// Tool handling functions
function handleContentRewrite(button) {
    const toolInterface = button.closest('.tool-interface');
    const input = toolInterface.querySelector('textarea').value;
    const output = toolInterface.querySelector('.tool-output');
    
    // Simulate processing (replace with actual API call)
    output.innerHTML = '<div class="loading-spinner active"><i class="fas fa-spinner fa-spin"></i></div>';
    setTimeout(() => {
        output.innerHTML = `Rewritten content: ${input.split(' ').reverse().join(' ')}`;
    }, 1000);
}

function handleSummarize(button) {
    const toolInterface = button.closest('.tool-interface');
    const input = toolInterface.querySelector('textarea').value;
    const output = toolInterface.querySelector('.tool-output');
    
    output.innerHTML = '<div class="loading-spinner active"><i class="fas fa-spinner fa-spin"></i></div>';
    setTimeout(() => {
        output.innerHTML = `Summary: ${input.split('.')[0]}.`;
    }, 1000);
}

function handleGrammarCheck(button) {
    const toolInterface = button.closest('.tool-interface');
    const input = toolInterface.querySelector('textarea').value;
    const output = toolInterface.querySelector('.tool-output');
    
    output.innerHTML = '<div class="loading-spinner active"><i class="fas fa-spinner fa-spin"></i></div>';
    setTimeout(() => {
        output.innerHTML = 'No grammar errors found.';
    }, 1000);
}

function handleParagraphGeneration(button) {
    const toolInterface = button.closest('.tool-interface');
    const input = toolInterface.querySelector('input').value;
    const output = toolInterface.querySelector('.tool-output');
    
    output.innerHTML = '<div class="loading-spinner active"><i class="fas fa-spinner fa-spin"></i></div>';
    setTimeout(() => {
        output.innerHTML = `Generated paragraph about ${input}...`;
    }, 1000);
}

function handlePromptGeneration(button) {
    const toolInterface = button.closest('.tool-interface');
    const input = toolInterface.querySelector('input').value;
    const output = toolInterface.querySelector('.tool-output');
    
    output.innerHTML = '<div class="loading-spinner active"><i class="fas fa-spinner fa-spin"></i></div>';
    setTimeout(() => {
        output.innerHTML = `Write a creative story about ${input}...`;
    }, 1000);
}

// Tools data structure
const toolsData = {
    text: [
        {
            id: 'content-rewriter',
            title: 'Content Rewriter',
            description: 'Rewrite your content while maintaining its original meaning',
            icon: 'fas fa-edit',
            path: 'tools/text/content-rewriter.html'
        },
        {
            id: 'summarizer',
            title: 'Content Summarizer',
            description: 'Summarize long articles and documents into concise versions',
            icon: 'fas fa-file-alt',
            path: 'tools/text/summarizer.html'
        },
        {
            id: 'grammar-checker',
            title: 'Grammar Checker',
            description: 'Check and correct grammar mistakes in your text',
            icon: 'fas fa-spell-check',
            path: 'tools/text/grammar-checker.html'
        },
        {
            id: 'paragraph-generator',
            title: 'Paragraph Generator',
            description: 'Generate unique paragraphs on any topic',
            icon: 'fas fa-paragraph',
            path: 'tools/text/paragraph-generator.html'
        }
    ],
    image: [
        {
            id: 'image-to-png',
            title: 'Image to PNG',
            description: 'Convert images to PNG format',
            icon: 'fas fa-image',
            path: 'tools/image/image-to-png.html'
        },
        {
            id: 'image-to-jpg',
            title: 'Image to JPG',
            description: 'Convert images to JPG format',
            icon: 'fas fa-file-image',
            path: 'tools/image/image-to-jpg.html'
        },
        {
            id: 'image-resizer',
            title: 'Image Resizer',
            description: 'Resize images while maintaining quality',
            icon: 'fas fa-expand-arrows-alt',
            path: 'tools/image/image-resizer.html'
        }
    ],
    seo: [
        {
            id: 'meta-tag-generator',
            title: 'Meta Tag Generator',
            description: 'Generate optimized meta tags for your website',
            icon: 'fas fa-tags',
            path: 'tools/seo/meta-tag-generator.html'
        },
        {
            id: 'keyword-density',
            title: 'Keyword Density Checker',
            description: 'Analyze keyword density in your content',
            icon: 'fas fa-chart-pie',
            path: 'tools/seo/keyword-density.html'
        }
    ],
    developer: [
        {
            id: 'json-formatter',
            title: 'JSON Formatter',
            description: 'Format and validate JSON data',
            icon: 'fas fa-code',
            path: 'tools/developer/json-formatter.html'
        },
        {
            id: 'html-to-markdown',
            title: 'HTML to Markdown',
            description: 'Convert HTML to Markdown format',
            icon: 'fas fa-file-code',
            path: 'tools/developer/html-to-markdown.html'
        }
    ],
    math: [
        {
            id: 'percentage-calculator',
            title: 'Percentage Calculator',
            description: 'Calculate percentages and percentage changes',
            icon: 'fas fa-percentage',
            path: 'tools/math/percentage-calculator.html'
        },
        {
            id: 'bmi-calculator',
            title: 'BMI Calculator',
            description: 'Calculate your Body Mass Index',
            icon: 'fas fa-weight',
            path: 'tools/math/bmi-calculator.html'
        }
    ]
};

// Function to render tools in the index page
function renderTools() {
    const toolsGrid = document.getElementById('tools-grid');
    if (!toolsGrid) return;

    Object.entries(toolsData).forEach(([category, tools]) => {
        const categorySection = document.createElement('section');
        categorySection.className = 'category-section';
        categorySection.id = category;

        const categoryTitle = document.createElement('h2');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1) + ' Tools';

        const toolsRow = document.createElement('div');
        toolsRow.className = 'row g-4';

        tools.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.className = 'col-md-4 col-lg-3';
            toolCard.innerHTML = `
                <div class="card tool-card h-100">
                    <div class="card-body">
                        <i class="${tool.icon} fa-2x mb-3 text-primary"></i>
                        <h5 class="card-title">${tool.title}</h5>
                        <p class="card-text">${tool.description}</p>
                        <a href="${tool.path}" class="btn btn-primary">Use Tool</a>
                    </div>
                </div>
            `;
            toolsRow.appendChild(toolCard);
        });

        categorySection.appendChild(categoryTitle);
        categorySection.appendChild(toolsRow);
        toolsGrid.appendChild(categorySection);
    });
}

// Function to get tool data by ID
function getToolById(id) {
    for (const category in toolsData) {
        const tool = toolsData[category].find(t => t.id === id);
        if (tool) return tool;
    }
    return null;
}

// Export functions and data
window.toolsData = {
    toolsData,
    renderTools,
    getToolById
};

// Tool Utilities
const toolUtils = {
    // Show loading spinner
    showLoading: function() {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        return spinner;
    },

    // Hide loading spinner
    hideLoading: function(spinner) {
        if (spinner && spinner.parentNode) {
            spinner.parentNode.removeChild(spinner);
        }
    },

    // Show success message
    showSuccess: function(message, container) {
        const alert = document.createElement('div');
        alert.className = 'success-message';
        alert.innerHTML = `<i class="fas fa-check-circle me-2"></i>${message}`;
        container.insertBefore(alert, container.firstChild);
        setTimeout(() => alert.remove(), 5000);
    },

    // Show error message
    showError: function(message, container) {
        const alert = document.createElement('div');
        alert.className = 'error-message';
        alert.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i>${message}`;
        container.insertBefore(alert, container.firstChild);
        setTimeout(() => alert.remove(), 5000);
    },

    // Copy text to clipboard
    copyToClipboard: function(text) {
        navigator.clipboard.writeText(text)
            .then(() => toolUtils.showSuccess('Copied to clipboard!', document.querySelector('.tool-container')))
            .catch(() => toolUtils.showError('Failed to copy text', document.querySelector('.tool-container')));
    },

    // Download file
    downloadFile: function(content, filename, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    // Format file size
    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // Validate email
    validateEmail: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // Validate URL
    validateUrl: function(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },

    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Format date
    formatDate: function(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Generate random string
    generateRandomString: function(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },

    // Sanitize HTML
    sanitizeHTML: function(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    // Check file type
    isImageFile: function(file) {
        return /^image\//.test(file.type);
    },

    isDocumentFile: function(file) {
        return /^application\/(pdf|msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/.test(file.type);
    },

    isVideoFile: function(file) {
        return /^video\//.test(file.type);
    },

    isAudioFile: function(file) {
        return /^audio\//.test(file.type);
    },

    // Handle file upload
    handleFileUpload: function(file, callback) {
        const reader = new FileReader();
        reader.onload = function(e) {
            callback(e.target.result);
        };
        reader.readAsDataURL(file);
    },

    // Get file extension
    getFileExtension: function(filename) {
        return filename.split('.').pop().toLowerCase();
    },

    // Check if browser supports WebP
    supportsWebP: function() {
        const elem = document.createElement('canvas');
        if (!!(elem.getContext && elem.getContext('2d'))) {
            return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        }
        return false;
    },

    // Check if browser supports AVIF
    supportsAVIF: function() {
        const elem = document.createElement('canvas');
        if (!!(elem.getContext && elem.getContext('2d'))) {
            return elem.toDataURL('image/avif').indexOf('data:image/avif') === 0;
        }
        return false;
    },

    // Check if browser supports WebM
    supportsWebM: function() {
        const video = document.createElement('video');
        return video.canPlayType('video/webm') !== '';
    },

    // Check if browser supports MP4
    supportsMP4: function() {
        const video = document.createElement('video');
        return video.canPlayType('video/mp4') !== '';
    },

    // Check if browser supports HLS
    supportsHLS: function() {
        const video = document.createElement('video');
        return video.canPlayType('application/vnd.apple.mpegurl') !== '';
    },

    // Check if browser supports DASH
    supportsDASH: function() {
        const video = document.createElement('video');
        return video.canPlayType('application/dash+xml') !== '';
    },

    // Check if browser supports MSE
    supportsMSE: function() {
        return 'MediaSource' in window;
    },

    // Check if browser supports WebGL
    supportsWebGL: function() {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    },

    // Check if browser supports WebGL2
    supportsWebGL2: function() {
        const canvas = document.createElement('canvas');
        return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
    },

    // Check if browser supports WebGPU
    supportsWebGPU: function() {
        return 'gpu' in navigator;
    },

    // Check if browser supports WebXR
    supportsWebXR: function() {
        return 'xr' in navigator;
    },

    // Check if browser supports WebAssembly
    supportsWebAssembly: function() {
        return 'WebAssembly' in window;
    },

    // Check if browser supports Web Workers
    supportsWebWorkers: function() {
        return 'Worker' in window;
    },

    // Check if browser supports Service Workers
    supportsServiceWorkers: function() {
        return 'serviceWorker' in navigator;
    },

    // Check if browser supports Push API
    supportsPushAPI: function() {
        return 'PushManager' in window;
    },

    // Check if browser supports Notifications API
    supportsNotifications: function() {
        return 'Notification' in window;
    },

    // Check if browser supports Geolocation API
    supportsGeolocation: function() {
        return 'geolocation' in navigator;
    },

    // Check if browser supports Device Orientation API
    supportsDeviceOrientation: function() {
        return 'DeviceOrientationEvent' in window;
    },

    // Check if browser supports Device Motion API
    supportsDeviceMotion: function() {
        return 'DeviceMotionEvent' in window;
    },

    // Check if browser supports Vibration API
    supportsVibration: function() {
        return 'vibrate' in navigator;
    },

    // Check if browser supports Battery API
    supportsBattery: function() {
        return 'getBattery' in navigator;
    },

    // Check if browser supports Network Information API
    supportsNetworkInfo: function() {
        return 'connection' in navigator;
    },

    // Check if browser supports Payment Request API
    supportsPaymentRequest: function() {
        return 'PaymentRequest' in window;
    },

    // Check if browser supports Credential Management API
    supportsCredentialManagement: function() {
        return 'credentials' in navigator;
    },

    // Check if browser supports Web Share API
    supportsWebShare: function() {
        return 'share' in navigator;
    },

    // Check if browser supports Web Share Target API
    supportsWebShareTarget: function() {
        return 'shareTarget' in navigator;
    },

    // Check if browser supports Web Bluetooth API
    supportsWebBluetooth: function() {
        return 'bluetooth' in navigator;
    },

    // Check if browser supports Web USB API
    supportsWebUSB: function() {
        return 'usb' in navigator;
    },

    // Check if browser supports Web NFC API
    supportsWebNFC: function() {
        return 'nfc' in navigator;
    },

    // Check if browser supports Web Serial API
    supportsWebSerial: function() {
        return 'serial' in navigator;
    },

    // Check if browser supports Web MIDI API
    supportsWebMIDI: function() {
        return 'requestMIDIAccess' in navigator;
    },

    // Check if browser supports Web HID API
    supportsWebHID: function() {
        return 'hid' in navigator;
    },

    // Check if browser supports Web Gamepad API
    supportsWebGamepad: function() {
        return 'getGamepads' in navigator;
    },

    // Check if browser supports Web Speech API
    supportsWebSpeech: function() {
        return 'speechSynthesis' in window && 'SpeechRecognition' in window;
    },

    // Check if browser supports Web Audio API
    supportsWebAudio: function() {
        return 'AudioContext' in window || 'webkitAudioContext' in window;
    },

    // Check if browser supports WebRTC
    supportsWebRTC: function() {
        return 'RTCPeerConnection' in window;
    },

    // Check if browser supports WebSocket
    supportsWebSocket: function() {
        return 'WebSocket' in window;
    },

    // Check if browser supports WebTransport
    supportsWebTransport: function() {
        return 'WebTransport' in window;
    },

    // Check if browser supports WebCodecs
    supportsWebCodecs: function() {
        return 'VideoEncoder' in window && 'AudioEncoder' in window;
    },

    // Check if browser supports WebXR Device API
    supportsWebXRDevice: function() {
        return 'xr' in navigator && 'isSessionSupported' in navigator.xr;
    },

    // Check if browser supports WebXR Hit Test
    supportsWebXRHitTest: function() {
        return 'xr' in navigator && 'requestHitTestSource' in XRSession.prototype;
    },

    // Check if browser supports WebXR Anchors
    supportsWebXRAnchors: function() {
        return 'xr' in navigator && 'createAnchor' in XRSession.prototype;
    },

    // Check if browser supports WebXR Planes
    supportsWebXRPlanes: function() {
        return 'xr' in navigator && 'detectedPlanes' in XRSession.prototype;
    },

    // Check if browser supports WebXR Meshes
    supportsWebXRMeshes: function() {
        return 'xr' in navigator && 'detectedMeshes' in XRSession.prototype;
    },

    // Check if browser supports WebXR Lighting Estimation
    supportsWebXRLighting: function() {
        return 'xr' in navigator && 'lightingEstimation' in XRSession.prototype;
    },

    // Check if browser supports WebXR Hand Tracking
    supportsWebXRHandTracking: function() {
        return 'xr' in navigator && 'handTracking' in XRSession.prototype;
    },

    // Check if browser supports WebXR Eye Tracking
    supportsWebXREyeTracking: function() {
        return 'xr' in navigator && 'eyeTracking' in XRSession.prototype;
    },

    // Check if browser supports WebXR Face Tracking
    supportsWebXRFaceTracking: function() {
        return 'xr' in navigator && 'faceTracking' in XRSession.prototype;
    },

    // Check if browser supports WebXR Body Tracking
    supportsWebXRBodyTracking: function() {
        return 'xr' in navigator && 'bodyTracking' in XRSession.prototype;
    },

    // Check if browser supports WebXR Scene Understanding
    supportsWebXRSceneUnderstanding: function() {
        return 'xr' in navigator && 'sceneUnderstanding' in XRSession.prototype;
    },

    // Check if browser supports WebXR Depth Sensing
    supportsWebXRDepthSensing: function() {
        return 'xr' in navigator && 'depthSensing' in XRSession.prototype;
    },

    // Check if browser supports WebXR Image Tracking
    supportsWebXRImageTracking: function() {
        return 'xr' in navigator && 'imageTracking' in XRSession.prototype;
    },

    // Check if browser supports WebXR Object Tracking
    supportsWebXRObjectTracking: function() {
        return 'xr' in navigator && 'objectTracking' in XRSession.prototype;
    },

    // Check if browser supports WebXR Marker Tracking
    supportsWebXRMarkerTracking: function() {
        return 'xr' in navigator && 'markerTracking' in XRSession.prototype;
    },

    // Check if browser supports WebXR QR Code Tracking
    supportsWebXRQRCodeTracking: function() {
        return 'xr' in navigator && 'qrCodeTracking' in XRSession.prototype;
    },

    // Check if browser supports WebXR Barcode Tracking
    supportsWebXRBarcodeTracking: function() {
        return 'xr' in navigator && 'barcodeTracking' in XRSession.prototype;
    },

    // Check if browser supports WebXR Text Tracking
    supportsWebXRTextTracking: function() {
        return 'xr' in navigator && 'textTracking' in XRSession.prototype;
    },

    // Check if browser supports WebXR Face Mesh
    supportsWebXRFaceMesh: function() {
        return 'xr' in navigator && 'faceMesh' in XRSession.prototype;
    },

    // Check if browser supports WebXR Hand Mesh
    supportsWebXRHandMesh: function() {
        return 'xr' in navigator && 'handMesh' in XRSession.prototype;
    },

    // Check if browser supports WebXR Body Mesh
    supportsWebXRBodyMesh: function() {
        return 'xr' in navigator && 'bodyMesh' in XRSession.prototype;
    },

    // Check if browser supports WebXR Scene Mesh
    supportsWebXRSceneMesh: function() {
        return 'xr' in navigator && 'sceneMesh' in XRSession.prototype;
    },

    // Check if browser supports WebXR Depth Mesh
    supportsWebXRDepthMesh: function() {
        return 'xr' in navigator && 'depthMesh' in XRSession.prototype;
    },

    // Check if browser supports WebXR Image Mesh
    supportsWebXRImageMesh: function() {
        return 'xr' in navigator && 'imageMesh' in XRSession.prototype;
    },

    // Check if browser supports WebXR Object Mesh
    supportsWebXRObjectMesh: function() {
        return 'xr' in navigator && 'objectMesh' in XRSession.prototype;
    },

    // Check if browser supports WebXR Marker Mesh
    supportsWebXRMarkerMesh: function() {
        return 'xr' in navigator && 'markerMesh' in XRSession.prototype;
    },

    // Check if browser supports WebXR QR Code Mesh
    supportsWebXRQRCodeMesh: function() {
        return 'xr' in navigator && 'qrCodeMesh' in XRSession.prototype;
    },

    // Check if browser supports WebXR Barcode Mesh
    supportsWebXRBarcodeMesh: function() {
        return 'xr' in navigator && 'barcodeMesh' in XRSession.prototype;
    },

    // Check if browser supports WebXR Text Mesh
    supportsWebXRTextMesh: function() {
        return 'xr' in navigator && 'textMesh' in XRSession.prototype;
    }
}; 