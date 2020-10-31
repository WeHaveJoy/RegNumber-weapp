module.exports = function Registrations(pool) {


    async function checkReg(cReg) {
        var regCheck = await pool.query('select reg_num from Registrations where reg_num= $1', [cReg]);
        return regCheck.rows.length;
    }

    async function addRegNums(regEntered) {

        var town = regEntered.substring(0, 2);
        console.log(town);


        var reg = await checkReg(regEntered);

        if (reg === 0) {

            var rt = await pool.query("select id from Towns where starts_with=$1", [town]);
            var town_id = rt.rows[0].id;

            var addReg = await pool.query("insert into Registrations(reg_num, loc_indicator) values($1, $2)", [regEntered, town_id]);
            return addReg.rows;

        }
    }

    async function getRegNums() {
        var reg = await pool.query('select reg_num from Registrations')

        return reg.rows;
    }

    async function deleteReg() {
        var clear = await pool.query('delete from Registrations')
        return clear.rows;
    }

    async function filter(selectedTown) {
        
        // var town = selectedTown.substring(0, 2);
       
    //     var rt = await pool.query("select id from Towns where starts_with=$1", [selectedTown]);
    //   //  var town_id = rt.rows[0].id;
    //     var specific = await pool.query("select reg_num from Registrations where loc_indicator=$1", [town_id])
    //     return specific.rows;
    }

    return {
        checkReg,
        addRegNums,
        getRegNums,
        deleteReg,
        filter

    }
}