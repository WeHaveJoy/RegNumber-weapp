let assert = require("assert");
let Greet = require("../registration_numbers_webapp");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/registration_numbers_test';

const pool = new Pool({
    connectionString
});


describe('The basic database Registration numbers web app', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from Registrations");
    });


    it('should pass getting the registration test', async function () {

        let Registrations = registration(pool);
        await Registrations.addRegNums('CA 678-432');
        var reg = await Registrations.getRegNums();

        //  let greetCounter = await greetings.insertNames();
        assert.equal("CA 678-432", reg[0].reg_num);
        // console.log("await greetings.insertNames('sasa')");
    });


    // it('should pass inserting the name test', async function () {

    //     // the Factory Function is called CategoryService
    //     // let categoryService = CategoryService(pool);
    //     let greetings = Greet(pool);
    //     // await greetings.checkNames();
    //     var names = await greetings.greetLang("English", 'Zipho');
    //     var z = await greetings.getNames();

    //     //  let greetCounter = await greetings.insertNames();
    //     assert.equal("Zipho", z[0].name);
    //     // console.log("await greetings.insertNames('sasa')");
    // });


    after(function () {
        pool.end();
    })
});