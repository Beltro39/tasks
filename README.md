# Prueba técnica

Frida y Joaquin están realizando un trabajo en grupo y quieren tener a la vista todas sus tareas de la semana. Para esto necesitan tener una herramienta de gestión de tareas que les permita hacer CRUD, además de poder asignar un o más responsables, saber a qué hora las deben iniciar y cuándo terminar, poder agregar una descripción corta y también colocarles un estado: “para hacer”, “en progreso” o “completada”.

Debido a que el trabajo se realiza de forma constante y son actividades cortas, es útil que cada vez que una tarea es creada, borrada o actualizada, tanto Joaquin como Frida puedan verlo inmediatamente y a su vez mostrar el tiempo que se tardó cada uno en poner en estado “completada” cada tarea.

## Entregables
- Código fuente publicado en GitLab con un solo commit
- Instructivo de instalación y configuración de la solución para ejecución y revisión de la misma.
- Petición de acceso a [este repositorio](https://gitlab.com/unergy-dev/prueba-tecnica/) para confirmar la entrega.

## Items requeridos
- Código fuente limpio, estructurado y documentado.
- Comprensión de la necesidad.
- Validaciones y coherencia en la implementación.
- APIs según necesidad.
- Separación de capas (MVC o MVT)
- Manejo de Excepciones.

## Items de valor agregado
- Imagen o PDF del modelo relacional creado en cualquier herramienta de modelado. ([Draw.io](https://app.diagrams.net/), [SQL Developer Data Modeler](https://www.oracle.com/database/sqldeveloper/technologies/sql-data-modeler/))
- Uso de [websockets](https://channels.readthedocs.io/en/stable/)
- Dockerfile
- Docker compose

## Instalar aplicación en Ubuntu
- Instalar node v.14 (https://computingforgeeks.com/install-node-js-14-on-ubuntu-debian-linux/)
- Desplegar Backend (debe correr en el puerto 8000):
    + cd backend
    + python3 -m venv env
    + source env/bin/activate
    + pip install -r requirements.txt
    + python3 manage.py migrate
    + python3 manage.py makemigrations
    + python3 manage.py loaddata fixtures/status.json (seeders)
    + python3 manage.py loaddata fixtures/user.json   (seeders)
    + python3 manage.py runserver

- Desplegar Frontend (deber correr en el puerto 3000):
    + cd frontend
    + npm install
    + npm start   

