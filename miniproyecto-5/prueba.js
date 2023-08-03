let traductor = null;
let grabando = false;
let botonMensaje = 'Comenzar a grabar';
const grabar = document.getElementById('grabar');
const parar = document.getElementById('parar');

// Función para inicializar el reconocimiento de voz
function traductorAudioTexto() {
    const traductor = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    const idioma = document.getElementById('idioma');
    const idiomaSeleccionado = idioma.value;

    console.log(idiomaSeleccionado)
 switch (idiomaSeleccionado) {
    case "español":
        traductor.lang = 'es-ES';
        break;
    case "ingles":
        traductor.lang = 'en-US';
    case "italiano":
        traductor.lang = 'it-IT';
    case "aleman":
        traductor.lang = 'de-DE';
        break;
    case "portugues":
        traductor.lang = 'pt-PT';
        break;
    case "frances":
        traductor.lang = 'fr-FR';
    break;
    default:
        break;
 }

    traductor.interimResults = true; 
    traductor.continuous = true; 
    
    //Funcion para mostrar los resultados de la traduccion del audio
    traductor.onresult = function (event) {
        let audioTraducido = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            audioTraducido += event.results[i][0].transcript + ' ';
        }
        document.getElementById('resultado').innerText = audioTraducido;
    };
    
    //Funcion para cambiar mensaje del boton al terminar de grabar
    traductor.onend = function () {
        console.log('Reconocimiento de voz detenido.');
        document.getElementById('btnGrabar').innerHTML = '<i class="fas fa-microphone"></i> Comenzar a grabar';
    };
    
    return traductor;
}


document.getElementById('btnGrabar').addEventListener('click', () => {

    if (!grabando) {
        traductor = traductorAudioTexto();
        traductor.start();
        grabando = true;
        document.getElementById('btnGrabar').innerHTML = '<i class="fas fa-stop"></i> Detener grabación';
    } else {
        traductor.stop();
        grabando = false;
        document.getElementById('btnGrabar').innerHTML = '<i class="fas fa-microphone"></i> Comenzar a grabar';
    }
});

