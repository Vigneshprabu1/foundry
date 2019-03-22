
/* import module */
const mongoose=require('mongoose');
const express=require('express');
const router=express();

/* controller */
const rawMaterialTableController=require('../../controller/production/raw-material');

/* getting the rawmaterial data using meltno*/
router.get('/:meltNo',rawMaterialTableController.get_raw_material_details_using_meltNo );

/* raw material save method */
router.patch('/save/:meltNo/:moldType/:totalMeltWeight/:_id',rawMaterialTableController.raw_material_save_url);

/* raw material update method */
router.patch('/',rawMaterialTableController.raw_material_update);

module.exports=router;