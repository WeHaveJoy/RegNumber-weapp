const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Registration = require('./registration_numbers');
const session = require('express-session');
//const flash = require('express-flash');
var _ = require('lodash');

const registrations = Registration();
const app = express();

const pg = require("pg");
const Pool = pg.Pool;

// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/registration_numbers';

const pool = new Pool({
    connectionString
});


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


//app.use(flash());

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//setup middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
}

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: "./views/layouts"
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('index')
})

app.post('/', function (req, res) {
    var regNum = _.capitalize(req.body.regNumberEntered);

    if (regNum === undefined) {
        req.flash('error', 'Please enter a registration number')
        res.render('index')
        return;
    }
    

    res.render('index', {

    })
})


const PORT = process.env.PORT || 3005
app.listen(PORT, function () {

});
