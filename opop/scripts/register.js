const form = document.getElementById('registerForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const errorMsg = document.getElementById('errorMsg');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
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
    
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    const userExists = users.find(u => u.email === email);
    if (userExists) {
        showError('Este email ya está registrado');
        return;
    }
    
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
    
    users.push(newUser);
    
    localStorage.setItem('users', JSON.stringify(users));
    
    window.location.href = 'netflix_login.html';
});

function showError(message) {
    errorMsg.textContent = message;
}