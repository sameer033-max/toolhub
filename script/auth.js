// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "multitool-hub.firebaseapp.com",
    projectId: "multitool-hub",
    storageBucket: "multitool-hub.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Check if we're in a secure context or local file system
const isLocalEnvironment = window.location.protocol === 'file:' || 
                          (window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1');

// Mock auth for local development
class MockAuth {
    constructor() {
        this.currentUser = null;
        this.listeners = [];
    }

    onAuthStateChanged(callback) {
        this.listeners.push(callback);
        // Simulate a delay before firing the callback
        setTimeout(() => {
            callback(this.currentUser);
        }, 100);
        return () => {
            this.listeners = this.listeners.filter(listener => listener !== callback);
        };
    }

    signInWithEmailAndPassword(email, password) {
        return new Promise((resolve, reject) => {
            // Simulate successful sign in
            this.currentUser = {
                uid: 'mock-uid-123',
                email: email,
                displayName: email.split('@')[0],
                photoURL: null
            };
            // Notify listeners
            this.listeners.forEach(listener => listener(this.currentUser));
            resolve({ user: this.currentUser });
        });
    }

    createUserWithEmailAndPassword(email, password) {
        return new Promise((resolve, reject) => {
            // Simulate successful sign up
            this.currentUser = {
                uid: 'mock-uid-' + Math.random().toString(36).substring(2, 9),
                email: email,
                displayName: null,
                photoURL: null,
                updateProfile: (profileData) => {
                    this.currentUser.displayName = profileData.displayName;
                    this.currentUser.photoURL = profileData.photoURL;
                    return Promise.resolve();
                }
            };
            // Notify listeners
            this.listeners.forEach(listener => listener(this.currentUser));
            resolve({ user: this.currentUser });
        });
    }

    signInWithPopup(provider) {
        return new Promise((resolve, reject) => {
            // Simulate successful Google sign in
            this.currentUser = {
                uid: 'mock-google-uid-123',
                email: 'user@gmail.com',
                displayName: 'Google User',
                photoURL: 'https://lh3.googleusercontent.com/a/default-user'
            };
            // Notify listeners
            this.listeners.forEach(listener => listener(this.currentUser));
            resolve({ user: this.currentUser });
        });
    }

    signOut() {
        return new Promise((resolve, reject) => {
            this.currentUser = null;
            // Notify listeners
            this.listeners.forEach(listener => listener(this.currentUser));
            resolve();
        });
    }

    setPersistence() {
        return Promise.resolve();
    }
}

// Initialize Firebase or use mock auth for local development
let auth;
let firebase;

try {
    // Try to initialize Firebase
    firebase = window.firebase;
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    console.log('Firebase authentication initialized successfully');
} catch (error) {
    // If Firebase fails to initialize, use mock auth
    console.warn('Firebase initialization failed:', error.message);
    console.log('Using mock authentication for local development');
    auth = new MockAuth();
    firebase = {
        auth: () => auth
    };
}

// DOM Elements
const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');

// Authentication state observer
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        console.log('User is signed in:', user.email);
        updateUIForAuthenticatedUser(user);
        
        // Store user info in localStorage for easy access
        localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || 'User',
            photoURL: user.photoURL
        }));
    } else {
        // User is signed out
        console.log('User is signed out');
        updateUIForUnauthenticatedUser();
        
        // Remove user info from localStorage
        localStorage.removeItem('user');
        
        // Redirect to sign-in page if on a protected page
        const currentPath = window.location.pathname;
        const protectedPaths = [
            '/tools/', 
            '/pricing.html'
        ];
        
        // Check if current path is a protected path but not already on auth pages
        const isProtectedPath = protectedPaths.some(path => currentPath.includes(path));
        const isAuthPage = currentPath.includes('signin.html') || currentPath.includes('signup.html');
        
        if (isProtectedPath && !isAuthPage) {
            window.location.href = '/signin.html?redirect=' + encodeURIComponent(currentPath);
        }
    }
});

// Sign in with email and password
if (signInForm) {
    signInForm.addEventListener('submit', e => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Set persistence based on "Remember me" checkbox
        const persistence = rememberMe 
            ? firebase.auth.Auth.Persistence.LOCAL 
            : firebase.auth.Auth.Persistence.SESSION;
        
        auth.setPersistence(persistence)
            .then(() => {
                // Sign in user
                return auth.signInWithEmailAndPassword(email, password);
            })
            .then(userCredential => {
                // Signed in successfully
                const user = userCredential.user;
                console.log('User signed in:', user.email);
                
                // Check if there's a redirect parameter in the URL
                const urlParams = new URLSearchParams(window.location.search);
                const redirectUrl = urlParams.get('redirect');
                
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                } else {
                    window.location.href = '/index.html';
                }
            })
            .catch(error => {
                console.error('Sign in error:', error);
                showAuthError(error.message);
            });
    });
}

