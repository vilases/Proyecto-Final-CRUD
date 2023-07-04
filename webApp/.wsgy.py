# +++++++++++ FLASK +++++++++++
# Flask works like any other WSGI-compatible framework, we just need
# to import the application.  Often Flask apps are called "app" so we
# may need to rename it during the import:
#
#
import sys
#
## The "/home/crisgPy" below specifies your home
## directory -- the rest should be the directory you uploaded your Flask
## code to underneath the home directory.  So if you just ran
## "git clone git@github.com/myusername/myproject.git"
## ...or uploaded files to the directory "myproject", then you should
## specify "/home/crisgPy/myproject"
path = '/home/crisgPy/webApp'
if path not in sys.path:
    sys.path.append(path)
#
#from main_flask_app_file import app as application  # noqa
from main import app as application  # main.py is our main file