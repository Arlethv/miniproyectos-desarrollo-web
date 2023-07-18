// Mantener el número de página actual
let pagina = 1;

// Función para cargar más imágenes
function cargarImagenes() {

    // Mostrar el icono de carga
    document.getElementById("loading").style.display = "block";

    setTimeout(() => {
        const nuevasImagenes = [
        {src: "https://images.unsplash.com/photo-1544989164-22f292ae11b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",titulo:"Rio de Janeiro"},
        {src: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",titulo:"Machu Picchu, Peru"},
        {src: "https://images.unsplash.com/photo-1555993539-1732b0258235?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",titulo:"Atenas, Grecia"},
        {src: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80",titulo:"New York"},
        {src: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2301&q=80",titulo:"Phuket, Tailandia"},
        {src: "https://images.unsplash.com/photo-1562559094-0739564bbc71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",titulo:"Costa Rica"},
        {src: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2352&q=80",titulo:"El Gran Cañon"},
        {src:"https://images.unsplash.com/photo-1598402453861-4fbcbf6ced3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",titulo:"Las cataratas del Niágara"},
        {src:"https://images.unsplash.com/photo-1628503218283-6ddeac69dfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",titulo:" Pirámide de Guiza"},
        {src:"https://images.unsplash.com/photo-1608037521277-154cd1b89191?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",titulo:"Gran Muralla China"},
        {src:"https://images.unsplash.com/photo-1551352912-484163ad5be9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80",titulo:"Sydney, Austarlia"},
        {src:"https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80",titulo:" Taj Mahal"},
        {src:" https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2252&q=80",titulo:"Singapur"},
        {src:"https://images.unsplash.com/photo-1570299437488-d430e1e677c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2225&q=80",titulo:"Habana, Cuba"},
        {src:"https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2428&q=80",titulo:"Venecia"},
        {src:"https://images.unsplash.com/photo-1524536120883-854d2c00bf1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",titulo:"Isla de Pascua"},
        {src:"https://images.unsplash.com/photo-1580503056870-5b465315ba34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",titulo:"Bahamas"},
        {src:"https://images.unsplash.com/photo-1508035460735-91088c495500?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",titulo:"Tikal, Guatemala"},
        {src:"https://images.unsplash.com/photo-1542533382-b42a59d8bd39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",titulo:"Filipinas"},
        {src:"https://images.unsplash.com/photo-1519659528534-7fd733a832a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2226&q=80",titulo:"Kenia"},
        {src:"https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",titulo:"Mykonos, Grecia"}
        
        ];

        // Agregar los elementos para las nuevas imágenes
        const galeriaImagenes = document.getElementById("gallery");
        nuevasImagenes.forEach((image) => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");
        card.innerHTML = `
            <div class="card">
            <img src="${image.src}"}" class="card-img-top" alt="Imagen">
            <div class="card-body">
                <h5 class="card-title">${image.titulo}</h5>
                <p class="card-text">Lugar turistico</p>
            </div>
            
            </div>
        `;
        galeriaImagenes.appendChild(card);
        });

        // Ocultar el icono de carga
        document.getElementById("loading").style.display = "none";
    }, 1000);
}

// Esta función verifica si el usuario ha llegado al final de la página
function scrollInfinito() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    // Cargar más imágenes cuando el usuario llega al final de la página
    pagina++;
    cargarImagenes();
  }
}

// Capturar el evento scroll por parte del usuario
window.addEventListener("scroll", scrollInfinito);

