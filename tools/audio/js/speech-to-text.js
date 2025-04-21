class SpeechToText {
    constructor() {
        this.recognition = null;
        this.isRecording = false;
        this.transcript = '';
        this.finalTranscript = '';

        // Initialize speech recognition
        this.initSpeechRecognition();
        
        // Add event listeners
        this.addEventListeners();
    }

    initSpeechRecognition() {
        // Check if browser supports speech recognition
        if (!('webkitSpeechRecognition' in window)) {
            alert('Speech recognition is not supported in this browser.');
            return;
        }

        // Create speech recognition instance
        this.recognition = new webkitSpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = document.getElementById('language-select').value;

        // Add event listeners for recognition
        this.recognition.onstart = () => {
            this.isRecording = true;
            document.getElementById('start-btn').classList.add('recording');
            document.getElementById('start-btn').innerHTML = '<i class="fas fa-microphone"></i> Stop Recording';
        };

        this.recognition.onend = () => {
            this.isRecording = false;
            document.getElementById('start-btn').classList.remove('recording');
            document.getElementById('start-btn').innerHTML = '<i class="fas fa-microphone"></i> Start Recording';
        };

        this.recognition.onresult = (event) => {
            this.transcript = '';
            this.finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    this.finalTranscript += transcript + ' ';
                } else {
                    this.transcript += transcript;
                }
            }

            // Update transcript textarea
            document.getElementById('transcript').value = this.finalTranscript + this.transcript;
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            if (event.error === 'no-speech') {
                alert('No speech detected. Please try again.');
            }
        };
    }

    addEventListeners() {
        // Start/Stop button
        document.getElementById('start-btn').addEventListener('click', () => {
            if (this.isRecording) {
                this.stopRecording();
            } else {
                this.startRecording();
            }
        });

        // Clear button
        document.getElementById('clear-btn').addEventListener('click', () => {
            this.clearTranscript();
        });

        // Copy button
        document.getElementById('copy-btn').addEventListener('click', () => {
            this.copyTranscript();
        });

        // Download button
        document.getElementById('download-btn').addEventListener('click', () => {
            this.downloadTranscript();
        });

        // Language select
        document.getElementById('language-select').addEventListener('change', (e) => {
            if (this.recognition) {
                this.recognition.lang = e.target.value;
            }
        });
    }

    startRecording() {
        if (this.recognition) {
            this.recognition.start();
        }
    }

    stopRecording() {
        if (this.recognition) {
            this.recognition.stop();
        }
    }

    clearTranscript() {
        this.transcript = '';
        this.finalTranscript = '';
        document.getElementById('transcript').value = '';
    }

    copyTranscript() {
        const transcript = document.getElementById('transcript');
        transcript.select();
        document.execCommand('copy');
        
        // Show feedback
        const copyBtn = document.getElementById('copy-btn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    }

    downloadTranscript() {
        const transcript = document.getElementById('transcript').value;
        if (!transcript) return;

        const blob = new Blob([transcript], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transcript.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Initialize SpeechToText when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SpeechToText();
}); 