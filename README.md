# jobboard-API

This is a job board style website build with Angular and Flask. Users can login using an existing account and applyt to job offers or apply without an existing profile. Companies can post mutliple job ads, and get contact about users who applied. 

# App installation 

You may need to install pipenv

`$ pip install pipenv`

# Activate venv

`$ pipenv shell`

# Install dependencies

`pipenv install -r requirements.txt`

# Run Server (http://localhost:5000)

`python app.py`

# Angular

Angular is served using Flask and is accessible at : http://localhost:5000

## Build angular

To build Angular for flask (moving files automatically):

```sh
cd jobBoard
npm i

npm run build:flask:linux
npm run build:flask:windows
[depending on your os]
```

# More...
Login as admin : admin@admin.com | admin

Login as normal user : bernard@bernard.com | bernard
