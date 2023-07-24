const canvas = document.getElementById("juegoBreakout");
const juego = canvas.getContext("2d");
const canvasWidth = 800;
const canvasHeight = 600;

/* Bola */
let bolaX = canvas.width / 2;
let bolaY = canvas.height - 30;
let velocidadBolaX = 5;
let velocidadBolaY = -5;
const bolaRadius = 10;

/* Barra */
const barraWidth = 75;
const barraHeight = 10;
const barraMargin = 20; 
let barraX = (canvas.width - barraWidth) / 2;
let barraY  = canvas.height - barraHeight - barraMargin;
let derecha = false;
let izquierda= false;

/* Bloques */
const bloqueFilas = 5;
const bloqueColumnas = 8;
const bloqueWidth  = 80;
const bloqueHeight = 25;
const bloquePadding = 10;
const bloqueVertical = 50;
const bloqueHorizontal = 50;
const bloques = [];
for (let fila = 0; fila < bloqueFilas; fila++) {
  bloques[fila] = [];
  for (let col = 0; col < bloqueColumnas; col++) {
    const colores = ["#FFD700", "#FF1493", "#40E0D0", "#FF4500", "#9370DB"];
    const colorIndex = Math.floor(Math.random() * colores.length);
    const color = colores[colorIndex];
    bloques[fila][col] = { x: 0, y: 0, status: 1, color: color };
  }
}


/* Variables del Juego */
let juegoIniciado = false; 
let gameOver = false;
let vidas = 3; 

/* Variables del Puntaje*/
let puntaje = 0;
let puntajeX  = 50; 
let puntajeY = 30;

/* Contenedor del Juego */
const breakoutContenedor = document.createElement("div");
breakoutContenedor.setAttribute("id", "breakoutContenedor");
breakoutContenedor.style.display = "flex";
breakoutContenedor.style.justifyContent = "center";
breakoutContenedor.style.alignItems = "center";
breakoutContenedor.style.backgroundColor = "#f9f9f9"; 
breakoutContenedor.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)"; 
breakoutContenedor.style.border = "5px solid #333";
breakoutContenedor.style.borderRadius = "10px"; 
breakoutContenedor.style.width = "800px"; 
breakoutContenedor.style.height = "600px"; 
breakoutContenedor.style.margin = "0 auto"; 
document.body.appendChild(breakoutContenedor);
breakoutContenedor.appendChild(canvas);


/*Eventos*/
document.addEventListener("keydown", TeclaPresionada);
document.addEventListener("keyup", TeclaLiberada);
canvas.onclick = manejarClic;
canvas.addEventListener("click", manejarClic);

// Función para manejar cuando una tecla está presionada
function TeclaPresionada(event) {
  if (event.key === "Right" || event.key === "ArrowRight") {
    derecha = true;
  } else if (event.key === "Left" || event.key === "ArrowLeft") {
    izquierda= true;
  }
}

// Función para manejar cuando una tecla es liberada (soltada)
function TeclaLiberada(event) {
  if (event.key === "Right" || event.key === "ArrowRight") {
    derecha = false;
  } else if (event.key === "Left" || event.key === "ArrowLeft") {
    izquierda= false;
  }
}

// Función para dibujar la bola en el canva del juego
function dibujarBola() {
    juego.beginPath();
    juego.arc(bolaX, bolaY, bolaRadius, 0, Math.PI * 2);
    juego.fillStyle = "#2E8B57"
    juego.fill();
    juego.closePath();
  }
  
// Función para dibujar la barra en el canva del juego
function dibujarBarra() {
  juego.beginPath();
  juego.rect(barraX, barraY , barraWidth, barraHeight);
  juego.fillStyle = "#000000";
  juego.fill();
  juego.closePath();
}

