SanRaw
Alexis A, Shay Wellington, and Nathan Romanos

Yoobee Colleges
Web and UX - Summative 3
Niche Marketing Application
CSS Style Guide
JS Style Guide
Instructions on how to install this project
Read all instructions laid out in the README
Make sure your local server and/or virtual machine is running
Next navigate to your local server folder in your terminal/cmd using cd [serverfoldername]/www
Clone this project into your www folder of your local server by using git clone -b master-dev https://github.com/NathanRomanos/SanRaw.git in your terminal/cmd
Set up the front end nodejs in your terminal/cmd by typing:
cd front-end
npm i
grunt
In a second terminal/cmd window navigate to this project's back-end folder and type in this code to install nodejs and start the server:
npm i
nodemon -L index.js
After all that is set up, open the root project folder (SanRaw) inside your text editer
In both the front-end folder and back-end folder you will find files called config-template.json
Duplicate both of these folders and rename them config.json
Inside the back-end config.json file, insert the following information:
mongo username
mongo password
mongo clustername
Indside the front-end config.json file, insert the following information:
server url
3000
