class AudioEditor {
    constructor() {
        this.audioContext = null;
        this.audioBuffer = null;
        this.audioSource = null;
        this.audioElement = document.getElementById('audio-player');
        this.waveformCanvas = document.getElementById('waveform');
        this.waveformContext = this.waveformCanvas.getContext('2d');
        this.isPlaying = false;
        this.currentTime = 0;

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
        // File upload
        document.getElementById('audio-file').addEventListener('change', (e) => {
            this.loadAudioFile(e.target.files[0]);
        });

        // Play button
        document.getElementById('play-btn').addEventListener('click', () => {
            this.playAudio();
        });

        // Pause button
        document.getElementById('pause-btn').addEventListener('click', () => {
            this.pauseAudio();
        });

        // Stop button
        document.getElementById('stop-btn').addEventListener('click', () => {
            this.stopAudio();
        });

        // Apply changes button
        document.getElementById('apply-btn').addEventListener('click', () => {
            this.applyChanges();
        });

        // Export button
        document.getElementById('export-btn').addEventListener('click', () => {
            this.exportAudio();
        });

        // Volume slider
        document.getElementById('volume').addEventListener('input', (e) => {
            this.updateVolume(e.target.value);
            document.getElementById('volume-value').textContent = `${e.target.value}%`;
        });

        // Speed slider
        document.getElementById('speed').addEventListener('input', (e) => {
            this.updateSpeed(e.target.value);
            document.getElementById('speed-value').textContent = `${e.target.value}x`;
        });

        // Audio element events
        this.audioElement.addEventListener('timeupdate', () => {
            this.currentTime = this.audioElement.currentTime;
            this.updateWaveform();
        });

        this.audioElement.addEventListener('ended', () => {
            this.isPlaying = false;
            this.currentTime = 0;
        });
    }

    async loadAudioFile(file) {
        if (!file) return;

        try {
            this.showProgress(true);
            const arrayBuffer = await file.arrayBuffer();
            this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            
            // Create audio URL for the audio element
            const audioUrl = URL.createObjectURL(file);
            this.audioElement.src = audioUrl;
            
            // Draw waveform
            this.drawWaveform();
            
            // Enable controls
            this.enableControls(true);
        } catch (error) {
            console.error('Error loading audio file:', error);
            alert('Error loading audio file. Please try again.');
        } finally {
            this.showProgress(false);
        }
    }

    drawWaveform() {
        if (!this.audioBuffer) return;

        const width = this.waveformCanvas.width;
        const height = this.waveformCanvas.height;
        const channelData = this.audioBuffer.getChannelData(0);
        const step = Math.ceil(channelData.length / width);
        const amp = height / 2;

        this.waveformContext.clearRect(0, 0, width, height);
        this.waveformContext.beginPath();
        this.waveformContext.strokeStyle = '#4a90e2';
        this.waveformContext.lineWidth = 2;

        for (let i = 0; i < width; i++) {
            const min = 1.0;
            const max = -1.0;
            for (let j = 0; j < step; j++) {
                const datum = channelData[(i * step) + j];
                if (datum < min) min = datum;
                if (datum > max) max = datum;
            }
            this.waveformContext.moveTo(i, (1 + min) * amp);
            this.waveformContext.lineTo(i, (1 + max) * amp);
        }

        this.waveformContext.stroke();
    }

    updateWaveform() {
        if (!this.audioBuffer) return;

        const width = this.waveformCanvas.width;
        const height = this.waveformCanvas.height;
        const currentX = (this.currentTime / this.audioBuffer.duration) * width;

        // Clear the canvas
        this.waveformContext.clearRect(0, 0, width, height);
        
        // Redraw the waveform
        this.drawWaveform();
        
        // Draw the current position indicator
        this.waveformContext.beginPath();
        this.waveformContext.strokeStyle = '#ff0000';
        this.waveformContext.lineWidth = 2;
        this.waveformContext.moveTo(currentX, 0);
        this.waveformContext.lineTo(currentX, height);
        this.waveformContext.stroke();
    }

