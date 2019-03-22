const mongoose=require('mongoose');


const employeeSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    empName: String,
    empNature: String,
    activity: String,
    empDepartment: String,
    shiftId: {type:mongoose.Schema.Types.ObjectId,ref:'Shift'},
    shift: String,
    salaryId: {type:mongoose.Schema.Types.ObjectId,ref:'Salary'},
    salaryType: String,
    salary: Number,
    createdOn: String,
    createdBy: String,
    modifiedOn: String,
    modifiedBy: String,
    status: String,
});

module.exports=mongoose.model('Employee',employeeSchema)