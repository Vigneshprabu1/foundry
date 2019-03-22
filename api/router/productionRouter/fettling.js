/* import module */
const mongoose=require('mongoose');
const express=require('express');
const router=express();

/* controller */
const fettlingController=require('../../controller/production/fettling');

/* getting fettling info using batchId */
router.get('/:batchId',fettlingController.fettling_get_using_batchId);

/* save the  fettling details */
router.post('/',fettlingController.fettling_save);

/* update with objectId */
router.patch('/:_id',fettlingController.fettling_update);

/* check completed status of product */
router.get('/checkFettling/:meltNo',fettlingController.fettling_check);

module.exports=router;