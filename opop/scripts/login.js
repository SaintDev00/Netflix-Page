const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMsg = document.getElementById('errorMsg');


form.addEventListener('submit', function(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    if (!email || !password) {
        showError('Por favor ingresa email y contraseña');
        return;
    }
    

    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        showError('Email o contraseña incorrectos');
        return;
    }
    
    sessionStorage.setItem('currentUser', email);
    
    window.location.href = 'profiles.html';
    
});

function showError(message) {
    errorMsg.textContent = message;
}