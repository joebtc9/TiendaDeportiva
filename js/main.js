// Recuperar carrito desde localStorage o iniciar vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Elemento del carrito en el offcanvas
const listaCarrito = document.getElementById("list-group");

// Función para renderizar el carrito en pantalla
function renderCarrito() {
    listaCarrito.innerHTML = "";

    carrito.forEach((producto, index) => {
        const li = document.createElement("li");
        li.classList = "list-group-item";
        li.innerHTML = `
            ${producto}
            <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${index})">X</button>
        `;
        listaCarrito.appendChild(li);
    });
}

// Guardar carrito en localStorage
function guardarLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Eliminar producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1);
    guardarLocalStorage();
    renderCarrito();
}

// Buscar todos los botones "Agregar al carrito"
const botones = document.querySelectorAll(".card .btn-primary");

// Asignar función a cada botón
botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const card = boton.closest(".card");
        const titulo = card.querySelector("h3").textContent;

        carrito.push(titulo);
        guardarLocalStorage();
        renderCarrito();
    });
});

// Render inicial al cargar la página
renderCarrito();