import appModal from './modal.js';

const { createApp } = Vue

createApp({
    data() {

        return {
            datos: '',
            productos: [],
            url: 'http://aldopehablo.pythonanywhere.com/productos', // si ya lo subieron a pythonanywhere
            error: false,
            cargando: true,
            /*atributos para el guardar los valores del formulario */
            id: 0,
            nombre: "",
            imagen: "",
            stock: 0,
            precio: 0,
            modalImageURL:''
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)

                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },

        eliminar(producto) {
            const url = this.url + '/' + producto;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })
        },
        grabar() {
            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./productos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabarr")

                })
        },
        openModal(imageURL) {
            // Actualizo la URL de la imagen en el modal
            document.getElementById('modalImage').src = imageURL;
        
            // Obtengo el elemento del modal
            var modalElement = document.getElementById('imageModal');
        
            // Muestro el modal
            modalElement.classList.add('show');
            modalElement.style.display = 'block';
            document.body.classList.add('modal-open');
        
            // Quito la clase 'show' y oculto el modal al hacer clic fuera de él
            modalElement.addEventListener('click', function(event) {
              if (event.target === modalElement) {
                modalElement.classList.remove('show');
                modalElement.style.display = 'none';
                document.body.classList.remove('modal-open');
              }
            });
          }
    },
    created() {
        this.fetchData(this.url)
    },
})
.component('image-modal', appModal.component('image-modal'))
.mount('#app')