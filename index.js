const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const registration = require('./registration_numbersDatabase');
const session = require('express-session');
const flash = require('express-flash');
// const _ = require('lodash');


const app = express();

const pg = require("pg");
const Pool = pg.Pool;

// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/registration_numbers';

const pool = new Pool({
    connectionString
});

const Registrations = registration(pool);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


app.use(flash());

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


app.post('/regNum', async function (req, res) {

    try {
        var regNum = req.body.reg;
        //console.log(regNum);
        if (regNum === "") {
            req.flash('error', 'Please enter a registration number')
            res.render('index')
            return;
        }
        // else {
        //     var Reg = {
        //         regNumbers: await Registrations.addRegNums(regNum),
        //         getReg: await Registrations.getRegNums()
        //     }
        // }
        await Registrations.addRegNums(regNum)
        let regList = await Registrations.getRegNums()
       // let reg;
        // for(let i=0; i < regList.length; i++){
        //    reg = regList[i].reg_num;

        // }   
        // console.log(reg);

        res.render('index', {
            // Reg
            getReg: regList,
            filter: await Registrations.filter()
        })
    } catch (error) {
        console.log(error);
    }

    app.get('/deleteData', async function (req, res) {

        await Registrations.deleteReg()
        res.render('index', {

        })
    })
});

app.get('/filter', async function (req, res) {
    
    await Registrations.filter()
    console.log(await Registrations.filter());
    
    res.render('index', {
      
    })
})

const PORT = process.env.PORT || 3005
app.listen(PORT, function () {

});
