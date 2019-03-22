
const express=require('express');
const router=express.Router();
const employeeContoller=require('../controller/employee')



router.get('/', employeeContoller.employee_get_all);


router.post('/', employeeContoller.employee_save );

router.patch('/:_id', employeeContoller.employee_update );

router.put('/:_id', employeeContoller.employee_delete);
router.get('/:type', employeeContoller.employee_get_based_on_type);

module.exports=router;