module.exports = function Registrations(pool) {
    

    async function checkReg(cReg) {
        var regCheck = await pool.query('select reg_num from Registrations where reg_num= $1', [cReg]);
        return regCheck.rows.length;
    }

    async function addRegNums(regEntered) {
        var reg = await checkReg(regEntered);
        if (reg < 1) {

            if (regEntered.startsWith("CY")) {
                await pool.query("insert into Registrations(reg_num, loc_indicator) values($1, 'CY')", [regEntered]);
            }
            else if (regEntered.startsWith("CA")) {

                await pool.query("insert into Registrations(reg_num, loc_indicator) values($1, 'CA')", [regEntered]);

            }

            else if (regEntered.startsWith("CJ")) {

                await pool.query("insert into Registrations(reg_num, loc_indicator) values($1, 'CJ')", [regEntered]);
            }

        }
    }

    async function getRegNums() {
        var reg = await pool.query('select reg_num from Registrations')
        console.log(reg);
        
        return reg.rows;
        
        
    }

    async function deleteReg() {
        var clear = await pool.query('delete from Registrations')
        return clear.rows;
    }

    return {
        checkReg,
        addRegNums,
        getRegNums,
        deleteReg

    }
}