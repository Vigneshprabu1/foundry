const express=require('express');
const router=express.Router();
const database=require('../controller/database');

router.get('/ExportData/:filename', database.get_export_datas);


router.post('/ImportData/:name',database.import_data);

router.get('/Export/:filename',database.set_export_field);



module.exports=router;