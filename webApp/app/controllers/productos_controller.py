from flask import jsonify ,request, current_app
from datetime import datetime
from werkzeug.utils import secure_filename
from app.models.producto import Producto, ProductoSchema
from app import db
import os

producto_schema = ProductoSchema()
productos_schema = ProductoSchema(many=True)

def get_productos():
    all_productos = Producto.query.all()
    result = productos_schema.dump(all_productos)
    return jsonify(result)

def get_producto(id):
    producto = Producto.query.get(id)
    return producto_schema.jsonify(producto)

def delete_producto(id):
    producto = Producto.query.get(id)
    db.session.delete(producto)
    db.session.commit()
    return producto_schema.jsonify(producto)

def create_producto():
    # nombre = request.json['nombre']
    # precio = request.json['precio']
    # stock = request.json['stock']
    # imagen = request.json['imagen']
    nombre = request.form.get('nombre')
    precio = request.form.get('precio')
    stock = request.form.get('stock')
    #print("Detalles del objeto 'request':")
    #print(request.files)
    
    if 'imagen' in request.files:
        imagen = request.files['imagen']
        original_filename = secure_filename(imagen.filename)
        
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        filename = f"{timestamp}_{secure_filename(original_filename)}"
        real_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        #Save the image
        imagen.save(real_path)

        #get the relative path to be saved at database
        relative_path = os.path.relpath(real_path, current_app.config['UPLOAD_FOLDER'])
        file_relative_path = current_app.config['UPLOADS_FOLDER_NAME']+'/'+relative_path
        save_path = file_relative_path.replace('\\', '/').replace('//','/') #this is for windows filesystem compat
        
        imagen = save_path
    else:
        imagen = ''
        
    new_producto = Producto(nombre, precio, stock, imagen)
    db.session.add(new_producto)
    db.session.commit()
    return producto_schema.jsonify(new_producto)

def update_producto(id):
    producto = Producto.query.get(id)
    # producto.nombre = request.json['nombre']
    # producto.precio = request.json['precio']
    # producto.stock = request.json['stock']
    # producto.imagen = request.json['imagen']
    # change because now goes into the body
    producto.nombre = request.form.get('nombre')
    producto.precio = request.form.get('precio')
    producto.stock = request.form.get('stock')
    if 'imagen' in request.files:
        imagen = request.files['imagen']
        original_filename = secure_filename(imagen.filename)
        
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        filename = f"{timestamp}_{secure_filename(original_filename)}"
        real_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        #Save the image
        imagen.save(real_path)

        #get the relative path to be saved at database
        relative_path = os.path.relpath(real_path, current_app.config['UPLOAD_FOLDER'])
        file_relative_path = current_app.config['UPLOADS_FOLDER_NAME']+'/'+relative_path
        save_path = file_relative_path.replace('\\', '/').replace('//','/') #this is for windows filesystem compat
        
        producto.imagen = save_path
    
    db.session.commit()
    
    #response = producto_schema.jsonify(producto)
    return producto_schema.jsonify(producto)