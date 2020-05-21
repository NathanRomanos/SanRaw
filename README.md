# SanRaw

Alexis A, Shay Wellington, and Nathan Romanos

## Yoobee Colleges
#### Web and UX - Summative 3
#### Niche Marketing Application



---

## CSS Methodology
OOCSS

---

## CSS Style Guide

- Use external scripts unless justified
- Comment decriptions before code blocks (and add name)
- Acknowledge all third party scripts using comments
- Code should be written to the DRY principle i.e. no repetition. Create functions that take parameters, and return values to foster code
reuse
- Comment your code https://github.com/shri/JSDoc-Style-Guide
- Ensure site is usable when Javascript is turned off
- Use consistent naming: functionNamesLikeThis, variableNamesLikeThis, ClassNamesLikeThis, EnumNamesLikeThis,
methodNamesLikeThis, CONSTANT_VALUES_LIKE_THIS, and file-names-like-this-1.0.min.js
- Name functions and variables logically
- Prefer single quotes over double quotes
- Always declare variables with var (or in ES6 - var, let, const)
- Always use semicolons
- Don’t declare a named function within a block https://google.github.io/styleguide/javascriptguide.xml?showone=Function_
Declarations_Within_Blocks#Function_Declarations_Within_Blocks
- Minimize the use of global variables
- Separate event handling from functionality
- Minify all Javascript for production
- Use a Javascript linting tool
- Organize your code into the Modular Pattern, Object Literal/Singleton, or Objects with Constructors where possible

---

## JS Style Guide

- Use external scripts unless justified
- Comment decriptions before code blocks (and add name)
- Acknowledge all third party scripts using comments
- Code should be written to the DRY principle i.e. no repetition. Create functions that take parameters, and return values to foster code
reuse
- Comment your code https://github.com/shri/JSDoc-Style-Guide
- Ensure site is usable when Javascript is turned off
- Use consistent naming: functionNamesLikeThis, variableNamesLikeThis, ClassNamesLikeThis, EnumNamesLikeThis,
methodNamesLikeThis, CONSTANT_VALUES_LIKE_THIS, and file-names-like-this-1.0.min.js
- Name functions and variables logically
- Prefer single quotes over double quotes
- Always declare variables with var (or in ES6 - var, let, const)
- Always use semicolons
- Don’t declare a named function within a block https://google.github.io/styleguide/javascriptguide.xml?showone=Function_
Declarations_Within_Blocks#Function_Declarations_Within_Blocks
- Minimize the use of global variables
- Separate event handling from functionality
- Minify all Javascript for production
- Use a Javascript linting tool
- Organize your code into the Modular Pattern, Object Literal/Singleton, or Objects with Constructors where possible

---

## Instructions on how to install this project

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
   1. Your mongo username
   2. Your mongo password
   3. "sum3-idtnx"
11. Indside the front-end config.json file, insert the following information:
   1. server url (in our case it is http://localhost)
   2. 8888


## Instructions on how to run this project
1. To connect your local server to this project simply `cd` into the back-end folder of this project using your terminal/cmd and type `npm run dev`
