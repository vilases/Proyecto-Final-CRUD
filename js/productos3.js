import appModal from './modal.js';

const { createApp } = Vue

createApp({
    data() {

        return {
            datos: '',
            productos: [],
            productosSearch:[],
            url: '//aldopehablo.pythonanywhere.com/productos', // si ya lo subieron a pythonanywhere
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
        fetchData(url,search=" ") {
        
            fetch(url)
            .then(response => response.json())
            .then(data => {
                this.productos = data;
                
                 for (let i=0; i<this.productos.length;i++){
                            
                            if (this.productos[i].nombre.toLowerCase().includes(search)){
                                console.log('OK');
                                this.productosSearch.push(this.productos[i]);
                    }
                }
                console.log(this.productos)
                console.log(this.productosSearch)
                this.cargando=false;
                
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
        const params = new URLSearchParams(window.location.search);
        console.log(params);
      
        const nombre = params.get('nombre');
        if (nombre) {
          this.datos = nombre.toLowerCase();
          console.log(this.datos);
          this.fetchData(this.url, this.datos);
        } else {
          this.fetchData(this.url);
        }
    },
})
.component('image-modal', appModal.component('image-modal'))
.mount('#app')