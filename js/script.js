// Manejo de eventos al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    const selector = document.getElementById("selectorProblema");
    const label = document.getElementById("labelDato");
    const input = document.getElementById("inputDato");
    const formulario = document.getElementById("formularioMatematico");

    // Cambiar las instrucciones según el problema elegido
    selector.addEventListener("change", function() {
        if (selector.value === "primo") {
            label.textContent = "Ingresa el código numérico a verificar:";
            input.placeholder = "Ej. 17";
        } else if (selector.value === "fibo") {
            label.textContent = "Ingresa la cantidad de meses de ahorro:";
            input.placeholder = "Ej. 6";
        } else {
            label.textContent = "Ingresa la cantidad de términos a generar:";
            input.placeholder = "Ej. 10";
        }
    });

    // Ejecutar la solución al enviar el formulario
    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();
        procesarProblema();
    });
});

// Algoritmo: Verificación de número primo
function esPrimo(numero) {
    if (numero <= 1) return false;
    let contador = 0;
    
    for (let i = 1; i <= numero; i++) {
        if (numero % i === 0) {
            contador++;
        }
    }
    
    if (contador === 2) {
        return true;
    } else {
        return false;
    }
}

// Controladora principal
function procesarProblema() {
    const tipo = document.getElementById("selectorProblema").value;
    const valor = parseInt(document.getElementById("inputDato").value);
    const areaResultado = document.getElementById("areaResultado");
    
    // Mostrar el contenedor de resultados
    areaResultado.classList.remove("oculto");
    areaResultado.innerHTML = "";

    if (tipo === "primo") {
        // Problema 1: Números primos en códigos de acceso
        if (esPrimo(valor)) {
            areaResultado.innerHTML = `<h3>Resultado:</h3><p>El código <strong>${valor}</strong> es válido (Es un número primo).</p>`;
        } else {
            areaResultado.innerHTML = `<h3>Resultado:</h3><p>El código <strong>${valor}</strong> NO es válido (No es primo).</p>`;
        }
    } 
    else if (tipo === "fibo") {
        // Problema 2: Fibonacci en ahorro progresivo
        let a = 0;
        let b = 1;
        let c;
        let total = 0;
        let contenido = `<h3>Plan de Ahorro Mensual:</h3><ul style="list-style: none; padding: 0;">`;
        
        for (let i = 1; i <= valor; i++) {
            let ahorroMes = (i === 1) ? 1 : b;
            total += ahorroMes;
            contenido += `<li style="background: white; padding: 8px; margin-bottom: 5px; border-radius: 4px;">Mes ${i}: Bs. ${ahorroMes}</li>`;
            
            if (i > 1) {
                c = a + b;
                a = b;
                b = c;
            }
        }
        contenido += `</ul><p><strong>Total ahorrado: Bs. ${total}</strong></p>`;
        areaResultado.innerHTML = contenido;
    } 
    else if (tipo === "combinado") {
        // Problema 3: Fibonacci y primos combinados
        let a = 0;
        let b = 1;
        let c;
        let contenido = `<h3>Secuencia Combinada:</h3><p>Los números resaltados en amarillo son primos.</p><div class="grid-numeros">`;
        
        for (let i = 1; i <= valor; i++) {
            let numeroActual = a;
            let claseAgregada = "";
            
            if (esPrimo(numeroActual)) {
                claseAgregada = "es-primo";
            }
            
            contenido += `<div class="caja-numero ${claseAgregada}">${numeroActual}</div>`;
            
            c = a + b;
            a = b;
            b = c;
        }
        contenido += `</div>`;
        areaResultado.innerHTML = contenido;
    }
}

