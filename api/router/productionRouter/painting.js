/* Import of Modules  */
const mongoose=require('mongoose');
const express=require('express');
const router=express();

/* Painting controller Import function  */
const paintingController=require('../../controller/production/painting');

/*getting painting data with batchId */
router.get('/:batchId',paintingController.painting_get_with_batchId);


/* painting save method */
router.post('/',paintingController.painting_save);

/* painting update method*/
router.patch('/:_id',paintingController.painting_update);


/* To get  painting completed products */
router.get('/checkPainting/:meltNo',paintingController.painting_check);


module.exports=router;