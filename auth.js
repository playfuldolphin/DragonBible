// Dragon Bible - Firebase Authentication
// Handles user registration, login, and account management

// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
let auth = null;
let db = null;
let currentUser = null;

function initializeFirebase() {
    if (typeof firebase === 'undefined') {
        console.error('Firebase not loaded');
        return false;
    }
    
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    
    // Listen for auth state changes
    auth.onAuthStateChanged(onAuthStateChanged);
    
    return true;
}

// Handle auth state changes
function onAuthStateChanged(user) {
    currentUser = user;
    
    if (user) {
        // User is signed in
        console.log('User signed in:', user.email);
        onUserSignedIn(user);
    } else {
        // User is signed out
        console.log('User signed out');
        onUserSignedOut();
    }
}

// When user signs in
function onUserSignedIn(user) {
    // Update UI
    updateUIForSignedInUser(user);
    
    // Load user data from Firestore
    loadUserData(user.uid);
    
    // Check subscription status
    checkUserSubscription(user.uid);
}

// When user signs out
function onUserSignedOut() {
    // Update UI
    updateUIForSignedOutUser();
    
    // Clear local data
    currentUser = null;
}

// Update UI for signed-in user
function updateUIForSignedInUser(user) {
    // Show user menu
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        // Remove sign-in button
        const signInBtn = document.querySelector('[onclick="showSignInModal()"]');
        if (signInBtn) {
            signInBtn.remove();
        }
        
        // Add user menu
        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu';
        userMenu.innerHTML = `
            <button class="user-avatar" onclick="toggleUserMenu()">
                ${user.displayName ? user.displayName[0] : user.email[0]}
            </button>
            <div class="user-dropdown hidden">
                <div class="user-info">
                    <div class="user-email">${user.email}</div>
                </div>
                <a href="#" onclick="showProfileModal()">My Profile</a>
                <a href="#" onclick="showReadingProgress()">Reading Progress</a>
                <a href="#" onclick="showBookmarks()">My Bookmarks</a>
                <a href="#" onclick="openCustomerPortal()">Manage Subscription</a>
                <a href="#" onclick="signOut()">Sign Out</a>
            </div>
        `;
        navLinks.appendChild(userMenu);
    }
}

// Update UI for signed-out user
function updateUIForSignedOutUser() {
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.remove();
    }
}

// Sign up with email/password
async function signUpWithEmail(email, password, displayName) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Update profile with display name
        await user.updateProfile({
            displayName: displayName
        });
        
        // Create user document in Firestore
        await db.collection('users').doc(user.uid).set({
            email: email,
            displayName: displayName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            subscriptionStatus: 'free',
            readingProgress: {},
            bookmarks: []
        });
        
        // Send verification email
        await user.sendEmailVerification();
        
        // Track signup
        if (window.DragonAnalytics) {
            window.DragonAnalytics.trackSignup('email');
        }
        
        return { success: true, user };
    } catch (error) {
        console.error('Signup error:', error);
        return { success: false, error: error.message };
    }
}

// Sign in with email/password
async function signInWithEmail(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        
        // Track signin
        if (window.DragonAnalytics) {
            window.DragonAnalytics.trackSignin('email');
        }
        
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Signin error:', error);
        return { success: false, error: error.message };
    }
}

// Sign in with Google
async function signInWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);
        
        // Check if this is a new user
        if (result.additionalUserInfo.isNewUser) {
            // Create user document
            await db.collection('users').doc(result.user.uid).set({
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                subscriptionStatus: 'free',
                readingProgress: {},
                bookmarks: []
            });
        }
        
        // Track signin
        if (window.DragonAnalytics) {
            window.DragonAnalytics.trackSignin('google');
        }
        
        return { success: true, user: result.user };
    } catch (error) {
        console.error('Google signin error:', error);
        return { success: false, error: error.message };
    }
}

// Sign out
async function signOut() {
    try {
        await auth.signOut();
        
        // Track signout
        if (window.DragonAnalytics) {
            window.DragonAnalytics.trackSignout();
        }
        
        return { success: true };
    } catch (error) {
        console.error('Signout error:', error);
        return { success: false, error: error.message };
    }
}

// Reset password
async function resetPassword(email) {
    try {
        await auth.sendPasswordResetEmail(email);
        return { success: true };
    } catch (error) {
        console.error('Password reset error:', error);
        return { success: false, error: error.message };
    }
}

// Load user data from Firestore
async function loadUserData(uid) {
    try {
        const doc = await db.collection('users').doc(uid).get();
        
        if (doc.exists) {
            const userData = doc.data();
            
            // Store user data globally
            window.currentUserData = userData;
            
            // Load reading progress
            if (userData.readingProgress) {
                window.readingProgress = userData.readingProgress;
            }
            
            // Load bookmarks
            if (userData.bookmarks) {
                window.userBookmarks = userData.bookmarks;
            }
            
            return userData;
        }
    } catch (error) {
        console.error('Load user data error:', error);
    }
}

// Save reading progress
async function saveReadingProgress(bookId, chapterNum) {
    if (!currentUser) return;
    
    try {
        const progressKey = `${bookId}_${chapterNum}`;
        
        await db.collection('users').doc(currentUser.uid).update({
            [`readingProgress.${progressKey}`]: {
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                bookId,
                chapterNum
            }
        });
    } catch (error) {
        console.error('Save progress error:', error);
    }
}

