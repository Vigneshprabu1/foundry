/* import module*/
const mongoose=require('mongoose');

/* creating the rawmaterial schema*/
const rawMaterialSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    meltNo:String,
    moldType:String,
    itemWeight:Number,
    itemName:String,
    itemType:String,
    perKGCost: Number,
    totalCost:Number,
    itemCategory:String,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,
});

/* exporting the schema for further use*/
module.exports=mongoose.model('RawMaterial',rawMaterialSchema);
