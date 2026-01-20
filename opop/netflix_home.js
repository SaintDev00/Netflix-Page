const currentUser = sessionStorage.getItem('currentUser');
const selectedProfile = JSON.parse(sessionStorage.getItem('selectedProfile'));

if (!currentUser || !selectedProfile) {
    window.location.href = 'netflix_login.html';
}

document.getElementById('profileName').textContent = selectedProfile.name;

const catalog = [
    { id: 1, image: './img/img-1.png', title: 'Stranger Things', category: 'Ciencia Ficción', year: 2016, description: 'Misterios sobrenaturales en un pueblo de Indiana' },
    { id: 2, image: './img/bd.jpg', title: 'Breaking Bad', category: 'Drama', year: 2008, description: 'Un profesor de química se convierte en narcotraficante' },
    { id: 3, image: './img/tc.png', title: 'The Crown', category: 'Drama', year: 2016, description: 'La vida de la Reina Isabel II' },
    { id: 4, image: './img/bm.png' , title: 'Black Mirror', category: 'Ciencia Ficción', year: 2011, description: 'Antología sobre tecnología y sociedad' },
    { id: 5,image: './img/nc.jpg', title: 'Narcos', category: 'Crimen', year: 2015, description: 'La historia de Pablo Escobar' },
    { id: 6,image: './img/tw.png', title: 'The Witcher', category: 'Fantasía', year: 2019, description: 'Un cazador de monstruos en un mundo mágico' },
    { id: 7,image: './img/ozark.jpg', title: 'Ozark', category: 'Thriller', year: 2017, description: 'Lavado de dinero en las montañas Ozark' },
    { id: 8,image: './img/to.jpg', title: 'The Office', category: 'Comedia', year: 2005, description: 'Vida cotidiana en una oficina de Scranton' },
    { id: 9,image: './img/dark.png', title: 'Dark', category: 'Misterio', year: 2017, description: 'Viajes en el tiempo en un pueblo alemán' },
    { id: 10,image: './img/cp.png', title: 'Money Heist', category: 'Acción', year: 2017, description: 'El atraco más grande de la historia' },
    { id: 11,image:'./img/vkg.png', title: 'Vikings', category: 'Historia', year: 2013, description: 'Las aventuras de Ragnar Lothbrok' },
    { id: 12,image:'./img/pb.jpg', title: 'Peaky Blinders', category: 'Crimen', year: 2013, description: 'Una familia de gánsteres en Birmingham' }
];

const users = JSON.parse(localStorage.getItem('users')) || [];
const userIndex = users.findIndex(u => u.email === currentUser);
let userFavorites = users[userIndex].favorites[selectedProfile.id] || [];

function renderCatalog() {
    const catalogList = document.getElementById('catalogList');
    catalogList.innerHTML = '';
    
    catalog.forEach(item => {
        const isFavorite = userFavorites.includes(item.id);
        
        const card = document.createElement('div');
        card.className = 'content-card';
        
        card.innerHTML = `
            <div class="content-info">
                <img src="${item.image}" alt="${item.title}" class="content-imag">

                <div class="content-title">${item.title}</div>
                <div class="content-meta">${item.category} · ${item.year}</div>
                <div class="content-actions">
                    <button class="btn-favorite ${isFavorite ? 'active' : ''}" data-id="${item.id}">
                        ${isFavorite ? '✓ En mi lista' : '+ Mi lista'}
                    </button>
                </div>
            </div>
        `;
        
        catalogList.appendChild(card);
    });
    
    document.querySelectorAll('.btn-favorite').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            toggleFavorite(itemId);
        });
    });
}

function renderFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = '';
    
    if (userFavorites.length === 0) {
        favoritesList.innerHTML = '<div class="empty-state">No tienes contenido en tu lista</div>';
        return;
    }
    
    const favoriteItems = catalog.filter(item => userFavorites.includes(item.id));
    
    favoriteItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'content-card';
        
        card.innerHTML = `
            <img src="${item.image}" alt="imagendest" class="content-imag">
            
            <div class="content-info">
                <div class="content-title">${item.title}</div>
                <div class="content-meta">${item.category} · ${item.year}</div>
                <div class="content-actions">
                    <button class="btn-favorite active" data-id="${item.id}">
                        ✓ En mi lista
                    </button>
                </div>
            </div>
        `;
        
        favoritesList.appendChild(card);
    });
    
    document.querySelectorAll('#favoritesList .btn-favorite').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            toggleFavorite(itemId);
        });
    });
}

function toggleFavorite(itemId) {
    const index = userFavorites.indexOf(itemId);
    
    if (index > -1) {
        userFavorites.splice(index, 1);
    } else {
        userFavorites.push(itemId);
    }
    
    users[userIndex].favorites[selectedProfile.id] = userFavorites;
    localStorage.setItem('users', JSON.stringify(users));
    
    renderCatalog();
    renderFavorites();
}

document.getElementById('logoutBtn').addEventListener('click', function() {
    sessionStorage.clear();
    window.location.href = 'netflix_index.html';
});

document.getElementById('myListLink').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.catalog-section:last-of-type').scrollIntoView({ behavior: 'smooth' });
});

renderCatalog();
renderFavorites();