// Save bookmark
async function saveBookmark(bookId, chapterNum, verseIndex, verseText) {
    if (!currentUser) return;
    
    try {
        const bookmark = {
            id: Date.now(),
            bookId,
            chapterNum,
            verseIndex,
            verseText: verseText.substring(0, 200),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        await db.collection('users').doc(currentUser.uid).update({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(bookmark)
        });
        
        return bookmark;
    } catch (error) {
        console.error('Save bookmark error:', error);
    }
}

// Remove bookmark
async function removeBookmark(bookmarkId) {
    if (!currentUser) return;
    
    try {
        const userData = await loadUserData(currentUser.uid);
        const bookmarks = userData.bookmarks.filter(b => b.id !== bookmarkId);
        
        await db.collection('users').doc(currentUser.uid).update({
            bookmarks: bookmarks
        });
    } catch (error) {
        console.error('Remove bookmark error:', error);
    }
}

// Check user subscription status
async function checkUserSubscription(uid) {
    try {
        const doc = await db.collection('users').doc(uid).get();
        const userData = doc.data();
        
        if (userData.subscriptionStatus === 'premium' || userData.subscriptionStatus === 'lifetime') {
            if (window.DragonPayment) {
                window.DragonPayment.unlockPremiumFeatures();
            }
        }
    } catch (error) {
        console.error('Check subscription error:', error);
    }
}

// Toggle user menu
function toggleUserMenu() {
    const dropdown = document.querySelector('.user-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

// Show sign in modal
function showSignInModal() {
    // Create and show sign in modal
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'signInModal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeSignInModal()"></div>
        <div class="modal-content auth-modal">
            <button class="modal-close" onclick="closeSignInModal()">×</button>
            <div class="auth-header">
                <div class="modal-icon">🐉</div>
                <h2>Welcome Back, Dragon Rider</h2>
                <p class="modal-subtitle">Sign in to access your saved progress and bookmarks</p>
            </div>
            
            <div class="auth-tabs">
                <button class="auth-tab active" onclick="showSignInTab()">Sign In</button>
                <button class="auth-tab" onclick="showSignUpTab()">Sign Up</button>
            </div>
            
            <div class="auth-form" id="signInForm">
                <input type="email" id="signInEmail" placeholder="Email" class="auth-input">
                <input type="password" id="signInPassword" placeholder="Password" class="auth-input">
                <button class="btn btn-primary btn-large" onclick="handleSignIn()">Sign In</button>
                <a href="#" onclick="showResetPasswordModal()" class="auth-link">Forgot password?</a>
            </div>
            
            <div class="auth-form hidden" id="signUpForm">
                <input type="text" id="signUpName" placeholder="Display Name" class="auth-input">
                <input type="email" id="signUpEmail" placeholder="Email" class="auth-input">
                <input type="password" id="signUpPassword" placeholder="Password (min 6 characters)" class="auth-input">
                <button class="btn btn-primary btn-large" onclick="handleSignUp()">Create Account</button>
            </div>
            
            <div class="auth-divider">
                <span>OR</span>
            </div>
            
            <button class="btn btn-social btn-google" onclick="handleGoogleSignIn()">
                <span>🔍</span> Continue with Google
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeSignInModal() {
    const modal = document.getElementById('signInModal');
    if (modal) {
        modal.remove();
    }
}

function showSignInTab() {
    document.getElementById('signInForm').classList.remove('hidden');
    document.getElementById('signUpForm').classList.add('hidden');
    document.querySelectorAll('.auth-tab')[0].classList.add('active');
    document.querySelectorAll('.auth-tab')[1].classList.remove('active');
}

function showSignUpTab() {
    document.getElementById('signInForm').classList.add('hidden');
    document.getElementById('signUpForm').classList.remove('hidden');
    document.querySelectorAll('.auth-tab')[0].classList.remove('active');
    document.querySelectorAll('.auth-tab')[1].classList.add('active');
}

async function handleSignIn() {
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;
    
    const result = await signInWithEmail(email, password);
    
    if (result.success) {
        closeSignInModal();
        alert('Welcome back!');
    } else {
        alert('Sign in failed: ' + result.error);
    }
}

async function handleSignUp() {
    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    const result = await signUpWithEmail(email, password, name);
    
    if (result.success) {
        closeSignInModal();
        alert('Account created! Please check your email to verify your account.');
    } else {
        alert('Sign up failed: ' + result.error);
    }
}

async function handleGoogleSignIn() {
    const result = await signInWithGoogle();
    
    if (result.success) {
        closeSignInModal();
        alert('Welcome!');
    } else {
        alert('Google sign in failed: ' + result.error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeFirebase();
});

// Export functions
window.DragonAuth = {
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signOut,
    resetPassword,
    saveReadingProgress,
    saveBookmark,
    removeBookmark,
    getCurrentUser: () => currentUser
};

window.showSignInModal = showSignInModal;
window.closeSignInModal = closeSignInModal;
window.showSignInTab = showSignInTab;
window.showSignUpTab = showSignUpTab;
window.handleSignIn = handleSignIn;
window.handleSignUp = handleSignUp;
window.handleGoogleSignIn = handleGoogleSignIn;
window.toggleUserMenu = toggleUserMenu;
window.signOut = signOut;
