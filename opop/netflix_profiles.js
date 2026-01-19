// Verificar sesión
const currentUser = sessionStorage.getItem('currentUser');
if (!currentUser) {
    window.location.href = 'netflix_login.html';
}

// Obtener usuarios
const users = JSON.parse(localStorage.getItem('users')) || [];
const user = users.find(u => u.email === currentUser);

if (!user) {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'netflix_login.html';
}

// Renderizar perfiles
const profilesList = document.getElementById('profilesList');
const profiles = user.profiles;

profiles.forEach(profile => {
    const profileCard = document.createElement('div');
    profileCard.className = 'profile-card';
    
    profileCard.innerHTML = `
        <div class="profile-avatar">👤</div>
        <div class="profile-name">${profile.name}</div>
    `;
    
    profileCard.addEventListener('click', function() {
        selectProfile(profile);
    });
    
    profilesList.appendChild(profileCard);
});

function selectProfile(profile) {
    sessionStorage.setItem('selectedProfile', JSON.stringify(profile));
    window.location.href = 'netflix_home.html';
}