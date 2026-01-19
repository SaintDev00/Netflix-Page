// Elementos del DOM
const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMsg = document.getElementById('errorMsg');

// Manejar login
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    if (!email || !password) {
        showError('Por favor ingresa email y contraseña');
        return;
    }
    
    // Obtener usuarios de localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Buscar usuario
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        showError('Email o contraseña incorrectos');
        return;
    }
    
    // Guardar sesión
    sessionStorage.setItem('currentUser', email);
    
    // Redirigir a perfiles
    window.location.href = 'netflix_profiles.html';
});

function showError(message) {
    errorMsg.textContent = message;
}