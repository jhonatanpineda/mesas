document.addEventListener("DOMContentLoaded", function() {
    const numMesas = prompt("Número de mesas:");

    const mapaMesas = document.getElementById("mapaMesas");
    const contextMenu = document.getElementById("contextMenu");
    const editarCuenta = document.getElementById("editarCuenta");
    const terminarMesa = document.getElementById("terminarMesa");

    for (let i = 1; i <= numMesas; i++) {
        const mesa = document.createElement("div");
        mesa.classList.add("mesa");
        mesa.dataset.id = i;
        mesa.dataset.estado = "desocupada";
        mesa.dataset.mesero = "";
        mesa.dataset.cuenta = "0";
        mesa.addEventListener("click", function(event) {
            event.stopPropagation();
            const estado = this.dataset.estado;
            if (estado === "desocupada") {
                asignarMesero(this);
                cambiarValorCuenta(this);
                cambiarEstado(this, "ocupada");
            } else {
                mostrarContextMenu(event.clientX, event.clientY, this);
            }
        });

        const info = document.createElement("div");
        info.classList.add("info");
        info.textContent = `Mesa ${i}\nDesocupada\n\nCuenta: $0`;
        mesa.appendChild(info);

        mapaMesas.appendChild(mesa);
    }

    editarCuenta.addEventListener("click", function() {
        const mesa = contextMenu.dataset.mesa;
        const valorCuenta = prompt("Valor de la cuenta:");
        const mesaElement = document.querySelector(`.mesa[data-id="${mesa}"]`);
        mesaElement.dataset.cuenta = valorCuenta;
        actualizarInfo(mesaElement);
        contextMenu.style.display = "none";
    });

    terminarMesa.addEventListener("click", function() {
        const mesa = contextMenu.dataset.mesa;
        const mesaElement = document.querySelector(`.mesa[data-id="${mesa}"]`);
        terminarMesaFuncion(mesaElement);
        contextMenu.style.display = "none";
    });

    document.addEventListener("click", function() {
        contextMenu.style.display = "none";
    });
});

function mostrarContextMenu(x, y, mesa) {
    const contextMenu = document.getElementById("contextMenu");
    contextMenu.style.display = "block";
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.dataset.mesa = mesa.dataset.id;
}

function asignarMesero(mesa) {
    const mesero = prompt("Nombre del mesero:");
    mesa.dataset.mesero = mesero;
    actualizarInfo(mesa);
}

function cambiarValorCuenta(mesa) {
    const valorCuenta = prompt("Valor de la cuenta:");
    mesa.dataset.cuenta = valorCuenta;
    actualizarInfo(mesa);
}

function cambiarEstado(mesa, estado) {
    mesa.dataset.estado = estado;
    mesa.classList.toggle("ocupada", estado === "ocupada");
    actualizarInfo(mesa);
}

function terminarMesaFuncion(mesa) {
    mesa.dataset.mesero = "";
    mesa.dataset.cuenta = "0";
    cambiarEstado(mesa, "desocupada");
    const info = mesa.querySelector(".info");
    info.textContent = `Mesa ${mesa.dataset.id}\nDesocupada\n\nCuenta: $0`;
}

function actualizarInfo(mesa) {
    const info = mesa.querySelector(".info");
    const mesaId = mesa.dataset.id;
    const estado = mesa.dataset.estado === "ocupada" ? "Ocupada" : "Desocupada";
    const mesero = mesa.dataset.mesero || "";
    const cuenta = mesa.dataset.cuenta || "$0";
    info.textContent = `Mesa ${mesaId}\n${estado}\nMesero: ${mesero}\nCuenta: ${cuenta}`;
}
