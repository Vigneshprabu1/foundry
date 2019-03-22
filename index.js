const express = require('express');
var fileUpload = require('express-fileupload');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');
const order = require('./api/router/order');
const product = require('./api/router/product');
const customer = require('./api/router/customer')
const morgan = require('morgan');
const vendor = require('./api/router/vendor');
const items = require('./api/router/items');
const purchase = require('./api/router/purchase');
const tempStock = require('./api/router/temp-stock');
const mcConsumableTempStock = require('./api/router/mc-consumable-temp-stock');
const mcConsumableStock = require('./api/router/mc-consumable-stock');
const mcPartsTempStock = require('./api/router/mc-parts-temp-stock');
const mcPartsStock = require('./api/router/mc-parts-stock');
const stock = require('./api/router/stock');
const mail = require('./api/router/mail');
const upload = require('./api/router/file');
const homePage = require('./api/router/homepage');
const purchaseReport = require('./api/router/purchase-report');
const deliveryCompleted = require('./api/router/deliveryCompleted');
const fettlingMaster = require('./api/router/master/fettling-master');
const paintingMaster = require('./api/router/master/painting-master');
const shotBlastingMaster = require('./api/router/master/shot-blasting-master');
const labourMasterRouter = require('./api/router/master/labour-master');
const rawMaterialPreData = require('./api/router/master/raw-material-pre-data');
const sandDisposalMaster=require('./api/router/master/sand-disposal-master');
const employee = require('./api/router/employee')
const shift = require('./api/router/master/shift');
const department = require('./api/router/master/department');
const salary = require('./api/router/master/salary');
const companyMaster = require('./api/router/master/company-master');
const activityMaster = require('./api/router/master/activity-master');
const unitMaster = require('./api/router/master/unit-master');
const Billing = require('./api/router/billing');
const itemCategoryMaster = require('./api/router/master/item-category-master');
//production Monitoring
const onGoingrouter = require('./api/router/productionRouter/onGoing-Melt');
const rawMaterialrouter = require('./api/router/productionRouter/raw-material');
const mouldingrouter = require('./api/router/productionRouter/moulding');
const meltingrouter = require('./api/router/productionRouter/melting');
//const pouringrouter = require('./api/router/productionRouter/pouring');
const knockOutrouter = require('./api/router/productionRouter/knock-out');
const shotBlastingrouter = require('./api/router/productionRouter/shot-blasting-detail');
const fettlingrouter = require('./api/router/productionRouter/fettling');
const paintingrouter = require('./api/router/productionRouter/painting');
const sandDisposalrouter = require('./api/router/productionRouter/sand-disposal');
const completedMeltrouter = require('./api/router/productionRouter/completed-melt');
const scheduleMeltrouter = require('./api/router/productionRouter/schedule-melt');
const unscheduledMeltrouter = require('./api/router/productionRouter/unscheduled-melt');
const tempCompScheduleMeltrouter = require('./api/router/productionRouter/temp-comp-scheduled-melt');
const tempScheduleMeltrouter = require('./api/router/productionRouter/temp-scheduled-melt');
const meltrouter = require('./api/router/productionRouter/Melt');
const user = require('./api/router/user');
const login = require('./api/router/login');
const progressBarrouter = require('./api/router/productionRouter/progress-bar');
const returnAndRejectionrouter = require('./api/router/productionRouter/return-and-rejection');
const meltReportrouter = require('./api/router/productionRouter/melt-report');
const rawMaterialConsumptionReportrouter = require('./api/router/productionRouter/raw-material-consumption-report');
const rawMaterialSummaryReportrouter = require('./api/router/productionRouter/raw-material-summary-report');
const rejectionRouter = require('./api/router/productionRouter/rejection');
const itemTypeMasterRouter = require('./api/router/master/item-type-master');
const vendorTypeMasterRouter = require('./api/router/master/vendor-type-master');
const moldingMasterRouter= require('./api/router/master/molding-master');
const roleMasterRouter = require('./api/router/master/role-master');
const lpgMasterRouter= require('./api/router/master/lpg-master');
const database = require('./api/router/database');
const costCalculationRouter=require('./api/router/productionRouter/cost-calculation');
const machineDetailsRouter = require('./api/router/master/machine-details');
const coreMakingMasterRouter=require('./api/router/master/core-making-master');
const coreMakingRouter=require('./api/router/productionRouter/core-making');

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/',express.static(path.join(__dirname, 'dist/foundry-client')));
app.use(bodyparser.json());
app.use(morgan('dev'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(fileUpload());
app.use('/api/orders', order);
app.use('/api/products', product);
app.use('/api/customers', customer);
app.use('/api/vendors', vendor);
app.use('/api/items', items);
app.use('/api/purchases', purchase);
app.use('/api/tempStocks', tempStock);
app.use('/api/stocks', stock);
app.use('/api/mcConsumableTempStock', mcConsumableTempStock);
app.use('/api/mcConsumableStocks', mcConsumableStock);
app.use('/api/mcPartsTempStock', mcPartsTempStock);
app.use('/api/mcPartsStock', mcPartsStock);
app.use('/api/mails', mail);
app.use('/api/uploads', upload);
app.use('/api/users', user);
app.use('/api/logins', login);
app.use('/api/homePages', homePage);
app.use('/api/purchaseReports', purchaseReport);
app.use('/api/deliveryCompleteds', deliveryCompleted);
app.use('/api/fettlingMaster', fettlingMaster);
app.use('/api/paintingMaster', paintingMaster);
app.use('/api/shotBlastingMaster', shotBlastingMaster);
app.use('/api/labourMasters', labourMasterRouter);
app.use('/api/rawMaterialPreData', rawMaterialPreData);
app.use('/api/employees', employee);
app.use('/api/shifts', shift);
app.use('/api/departments', department);
app.use('/api/salarys', salary);
app.use('/api/companyMaster', companyMaster);
app.use('/api/activityMaster', activityMaster);
app.use('/api/unitMaster', unitMaster);
app.use('/api/billings', Billing);
app.use('/api/itemCategoryMaster', itemCategoryMaster);
//production 
app.use('/api/onGoingMelts', onGoingrouter);
app.use('/api/rawMaterials', rawMaterialrouter);
app.use('/api/mouldings', mouldingrouter);
app.use('/api/meltings', meltingrouter);
//app.use('/api/pourings', pouringrouter);
app.use('/api/knockOuts', knockOutrouter);
app.use('/api/shotBlastings', shotBlastingrouter);
app.use('/api/fettlings', fettlingrouter);
app.use('/api/paintings', paintingrouter);
app.use('/api/sandDisposals', sandDisposalrouter);
app.use('/api/completedMelts', completedMeltrouter);
app.use('/api/scheduledMelts', scheduleMeltrouter);
app.use('/api/unscheduledMelts', unscheduledMeltrouter);
app.use('/api/tempCompScheduleMelts', tempCompScheduleMeltrouter);
app.use('/api/tempScheduleMelts', tempScheduleMeltrouter);
app.use('/api/melts', meltrouter);
app.use('/api/getPercentage', progressBarrouter);
app.use('/api/returnAndRejections', returnAndRejectionrouter);
app.use('/api/meltReports', meltReportrouter);
app.use('/api/rawMaterialConsumptionReports', rawMaterialConsumptionReportrouter);
app.use('/api/rawMaterialSummaryReports', rawMaterialSummaryReportrouter);
app.use('/api/rejections', rejectionRouter);
app.use('/api/itemTypeMasters',itemTypeMasterRouter);
app.use('/api/vendorTypeMasters',vendorTypeMasterRouter);
app.use('/api/moldingMasters',moldingMasterRouter);
app.use('/api/roleMasters',roleMasterRouter);
app.use('/api/lpgMasters',lpgMasterRouter);
app.use('/api/sandDisposalMasters',sandDisposalMaster);
app.use('/api/databases', database);
app.use('/api/costCalculations',costCalculationRouter);
app.use('/api/machineDetails',machineDetailsRouter);
app.use('/api/coreMakingMasters',coreMakingMasterRouter);
app.use('/api/coreMakings',coreMakingRouter);



global.__basedir = __dirname;
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/foundry-client/index.html'))
});

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;