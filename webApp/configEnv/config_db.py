from urllib.parse import quote_plus
class dbConfig:
     def __init__(self, mainConfig):
        mainConfig.SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{mainConfig.DB_USER}:{quote_plus(mainConfig.DB_PASSWORD)}@{mainConfig.DB_HOST}/{mainConfig.DB_NAME}"
        mainConfig.SQLALCHEMY_TRACK_MODIFICATIONS = False
        #print('*****db*****')
        #print(mainConfig.SQLALCHEMY_DATABASE_URI)

