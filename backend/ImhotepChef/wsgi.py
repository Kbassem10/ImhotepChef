import os
import sys

# Add your project directory to Python path
path = '/home/imhotepchef/ImhotepChef/backend/ImhotepChef'
if path not in sys.path:
    sys.path.append(path)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ImhotepChef.settings')

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()