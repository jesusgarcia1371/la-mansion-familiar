// 1. Datos del sistema con textos reducidos a un punto
const menuData = [
    {
        name: "Café Latte",
        price: "$1",
        description: ".",
        images: [
            "https://via.placeholder.com/600x400/5c3a21/d4c5b9?text=Latte+1",
            "https://via.placeholder.com/600x400/8b5a2b/d4c5b9?text=Latte+2"
        ]
    },
    {
        name: "Mocaccino",
        price: "$1",
        description: ".",
        images: [
            "https://via.placeholder.com/600x400/5c3a21/d4c5b9?text=Mocaccino+1"
        ]
    },
    {
        name: "Capuchino",
        price: "$1",
        description: ".",
        images: [
            "https://via.placeholder.com/600x400/5c3a21/d4c5b9?text=Capuchino+1",
            "https://via.placeholder.com/600x400/2c1e16/d4c5b9?text=Capuchino+2"
        ]
    }
];

const antiquesData = [
    {
        name: "Taza de piterranio",
        origin: ".",
        curiosity: ".",
        images: [
            "https://via.placeholder.com/600x400/5c3a21/d4c5b9?text=Taza+1",
            "https://via.placeholder.com/600x400/8b5a2b/d4c5b9?text=Taza+2"
        ]
    }
];

// --- LÓGICA DEL CARRUSEL Y SWIPE (Deslizamiento) ---
let currentImages = []; 
let currentIndex = 0;   
let currentModalType = ''; 

function openCarousel(index, type) {
    if (type === 'menu') {
        currentImages = menuData[index].images;
    } else if (type === 'antiques') {
        currentImages = antiquesData[index].images;
    }

    currentIndex = 0;
    
    if (currentImages && currentImages.length > 0) {
        updateCarouselImage();
        const modal = document.getElementById('carousel-modal');
        modal.classList.add('show');
    }
}

function closeCarousel() {
    const modal = document.getElementById('carousel-modal');
    modal.classList.remove('show');
}

function changeImage(direction) {
    if (!currentImages || currentImages.length === 0) return;
    
    const imgElement = document.getElementById('carousel-img');
    imgElement.style.opacity = 0; // Efecto visual al cambiar
    
    setTimeout(() => {
        currentIndex += direction;
        
        if (currentIndex >= currentImages.length) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = currentImages.length - 1;
        }
        
        updateCarouselImage();
        imgElement.style.opacity = 1;
    }, 200);
}

function updateCarouselImage() {
    const imgElement = document.getElementById('carousel-img');
    imgElement.src = currentImages[currentIndex];
}

// Detectar gestos táctiles (Swipe)
let touchStartX = 0;
let touchEndX = 0;

const modalContent = document.querySelector('.modal-content');

modalContent.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

modalContent.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50; // Distancia mínima para considerar que fue un deslizamiento
    if (touchEndX < touchStartX - swipeThreshold) {
        changeImage(1); // Deslizó a la izquierda (siguiente foto)
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        changeImage(-1); // Deslizó a la derecha (foto anterior)
    }
}
// ---------------------------------------------------


// 2. Funciones que generan el HTML
function renderMenu() {
    let html = '<h2>Menú de la Casa</h2><ul class="item-list fade-in">';
    
    menuData.forEach((item, index) => {
        html += `
            <li class="item" onclick="openCarousel(${index}, 'menu')">
                <div class="item-header">
                    <h3>${item.name}</h3>
                    <span class="price">${item.price}</span>
                </div>
                <p>${item.description}</p>
                <span class="click-hint">📸 Toca para ver fotos</span>
            </li>
        `;
    });

    html += '</ul><div class="fade-in" style="text-align: center;"><a href="#" onclick="navigate(\'home\')" class="back-link">Volver al inicio</a></div>';
    return html;
}

function renderAntiques() {
    let html = '<h2>Colección de Antigüedades</h2><ul class="item-list fade-in">';
    
    antiquesData.forEach((item, index) => {
        html += `
            <li class="item" onclick="openCarousel(${index}, 'antiques')">
                <div class="item-header">
                    <h3>${item.name}</h3>
                </div>
                <p><strong>Origen:</strong> ${item.origin}</p>
                <p><strong>Curiosidad:</strong> ${item.curiosity}</p>
                <span class="click-hint">📸 Toca para ver fotos</span>
            </li>
        `;
    });

    html += '</ul><div class="fade-in" style="text-align: center;"><a href="#" onclick="navigate(\'home\')" class="back-link">Volver al inicio</a></div>';
    return html;
}


// 3. Estructura de las páginas
const pages = {
    home: `
        <div class="welcome-text fade-in">
            <h2>Bienvenidos</h2>
            <p>.</p>
        </div>
        <div class="card-container fade-in">
            <div class="card" onclick="navigate('menu')">
                <h2>Menú</h2>
                <p>.</p>
            </div>
            <div class="card" onclick="navigate('antiques')">
                <h2>Antigüedades</h2>
                <p>.</p>
            </div>
        </div>
    `,
    menu: renderMenu,
    antiques: renderAntiques
};


// 4. Lógica de navegación con reinicio de animación
function navigate(page) {
    const app = document.getElementById('app');
    
    // Eliminamos el contenido brevemente para que la animación se reinicie
    app.innerHTML = '';
    
    setTimeout(() => {
        if (typeof pages[page] === 'function') {
            app.innerHTML = pages[page]();
        } else {
            app.innerHTML = pages[page];
        }
    }, 50); // Pequeño retraso imperceptible para asegurar que se ejecute la animación de CSS
}

navigate('home');