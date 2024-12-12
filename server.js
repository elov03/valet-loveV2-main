


/*require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require('cors');

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.listen(process.env.WEB_PORT, '127.0.0.1',
  function() { console.log("Listening on "+process.env.WEB_PORT); }
);
// Configuration simple de CORS


// process form input (create request.body from POST data or json in the http request)

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

// allow serverside session storage

app.use(session({
    secret: "SecretRandomStringDskghadslkghdlkghdghaksdghdksh",
    saveUninitialized: true,
    // cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day in msec
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: false, secure: false }, // PASSPORT
    resave: false
})); 

//ajout juste en dessous
app.use(cors({
  origin: 'http://192.168.1.130:8081', // Adresse du frontend
  credentials: true,// Autorise les cookies/credentials
  methods: [ 'GET', 'POST' ] 
}));

// configure passport
const auth = require("./utils/users.auth"); // PASSPORT
auth.initializeAuthentications(app); // PASSPORT
app.use("/auth", require("./controllers/auth.route")); // PASSPORT


// Middlewares
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "SecretRandomString",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));
app.use(cors());

// Route par défaut
app.get('/', (request, response) => {
    let clientIp = request.ip;
    response.send(`Hello, dear ${clientIp}. I am a nodejs website...`);
    response.end();
});

//ajout juste en desous
// Exemple de route
app.post('/auth/login', (req, res) => {
  res.json({ message: 'Login successful' });
});

// Routes additionnelles
app.use("/employees", require("./controllers/employeesapi.route"));
app.use("/games", require("./controllers/gamesapi.route")); // On va créer un fichier gamesapi.route.js simple
app.use("/users", require("./controllers/auth.route"));

// Lancement du serveur
const port = process.env.WEB_PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log("Listening on " + port);
});*/



require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require('cors');

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.listen(process.env.WEB_PORT, '127.0.0.1',
  function() { console.log("Listening on "+process.env.WEB_PORT); }
);
// Configuration simple de CORS


// process form input (create request.body from POST data or json in the http request)

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

// allow serverside session storage

app.use(session({
    secret: "SecretRandomStringDskghadslkghdlkghdghaksdghdksh",
    saveUninitialized: true,
    // cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day in msec
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: false, secure: false }, // PASSPORT
    resave: false
})); 

//ajout juste en dessous
app.use(cors({
  origin: 'http://172.25.14.3:8081', // Adresse du frontend
  credentials: true,// Autorise les cookies/credentials
  methods: [ 'GET', 'POST' ] 
}));

// configure passport
const auth = require("./utils/users.auth"); // PASSPORT
auth.initializeAuthentications(app); // PASSPORT
app.use("/auth", require("./controllers/auth.route")); // PASSPORT


// Middlewares
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "SecretRandomString",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));
//app.use(cors());

// Route par défaut
app.get('/', (request, response) => {
    let clientIp = request.ip;
    response.send(`Hello, dear ${clientIp}. I am a nodejs website...`);
    response.end();
});

//ajout juste en desous
// Exemple de route
app.post('/auth/login', (req, res) => {
  res.json({ message: 'Login successful' });
});

// Routes additionnelles
app.use("/employees", require("./controllers/employeesapi.route"));
app.use("/games", require("./controllers/gamesapi.route")); // On va créer un fichier gamesapi.route.js simple
app.use("/users", require("./controllers/auth.route"));

// Lancement du serveur
const port = process.env.WEB_PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log("Listening on " + port);
});