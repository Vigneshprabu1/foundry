const express = require('express');
const router = express.Router();
const shiftController = require('../../controller/master/shift');

router.post('/', shiftController.shift_save);
router.get('/active', shiftController.get_shift);
router.get('/', shiftController.shift_get_all);
router.put('/',shiftController.shift_update);
router.delete('/:_id',shiftController.shift_delete);

module.exports = router;