module.exports = function routes(Registrations) {

    const _ = require('lodash');

    async function index(req, res) {

        res.render('index', { getReg: await Registrations.getRegNums() })

    }

    async function regNum(req, res) {

        try {
            var regNum = _.upperCase(req.body.reg);
            var check = await Registrations.checkReg(regNum)

            if (regNum === "") {
                req.flash('error', 'Please enter a registration number, eg: CY 1232, CA 123, CJ 536855')
                res.render('index')
                return;
            }
            else if (!(/C[AYJ] \d{3,6}$/.test(regNum))) {
                req.flash('error', 'Please enter a valid registration, eg: CY 1232, CA 123, CJ 5368557')
            }
            //(/C[AYJ] \d{3,6}$/.test(regNum))

            if (check !== 0) {
                req.flash('error', "Reg Alredy exist")

            }
            else {
                var c = await Registrations.addRegNums(regNum)
                req.flash('info', 'Registration number has been successfully added!')

            }
            //var get = await Registrations.getRegNums()
            // res.render('index')
            // return;


            // else {
            //     var Reg = {
            //         regNumbers: await Registrations.addRegNums(regNum),
            //         getReg: await Registrations.getRegNums()
            //     }
            // }
            //await Registrations.addRegNums(regNum)
            let regList = await Registrations.getRegNums()
            // let reg;
            // for(let i=0; i < regList.length; i++){
            //    reg = regList[i].reg_num
            // }   
            // console.log(reg);

            res.render('index', {
                //Reg: get,
                getReg: regList
            })

        } catch (error) {
            console.log(error);
        }
    }


    async function deleteData(req, res) {

        req.flash('info', 'You have successfully deleted data in a database')
        await Registrations.deleteReg()
        res.render('index', {

        })

    }

    async function filter(req, res) {
        var reg = req.body.town;
        // console.log(reg);
        if (reg === undefined) {
            req.flash('error', 'Please select a town')
            res.render('index')
            return;
        }

        // else if (reg < 1) {
        //     req.flash('town', 'There are no registrations from this town')
        //     res.render('index')
        //     return;
        // }

        var numReg = await Registrations.filter(reg)
        //console.log(await Registrations.filter());

        res.render('index', {
            getReg: numReg
        })
    }

    return {
        index,
        regNum,
        deleteData,
        filter
    }
}