// Función para dibujar los bloques en el canva del juego
function dibujarBloques() {
    for (let fila = 0; fila < bloqueFilas; fila++) {
      for (let col = 0; col < bloqueColumnas; col++) {
        if (bloques[fila][col].status === 1) {
          const bloqueX =
            col * (bloqueWidth  + bloquePadding) + bloqueHorizontal;
          const bloqueY =
            fila * (bloqueHeight + bloquePadding) + bloqueVertical;
          bloques[fila][col].x = bloqueX; 
          bloques[fila][col].y = bloqueY; 
          juego.beginPath();
          juego.rect(bloqueX, bloqueY, bloqueWidth , bloqueHeight);
          juego.fillStyle = bloques[fila][col].color;
          juego.fill();
          juego.closePath();
        }
      }
    }
  }

//Funcion para incrementar el puntaje al golpear un ladrillo
function colision() {
    for (let fila = 0; fila < bloqueFilas; fila++) {
      for (let col = 0; col < bloqueColumnas; col++) {
        const bloque = bloques[fila][col];
        if (bloque.status === 1) {
          const bloqueX = col * (bloqueWidth  + bloquePadding) + bloqueHorizontal;
          const bloqueY = fila * (bloqueHeight + bloquePadding) + bloqueVertical;
          if (
            bolaX > bloqueX &&
            bolaX < bloqueX + bloqueWidth  &&
            bolaY > bloqueY &&
            bolaY < bloqueY + bloqueHeight
          ) {
            velocidadBolaY = -velocidadBolaY;
            bloque.status = 0;
            puntaje += 10; 
          }
        }
      }
    }
  }

 // Función para dibujar el puntaje alcanzado en el canva del juego
function dibujarPuntaje() {
    juego.font = "24px Arial";
    juego.fillStyle = "#647C8C";
    juego.fillText("Puntaje: " + puntaje, puntajeX , puntajeY); 
  }
  

   // Función para dibujar las vidas rstantes en el canva del juego.
  function dibujarCorazones() {
    const tamaño = 20;
    const color = "#d90429"; 
    const corazonY = 30;

    juego.fillStyle = color;
    juego.font = `${tamaño}px FontAwesome`;

    for (let i = 0; i < vidas; i++) {
        const icono = "\u2764"; // Nombre del ícono "fa-heart" de Font Awesome
        const corazonX  = canvasWidth - (i + 1) * (tamaño + 5);
        juego.fillText(icono, corazonX , corazonY);
      }
  }

 // Función para mostrar el mensjae "Game Over" en el canva del juego.
  function mensajeGameOver() {
    juego.fillStyle = "#000080"; 
    juego.font = "bold 60px 'Pacifico', cursive";
    juego.textAlign = "center";
    juego.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    juego.font = "20px Arial";
    juego.fillText(`Puntaje: ${puntaje}`, canvas.width / 2, canvas.height / 2 + 40);

  }
  
 // Función que valida que el juego haya terminado.
  function finalJuego() {
    if (vidas === 0) {
      gameOver = true;
      mensajeGameOver();
    }
  }
  
/* Función que restablece los valores de incio para el 
    nuevo comienzo del juego.
*/
  function reiniciarJuego() {
    gameOver = false;
    vidas = 3;
    puntaje = 0;
    bolaX = canvas.width / 2;
    bolaY = canvas.height - 30;
    velocidadBolaX = 5;
    velocidadBolaY = -5;
    barraX = (canvas.width - barraWidth) / 2;
  }

/* Función para mostrar el boton de reiniciar en 
    el canva del juego.
*/
function botonReintentar() {
    const gradiente = juego.createLinearGradient(0, 0, canvas.width, 0);
    gradiente.addColorStop(0, "#FF5733"); // Color naranja
    gradiente.addColorStop(0.5, "#C70039"); // Color rojo
    gradiente.addColorStop(1, "#900C3F"); // Color burdeos
    juego.fillStyle = gradiente;
    juego.fillRect(canvas.width / 2 - 75,canvas.height / 2 + 60,150, 40
    );
    // Estilo del texto del botón
    juego.font = "24px Arial";
    juego.fillStyle = "#FFFFFF"; 
    juego.textAlign = "center";

    juego.fillText("Reintentar", canvas.width / 2, canvas.height / 2 + 85);
}