    playAudio() {
        if (!this.audioBuffer) return;

        if (this.isPlaying) {
            this.pauseAudio();
            return;
        }

        this.isPlaying = true;
        this.audioElement.play();
    }

    pauseAudio() {
        if (!this.isPlaying) return;

        this.isPlaying = false;
        this.audioElement.pause();
    }

    stopAudio() {
        this.isPlaying = false;
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.currentTime = 0;
        this.updateWaveform();
    }

    updateVolume(value) {
        this.audioElement.volume = value / 100;
    }

    updateSpeed(value) {
        this.audioElement.playbackRate = value;
    }

    async applyChanges() {
        if (!this.audioBuffer) return;

        try {
            this.showProgress(true);
            
            // Get current settings
            const trimStart = parseFloat(document.getElementById('trim-start').value);
            const trimEnd = parseFloat(document.getElementById('trim-end').value);
            const volume = parseFloat(document.getElementById('volume').value) / 100;
            const speed = parseFloat(document.getElementById('speed').value);
            const effects = Array.from(document.getElementById('effects').selectedOptions)
                .map(option => option.value);

            // Create a new audio buffer with the changes
            const newBuffer = await this.processAudio(
                this.audioBuffer,
                trimStart,
                trimEnd,
                volume,
                speed,
                effects
            );

            // Update the audio buffer and element
            this.audioBuffer = newBuffer;
            const audioUrl = await this.bufferToAudioUrl(newBuffer);
            this.audioElement.src = audioUrl;
            
            // Redraw waveform
            this.drawWaveform();
        } catch (error) {
            console.error('Error applying changes:', error);
            alert('Error applying changes. Please try again.');
        } finally {
            this.showProgress(false);
        }
    }

    async processAudio(buffer, trimStart, trimEnd, volume, speed, effects) {
        const sampleRate = buffer.sampleRate;
        const startOffset = Math.floor(trimStart * sampleRate);
        const endOffset = Math.floor(trimEnd * sampleRate);
        const newLength = buffer.length - startOffset - endOffset;
        
        // Create new buffer
        const newBuffer = this.audioContext.createBuffer(
            buffer.numberOfChannels,
            newLength,
            sampleRate
        );

        // Copy and process audio data
        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
            const oldData = buffer.getChannelData(channel);
            const newData = newBuffer.getChannelData(channel);
            
            for (let i = 0; i < newLength; i++) {
                let sample = oldData[i + startOffset];
                
                // Apply volume
                sample *= volume;
                
                // Apply speed (time stretching)
                if (speed !== 1) {
                    const oldIndex = i / speed;
                    const index1 = Math.floor(oldIndex);
                    const index2 = Math.min(Math.ceil(oldIndex), oldData.length - 1);
                    const fraction = oldIndex - index1;
                    
                    sample = oldData[index1] * (1 - fraction) + oldData[index2] * fraction;
                }
                
                // Apply effects
                for (const effect of effects) {
                    switch (effect) {
                        case 'reverb':
                            sample = this.applyReverb(sample, i);
                            break;
                        case 'echo':
                            sample = this.applyEcho(sample, i);
                            break;
                        case 'distortion':
                            sample = this.applyDistortion(sample);
                            break;
                        case 'fade-in':
                            sample = this.applyFadeIn(sample, i, newLength);
                            break;
                        case 'fade-out':
                            sample = this.applyFadeOut(sample, i, newLength);
                            break;
                        case 'normalize':
                            sample = this.normalizeSample(sample);
                            break;
                    }
                }
                
                newData[i] = sample;
            }
        }

