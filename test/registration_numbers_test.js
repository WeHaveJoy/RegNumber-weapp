let assert = require("assert");
let registration = require("../registration_numbersDatabase");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/registration_numbers_test';

const pool = new Pool({
    connectionString
});


describe('The basic database Greet web app', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from Registrations");
    });


    it('should  get the registration numbers', async function () {

        let Registrations = registration(pool);
        await Registrations.addRegNums('CA 678-432');
        var reg = await Registrations.getRegNums();

        assert.equal("CA 678-432", reg[0].reg_num);

    });


    it('should display registration number from Cape Town', async function () {

        let Registrations = registration(pool);
        await Registrations.addRegNums('CA 675-456');
        // var plateNum = Registrations.filter('Cape Town');

        assert.equal("CA 675-456 ", await Registrations.filter("CA"))
    });


    it('should display registration number from Bellvile', async function () {

        let Registrations = registration(pool);
        await Registrations.addRegNums('CY 673-123');
        // var plateNum = Registrations.filter('Cape Town');

        assert.equal("CY"[0].reg_num, await Registrations.filter("CY"))
    });


    it('should display registration number from Paarl', async function () {

        let Registrations = registration(pool);
         await Registrations.addRegNums('CY 456-288');
        // var plateNum = Registrations.filter('Cape Town');

        assert.equal("CJ", await Registrations.filter("CJ"))
    });


    after(function () {
        pool.end();
    })
});