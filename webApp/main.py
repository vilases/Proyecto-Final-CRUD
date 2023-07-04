#import os
#from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from config import Config, flask_env
from app.blueprints.productos_blueprint import productos_blueprint
from app import ma, db

# Cargar las variables de entorno desde el archivo .env
#load_dotenv()
#print('Enviromet MAIN:*****')
#print(os.environ.get('FLASK_ENV'))

def create_app():
    app = Flask(__name__)
    Config.load_config(app)
    #print(Config)
    CORS(app, resources={r"/*": {"origins": "*"}})
    # Configuración de la base de datos
    db.init_app(app)
    ma.init_app(app)

    # Registra los blueprints
    app.register_blueprint(productos_blueprint)

    return app

app = create_app()


if __name__ == '__main__':
    if flask_env != 'production':
        app.run(debug=True,port=5000)
    else:
        print('Hello world!')