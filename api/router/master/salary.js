const express = require('express');
const router = express.Router();
const salaryController = require('../../controller/master/salary');

router.post('/', salaryController.salary_save);
router.get('/active', salaryController.get_salary);
router.get('/', salaryController.salary_get_all);

router.put('/',salaryController.salary_update);
router.delete('/:_id',salaryController.salary_delete);

module.exports = router;