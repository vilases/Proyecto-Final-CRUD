const { createApp } = Vue
createApp({
    data() {
        return {
            
            productos:[],
            productosSearch:[],
            id:0,
            nombre:"",
            imagen:"",
            stock:0,
            precio:0,
            url:'http://aldopehablo.pythonanywhere.com/productos',
            error:false,
            cargando:true,
            dato:null,
        }
    },
   
methods: {
    fetchData(url,search=false) {
        
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
            this.error=true
        })
    },

    eliminar(producto) {
    const url = this.url+'/' + producto;
        var options = {
            method: 'DELETE',
        }
        fetch(url, options)
        .then(res => res.text()) // or res.json()
        .then(res => {
            location.reload();
        })
    },
    grabar(){
        let producto = {
            nombre:this.nombre,
            precio: this.precio,
            stock: this.stock,
            imagen:this.imagen
        }
        var options = {
            body:JSON.stringify(producto),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow'
        }
        fetch(this.url, options)
        .then(function () {
            alert("Registro grabado")
            window.location.href = "./productos1.html";
        })
        .catch(err => {
            console.error(err);
            alert("Error al Grabar")

        })
    }
},
created() {
    
    const params = new URLSearchParams(window.location.search);
    console.log(params);
    this.dato = params.get('nombre').toLowerCase();
    console.log(this.dato);
    this.fetchData(this.url,this.dato)
}, 
}).mount('#app')