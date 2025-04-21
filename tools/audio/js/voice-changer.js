class VoiceChanger {
    constructor() {
        this.audioContext = null;
        this.audioBuffer = null;
        this.sourceNode = null;
        this.effects = {
            pitch: null,
            reverb: null,
            distortion: null,
            delay: null
        };
        this.isPlaying = false;

        // Initialize audio context
        this.initAudioContext();
        
        // Add event listeners
        this.addEventListeners();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            alert('Web Audio API is not supported in this browser.');
        }
    }

    addEventListeners() {
        // File input
        document.getElementById('audio-input').addEventListener('change', (e) => {
            this.handleFileSelect(e.target.files[0]);
        });

        // Drop zone
        const dropZone = document.getElementById('drop-zone');
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            this.handleFileSelect(e.dataTransfer.files[0]);
        });

        // Effect sliders
        const sliders = ['pitch', 'reverb', 'distortion', 'delay'];
        sliders.forEach(effect => {
            const slider = document.getElementById(`${effect}-slider`);
            const valueDisplay = document.getElementById(`${effect}-value`);
            
            slider.addEventListener('input', (e) => {
                valueDisplay.textContent = e.target.value;
            });
        });

        // Preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.applyPreset(btn.dataset.preset);
            });
        });

        // Action buttons
        document.getElementById('apply-btn').addEventListener('click', () => {
            this.applyEffects();
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetEffects();
        });

        document.getElementById('download-btn').addEventListener('click', () => {
            this.downloadAudio();
        });
    }

    async handleFileSelect(file) {
        if (!file || !file.type.startsWith('audio/')) {
            alert('Please select a valid audio file.');
            return;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            this.playAudio();
        } catch (error) {
            console.error('Error loading audio file:', error);
            alert('Error loading audio file. Please try again.');
        }
    }

    playAudio() {
        if (!this.audioBuffer) return;

        // Stop any existing playback
        this.stopAudio();

        // Create source node
        this.sourceNode = this.audioContext.createBufferSource();
        this.sourceNode.buffer = this.audioBuffer;

        // Create effects
        this.createEffects();

        // Connect nodes
        this.connectNodes();

        // Start playback
        this.sourceNode.start();
        this.isPlaying = true;
    }

    createEffects() {
        // Pitch shifter
        this.effects.pitch = this.audioContext.createBiquadFilter();
        this.effects.pitch.type = 'lowpass';
        this.effects.pitch.frequency.value = 1000;

        // Reverb
        this.effects.reverb = this.audioContext.createConvolver();
        // Create a simple impulse response for reverb
        const reverbBuffer = this.audioContext.createBuffer(2, this.audioContext.sampleRate * 2, this.audioContext.sampleRate);
        const leftChannel = reverbBuffer.getChannelData(0);
        const rightChannel = reverbBuffer.getChannelData(1);
        for (let i = 0; i < reverbBuffer.length; i++) {
            leftChannel[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / reverbBuffer.length, 2);
            rightChannel[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / reverbBuffer.length, 2);
        }
        this.effects.reverb.buffer = reverbBuffer;

        // Distortion
        this.effects.distortion = this.audioContext.createWaveShaper();
        this.effects.distortion.curve = this.makeDistortionCurve(0);

        // Delay
        this.effects.delay = this.audioContext.createDelay();
        this.effects.delay.delayTime.value = 0;
    }

    connectNodes() {
        // Connect source to effects chain
        this.sourceNode.connect(this.effects.pitch);
        this.effects.pitch.connect(this.effects.reverb);
        this.effects.reverb.connect(this.effects.distortion);
        this.effects.distortion.connect(this.effects.delay);
        this.effects.delay.connect(this.audioContext.destination);
    }

    makeDistortionCurve(amount) {
        const samples = 44100;
        const curve = new Float32Array(samples);
        const deg = Math.PI / 180;
        for (let i = 0; i < samples; i++) {
            const x = (i * 2) / samples - 1;
            curve[i] = (3 + amount) * x * 20 * deg / (Math.PI + amount * Math.abs(x));
        }
        return curve;
    }

    applyEffects() {
        if (!this.sourceNode) return;

        // Update effect parameters
        this.effects.pitch.frequency.value = 1000 * document.getElementById('pitch-slider').value;
        this.effects.reverb.gain.value = document.getElementById('reverb-slider').value;
        this.effects.distortion.curve = this.makeDistortionCurve(document.getElementById('distortion-slider').value);
        this.effects.delay.delayTime.value = document.getElementById('delay-slider').value;
    }

    resetEffects() {
        // Reset sliders
        document.getElementById('pitch-slider').value = 1;
        document.getElementById('reverb-slider').value = 0;
        document.getElementById('distortion-slider').value = 0;
        document.getElementById('delay-slider').value = 0;

        // Update displays
        document.getElementById('pitch-value').textContent = '1.0';
        document.getElementById('reverb-value').textContent = '0.0';
        document.getElementById('distortion-value').textContent = '0.0';
        document.getElementById('delay-value').textContent = '0.0';

        // Reapply effects
        this.applyEffects();
    }

    applyPreset(preset) {
        switch (preset) {
            case 'robot':
                document.getElementById('pitch-slider').value = 0.5;
                document.getElementById('distortion-slider').value = 0.8;
                document.getElementById('reverb-slider').value = 0.2;
                document.getElementById('delay-slider').value = 0.1;
                break;
            case 'alien':
                document.getElementById('pitch-slider').value = 1.8;
                document.getElementById('distortion-slider').value = 0.6;
                document.getElementById('reverb-slider').value = 0.4;
                document.getElementById('delay-slider').value = 0.2;
                break;
            case 'monster':
                document.getElementById('pitch-slider').value = 0.3;
                document.getElementById('distortion-slider').value = 0.9;
                document.getElementById('reverb-slider').value = 0.5;
                document.getElementById('delay-slider').value = 0.3;
                break;
            case 'chipmunk':
                document.getElementById('pitch-slider').value = 2.0;
                document.getElementById('distortion-slider').value = 0.1;
                document.getElementById('reverb-slider').value = 0.1;
                document.getElementById('delay-slider').value = 0;
                break;
        }

        // Update displays
        document.getElementById('pitch-value').textContent = document.getElementById('pitch-slider').value;
        document.getElementById('reverb-value').textContent = document.getElementById('reverb-slider').value;
        document.getElementById('distortion-value').textContent = document.getElementById('distortion-slider').value;
        document.getElementById('delay-value').textContent = document.getElementById('delay-slider').value;

        // Apply effects
        this.applyEffects();
    }

    stopAudio() {
        if (this.sourceNode) {
            this.sourceNode.stop();
            this.sourceNode = null;
        }
        this.isPlaying = false;
    }

    async downloadAudio() {
        if (!this.audioBuffer) return;

        try {
            // Create offline audio context
            const offlineContext = new OfflineAudioContext(
                this.audioBuffer.numberOfChannels,
                this.audioBuffer.length,
                this.audioBuffer.sampleRate
            );

            // Create source node
            const source = offlineContext.createBufferSource();
            source.buffer = this.audioBuffer;

            // Create and connect effects
            const pitch = offlineContext.createBiquadFilter();
            const reverb = offlineContext.createConvolver();
            const distortion = offlineContext.createWaveShaper();
            const delay = offlineContext.createDelay();

            // Set effect parameters
            pitch.frequency.value = 1000 * document.getElementById('pitch-slider').value;
            reverb.gain.value = document.getElementById('reverb-slider').value;
            distortion.curve = this.makeDistortionCurve(document.getElementById('distortion-slider').value);
            delay.delayTime.value = document.getElementById('delay-slider').value;

            // Connect nodes
            source.connect(pitch);
            pitch.connect(reverb);
            reverb.connect(distortion);
            distortion.connect(delay);
            delay.connect(offlineContext.destination);

            // Start rendering
            source.start();
            const renderedBuffer = await offlineContext.startRendering();

            // Convert to WAV
            const wavBuffer = this.bufferToWav(renderedBuffer);

            // Create download link
            const blob = new Blob([wavBuffer], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'modified_audio.wav';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error processing audio:', error);
            alert('Error processing audio. Please try again.');
        }
    }

    bufferToWav(buffer) {
        const numChannels = buffer.numberOfChannels;
        const sampleRate = buffer.sampleRate;
        const format = 1; // PCM
        const bitDepth = 16;
        const bytesPerSample = bitDepth / 8;
        const blockAlign = numChannels * bytesPerSample;

        const wav = new ArrayBuffer(44 + buffer.length * blockAlign);
        const view = new DataView(wav);

        // Write WAV header
        this.writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + buffer.length * blockAlign, true);
        this.writeString(view, 8, 'WAVE');
        this.writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, format, true);
        view.setUint16(22, numChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * blockAlign, true);
        view.setUint16(32, blockAlign, true);
        view.setUint16(34, bitDepth, true);
        this.writeString(view, 36, 'data');
        view.setUint32(40, buffer.length * blockAlign, true);

        // Write audio data
        const offset = 44;
        const channels = [];
        for (let i = 0; i < numChannels; i++) {
            channels.push(buffer.getChannelData(i));
        }

        for (let i = 0; i < buffer.length; i++) {
            for (let channel = 0; channel < numChannels; channel++) {
                const sample = Math.max(-1, Math.min(1, channels[channel][i]));
                view.setInt16(offset + (i * blockAlign) + (channel * bytesPerSample), sample * 0x7FFF, true);
            }
        }

        return wav;
    }

    writeString(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }
}

// Initialize VoiceChanger when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VoiceChanger();
}); 