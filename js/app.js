const elementos = {
    formulario: document.querySelector('#agregar-gasto'),
    gastoLista: document.querySelector('#gastos ul'),
    presupuestoElemento: document.querySelector('#total'),
    restanteElemento: document.querySelector('#restante')
};

let presupuesto = {
    inicial: 0,
    restante: 0
};

elementos.formulario.addEventListener('submit', agregarGasto);
elementos.gastoLista.addEventListener('click', eliminarGasto);
document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cuál es tu presupuesto?');

    if (presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    } else {
        presupuesto.inicial = Number(presupuestoUsuario);
        presupuesto.restante = presupuesto.inicial;
        actualizarPresupuesto();
    }
}

function agregarGasto(e) {
    e.preventDefault();

    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = Number(document.querySelector('#cantidad').value);

    if (nombreGasto === '' || cantidadGasto === '' || isNaN(cantidadGasto) || cantidadGasto <= 0) {
        alert('Por favor, ingrese un nombre y una cantidad válidos.');
        return;
    }

    if (cantidadGasto > presupuesto.restante) {
        alert('El gasto supera el presupuesto restante.');
        return;
    }

    const nuevoGasto = document.createElement('li');
    nuevoGasto.textContent = `${nombreGasto}: $${cantidadGasto}`;
    nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
    
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.className = 'btn btn-danger btn-sm';
    botonEliminar.style.marginLeft = '10px';

    nuevoGasto.appendChild(botonEliminar);
    elementos.gastoLista.appendChild(nuevoGasto);

    presupuesto.restante -= cantidadGasto;
    actualizarPresupuesto();

    elementos.formulario.reset();
}

function eliminarGasto(e) {
    if (e.target.classList.contains('btn-danger')) {
        const gasto = e.target.parentElement;
        const cantidad = Number(gasto.textContent.match(/\d+/)[0]);
        presupuesto.restante += cantidad;
        actualizarPresupuesto();
        gasto.remove();
    }
}

function actualizarPresupuesto() {
    elementos.presupuestoElemento.textContent = presupuesto.inicial;
    elementos.restanteElemento.textContent = presupuesto.restante;
}
