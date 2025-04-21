class VoiceCloning {
    constructor() {
        this.audioContext = null;
        this.voiceModel = null;
        this.audioBuffer = null;
        this.audioElement = document.getElementById('audio-player');
        this.isProcessing = false;
        this.isModelTrained = false;

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
        // Voice sample upload
        document.getElementById('voice-sample').addEventListener('change', (e) => {
            this.loadVoiceSample(e.target.files[0]);
        });

        // Train button
        document.getElementById('train-btn').addEventListener('click', () => {
            this.trainModel();
        });

        // Generate button
        document.getElementById('generate-btn').addEventListener('click', () => {
            this.generateVoice();
        });

        // Stop button
        document.getElementById('stop-btn').addEventListener('click', () => {
            this.stopProcessing();
        });

        // Download button
        document.getElementById('download-btn').addEventListener('click', () => {
            this.downloadVoice();
        });

        // Voice speed slider
        document.getElementById('voice-speed').addEventListener('input', (e) => {
            document.getElementById('voice-speed-value').textContent = `${e.target.value}x`;
        });

        // Voice pitch slider
        document.getElementById('voice-pitch').addEventListener('input', (e) => {
            document.getElementById('voice-pitch-value').textContent = `${e.target.value}x`;
        });
    }

    async loadVoiceSample(file) {
        if (!file) return;

        try {
            this.showProgress(true);
            const arrayBuffer = await file.arrayBuffer();
            this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            
            // Create audio URL for the audio element
            const audioUrl = URL.createObjectURL(file);
            this.audioElement.src = audioUrl;
            
            // Enable train button
            document.getElementById('train-btn').disabled = false;
            
            // Update status
            this.updateModelStatus('Voice sample loaded. Ready to train model.');
        } catch (error) {
            console.error('Error loading voice sample:', error);
            alert('Error loading voice sample. Please try again.');
        } finally {
            this.showProgress(false);
        }
    }

    async trainModel() {
        if (!this.audioBuffer) {
            alert('Please upload a voice sample first.');
            return;
        }

        try {
            this.showProgress(true);
            this.isProcessing = true;
            
            // Get voice parameters
            const voiceStyle = document.getElementById('voice-style').value;
            const voiceAge = document.getElementById('voice-age').value;
            const voiceGender = document.getElementById('voice-gender').value;
            const voiceAccent = document.getElementById('voice-accent').value;
            
            // Process audio buffer to extract voice features
            const voiceFeatures = await this.extractVoiceFeatures(
                this.audioBuffer,
                voiceStyle,
                voiceAge,
                voiceGender,
                voiceAccent
            );
            
            // Train the model (simplified version)
            this.voiceModel = await this.trainVoiceModel(voiceFeatures);
            
            // Enable generate button
            document.getElementById('generate-btn').disabled = false;
            
            // Update status
            this.isModelTrained = true;
            this.updateModelStatus('Model trained successfully. Ready to generate voice.');
        } catch (error) {
            console.error('Error training model:', error);
            alert('Error training model. Please try again.');
        } finally {
            this.isProcessing = false;
            this.showProgress(false);
        }
    }

    async extractVoiceFeatures(buffer, style, age, gender, accent) {
        // Extract voice features from the audio buffer
        // This is a simplified version - in a real implementation,
        // you would use a more sophisticated feature extraction method
        const features = {
            style: style,
            age: age,
            gender: gender,
            accent: accent,
            pitch: this.calculatePitch(buffer),
            formants: this.calculateFormants(buffer),
            timbre: this.calculateTimbre(buffer)
        };
        
        return features;
    }

    calculatePitch(buffer) {
        // Calculate pitch using autocorrelation
        const channelData = buffer.getChannelData(0);
        const sampleRate = buffer.sampleRate;
        
        // Find the period of the signal
        let maxCorrelation = -1;
        let bestPeriod = 0;
        
        for (let period = 20; period < 1000; period++) {
            let correlation = 0;
            for (let i = 0; i < channelData.length - period; i++) {
                correlation += channelData[i] * channelData[i + period];
            }
            
            if (correlation > maxCorrelation) {
                maxCorrelation = correlation;
                bestPeriod = period;
            }
        }
        
        return sampleRate / bestPeriod;
    }

    calculateFormants(buffer) {
        // Calculate formants using LPC (Linear Predictive Coding)
        // This is a simplified version
        const channelData = buffer.getChannelData(0);
        const formants = [];
        
        // Apply windowing
        const windowedData = this.applyHammingWindow(channelData);
        
        // Calculate autocorrelation
        const autocorrelation = this.calculateAutocorrelation(windowedData);
        
        // Solve Yule-Walker equations
        const lpcCoefficients = this.solveYuleWalker(autocorrelation, 10);
        
        // Find formants from LPC coefficients
        const roots = this.findRoots(lpcCoefficients);
        
        for (const root of roots) {
            if (Math.abs(root) < 1) {
                const frequency = Math.atan2(root.imag, root.real) * buffer.sampleRate / (2 * Math.PI);
                if (frequency > 0 && frequency < 5000) {
                    formants.push(frequency);
                }
            }
        }
        
        return formants;
    }

    calculateTimbre(buffer) {
        // Calculate timbre using MFCC (Mel-Frequency Cepstral Coefficients)
        // This is a simplified version
        const channelData = buffer.getChannelData(0);
        const sampleRate = buffer.sampleRate;
        
        // Apply windowing
        const windowedData = this.applyHammingWindow(channelData);
        
        // Calculate FFT
        const fft = this.calculateFFT(windowedData);
        
        // Apply mel filterbank
        const melFilterbank = this.createMelFilterbank(fft.length, sampleRate);
        const melSpectrum = this.applyMelFilterbank(fft, melFilterbank);
        
        // Calculate DCT
        const mfcc = this.calculateDCT(melSpectrum);
        
        return mfcc;
    }

    applyHammingWindow(data) {
        const windowedData = new Float32Array(data.length);
        for (let i = 0; i < data.length; i++) {
            windowedData[i] = data[i] * (0.54 - 0.46 * Math.cos(2 * Math.PI * i / (data.length - 1)));
        }
        return windowedData;
    }

    calculateAutocorrelation(data) {
        const autocorrelation = new Float32Array(data.length);
        for (let lag = 0; lag < data.length; lag++) {
            let sum = 0;
            for (let i = 0; i < data.length - lag; i++) {
                sum += data[i] * data[i + lag];
            }
            autocorrelation[lag] = sum;
        }
        return autocorrelation;
    }

    solveYuleWalker(autocorrelation, order) {
        // Solve Yule-Walker equations using Levinson-Durbin recursion
        const coefficients = new Float32Array(order + 1);
        const error = new Float32Array(order + 1);
        
        coefficients[0] = 1;
        error[0] = autocorrelation[0];
        
        for (let i = 1; i <= order; i++) {
            let sum = 0;
            for (let j = 1; j < i; j++) {
                sum += coefficients[j] * autocorrelation[i - j];
            }
            
            const reflection = (autocorrelation[i] - sum) / error[i - 1];
            coefficients[i] = reflection;
            
            for (let j = 1; j < i; j++) {
                coefficients[j] -= reflection * coefficients[i - j];
            }
            
            error[i] = error[i - 1] * (1 - reflection * reflection);
        }
        
        return coefficients;
    }

    findRoots(coefficients) {
        // Find roots of polynomial using Durand-Kerner method
        const roots = [];
        const n = coefficients.length - 1;
        
        // Initial guesses
        for (let i = 0; i < n; i++) {
            const angle = (2 * Math.PI * i) / n;
            roots.push({
                real: Math.cos(angle),
                imag: Math.sin(angle)
            });
        }
        
        // Iterate
        for (let iter = 0; iter < 100; iter++) {
            for (let i = 0; i < n; i++) {
                let numerator = this.evaluatePolynomial(coefficients, roots[i]);
                let denominator = 1;
                
                for (let j = 0; j < n; j++) {
                    if (i !== j) {
                        const diff = {
                            real: roots[i].real - roots[j].real,
                            imag: roots[i].imag - roots[j].imag
                        };
                        denominator *= (diff.real * diff.real + diff.imag * diff.imag);
                    }
                }
                
                roots[i].real -= numerator.real / denominator;
                roots[i].imag -= numerator.imag / denominator;
            }
        }
        
        return roots;
    }

    evaluatePolynomial(coefficients, x) {
        let result = { real: 0, imag: 0 };
        let power = { real: 1, imag: 0 };
        
        for (let i = 0; i < coefficients.length; i++) {
            result.real += coefficients[i] * power.real;
            result.imag += coefficients[i] * power.imag;
            
            const newPower = {
                real: power.real * x.real - power.imag * x.imag,
                imag: power.real * x.imag + power.imag * x.real
            };
            power = newPower;
        }
        
        return result;
    }

    calculateFFT(data) {
        // Calculate FFT using Cooley-Tukey algorithm
        const n = data.length;
        const fft = new Float32Array(n);
        
        // Bit-reversal permutation
        for (let i = 0; i < n; i++) {
            let j = 0;
            for (let k = 0; k < Math.log2(n); k++) {
                j = (j << 1) | ((i >> k) & 1);
            }
            fft[j] = data[i];
        }
        
        // FFT computation
        for (let size = 2; size <= n; size *= 2) {
            const halfsize = size / 2;
            const tablestep = n / size;
            
            for (let i = 0; i < n; i += size) {
                for (let j = i, k = 0; j < i + halfsize; j++, k += tablestep) {
                    const t = fft[j + halfsize] * Math.cos(2 * Math.PI * k / n);
                    const u = fft[j];
                    fft[j] = u + t;
                    fft[j + halfsize] = u - t;
                }
            }
        }
        
        return fft;
    }

    createMelFilterbank(fftSize, sampleRate) {
        const numFilters = 26;
        const melFilterbank = new Array(numFilters);
        
        const minMel = this.hzToMel(0);
        const maxMel = this.hzToMel(sampleRate / 2);
        const melPoints = new Array(numFilters + 2);
        
        for (let i = 0; i < numFilters + 2; i++) {
            melPoints[i] = minMel + (maxMel - minMel) * i / (numFilters + 1);
        }
        
        const hzPoints = melPoints.map(mel => this.melToHz(mel));
        const binPoints = hzPoints.map(hz => Math.floor(hz * fftSize / sampleRate));
        
        for (let i = 0; i < numFilters; i++) {
            melFilterbank[i] = new Float32Array(fftSize);
            for (let j = binPoints[i]; j < binPoints[i + 2]; j++) {
                if (j < binPoints[i + 1]) {
                    melFilterbank[i][j] = (j - binPoints[i]) / (binPoints[i + 1] - binPoints[i]);
                } else {
                    melFilterbank[i][j] = (binPoints[i + 2] - j) / (binPoints[i + 2] - binPoints[i + 1]);
                }
            }
        }
        
        return melFilterbank;
    }

    hzToMel(hz) {
        return 2595 * Math.log10(1 + hz / 700);
    }

    melToHz(mel) {
        return 700 * (Math.pow(10, mel / 2595) - 1);
    }

    applyMelFilterbank(fft, melFilterbank) {
        const melSpectrum = new Float32Array(melFilterbank.length);
        
        for (let i = 0; i < melFilterbank.length; i++) {
            let sum = 0;
            for (let j = 0; j < fft.length; j++) {
                sum += fft[j] * melFilterbank[i][j];
            }
            melSpectrum[i] = sum;
        }
        
        return melSpectrum;
    }

    calculateDCT(data) {
        const mfcc = new Float32Array(data.length);
        const N = data.length;
        
        for (let k = 0; k < N; k++) {
            let sum = 0;
            for (let n = 0; n < N; n++) {
                sum += data[n] * Math.cos(Math.PI * k * (n + 0.5) / N);
            }
            mfcc[k] = sum;
        }
        
        return mfcc;
    }

    async trainVoiceModel(features) {
        // Train the voice model using the extracted features
        // This is a simplified version - in a real implementation,
        // you would use a more sophisticated model like Tacotron or WaveNet
        const model = {
            features: features,
            parameters: {
                style: features.style,
                age: features.age,
                gender: features.gender,
                accent: features.accent,
                pitch: features.pitch,
                formants: features.formants,
                timbre: features.timbre
            }
        };
        
        return model;
    }

    async generateVoice() {
        if (!this.isModelTrained) {
            alert('Please train the model first.');
            return;
        }

        const text = document.getElementById('text-input').value;
        if (!text) {
            alert('Please enter text to generate voice.');
            return;
        }

        try {
            this.showProgress(true);
            this.isProcessing = true;
            
            // Get voice parameters
            const speed = parseFloat(document.getElementById('voice-speed').value);
            const pitch = parseFloat(document.getElementById('voice-pitch').value);
            
            // Generate voice using the trained model
            const audioBuffer = await this.synthesizeVoice(
                text,
                this.voiceModel,
                speed,
                pitch
            );
            
            // Play the generated voice
            this.playVoice(audioBuffer);
            
            // Store the current audio buffer for download
            this.currentAudioBuffer = audioBuffer;
        } catch (error) {
            console.error('Error generating voice:', error);
            alert('Error generating voice. Please try again.');
        } finally {
            this.isProcessing = false;
            this.showProgress(false);
        }
    }

    async synthesizeVoice(text, model, speed, pitch) {
        // Synthesize voice using the trained model
        // This is a simplified version - in a real implementation,
        // you would use a more sophisticated synthesis method
        
        // Create a new audio buffer
        const sampleRate = this.audioContext.sampleRate;
        const duration = text.length * 0.1; // Rough estimate of duration
        const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
        const channelData = buffer.getChannelData(0);
        
        // Generate audio samples based on the model parameters
        for (let i = 0; i < channelData.length; i++) {
            const time = i / sampleRate;
            const frequency = model.parameters.pitch * pitch;
            
            // Generate a simple waveform based on the model parameters
            let sample = 0;
            
            // Add fundamental frequency
            sample += Math.sin(2 * Math.PI * frequency * time);
            
            // Add formants
            for (const formant of model.parameters.formants) {
                sample += 0.2 * Math.sin(2 * Math.PI * formant * time);
            }
            
            // Apply timbre
            for (let j = 0; j < model.parameters.timbre.length; j++) {
                sample += 0.1 * model.parameters.timbre[j] * Math.sin(2 * Math.PI * (j + 1) * frequency * time);
            }
            
            // Apply speed
            sample = this.applySpeed(sample, time, speed);
            
            // Normalize
            sample = Math.max(-1, Math.min(1, sample));
            
            channelData[i] = sample;
        }
        
        return buffer;
    }

    applySpeed(sample, time, speed) {
        // Apply speed adjustment
        return sample * Math.sin(2 * Math.PI * time * speed);
    }

    playVoice(audioBuffer) {
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioContext.destination);
        source.start();
    }

    stopProcessing() {
        this.isProcessing = false;
        this.showProgress(false);
        // Stop any playing audio
        if (this.audioContext) {
            this.audioContext.suspend();
        }
    }

    async downloadVoice() {
        if (!this.currentAudioBuffer) {
            alert('No voice to download. Please generate voice first.');
            return;
        }

        try {
            this.showProgress(true);
            
            // Convert to WAV
            const wavBuffer = this.bufferToWav(this.currentAudioBuffer);
            
            // Create download link
            const blob = new Blob([wavBuffer], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'cloned_voice.wav';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading voice:', error);
            alert('Error downloading voice. Please try again.');
        } finally {
            this.showProgress(false);
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

    updateModelStatus(message) {
        document.getElementById('model-status-text').textContent = message;
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

// Initialize VoiceCloning when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VoiceCloning();
}); 