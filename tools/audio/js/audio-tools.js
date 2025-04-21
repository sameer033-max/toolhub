// Audio Tools JavaScript

// Text to Speech functionality
class TextToSpeech {
    constructor() {
        this.speech = new SpeechSynthesisUtterance();
        this.voices = [];
        this.init();
    }

    init() {
        // Get available voices
        speechSynthesis.onvoiceschanged = () => {
            this.voices = speechSynthesis.getVoices();
            this.populateVoiceList();
        };
    }

    populateVoiceList() {
        const voiceSelect = document.getElementById('voice-select');
        if (!voiceSelect) return;

        voiceSelect.innerHTML = '';
        this.voices.forEach(voice => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.setAttribute('data-lang', voice.lang);
            option.setAttribute('data-name', voice.name);
            voiceSelect.appendChild(option);
        });
    }

    speak(text) {
        this.speech.text = text;
        this.speech.voice = this.voices.find(voice => 
            voice.name === document.getElementById('voice-select').selectedOptions[0].getAttribute('data-name')
        );
        speechSynthesis.speak(this.speech);
    }

    stop() {
        speechSynthesis.cancel();
    }
}

// Speech to Text functionality
class SpeechToText {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.init();
    }

    init() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');
                document.getElementById('transcript').value = transcript;
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
            };
        } else {
            console.error('Speech recognition not supported');
        }
    }

    start() {
        if (this.recognition) {
            this.recognition.start();
            this.isListening = true;
        }
    }

    stop() {
        if (this.recognition) {
            this.recognition.stop();
            this.isListening = false;
        }
    }
}

// Voice Changer functionality
class VoiceChanger {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.source = null;
        this.effects = {
            pitch: 1,
            reverb: 0,
            distortion: 0
        };
    }

    async processAudio(audioFile) {
        const audioBuffer = await this.loadAudio(audioFile);
        this.source = this.audioContext.createBufferSource();
        this.source.buffer = audioBuffer;

        // Create effects nodes
        const pitchNode = this.audioContext.createScriptProcessor(4096, 1, 1);
        const reverbNode = this.audioContext.createConvolver();
        const distortionNode = this.audioContext.createWaveShaper();

        // Connect nodes
        this.source.connect(pitchNode);
        pitchNode.connect(distortionNode);
        distortionNode.connect(reverbNode);
        reverbNode.connect(this.audioContext.destination);

        // Apply effects
        this.applyPitchShift(pitchNode);
        this.applyReverb(reverbNode);
        this.applyDistortion(distortionNode);

        this.source.start(0);
    }

    async loadAudio(file) {
        const arrayBuffer = await file.arrayBuffer();
        return await this.audioContext.decodeAudioData(arrayBuffer);
    }

    applyPitchShift(node) {
        // Implement pitch shifting logic
    }

    applyReverb(node) {
        // Implement reverb effect
    }

    applyDistortion(node) {
        // Implement distortion effect
    }

    setEffect(effect, value) {
        this.effects[effect] = value;
    }
}

// Initialize tools when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Text to Speech
    const tts = new TextToSpeech();
    document.getElementById('speak-btn')?.addEventListener('click', () => {
        const text = document.getElementById('text-input').value;
        tts.speak(text);
    });

    // Initialize Speech to Text
    const stt = new SpeechToText();
    document.getElementById('start-btn')?.addEventListener('click', () => {
        if (!stt.isListening) {
            stt.start();
            this.textContent = 'Stop';
        } else {
            stt.stop();
            this.textContent = 'Start';
        }
    });

    // Initialize Voice Changer
    const voiceChanger = new VoiceChanger();
    document.getElementById('audio-input')?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            voiceChanger.processAudio(file);
        }
    });
}); 