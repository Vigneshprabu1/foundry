
const dateTime = require('node-datetime');
const mongoose = require('mongoose');
var json2csv = require('json2csv');
var csv = require('fast-csv');

/** Model */
const Employee = require('../model/employee')


/** Get All Customer */
exports.employee_get_all = (req, res, next) => {
    Employee.find()
        .exec()
        .then(doc => {
            console.log(doc)
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

/** Customer Save */

exports.employee_save = (req, res, next) => {
    const dt = dateTime.create();
    const formatted = dt.format('Y-m-d H:M:S');
    const employee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        empName: req.body.empName,
        empNature: req.body.empNature,
        activity: req.body.activity,
        empDepartment: req.body.empDepartment,
        shiftId: req.body.shiftId,
        shift: req.body.shift,
        salaryId: req.body.salaryId,
        salaryType: req.body.salaryType,
        salary: req.body.salary,
        createdOn: formatted,
        status: req.body.status
    });
    employee.save()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err

            });
        });
}


exports.employee_update = (req, res, next) => {
    const dt = dateTime.create();
    const formatted = dt.format('Y-m-d H:M:S');
    Employee.update({ _id: req.params._id }, {
        $set: {
            empName: req.body.empName,
            empNature: req.body.empNature,
            activity: req.body.activity,
            empDepartment: req.body.empDepartment,
            shiftId: req.body.shiftId,
            shift: req.body.shift,
            salaryId: req.body.salaryId,
            salaryType: req.body.salaryType,
            salary: req.body.salary,
            modifiedOn: formatted,
            status: req.body.status
        }
    })
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}



exports.employee_delete = (req, res, next) => {
    const dt = dateTime.create();
    const formatted = dt.format('Y-m-d H:M:S');
    Employee.update({ _id: req.params._id }, {
        $set: {
            modifiedOn: formatted,
            status: 'D'
        }
    })
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.employee_get_based_on_type = (req, res) => {
    const type = req.params.type;
    Employee.find({ 'empDepartment': type })
        .where('status')
        .equals('Active')
        .exec()
        .then(doc => {
            console.log(doc)
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

}

/* employee cost calculation */

async function employee_cost_calculation(employeeId, totalWorkingHours) {
    var employeeData;
    await Employee.findOne({ '_id': employeeId })
        .where('status')
        .equals('Active')
        /* multiple populate at the same time */
        .populate('shiftId', 'totalHours')
        .populate('salaryId', 'workingDays')
        .exec()
        .then(empResult => {
            var salaryWorkingDays = 0;
            var shiftHours = 0;
            var salary = 0.0;
            salaryWorkingDays = empResult.salaryId.workingDays;
            shiftHours = empResult.shiftId.totalHours;
            salary = empResult.salary;
            var totalHour = Number(salaryWorkingDays) * Number(shiftHours);
            var perHourSalary = Number(salary) / Number(totalHour);
            employeeData = Number(totalWorkingHours) * Number(perHourSalary);;
            return employeeData;
        });
    return employeeData;
}

module.exports.employee_cost_calculation = employee_cost_calculation;

