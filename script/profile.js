// Profile Management
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is authenticated
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in, populate profile data
            populateProfileData(user);
        } else {
            // No user is signed in, redirect to sign in page
            window.location.href = 'signin.html';
        }
    });

    // Form submit handlers
    const accountForm = document.getElementById('accountForm');
    if (accountForm) {
        accountForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateAccountInfo();
        });
    }

    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updatePassword();
        });
    }
});

// Populate profile data
function populateProfileData(user) {
    // Update profile header
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profileAvatar = document.getElementById('profileAvatar');
    
    if (profileName) {
        profileName.textContent = user.displayName || 'User';
    }
    
    if (profileEmail) {
        profileEmail.textContent = user.email;
    }
    
    if (profileAvatar && user.photoURL) {
        profileAvatar.src = user.photoURL;
    }
    
    // Update form fields
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const profileEmailInput = document.getElementById('profileEmailInput');
    
    if (user.displayName) {
        const nameParts = user.displayName.split(' ');
        if (firstName && nameParts.length > 0) {
            firstName.value = nameParts[0];
        }
        if (lastName && nameParts.length > 1) {
            lastName.value = nameParts.slice(1).join(' ');
        }
    }
    
    if (profileEmailInput) {
        profileEmailInput.value = user.email;
    }
    
    // Get additional user data from Firestore if available
    // This would require adding Firestore to your Firebase setup
    // firebase.firestore().collection('users').doc(user.uid).get()
    //     .then((doc) => {
    //         if (doc.exists) {
    //             const userData = doc.data();
    //             // Populate additional fields
    //             if (document.getElementById('phone')) {
    //                 document.getElementById('phone').value = userData.phone || '';
    //             }
    //             if (document.getElementById('company')) {
    //                 document.getElementById('company').value = userData.company || '';
    //             }
    //         }
    //     });
    
    // Update subscription information
    updateSubscriptionInfo(user);
}

// Update account information
function updateAccountInfo() {
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const company = document.getElementById('company').value;
    
    // Update display name
    const displayName = `${firstName} ${lastName}`.trim();
    
    user.updateProfile({
        displayName: displayName
    }).then(() => {
        // Update successful
        showAlert('success', 'Profile updated successfully!');
        
        // Update profile header
        const profileName = document.getElementById('profileName');
        if (profileName) {
            profileName.textContent = displayName;
        }
        
        // Store additional data in Firestore if available
        // This would require adding Firestore to your Firebase setup
        // firebase.firestore().collection('users').doc(user.uid).set({
        //     firstName: firstName,
        //     lastName: lastName,
        //     phone: phone,
        //     company: company,
        //     updatedAt: new Date()
        // }, { merge: true });
    }).catch((error) => {
        // An error occurred
        showAlert('danger', 'Error updating profile: ' + error.message);
    });
}

// Update password
function updatePassword() {
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;
    
    // Validate passwords match
    if (newPassword !== confirmNewPassword) {
        showAlert('danger', 'New passwords do not match');
        return;
    }
    
    // Reauthenticate user
    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email, 
        currentPassword
    );
    
    user.reauthenticateWithCredential(credential).then(() => {
        // User reauthenticated, update password
        return user.updatePassword(newPassword);
    }).then(() => {
        // Password updated successfully
        showAlert('success', 'Password updated successfully!');
        document.getElementById('passwordForm').reset();
    }).catch((error) => {
        // An error occurred
        if (error.code === 'auth/wrong-password') {
            showAlert('danger', 'Current password is incorrect');
        } else {
            showAlert('danger', 'Error updating password: ' + error.message);
        }
    });
}

// Update subscription information
function updateSubscriptionInfo(user) {
    // This would typically come from your database
    // For demo purposes, we'll use mock data
    
    // Get subscription elements
    const currentPlanBadge = document.getElementById('currentPlanBadge');
    const planName = document.getElementById('planName');
    const planDescription = document.getElementById('planDescription');
    const planPrice = document.getElementById('planPrice');
    const billingCycle = document.getElementById('billingCycle');
    const usageProgress = document.getElementById('usageProgress');
    const usageCount = document.getElementById('usageCount');
    const usageLimit = document.getElementById('usageLimit');
    
    // Mock subscription data - in a real app, this would come from your database
    const mockSubscription = {
        plan: 'free', // 'free', 'pro', or 'enterprise'
        usageCount: 5,
        usageLimit: 20
    };
    
    // Update UI based on subscription
    if (currentPlanBadge) {
        currentPlanBadge.textContent = mockSubscription.plan.charAt(0).toUpperCase() + mockSubscription.plan.slice(1);
        
        if (mockSubscription.plan === 'pro') {
            currentPlanBadge.className = 'badge bg-success';
        } else if (mockSubscription.plan === 'enterprise') {
            currentPlanBadge.className = 'badge bg-primary';
        } else {
            currentPlanBadge.className = 'badge bg-secondary';
        }
    }
    
    if (planName) {
        if (mockSubscription.plan === 'pro') {
            planName.textContent = 'Pro Plan';
            planDescription.textContent = 'Access to all tools with unlimited usage';
            planPrice.textContent = '$19';
        } else if (mockSubscription.plan === 'enterprise') {
            planName.textContent = 'Enterprise Plan';
            planDescription.textContent = 'Everything in Pro plus API access';
            planPrice.textContent = '$49';
        } else {
            planName.textContent = 'Free Plan';
            planDescription.textContent = 'Basic access to tools with limited usage';
            planPrice.textContent = '$0';
        }
    }
    
    if (usageProgress) {
        const usagePercentage = (mockSubscription.usageCount / mockSubscription.usageLimit) * 100;
        usageProgress.style.width = `${usagePercentage}%`;
        
        if (usagePercentage > 80) {
            usageProgress.className = 'progress-bar bg-danger';
        } else if (usagePercentage > 50) {
            usageProgress.className = 'progress-bar bg-warning';
        } else {
            usageProgress.className = 'progress-bar bg-success';
        }
    }
    
    if (usageCount) {
        usageCount.textContent = mockSubscription.usageCount;
    }
    
    if (usageLimit) {
        usageLimit.textContent = mockSubscription.usageLimit;
    }
}

// Show alert message
function showAlert(type, message) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Find the form to show the alert before
    const form = document.querySelector('form');
    if (form) {
        form.parentNode.insertBefore(alertDiv, form);
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => alertDiv.remove(), 150);
        }, 5000);
    }
}
