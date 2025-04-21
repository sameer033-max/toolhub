class TextToSpeech {
    constructor() {
        this.synth = window.speechSynthesis;
        this.utterance = null;
        this.voices = [];
        this.isSpeaking = false;

        // Initialize voice options
        this.initVoices();
        
        // Add event listeners
        this.addEventListeners();
    }

    initVoices() {
        // Get available voices
        this.voices = this.synth.getVoices();
        
        // Populate voice select dropdown
        const voiceSelect = document.getElementById('voice-select');
        this.voices.forEach(voice => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.setAttribute('data-lang', voice.lang);
            option.setAttribute('data-name', voice.name);
            voiceSelect.appendChild(option);
        });

        // Update voices when they change
        this.synth.onvoiceschanged = () => {
            this.voices = this.synth.getVoices();
            voiceSelect.innerHTML = '<option value="">Select a voice...</option>';
            this.voices.forEach(voice => {
                const option = document.createElement('option');
                option.textContent = `${voice.name} (${voice.lang})`;
                option.setAttribute('data-lang', voice.lang);
                option.setAttribute('data-name', voice.name);
                voiceSelect.appendChild(option);
            });
        };
    }

    addEventListeners() {
        // Speak button
        document.getElementById('speak-btn').addEventListener('click', () => {
            this.speak();
        });

        // Stop button
        document.getElementById('stop-btn').addEventListener('click', () => {
            this.stop();
        });

        // Rate slider
        document.getElementById('rate-slider').addEventListener('input', (e) => {
            if (this.utterance) {
                this.utterance.rate = e.target.value;
            }
        });

        // Pitch slider
        document.getElementById('pitch-slider').addEventListener('input', (e) => {
            if (this.utterance) {
                this.utterance.pitch = e.target.value;
            }
        });
    }

    speak() {
        if (this.isSpeaking) {
            this.stop();
        }

        const text = document.getElementById('text-input').value;
        if (!text) return;

        const voiceSelect = document.getElementById('voice-select');
        const selectedOption = voiceSelect.selectedOptions[0];
        const voiceName = selectedOption.getAttribute('data-name');

        // Create new utterance
        this.utterance = new SpeechSynthesisUtterance(text);
        
        // Set voice
        if (voiceName) {
            this.utterance.voice = this.voices.find(voice => voice.name === voiceName);
        }

        // Set rate and pitch
        this.utterance.rate = document.getElementById('rate-slider').value;
        this.utterance.pitch = document.getElementById('pitch-slider').value;

        // Add event listeners for utterance
        this.utterance.onstart = () => {
            this.isSpeaking = true;
            document.getElementById('speak-btn').classList.add('active');
        };

        this.utterance.onend = () => {
            this.isSpeaking = false;
            document.getElementById('speak-btn').classList.remove('active');
        };

        // Speak
        this.synth.speak(this.utterance);
    }

    stop() {
        if (this.isSpeaking) {
            this.synth.cancel();
            this.isSpeaking = false;
            document.getElementById('speak-btn').classList.remove('active');
        }
    }
}

// Initialize TextToSpeech when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TextToSpeech();
}); 