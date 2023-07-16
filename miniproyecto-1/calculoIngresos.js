
const formulario = document.getElementById('formulario');
const moneda = document.getElementById('moneda');
const salarioMonto= document.getElementById('salario');
const frecuenciaPago= document.getElementById('frecuencia');
const calculoSalario=document.getElementById('calculoSalario');
const tipoMoneda= document.querySelectorAll(".tipoMoneda");
const horas=document.getElementById('horas');
const dias=document.getElementById('dias');
const totalIngresos=document.getElementById('totalIngresos');
const ingresosAdicionales=document.getElementById('bonos');
const impuestos=document.getElementById('deducciones');
const monedaGastos=document.getElementById('monedaGastos');
const gastoMensual=document.getElementById('gastos');
const otroGasto=document.getElementById('otrosGastos');
const gastoTotal=document.getElementById('totalGastos');
const balance=document.getElementById('balance');
const totalGasto=document.getElementById('gastosTotales');
const ingresosTotales=document.getElementById('ingresosTotales');
const btnBorrar = document.querySelector(".btn-borrar");

// Obtener el  el tipo de moneda seleccionada
moneda.addEventListener('change', function() {
    const monedaSeleccionada = moneda.value;
    
    if(monedaSeleccionada!=""){
        tipoMoneda.forEach(tipoMonedas => {
            tipoMonedas.style.display = ''; 
            tipoMonedas.textContent = monedaSeleccionada;
          });
    }else{
        tipoMoneda.style.display = none;
        monedaGastos.style.display = none;
    }
});

salario.addEventListener('change',validarSalario);
frecuencia.addEventListener('change',validarSalario);
bonos.addEventListener('change',validarSalario);
deducciones.addEventListener('change',validarSalario);

//Calculo del Sueldo en pago por horas trabajadas
 horas.addEventListener('change', function() {
    const horasIngresadas = horas.value;
    const cantidadSalario=salarioMonto.value
    if(!isNaN(horasIngresadas) && !isNaN(cantidadSalario)){
        total=horasIngresadas*cantidadSalario;
        totalIngresos.value=total
      
    }
 });

 //Calculo del Sueldo en pago por dias trabajados
dias.addEventListener('change', function() {
    const diasIngresados = dias.value;
    const cantidadSalario=salarioMonto.value
    if(!isNaN(diasIngresados) && !isNaN(cantidadSalario)){
        total=diasIngresados*cantidadSalario;
        totalIngresos.value=total
      
    }
 });


//Calculo del Sueldo neto de acuerdo a las diferentes frecuencias de pago
 function validarSalario() {
    const frecuenciaSeleccionada = frecuencia.value;
    const cantidadSalario=parseFloat(salarioMonto.value);
    const ingresoTotal=parseFloat(totalIngresos.value)
    const ingresos = parseFloat(ingresosAdicionales.value);
    const deduccion= parseFloat(impuestos.value) 
        if(frecuenciaSeleccionada=="Hora"){
            calculoSalario.style.display = '';
            } else {
                calculoSalario.style.display = 'none';
            }if(frecuenciaSeleccionada=="Dia") {
                salarioDiario.style.display = '';
            } else {
                salarioDiario.style.display = 'none';
            } 
            
            if (frecuenciaSeleccionada =="Semana") {
    
             // Cálculo para salario semanal
            total=cantidadSalario*4;
     
          } else if (frecuenciaSeleccionada === "Quincena") {
            // Cálculo para salario quincenal
            total=cantidadSalario*2 
   
          } else if (frecuenciaSeleccionada === "Mes") {
            // Cálculo para salario mensual
            total=cantidadSalario
          
           
          } 

          if(!isNaN(deduccion)&& !isNaN(ingresos) && !isNaN(cantidadSalario)){
              sueldoTotal=(total+ingresos)-deduccion;
              totalIngresos.value=sueldoTotal
          }else if(!isNaN(deduccion) && !isNaN(cantidadSalario && isNaN(ingresos) )){
                sueldoTotal=total-deduccion;
                totalIngresos.value=sueldoTotal
          }else if(isNaN(deduccion) && !isNaN(ingresos) && !isNaN(cantidadSalario)){
              sueldoTotal=total+ingresos;
              totalIngresos.value=sueldoTotal;
          }else{;
            totalIngresos.value=0
          }
          
          
 }


gastos.addEventListener('change',gastosTotales);
otrosGastos.addEventListener('change',gastosTotales);


//Calculo de gastos mensuales
 function gastosTotales() {
    const gasto=parseFloat(gastoMensual.value)
    const gastoAdicional=parseFloat(otroGasto.value)
    if(isNaN(gastoAdicional)&& !isNaN(gasto)){
        gastoTotal.value=gasto;
    }else if(!isNaN(gastoAdicional)&& isNaN(gasto)){
        gastoTotal.value=gastoAdicional;
    }else if(isNaN(gastoAdicional)&& isNaN(gasto)){
        gastoTotal.value=0;
    }else{
        gastoTotal.value=gasto+gastoAdicional;
    }
    
 }


 //Calculo total de los ingresos mensuales
 boton.addEventListener('click', () => {
    const gasto=gastoTotal.value
    const ingreso=totalIngresos.value
    const balances=ingreso-gasto;
    if(!isNaN(gasto)&& !isNaN(ingreso) ){
        balance.value=balances;
        totalGasto.value=gasto;
        ingresosTotales.value=ingreso;
    }

    let descripcionBalance;
    if (balances > 0) {
        descripcionBalance ="Superávit Financiero: Los ingresos superan los gastos.";
        balanceDescripcion.classList.add("superavit");
    } else if (balances < 0){
        descripcionBalance = "Déficit Financiero: Los gastos superan los ingresos.";
        balanceDescripcion.classList.add("deficit");
    }else if(balances ===0){
        descripcionBalance="Balance neutral";
        balanceDescripcion.classList.remove("superavit", "deficit"); 
    }

    document.getElementById('balanceDescripcion').textContent = descripcionBalance;

    const formulario = document.querySelector('.needs-validation');
     // Validar el formulario
    formulario.classList.add('was-validated');
});


btnBorrar.addEventListener("click", function() {

  const formulario = document.querySelector("form");
    
  const validacion = document.querySelector('.needs-validation');
    validacion.classList.remove('was-validated');

  // Borrar los datos ingresados
  formulario.reset();
});
