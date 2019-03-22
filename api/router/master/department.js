const express = require('express');
const router = express.Router();
const departmentController = require('../../controller/master/department');

router.post('/', departmentController.department_save);
router.get('/', departmentController.department_get_all);
router.get('/:activity', departmentController.get_department);
router.put('/',departmentController.department_update);
router.delete('/:_id',departmentController.department_delete);

module.exports = router;