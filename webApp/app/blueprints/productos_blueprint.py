from flask import Blueprint

from app.controllers.productos_controller import (
    get_productos,
    get_producto,
    create_producto,
    update_producto,
    delete_producto
)

productos_blueprint = Blueprint("productos", __name__)

productos_blueprint.route("/productos", methods=["GET"])(get_productos)
productos_blueprint.route("/productos/<id>", methods=["GET"])(get_producto)
productos_blueprint.route("/productos", methods=["POST"])(create_producto)
productos_blueprint.route("/productos/<id>", methods=["PUT"])(update_producto)
productos_blueprint.route("/productos/<id>", methods=["DELETE"])(delete_producto)