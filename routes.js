module.exports = function routes(registration) {

    const _ = require('lodash');

    async function index(req, res) {

        res.render('index', { getReg: await registration.getRegNums() })

    }

    async function regNum(req, res) {

        try {
            var regNum = _.upperCase(req.body.reg);
            var check = await registration.checkReg(regNum)

            if (regNum === "") {
                req.flash('error', 'Please enter a registration number, eg: CY 1232, CA 123, CJ 536855')
                res.render('index')
                return;
            }
            else if (!(/C[AYJ] \d{3,6}$/.test(regNum))) {
                req.flash('error', 'Please enter a valid registration, eg: CY 1232, CA 123, CJ 5368557')
            }
            //(/C[AYJ] \d{3,6}$/.test(regNum))

           else if (check !== 0) {
                req.flash('error', "Reg Alredy exist")

            }
            else {
                var c = await registration.addRegNums(regNum)
                req.flash('info', 'Registration number has been successfully added!')

            }
            //var get = await registration.getRegNums()
            // res.render('index')
            // return;


            // else {
            //     var Reg = {
            //         regNumbers: await registration.addRegNums(regNum),
            //         getReg: await registration.getRegNums()
            //     }
            // }
            //await registration.addRegNums(regNum)
            let regList = await registration.getRegNums()
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
        await registration.deleteReg()
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
        //     req.flash('town', 'There are no registration from this town')
        //     res.render('index')
        //     return;
        // }

        var numReg = await registration.filter(reg)
        //console.log(await registration.filter());

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