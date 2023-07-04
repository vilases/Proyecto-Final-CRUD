import appModal from './modal.js';

const { createApp } = Vue
//var endPoint = "//aldopehablo.pythonanywhere.com";
//var endPoint = 'http://127.0.0.1:5001/';
var endPoint = 'https://crisgPy.pythonanywhere.com/';
createApp({
    data() {
        return {
            datos: '',
            productos: [],
            productosSearch: [],
            url: endPoint + '/productos', // si ya lo subieron a pythonanywhere
            error: false,
            cargando: true,
            /*atributos para el guardar los valores del formulario */
            id: 0,
            nombre: "",
            imagen: "",
            stock: 0,
            precio: 0,
            modalImageURL: '',
            imagePreview: "", //preview image
            endPoint: endPoint,
            backUrl: '/productos3.html',
        }
    },
    methods: {
        fetchData(url, search = "") {
            fetch(url)

                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    for (let i = 0; i < this.productos.length; i++) {

                        if (this.productos[i].nombre.toLowerCase().includes(search)) {
                            console.log('OK');
                            this.productosSearch.push(this.productos[i]);
                        }
                    }
                    this.productos = this.productosSearch
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },

        eliminar(producto) {
            const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
            if (confirmacion) {
                const url = this.url + '/' + producto;
                var options = {
                    method: 'DELETE',
                }
                fetch(url, options)
                    .then(res => res.text()) // or res.json()
                    .then(res => {
                        location.reload();
                    })
            }
        },
        onImageChange(event) {
            const file = event.target.files[0];
            console.log(file);
            this.imagen = file;
            this.imagePreview = URL.createObjectURL(file); // Generar la URL de vista previa de la imagen
        },
        grabar() {
            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen
            }
            var formData = new FormData(); // Crear un objeto FormData para enviar datos con archivos
            formData.append("nombre", producto.nombre);
            formData.append("precio", producto.precio);
            formData.append("stock", producto.stock);
            formData.append("imagen", producto.imagen);
            console.log(formData)
            var options = {
                body: formData,
                method: 'POST',
                //headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            var self = this;
            fetch(this.url, options)
                .then(() => {
                    console.log(self);
                    alert("Registro grabado");
                    window.location.href = self.backUrl;
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabarr")

                })
        },
        cancelar() {
            window.location.href = this.backUrl;
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
            modalElement.addEventListener('click', function (event) {
                if (event.target === modalElement) {
                    modalElement.classList.remove('show');
                    modalElement.style.display = 'none';
                    document.body.classList.remove('modal-open');
                }
            });
        }
    },
    created() {
        const params = new URLSearchParams(window.location.search);
        console.log(params);

        const nombre = params.get('nombre');
        if (nombre) {
            this.datos = nombre.toLowerCase();
            console.log(this.datos);
            if (typeof document.getElementById('nombredato') != 'undefined') {
                document.getElementById('nombredato').value = this.datos;
            }

            this.fetchData(this.url, this.datos);
        } else {
            this.fetchData(this.url);
        }
    },
})
    .component('image-modal', appModal.component('image-modal'))
    .mount('#app')