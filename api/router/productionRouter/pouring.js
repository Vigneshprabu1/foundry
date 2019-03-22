const mongoose=require('mongoose');
const express=require('express');
const router=express();


//Controller
const pouringController=require('../../controller/production/pouring');


//getting data from database using meltNo
router.get('/:meltNo',pouringController.pouring_get);


//save the pouring data
router.post('/',pouringController.pouring_save);


//getting pouring completed or not
router.get('/checkPouring/:meltNo',pouringController.pouring_check);


//update the pouring data
router.patch('/:_id',pouringController.pouring_update);
module.exports=router;