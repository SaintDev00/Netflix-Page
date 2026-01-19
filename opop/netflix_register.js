// Obtener elementos del DOM
const form = document.getElementById('registerForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const errorMsg = document.getElementById('errorMsg');

// Manejar envío del formulario
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    // Validaciones
    if (!email || !password || !confirmPassword) {
        showError('Todos los campos son obligatorios');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Las contraseñas no coinciden');
        return;
    }
    
    if (password.length < 6) {
        showError('La contraseña debe tener al menos 6 caracteres');
        return;
    }
    
    // Obtener usuarios existentes
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Verificar si el email ya existe
    const userExists = users.find(u => u.email === email);
    if (userExists) {
        showError('Este email ya está registrado');
        return;
    }
    
    // Crear nuevo usuario con perfil por defecto
    const newUser = {
        email: email,
        password: password,
        profiles: [
            {
                id: 1,
                name: 'Perfil Principal'
            }
        ],
        favorites: {}
    };
    
    // Agregar usuario al array
    users.push(newUser);
    
    // Guardar en localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Redirigir al login
    window.location.href = 'netflix_login.html';
});

function showError(message) {
    errorMsg.textContent = message;
}