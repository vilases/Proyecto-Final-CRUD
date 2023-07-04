import os
from dotenv import load_dotenv,find_dotenv
load_dotenv(load_dotenv(find_dotenv()))

flask_env = os.environ.get('FLASK_ENV')

#flask_env='production'
class Config:
    ##here will be common stuff
    VERSION='0.1'

    @classmethod
    def load_config(cls, app):
        if flask_env == 'production':
            from configEnv.config_prod import prodConfig
            prodConfig(cls)  #prod parameter
        else:
            from configEnv.config_dev import devConfig
            devConfig(cls) #development parameter

        #DB setup
        from configEnv.config_db import dbConfig
        dbConfig(cls)
        app.config.from_object(cls)
        return True