/* Función que captura el clic el boton 
de reintentar en el canva del juego.*/
  function manejarClic(event) {
    const mouseX = event.clientX - canvas.offsetLeft;
    const mouseY = event.clientY - canvas.offsetTop;

    if (gameOver || juegoGanado()) {
      if (
        mouseX >= canvas.width / 2 - 75 &&
        mouseX <= canvas.width / 2 + 75 &&
        mouseY >= canvas.height / 2 + 60 &&
        mouseY <= canvas.height / 2 + 100
      ) {
        // Reiniciar el juego
        juegoIniciado = true;
        vidas = 3;
        puntaje = 0;
        // Reiniciar el estado de los ladrillos
        for (let fila = 0; fila < bloqueFilas; fila++) {
            for (let col = 0; col < bloqueColumnas; col++) {
            bloques[fila][col].status = 1;
            }
        }
        puntajeX  = 100; 
        bolaX = canvas.width / 2;
        bolaY = canvas.height - 30;
        velocidadBolaX = 5;
        velocidadBolaY = -5;
        barraX = (canvas.width - barraWidth) / 2;
        gameOver = false;
       canvas.removeEventListener("click", manejarClic);
        Actualizar();
      }
    }
  }
 
  /* Función que para mostrar mensaje ganador al finalizar el juego*/
  function mensajeGanador() {
    const gradiente = juego.createLinearGradient(0, 0, canvas.width, 0);
    gradiente.addColorStop(0, "#FFC300"); // Color amarillo
    gradiente.addColorStop(0.5, "#FF5733"); // Color naranja
    gradiente.addColorStop(1, "#C70039"); // Color rojo
    juego.font = "bold 60px 'Pacifico', cursive";
    juego.fillStyle = gradiente;
    juego.textAlign = "center";
    juego.fillText("¡Ganaste!", canvas.width / 2, canvas.height / 2);
  }
  
   // Función que valida que el juego haya sido ganado.
  function juegoGanado() {
    for (let fila = 0; fila < bloqueFilas; fila++) {
      for (let col = 0; col < bloqueColumnas; col++) {
        if (bloques[fila][col].status === 1) {
          return false;
        }
      }
    }
    return true;
  }
  
  /* Función que actualiza cada vez que se produce una accion en el juego*/
function Actualizar() {
  bolaX += velocidadBolaX;
  bolaY += velocidadBolaY;

  if (bolaX + bolaRadius > canvas.width || bolaX - bolaRadius < 0) {
    velocidadBolaX = -velocidadBolaX;
  }

  if (bolaY - bolaRadius < 0) {
    velocidadBolaY = -velocidadBolaY;
  }

  if (
    bolaY + bolaRadius > canvas.height - barraHeight - barraMargin &&
    bolaX > barraX &&
    bolaX < barraX + barraWidth
  ) {
    const paddleCenterX = barraX + barraWidth / 2;
    const deltaX = bolaX - paddleCenterX;
    velocidadBolaY = -velocidadBolaY; 
    velocidadBolaX = deltaX * 0.2;
  }

  if (derecha && barraX < canvas.width - barraWidth) {
    barraX += 7;
  } else if (izquierda&& barraX > 0) {
    barraX -= 7;
  }

  // Verificar si la pelota cayó fuera de la barra.
  if (bolaY + bolaRadius > canvasHeight) {
    vidas--; 
    if (vidas === 0) {
   // Si se agotan las vidas, marcar el juego como Game Over
   gameOver = true;
    } else {
      // Si quedan vidas, volver a posicionar la pelota y la barra.
      bolaY = canvasHeight - 30;
      velocidadBolaX = 5;
      velocidadBolaY = -5;
      barraX = (canvasWidth - barraWidth) / 2;
    }
  }

    if (juegoGanado()) {
        gameOver = true;
    }

    juego.clearRect(0, 0, canvas.width, canvas.height);
    dibujarBola();
    dibujarBarra();
    dibujarBloques();
    colision();
    dibujarPuntaje(); 
    dibujarCorazones(); 

    if (gameOver) {
        mensajeGameOver();
        botonReintentar();
    } else if (juegoGanado()) {
        mensajeGanador();
        botonReintentar();
    } else {
        requestAnimationFrame(Actualizar);
    }

}

Actualizar();
