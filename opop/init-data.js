
(function() {
    // Verificar si ya se inicializó antes
    if (localStorage.getItem('initialized') === 'true') {
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users'));
    
    // Solo inicializar si no hay usuarios
    if (!users || users.length === 0) {
        const defaultUsers = [
            {
                email: 'admin@notflix.com',
                password: '123456',
                profiles: [
                    { id: 1, name: 'Admin' },
                    { id: 2, name: 'Usuario 2' }
                ],
                favorites: {
                    1: [1, 5, 9],
                    2: []
                }
            },
            {
                email: 'usuario@test.com',
                password: '123456',
                profiles: [
                    { id: 1, name: 'Mi Perfil' }
                ],
                favorites: {
                    1: [2, 4, 6]
                }
            }
        ];
        
        localStorage.setItem('users', JSON.stringify(defaultUsers));
        localStorage.setItem('initialized', 'true');
        console.log('✓ Usuarios de prueba creados');
    }
})();