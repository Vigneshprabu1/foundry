const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const  autoIncrement=require('mongoose-auto-increment');


mongoose.connect('mongodb://localhost:27017/foundryTest',{ useNewUrlParser: true },(err)=>{

    if(!err)
        console.log('MongoDB connection succeeded');
    else
        console.log('Error in DB connection :'+JSON.stringify(err,undefined,2));
})

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
autoIncrement.initialize(mongoose);  

require('./api/model/production/onGoing-Melt');
require('./api/model/purchase');
require('./api/model/production/melt');