// Sign up with email and password
if (signUpForm) {
    signUpForm.addEventListener('submit', e => {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            showAuthError('Passwords do not match');
            return;
        }
        
        // Create user
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                // Signed up successfully
                const user = userCredential.user;
                console.log('User created:', user.email);
                
                // Update profile with name
                return user.updateProfile({
                    displayName: `${firstName} ${lastName}`
                });
            })
            .then(() => {
                // Redirect to home page
                window.location.href = '/index.html';
            })
            .catch(error => {
                console.error('Sign up error:', error);
                showAuthError(error.message);
            });
    });
}

// Sign in with Google
function signInWithGoogle() {
    let provider;
    
    try {
        provider = new firebase.auth.GoogleAuthProvider();
    } catch (error) {
        // If GoogleAuthProvider is not available, use mock provider
        provider = { id: 'google.com' };
    }
    
    auth.signInWithPopup(provider)
        .then(result => {
            // Google sign in successful
            const user = result.user;
            console.log('Google sign in successful:', user.email);
            
            // Check if there's a redirect parameter in the URL
            const urlParams = new URLSearchParams(window.location.search);
            const redirectUrl = urlParams.get('redirect');
            
            if (redirectUrl) {
                window.location.href = redirectUrl;
            } else {
                // Use relative path for better compatibility
                window.location.href = 'index.html';
            }
        })
        .catch(error => {
            console.error('Google sign in error:', error);
            showAuthError(error.message);
        });
}

// Add click event listeners to Google sign in buttons
document.addEventListener('DOMContentLoaded', () => {
    const googleSignInButtons = document.querySelectorAll('.social-auth button');
    googleSignInButtons.forEach(button => {
        button.addEventListener('click', signInWithGoogle);
    });
});

// Sign out
function signOut() {
    auth.signOut()
        .then(() => {
            console.log('User signed out');
            window.location.href = '/signin.html';
        })
        .catch(error => {
            console.error('Sign out error:', error);
        });
}

// Update UI for authenticated user
function updateUIForAuthenticatedUser(user) {
    // Update header with user info
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder && headerPlaceholder.innerHTML) {
        // Find the auth buttons container in the header
        const authButtons = document.querySelector('.auth-buttons');
        if (authButtons) {
            // Replace with user profile dropdown
            authButtons.innerHTML = `
                <div class="dropdown">
                    <button class="btn btn-link dropdown-toggle d-flex align-items-center text-decoration-none" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="${user.photoURL || 'assets/images/default-avatar.png'}" alt="Profile" class="rounded-circle me-2" width="32" height="32">
                        <span>${user.displayName || user.email}</span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <li><a class="dropdown-item" href="profile.html">My Profile</a></li>
                        <li><a class="dropdown-item" href="subscription.html">My Subscription</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" id="signOutButton">Sign Out</a></li>
                    </ul>
                </div>
            `;
            
            // Add event listener to sign out button
            const signOutButton = document.getElementById('signOutButton');
            if (signOutButton) {
                signOutButton.addEventListener('click', e => {
                    e.preventDefault();
                    signOut();
                });
            }
        }
    }
}

// Update UI for unauthenticated user
function updateUIForUnauthenticatedUser() {
    // Update header with sign in/sign up buttons
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder && headerPlaceholder.innerHTML) {
        // Find the auth buttons container in the header
        const authButtons = document.querySelector('.auth-buttons');
        if (authButtons) {
            // Replace with sign in/sign up buttons
            authButtons.innerHTML = `
                <a href="signin.html" class="btn btn-outline-primary me-2">Sign In</a>
                <a href="signup.html" class="btn btn-primary">Sign Up</a>
            `;
        }
    }
}

// Show authentication error message
function showAuthError(message) {
    const errorContainer = document.querySelector('.auth-error');
    if (!errorContainer) {
        // Create error container if it doesn't exist
        const form = document.querySelector('form');
        if (form) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'alert alert-danger auth-error mt-3';
            errorDiv.textContent = message;
            form.prepend(errorDiv);
        }
    } else {
        // Update existing error container
        errorContainer.textContent = message;
    }
}
