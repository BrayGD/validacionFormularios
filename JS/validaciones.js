export function valida(input){
    const tipoDeInput = input.dataset.tipo
    if (validadores [tipoDeInput]){
        validadores [tipoDeInput](input)
    }

    if (input.validity.valid){
        input.parentElement.classList.remove("input-container-invalid")
        input.paretnElement.querySelector(".input-message-error").innerHTML = ""
    }else {
        input.parentElement.classList.add("input-container-invalid")
        input.paretnElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensajeDeError = {
    nombre:{
        valueMissing: "Este campo no puede estar vacio"
    },

    email:{ 
    
        valueMissing:"Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },

    password:{
        valueMissing:"Este campo no puede estar vacio",
        patternMismatch: "Un mínimo de 6 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"
    },
    nacimiento:{
        valueMissing:"Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero:{
        valueMissing:"Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es  XXXXXXXXXX 10 números"

    },

    direccion:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 y 40 cractéres"

    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 10 y 40 cractéres"

    },
    estado:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El estado debe contener entre 10 y 40 cractéres"

    }
}

const validadores ={
    nacimiento: input => validarNacimiento(input)
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = ""
    mensajeDeError.forEach(error => {
        if (input.validity [error]){
            mensaje= mensajeDeError[tipoDeInput][error]
        }
    });
    return mensaje
}

function validarNacimiento(input){
    const fechaCliente = new Date (input.value)
    let mensaje = ""
    if (!mayorEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
}
input.setCustomValidity(mensaje);
}


function mayorEdad(fecha){
    const fechaActual =  new Date ();
    const diferenciaFechas = new Date (
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(),
        fecha.getUTCDate()
        );
        return diferenciaFechas <= fechaActual;
}

