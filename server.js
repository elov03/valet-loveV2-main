require("dotenv").config();

const express = require("express");
const app = express();
// View engine configuration
app.set("view engine", "ejs");
app.set("views", "views");

const bodyParser = require("body-parser");
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));


const session = require("express-session");
// Session configuration
app.use(
  session({
    secret: "your-secret-key", 
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24},
    resave: false
  })
);

const cors = require("cors");
// CORS configuration
app.use(
  cors({
    origin: "http://192.168.1.130:8081", // Frontend address
    credentials: true, 
    methods: ['GET', 'POST'],
  })
);

// configure passport
const auth = require("./utils/users.auth");
auth.initializeAuthentications(app);

app.get('/', (request, response) => { 
  let clientIp = request.ip;
  response.send(`Hello, dear ${clientIp}. I am a nodejs website...`);
  response.end(); 
});


// Main roads
app.use("/auth", require("./controllers/auth.route")); 
app.use("/employees", require("./controllers/employeesapi.route"));
app.use("/games", require("./controllers/gamesapi.route")); 


// Launching the server
const port = process.env.WEB_PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Listening on port ${port}`);
});
