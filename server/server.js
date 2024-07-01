const express = require("express") ;
const dotenv = require("dotenv") ;
const cors = require("cors") ;
const bodyParser = require("body-parser") 

const app = express();

const Router = require("./router/routes.js") 
// initiliazed env file


dotenv.config();
// for data crossing from front-end to backend (to cross the different server)
app.use(cors());


// node js can't understand body recevied from frontend so we use body parser
app.use(bodyParser.json({ extended: true }));

// if any spaces leaves in url it convert into some code so it helps to decode it
app.use(bodyParser.urlencoded({extended:true}));

require('./config/db.js').connect();

// using different function on different route
app.use('/',Router);

app.use

app.listen(process.env.PORT,() => {console.log(`Server running on PORT ${process.env.PORT}`)});