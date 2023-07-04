console.log(location.search) // lee los argumentos pasados a este formulario
var id = location.search.substr(4)
console.log(id)
var endPoint = 'http://127.0.0.1:5001/';
var endPoint = 'https://crisgPy.pythonanywhere.com/';
const { createApp } = Vue
createApp({
    data() {
        console.log(endPoint)
        return {
            id: 0,
            nombre: "",
            imagen: "",
            imagenOld: "",
            stock: 0,
            precio: 0,
            url: endPoint+'productos/' + id,
            imagePreview: "", //preview image
            endPoint:endPoint,
            backUrl:'./productos3.html'

        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {

                    console.log(data)
                    this.id = data.id
                    this.nombre = data.nombre;
                    this.imagen = data.imagen;
                    this.imagenOld = data.imagen;
                    this.stock = data.stock;
                    this.precio = data.precio;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        onImageChange(event) {
            const file = event.target.files[0];
            console.log(file);
            this.imagen = file;
            this.imagePreview = URL.createObjectURL(file); // Generar la URL de vista previa de la imagen
          },
        modificar() {
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
            var options = {
                body: formData,
                method: 'PUT',
                redirect: 'follow',
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = this.backUrl;
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        },
        cancelar(){
            window.location.href = this.backUrl;
        },
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')