        return newBuffer;
    }

    applyReverb(sample, index) {
        // Simple reverb effect
        const delay = 0.1; // 100ms delay
        const decay = 0.5;
        const delaySamples = Math.floor(delay * this.audioContext.sampleRate);
        
        if (index >= delaySamples) {
            const delayedSample = this.audioBuffer.getChannelData(0)[index - delaySamples];
            sample = sample + delayedSample * decay;
        }
        
        return sample;
    }

    applyEcho(sample, index) {
        // Simple echo effect
        const delay = 0.2; // 200ms delay
        const feedback = 0.5;
        const delaySamples = Math.floor(delay * this.audioContext.sampleRate);
        
        if (index >= delaySamples) {
            const delayedSample = this.audioBuffer.getChannelData(0)[index - delaySamples];
            sample = sample + delayedSample * feedback;
        }
        
        return sample;
    }

    applyDistortion(sample) {
        // Simple distortion effect
        const threshold = 0.5;
        const gain = 2;
        
        if (Math.abs(sample) > threshold) {
            sample = Math.sign(sample) * threshold + (sample - Math.sign(sample) * threshold) * gain;
        }
        
        return sample;
    }

    applyFadeIn(sample, index, length) {
        // Fade in effect
        const fadeLength = Math.min(length * 0.1, 1); // 10% of length or 1 second
        const fadeSamples = Math.floor(fadeLength * this.audioContext.sampleRate);
        
        if (index < fadeSamples) {
            sample *= index / fadeSamples;
        }
        
        return sample;
    }

    applyFadeOut(sample, index, length) {
        // Fade out effect
        const fadeLength = Math.min(length * 0.1, 1); // 10% of length or 1 second
        const fadeSamples = Math.floor(fadeLength * this.audioContext.sampleRate);
        
        if (index > length - fadeSamples) {
            sample *= (length - index) / fadeSamples;
        }
        
        return sample;
    }

    normalizeSample(sample) {
        // Normalize the sample to maximum amplitude
        const maxAmplitude = 1.0;
        const currentMax = Math.max(...this.audioBuffer.getChannelData(0));
        const scale = maxAmplitude / currentMax;
        
        return sample * scale;
    }

    async exportAudio() {
        if (!this.audioBuffer) {
            alert('No audio to export. Please load an audio file first.');
            return;
        }

        try {
            this.showProgress(true);
            
            const format = document.getElementById('format').value;
            const quality = document.getElementById('quality').value;
            
            // Convert to the selected format
            const audioBlob = await this.bufferToAudioBlob(this.audioBuffer, format, quality);
            
            // Create download link
            const url = URL.createObjectURL(audioBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `edited_audio.${format}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error exporting audio:', error);
            alert('Error exporting audio. Please try again.');
        } finally {
            this.showProgress(false);
        }
    }

    async bufferToAudioBlob(buffer, format, quality) {
        // Convert audio buffer to the selected format
        // This is a simplified version - in a real implementation,
        // you would use a library like lamejs for MP3 encoding
        const wavBuffer = this.bufferToWav(buffer);
        return new Blob([wavBuffer], { type: `audio/${format}` });
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

    async bufferToAudioUrl(buffer) {
        const blob = await this.bufferToAudioBlob(buffer, 'wav', 'high');
        return URL.createObjectURL(blob);
    }

    enableControls(enabled) {
        const controls = [
            'trim-start', 'trim-end', 'volume', 'speed',
            'effects', 'format', 'quality',
            'play-btn', 'pause-btn', 'stop-btn',
            'apply-btn', 'export-btn'
        ];
        
        controls.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.disabled = !enabled;
            }
        });
    }

    showProgress(show) {
        const progressContainer = document.querySelector('.progress-container');
        const progressBar = document.querySelector('.progress-bar');
        
        if (show) {
            progressContainer.style.display = 'block';
            let progress = 0;
            const interval = setInterval(() => {
                progress += 1;
                progressBar.style.width = `${progress}%`;
                if (progress >= 100) {
                    clearInterval(interval);
                }
            }, 50);
        } else {
            progressContainer.style.display = 'none';
            progressBar.style.width = '0%';
        }
    }
}

// Initialize AudioEditor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AudioEditor();
}); 