// Ready Player Me avatar URL (this is a sample URL, replace with your own avatar URL)
const avatarUrl = 'https://models.readyplayer.me/6447ba8385abefaaca79db67.glb';

function loadAvatar() {
    const modelViewer = document.getElementById('avatar-model');
    modelViewer.src = avatarUrl;

    modelViewer.addEventListener('load', () => {
        console.log('Avatar loaded successfully');
        const animation = modelViewer.availableAnimations[0];
        if (animation) {
            modelViewer.play({animationName: animation, repetitions: Infinity});
        }
    });

    modelViewer.addEventListener('error', (error) => {
        console.error('Error loading avatar:', error);
        // Display a fallback image or message
        const avatarContainer = document.getElementById('avatar-container');
        avatarContainer.innerHTML = '<p>Unable to load avatar. Please try again later.</p>';
    });
}

window.addEventListener('load', loadAvatar);

// Add this function to check if the model-viewer element is supported
function checkWebGLSupport() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
}

// Call this function before trying to load the avatar
if (!checkWebGLSupport()) {
    console.error('WebGL is not supported in this browser');
    const avatarContainer = document.getElementById('avatar-container');
    avatarContainer.innerHTML = '<p>3D avatars are not supported in your browser. Please try a different browser.</p>';
}