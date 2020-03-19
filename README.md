# SanRaw

Alexis A, Shay Wellington, and Nathan Romanos

## Yoobee Colleges
#### Web and UX - Summative 3
#### Niche Marketing Application



---

## Instructions on how to install this project:

1. Read all instructions laid out in the README
2. Make sure your local server and/or virtual machine is running
3. Next navigate to your local server folder in your terminal/cmd using `cd [serverfoldername]/www`
4. Clone this project into your www folder of your local server by using `git clone -b master-dev https://github.com/NathanRomanos/SanRaw.git` in your terminal/cmd
5. Set up the front end nodejs in your terminal/cmd by typing:
   1. `cd front-end`
   2. `npm i`
   3. `grunt`
6. In a second terminal/cmd window navigate to this project's back-end folder and type in this code to install nodejs and start the server:
   1. `npm i`
   2. `nodemon -L index.js`
7. After all that is set up, open the root project folder (SanRaw) inside your text editer
8. In both the front-end folder and back-end folder you will find files called **config-template.json**
9. Duplicate both of these folders and rename them **config.json**
10. Inside the back-end config.json file, insert the following information:
  1. ~~mongo username~~
  2. ~~mongo password~~
  3. ~~mongo clustername~~
11. Indside the front-end config.json file, insert the following information:
  12. ~~server url~~
  13. 3000
