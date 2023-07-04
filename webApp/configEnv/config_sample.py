import os
class prodConfig:
   def __init__(self, mainConfig):
        mainConfig.DEBUG = False # or True for development
        mainConfig.DB_USER = 'dbUser'
        mainConfig.DB_PASSWORD = 'dbPassword'
        mainConfig.DB_HOST = 'dbHostname'
        mainConfig.DB_NAME = 'dbName'
        mainConfig.UPLOADS_FOLDER_NAME = 'static/uploads' #where the upload will go
        mainConfig.STATIC_FOLDER = 'static' #the static folder definition

        current_dir = os.path.dirname(os.path.abspath(__file__))  # get current dir
        parent_dir = os.path.dirname(current_dir)  # parent directory or root folder for my app
        upload_folder = os.path.join(parent_dir, mainConfig.UPLOADS_FOLDER_NAME)  # Full path upload folder

        mainConfig.UPLOAD_FOLDER = upload_folder
