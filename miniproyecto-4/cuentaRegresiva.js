
// Función para obtener el tiempo restante hasta el año nuevo
function tiempoFaltante() {
    const hoy = new Date();
    const añoActual = hoy.getFullYear();
    const añoNuevo = new Date(añoActual + 1, 0, 1);
    const tiempoTotal = añoNuevo - hoy;
  
    const segundos = Math.floor((tiempoTotal / 1000) % 60);
    const minutos = Math.floor((tiempoTotal / 1000 / 60) % 60);
    const horas = Math.floor((tiempoTotal / (1000 * 60 * 60)) % 24);
    const dias = Math.floor(tiempoTotal / (1000 * 60 * 60 * 24));
  
    return {
      total: tiempoTotal,
      dias,
      horas,
      minutos,
      segundos,
    };
  }
  
  // Función para mostrar la cuenta regresiva en la pagina
  function cuentaRegresiva() {
    const conteo = document.getElementById('cuenta');
    const cuenta = tiempoFaltante();
  
    const conteoHTML = `
   
    <div class="contenedor">
    <div class="cuentaRegresiva">
        <span>${cuenta.dias}</span>
        <p>Días</p>
    </div>
    <div class="cuentaRegresiva">
        <span>${cuenta.horas}</span>
        <p>Horas</p>
    </div>
    <div class="cuentaRegresiva">
        <span>${cuenta.minutos}</span>
        <p>Minutos</p>
    </div>
    <div class="cuentaRegresiva"> 
        <span>${cuenta.segundos}</span>
        <p>Segundos</p>
    </div>
    </div>

  
    `;
  
    conteo.innerHTML = conteoHTML;
  
    // Actualizar el tiempo cada segundo
    if (cuenta.total > 0) {
      setTimeout(cuentaRegresiva, 1000);
    } else {
      conteo.innerHTML = '<h2>¡Feliz Año Nuevo!</h2>';
      setTimeout(function() {
        conteo.innerHTML = conteoHTML;
      }, 10000);
    }
  }
  
  cuentaRegresiva();
  

  const fechaActualElement = document.getElementById("fecha");

  //Funcion para mostrar la fecha Actual
  function fechaActual() {
    const fecha = new Date();
    const formato = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaHoy = fecha.toLocaleDateString('es-ES', formato);
  
    fechaActualElement.textContent = `Fecha de hoy: ${fechaHoy}`;
  }
  
  fechaActual();