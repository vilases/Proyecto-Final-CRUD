from app import db, ma


class Producto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    precio = db.Column(db.Integer)
    stock = db.Column(db.Integer)
    imagen = db.Column(db.String(400))

    def __init__(self, nombre, precio, stock, imagen):
        self.nombre = nombre
        self.precio = precio
        self.stock = stock
        self.imagen = imagen

class ProductoSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'precio', 'stock', 'imagen')

producto_schema = ProductoSchema()
productos_schema = ProductoSchema(many=True)