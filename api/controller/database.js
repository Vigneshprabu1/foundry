var csv = require('csv-express');
var json2csv = require('json2csv');
var csv1 = require('fast-csv');
const mongoose = require('mongoose');
const multer=require('multer');
//var csv = require('fast-csv');
const Customer = require('../model/customer');
const CompletedMelt = require('../model/production/completed-melt');
const Fettling = require('../model/production/fettling');
const Items = require('../model/items');
const KnockOut = require('../model/production/knock-out');
const Melt = require('../model/production/melt');
const Mail = require('../model/mail');
const Melting = require('../model/production/melting');
const MeltReport=require('../model/production/melt-report');
const Moulding = require('../model/production/moulding');
const OnGoingMelt = require('../model/production/onGoing-Melt');
const Order = require('../model/order');
const Painting = require('../model/production/painting');
const Product = require('../model/product');
const Purchase = require('../model/purchase');
const ReturnAndRejection = require('../model/production/return-and-rejection');
const RawMaterial = require('../model/production/raw-material');
const SandDisposal = require('../model/production/sand-disposal');
const SandDisposalStock = require('../model/production/sand-disposal-stock');
const ScheduleMelt = require('../model/production/scheduleMelt');
const Stock = require('../model/stock');
const ShotBlasting = require('../model/production/shot-blasting-detail');
const TempStock = require('../model/temp-stock');
const TempSchMelt = require('../model/production/temp-scheduled-melt');
const User = require('../model/user');
const Vendor = require('../model/vendor');
const Yield = require('../model/production/yield');
const PurchaseReport=require('../model/purchase-report');
const RawMaterialConsumptionReports=require('../model/production/raw-material-consumption-report');
const RawMaterialSummaryReport=require('../model/production/raw-material-summary-report');
const Rejection=require('../model/production/rejection');
const UnScheduledMelt=require('../model/production/unscheduled-melt');
const Employee=require('../model/employee');
const ShotBlastingMaster=require('../model/master/shot-blasting-master');
const FettlingMaster=require('../model/master/fettling-master');
const PaintingMaster=require('../model/master/painting-master');
const Labour=require('../model/master/labour-master');
const LpgMaster=require('../model/master/lpg-master');
const RawMaterialPreData=require('../model/master/raw-material-pre-data');
const Department=require('../model/master/departmet');
const Shift=require('../model/master/shift');
const ActivityMaster=require('../model/master/activity-master');
const CostCalculation=require('../model/production/cost-calculation');
const OverAllCostCalculation=require('../model/production/over-all-calculation');
const ItemTypeMaster=require('../model/master/item-type-master');
const Salary=require('../model/master/salary');
const UnitMaster=require('../model/master/unit-master');
const VendorTypeMaster=require('../model/master/vendor-type-master');
const SandDisposalMaster=require('../model/master/sand-disposal-master');
const SandDispatching=require('../model/production/sand-dispatching');

const databases = [] = [
    { collectionName: 'Customer' }, { collectionName: 'CompletedMelt' }, { collectionName: 'Fettling' }, { collectionName: 'Items' },
    { collectionName: 'knockOut' }, { collectionName: 'Melt' }, { collectionName: 'Mail' }, { collectionName: 'Melting' }, { collectionName: 'Moulding' },
    { collectionName: 'OnGoingMelt' }, { collectionName: 'Order' }, { collectionName: 'Painting' },
    { collectionName: 'Product' }, { collectionName: 'Purchase' }, { collectionName: 'ReturnAndRejection' }, { collectionName: 'RawMaterial' },
    { collectionName: 'SandDisposal' }, { collectionName: 'SandDisposalStock' }, { collectionName: 'ScheduleMelt' },
    { collectionName: 'Stock' }, { collectionName: 'ShotBlasting' }, { collectionName: 'TempStock' }, { collectionName: 'TempSchMelt' },
    { collectionName: 'MeltReport' }, { collectionName: 'PurchaseReport' }, { collectionName: 'RawMaterialConsumptionReports' }, { collectionName: 'RawMaterialSummaryReport' },
    { collectionName: 'Rejection' }, { collectionName: 'UnScheduledMelt' },
    { collectionName: 'User' }, { collectionName: 'Vendor' }, { collectionName: 'Yield' }, { collectionName: 'Employee' }, { collectionName: 'ShotBlastingMaster' },
    { collectionName: 'FettlingMaster' }, { collectionName: 'PaintingMaster' }, { collectionName: 'Labour' }, { collectionName: 'LpgMaster' },
    { collectionName: 'RawMaterialPreData' }, { collectionName: 'Department' }, { collectionName: 'Shift' },
    { collectionName: 'ActivityMaster' }, { collectionName: 'CostCalculation' }, { collectionName: 'OverAllCostCalculation' },
    { collectionName: 'ItemTypeMaster' }, { collectionName: 'Salary' }, { collectionName: 'UnitMaster' },
    { collectionName: 'VendorTypeMaster' }, { collectionName: 'SandDisposalMaster' }, { collectionName: 'SandDispatching' },
];

exports.get_export_datas = (req, res, next) => {
    console.log('inside export data');
    console.log(req.params.filename);

    if (req.params.filename == 'customers') {
        filename1 = Customer;
        var filenames = "customers.csv"
        Customer.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    } else if (req.params.filename == 'completedmelts') {
        var filenames = "completedmelts.csv"
        CompletedMelt.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    } else if (req.params.filename == 'fettlings') {
        var filenames = "fettlings.csv"
        Fettling.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    } else if (req.params.filename == 'items') {
        filename1 = Customer;
        var filenames = "items.csv"
        Items.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    } else if (req.params.filename == 'knockouts') {
        filename1 = Customer;
        var filenames = "knockouts.csv"
        KnockOut.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    } else if (req.params.filename == 'melts') {
        var filenames = "melts.csv"
        Melt.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    } else if (req.params.filename == 'mails') {
        filename1 = Customer;
        var filenames = "mails.csv"
        Mail.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    } else if (req.params.filename == 'meltings') {
        filename1 = Customer;
        var filenames = "meltings.csv"
        Melting.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'meltreports') {
        var filenames = "meltreports.csv"
        MeltReport.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'mouldings') {
        var filenames = "mouldings.csv"
        Moulding.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'ongoingmelts') {
        var filenames = "ongoingmelts.csv"
        OnGoingMelt.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'orders') {
        var filenames = "orders.csv"
        Order.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'paintings') {
        var filenames = "paintings.csv"
        Painting.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'products') {
        var filenames = "products.csv"
        Product.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'purchasereports') {
        var filenames = "purchasereports.csv"
        PurchaseReport.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'purchases') {
        var filenames = "purchases.csv"
        Purchase.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'rawmaterialconsumptionreports') {
        var filenames = "rawmaterialconsumptionreports.csv"
        RawMaterialConsumptionReports.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'rawmaterials') {
        var filenames = "rawmaterials.csv"
        RawMaterial.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'rawmaterialsummaryreports') {
        var filenames = "rawmaterialsummaryreports.csv"
        RawMaterialSummaryReport.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'returnandrejections') {
        var filenames = "returnandrejections.csv"
        ReturnAndRejection.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'schedulemelts') {
        var filenames = "schedulemelts.csv"
        ScheduleMelt.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'rejections') {
        var filenames = "rejections.csv"
        Rejection.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'shotblastings') {
        var filenames = "shotblastings.csv"
        ShotBlasting.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'stocks') {
        var filenames = "stocks.csv"
        Stock.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'unschedulemelts') {
        var filenames = "unschedulemelts.csv"
        UnScheduledMelt.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'users') {
        var filenames = "users.csv"
        User.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'mails') {
        var filenames = "mails.csv"
        Mail.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }else if (req.params.filename == 'sanddisposals') {
        var filenames = "sanddisposals.csv"
        SandDisposal.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }else if (req.params.filename == 'sanddisposalstocks') {
        var filenames = "sanddisposalstocks.csv"
        SandDisposalStock.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }else if (req.params.filename == 'tempstocks') {
        var filenames = "tempstocks.csv"
        TempStock.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }else if (req.params.filename == 'tempschedulemelts') {
        var filenames = "tempschedulemelts.csv"
        TempSchMelt.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }else if (req.params.filename == 'vendors') {
        var filenames = "vendors.csv"
        Vendor.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'yields') {
        var filenames = "yields.csv"
        Yield.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'employees') {
        var filenames = "employees.csv"
        Employee.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'shotblastingmasters') {
        var filenames = "shotbalstingmasters.csv"
        ShotBlastingMaster.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'fettlingmasters') {
        var filenames = "fettlingmasters.csv"
        FettlingMaster.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'paintingmasters') {
        var filenames = "paintingmasters.csv"
        PaintingMaster.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'labours') {
        var filenames = "labours.csv"
        Labour.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'lpgmasters') {
        var filenames = "lpgmasters.csv"
        Employee.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'rawmaterialcompositions') {
        var filenames = "rawmaterialpredatas.csv"
        RawMaterialPreData.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'departments') {
        var filenames = "departments.csv"
        Department.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'shifts') {
        var filenames = "shifts.csv"
        Shift.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'activity') {
        var filenames = "activitymasters.csv"
        ActivityMaster.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'costcalculations') {
        var filenames = "costcalculations.csv"
        CostCalculation.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'overallcostcalculations') {
        var filenames = "overallcostcalculations.csv"
        OverAllCostCalculation.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    } else if (req.params.filename == 'itemtypemasters') {
        var filenames = "itemtypemasters.csv"
        ItemTypeMaster.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    } else if (req.params.filename == 'salaries') {
        var filenames = "salaries.csv"
        Salary.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    } else if (req.params.filename == 'unitmasters') {
        var filenames = "unitmasters.csv"
        UnitMaster.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'vendortypemaster') {
        var filenames = "vendortypemaster.csv"
        VendorTypeMaster.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    else if (req.params.filename == 'unitmasters') {
        var filenames = "unitmasters.csv"
        UnitMaster.find().lean().exec({}, function (err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            //res.writeHead(res.statusCode);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filenames);
            res.csv(products, true);
        });
    }
    
    
}

/* setting the field in excel */
exports.set_export_field = (req, res, next) => {
    console.log("inside the set export field");
    if (req.params.filename == 'customers') {
        var fields = [
            'customerName',
            'mobileNo',
            'emailId',
            'address'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=customers.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);

    } else if (req.params.filename == 'completedmelts') {
        console.log("completed melts");
        var fields = [
            'meltNo',
            'orderId',
            'orderDate',
            'batchId',
            'customerName',
            'partId',
            'moldType',
            'partWeight',
            'quantity',
            'returnWeight',
            'rejectionWeight',
            'deliveryDate',
            'deliveredQuantity',

        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=completedmelts.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);

    }
    else if (req.params.filename == 'fettlings') {
        console.log("fettling");
        var fields = [
            'meltNo',
            'batchId',
            'partId',
            'startTime',
            'endTime',
            'machineId',
            'machineName',
            'totalWorkingHours',
            'totalCost',
            'perKgCost',
            'paintingType',
            'quantity'

        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=fettlings.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);


    }
    else if (req.params.filename == 'items') {
        console.log("items");
        var fields = [
            'itemName',
            'itemType',
            'unit',
            'gst'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=items.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);


    }else if (req.params.filename == 'knockouts') {
        console.log("knockouts");
        var fields = [
            'meltNo',
    'batchId',
    'partId',
    'startTime',
    'endTime',
    'roughCastingWeight',
    'labourCostr',
    'pouringWeight',
    'totalWorkingHours',
    'otHours',
    'perCost',
    'typeOfCost',
    'quantity',
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=knockouts.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    }
    else if (req.params.filename == 'meltings') {
        console.log("meltings");
        var fields = [
            'meltNo',   
            'startTime',
            'endTime',
            'peakTemp',
            'endTemp',
            'labourCost',
            'perCost',
            'typeOfCost',
            'electricityKwh',
            'totalWorkingHours',
            'otHours',
            'consumableCost',
            'perLabourCost'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=meltings.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);

    }
    else if (req.params.filename == 'meltreports') {
        console.log("meltreports");
        var fields = [
            'orderDate' ,
    'orderId',
    'customerName' ,
    'deliveryDate' ,
    'meltDate' ,
    'meltNo' ,
    'batchId' ,
    'partId' ,
    'moldType' ,
    'quantity' ,
    'partWeight' ,
    'mouldWeight' ,
    'roughCastingWeight' ,
    'noOfMould' ,
    'totalWeight' ,
    'yieldPercentage' ,
    'returnWeight' ,
    'rejectionWeight' ,
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=meltreports.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);


    } else if (req.params.filename == 'melts') {
        console.log("melts");
        var fields = [
            'meltNo',
            'meltStartDate',
            'meltEndDate',
            'totalMeltWeight',
            'moldingType',
            'meltStatus',
            'batchStatus',
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=melts.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    }
    else if (req.params.filename == 'mouldings') {
        console.log("mouldings");
        var fields = [
            'meltNo',
            'batchId',  
            'noOfPieces',
            'moldType',
            'partId',
            'startDate',
            'endDate',
            'weight',   
            'totalWorkingHours',
            'otHours',
            'labourCost',
            'perCost',
            'typeOfCost'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=mouldings.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);

    } else if (req.params.filename == 'ongoingmelts') {
        console.log("ongoingmelts");
        var fields = [
            'batchId',   
            'meltId',
            'orderId',
            'orderDate',
            'deliveryDate',
            'customerName',
            'productName',     
            'partId',
            'moldType',
            'partType',    
            'quantity', 
            'meltWeight', 
            'paintingType',
            'scheduleMeltQuantity',
            'rawmaterialconsumption',
            'moulding',
            'melting',
            'knockout',
            'shotblasting',
            'fettling',
            'painting',
            'sanddisposal',
            'yield'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=ongoingmelts.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    }
    else if (req.params.filename == 'orders') {
        console.log("orders");
        var fields = [
            'orderId',
            'orderDate',
            'customer',
            'product',
            'quantity',
            'paintingType',
            'deliveryDate',
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=orders.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    } 
    else if (req.params.filename == 'paintings') {
        console.log("paintings");
        var fields = [
            'meltNo',
    'batchId',
    'partId',
    'startTime',
    'endTime',
    'totalWorkingHours', 
    'totalCost',
    'totalPaint',
    'labourCost',
    'consumableCost',
    'perCost'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=paintings.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    } 
    else if (req.params.filename == 'products') {
        console.log("products");
        var fields = [
            'productName',
            'partType',
            'partSubType',
            'partId',
            'partWeight',
            'patternImage',
            'MethodImage',
            'moldType',
            'castWeight',
            'coreWeight',
            'maxWallThickness',
            'minWallThickness',
            'noOfCavity',
            'noOfCores',
            'coleHoleDiameters',
            'shapecomplexity',
            'surfaceRoughness',
            'tolerance',
            'maxCostLength',
            'materialGrade',
            'runnerWith',
            'runnerDiameter',
            'noOfGates',
            'raiserWith',
            'raiserDiameter',
            'partCost',
            'quantity',
            'totalWeight',
            'totalCost',
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=products.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    } 
    else if (req.params.filename == 'purchasereports') {
        console.log("purchasereports");
        var fields = [
            'invoiceNo',
            'invoiceDate',
            'weight',
            'totalAmount',
            'deliveryTime',
            'deliveryDate',
            'orderDate',
            'stockNo',
            'itemName',
            'itemType',
            'vendorName',
            'vendorType',
            'date',
            'month',
            'monthly',
            'year'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=purchasereports.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    } 
    else if (req.params.filename == 'purchases') {
        console.log("purchases");
        var fields = [
            'invoiceNo',
            'invoiceDate',
            'weight',
            'transportCost',
            'totalAmount',
            'deliveryTime',
            'deliveryDate',
            'orderDate',
            'orderTime',
            'status',    
            'stockNo',
            'items',      
            'vendor'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=purchases.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    } 
    else if (req.params.filename == 'rawmaterialconsumptionreports') {
        console.log("rawmaterialconsumptionreports");
        var fields = [
            'partId',
    'meltNo',
    'batchId',
    'rawMaterialTotalWeight',
    'consumablesTotalWeight',
    'itemName',
    'itemType',
    'totalCostRawMaterial',
    'totalCostConsumables',
    'orderId',
    'meltDate',
    'quantity'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=rawmaterialconsumptionreports.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    } 
   
    else if (req.params.filename == 'rawmaterials') {
        console.log("rawmaterials");
        var fields = [
            'meltNo',
            'moldType',
            'itemWeight',
            'itemName',
            'itemType',
            'perKGCost',
            'totalCost'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=rawmaterials.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    } 
    else if (req.params.filename == 'rawmaterialsummaryreports') {
        console.log("rawmaterialsummaryreports");
        var fields = [
            'meltDate',
            'meltNo',
            'itemName',
            'weight',
            'date',                               
            'month',
            'year',
            'mon'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=rawmaterialsummaryreports.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    } 
    else if (req.params.filename == 'returnandrejections') {
        console.log("retunrandrejections");
        var fields = [
            'itemName',
            'weight'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=retunrandrejections.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    } 
    else if (req.params.filename == 'schedulemelts') {
        console.log("schedulemelts");
        var fields = [
            'order',
            'orderId',
            'customerName',
            'partId',
            'meltWeight',
            'moldType',
            'coreWeight',
            'quantity',
            'partWeight',
            'totalWeight',
            'deliveryDate',
            'orderDate',
            'paintingType',
            'status',
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=schedulemelts.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    } 
    else if (req.params.filename == 'shotblastings') {
        console.log("shotblastings");
        var fields = [
            'meltNo',
            'partId',
            'batchId',
            'startTime',
            'endTime',
            'machineId',
            'totalWorkingHours',
            'shotsUsedInWeight',
            'totalCost',
            'perCost',
            'typeOfCost',
            'labourCost',
            'consumableCost',
            'quantity'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=shotblastings.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    } 
    else if (req.params.filename == 'stocks') {
        console.log("stocks");
        var fields = [
            'itemName',
            'itemType',
            'weight',
            'unit',
            'perKG',
            'totalAmount',
            'averageWeight',
            'minWeightReq',
            'minOrderWeight',
            'maxOrderWeight',
            'lastOrder',
            'deliveredTime',
            'purchaseId'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=stocks.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    } 
    else if (req.params.filename == 'rejections') {
        console.log("retunrandrejections");
        var fields = [
            'customerName',
            'partId',
            'meltNo',
            'batchId',
            'quantity',
            'partWeight',
            'totalWeight',
            'reasonForRej'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=rejections.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    } 
     else if (req.params.filename == 'unschedulemelts') {
        console.log("unscheduledmelts");
        var fields = [
            'order',
            'orderId',
            'customerName',
            'partId',
            'meltWeight',
            'moldType' ,
            'coreWeight',
            'quantity',
            'partWeight',
            'totalWeight',
            'deliveryDate',
            'paintingType',
            'orderDate',
            'status'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=unscheduledmelts.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    } 
    else if (req.params.filename == 'users') {
        console.log("users");
        var fields = [
            'userName',
            'password',
            'emailId',
            'mobile' ,
            'address',
            'role',
            'roleStatus',
            'status'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=users.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    } 
    else if (req.params.filename == 'vendors') {
        console.log("vendors");
        var fields = [
            'vendorName',
            'vendorType',
            'mobile' ,
            'email',
            'address',
            'vendorCode',
            'preferredType',
            'status'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=vendors.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    }  else if (req.params.filename == 'yields') {
        console.log("yields");
        var fields = [
            'meltNo',
    'batchId',
    'partId',
    'pouringWeight',
    'roughCastingWeight',
    'meltWeight',
    'yieldWeight',
    'yieldPercentage',
    'returnWeight',
    'roughCastingTotalWeight',
    'quantity'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=yields.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    }
    else if (req.params.filename == 'mails') {
        console.log("items");
        var fields = [
            'emailId',
            'password',
            'subject',
            'message',
            'companyName',
            'status'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=mails.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);

    }
    // }  else if (req.params.filename == 'sanddisposals') {
    //     console.log("items");
    //     var fields = [
    //         'emailId',
    //         'password',
    //         'subject',
    //         'message',
    //         'companyName',
    //         'status'
    //     ];
    //     var csv = json2csv({ data: '', fields: fields });
    //     res.set("Content-Disposition", "attachment;filename=sanddisposals.csv");
    //     res.set("Content-Type", "application/octet-stream");
    //     res.send(csv);


    // } 
    // else if (req.params.filename == 'sanddisposalstocks') {
    //     console.log("items");
    //     var fields = [
    //         'emailId',
    //         'password',
    //         'subject',
    //         'message',
    //         'companyName',
    //         'status'
    //     ];
    //     var csv = json2csv({ data: '', fields: fields });
    //     res.set("Content-Disposition", "attachment;filename=sanddisposalstocks.csv");
    //     res.set("Content-Type", "application/octet-stream");
    //     res.send(csv);


    // }
    
    else if (req.params.filename == 'tempstocks') {
        console.log("items");
        var fields = [
            'itemName',
    'itemType',
    'weight',
    'unit',
    'totalAmount',
    'vendorName',
    'invoiceNo',
    'orderDate',
    'orderTime',
    'deliveryDate',
    'deliveryTime',
    'deliveredTime',
    'purchaseId'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=tempstocks.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);

    }
    else if (req.params.filename == 'tempscheduledmelts') {
        console.log("items");
        var fields = [
            'scheduledId',
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=tempscheduledmelts.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);

    }
    else if (req.params.filename == 'employees') {
        console.log("employees");
        var fields = [
            'empName',
            'empNature',
            'activity',
            'empDepartment',
            'shiftId',
            'shift',
            'salaryId',
            'salaryType',
            'salary',
            'status'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=employees.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);

    }
    else if (req.params.filename == 'shotblastingmasters') {
        console.log("shotblastingmasters");
        var fields = [
            'machineId',
            'machineName',
            'itemType',
            'consumableName',
            'totalCapacity',
            'perKgCost',
            'replacementRate',
            'replacementQuantity',
            'partName',
            'partCost',
            'status'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=shotblastingmasters.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);

    }
    else if (req.params.filename == 'fettingmasters') {
        console.log("fettingmasters");
        var fields = [
            'machineId',
    'machineName',
    'itemType',
    'consumableName',
    'perKgCost',
    'replacementRate',
    'replacementQuantity',
    'partName',
    'partCost',
    'status'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=fettingmasters.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);

    }
    else if (req.params.filename == 'paintingmasters') {
        console.log("paintingmasters");
        var fields = [
            'paintingType',
            'perLitreCost',
            'machineStatus',
            'moldType',
            'status'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=paintingmasters.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);

    }
    else if (req.params.filename == 'labours') {
        console.log("labours");
        var fields = [
            'activityName',
            'labourEmpType',
            'workingType',
            'ratePerKg',
            'ratePerHour',
            'otHours',
            'employeeId',
            'employeeName',
            'paintingType',
             'machineId',
             'status'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=labours.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);

    }
    else if (req.params.filename == 'lpgmasters') {
        console.log("lpgmasters");
        var fields = [
            'boughtDate',
    'replaceDate',
    'totalCost',
    'noOfHours',
    'perHourCost'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=lpgmasters.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);

    }
    else if (req.params.filename == 'rawmaterialcompositions') {
        console.log("items");
        var fields = [
            'itemName',
    'itemType',
    'itemPercentage',
    'moldType',
    'status'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=rawmaterialpredatas.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);

    }
    else if (req.params.filename == 'departments') {
        console.log("departments");
        var fields = [
            'itemName',
    'itemType',
    'itemPercentage',
    'moldType',
    'status'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=departments.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);

    }
    else if (req.params.filename == 'shifts') {
        console.log("shifts");
        var fields = [
            'itemName',
    'itemType',
    'itemPercentage',
    'moldType',
    'status'
        ];
        var csv = json2csv({ data: '', fields: fields });
        res.set("Content-Disposition", "attachment;filename=shifts.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);

    }
    
}


exports.import_data=function(req,res,next){
    console.log('name',req.params.name);
    console.log('file',req.files);
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

        else if(req.params.name=='customers'){
            console.log("inside customer");
            var customerFile = req.files.file;
            var customer = [];
                 
            csv1
             .fromString(customerFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['customer']=
                 customer.push(data);
             })
             .on("end", function(){
                 Customer.create(customer, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(customer.length + ' products have been successfully uploaded.');
             });

        }
        else if(req.params.name=='completedmelts'){
            console.log("inside completedmelts");
            var completedmeltsFile = req.files.file;
            var completedmelts = [];
                 
            csv1
             .fromString(completedmeltsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['completedmelts']=
                 completedmelts.push(data);
             })
             .on("end", function(){
                 CompletedMelt.create(completedmelts, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(completedmelts.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='fettlings'){
            console.log("inside fettling");
            var fettlingsFile = req.files.file;
            var fettlings = [];
                 
            csv1
             .fromString(fettlingsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['fettlings']=
                 fettlings.push(data);
             })
             .on("end", function(){
                 Fettling.create(fettlings, function(err, documents) {
                    if (err) throw err;
                 });
                 res.status(200).json(fettlings.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='items'){
            console.log("inside items");
            var itemsFile = req.files.file;
            var items = [];
                 
            csv1
             .fromString(itemsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['items']=
                 items.push(data);
             })
             .on("end", function(){
                 Items.create(items, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(items.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='knockouts'){
            console.log("inside knockouts");
            var knockoutsFile = req.files.file;
            var knockouts = [];
                 
            csv1
             .fromString(knockoutsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['customer']=
                 knockouts.push(data);
             })
             .on("end", function(){
                 KnockOut.create(knockouts, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(knockouts.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='meltings'){
            console.log("inside customer");
            var meltingsFile = req.files.file;
            var meltings = [];
                 
            csv1
             .fromString(meltingsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['customer']=
                 meltings.push(data);
             })
             .on("end", function(){
                 Melting.create(meltings, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(meltings.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='meltreports'){
            console.log("inside customer");
            var meltreportsFile = req.files.file;
            var meltreports = [];
                 
            csv1
             .fromString(meltreportsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['meltreports']=
                 meltreports.push(data);
             })
             .on("end", function(){
                 MeltReport.create(meltreports, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(meltreports.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='melts'){
            console.log("inside melts");
            var meltsFile = req.files.file;
            var melts = [];
                 
            csv1
             .fromString(meltsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['melts']=
                 melts.push(data);
             })
             .on("end", function(){
                 Melt.create(melts, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(melts.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='mouldings'){
            console.log("inside mouldings");
            var mouldingsFile = req.files.file;
            var mouldings = [];
                 
            csv1
             .fromString(mouldingsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['mouldings']=
                 mouldings.push(data);
             })
             .on("end", function(){
                 Moulding.create(mouldings, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(mouldings.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='ongoingmelts'){
            console.log("inside ongoingmelts");
            var ongoingmeltsFile = req.files.file;
            var ongoingmelts = [];
                 
            csv1
             .fromString(ongoingmeltsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['ongoingmelts']=
                 ongoingmelts.push(data);
             })
             .on("end", function(){
                 OnGoingMelt.create(ongoingmelts, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(ongoingmelts.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='orders'){
            console.log("inside orders");
            var ordersFile = req.files.file;
            var orders = [];
                 
            csv1
             .fromString(customerFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['orders']=
                 orders.push(data);
             })
             .on("end", function(){
                 Order.create(orders, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(orders.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='paintings'){
            console.log("inside paintings");
            var paintingsFile = req.files.file;
            var paintings = [];
                 
            csv1
             .fromString(paintingsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['paintings']=
                 paintings.push(data);
             })
             .on("end", function(){
                 Painting.create(paintings, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(paintings.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='products'){
            console.log("inside products");
            var productsFile = req.files.file;
            var products = [];
                 
            csv1
             .fromString(productsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['products']=
                 products.push(data);
             })
             .on("end", function(){
                 Product.create(products, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(products.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='purchasereports'){
            console.log("inside purchasereports");
            var purchasereportsFile = req.files.file;
            var purchasereports = [];
                 
            csv1
             .fromString(purchasereportsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['purchasereports']=
                 purchasereports.push(data);
             })
             .on("end", function(){
                 PurchaseReport.create(purchasereports, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(purchasereports.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='purchases'){
            console.log("inside purchase");
            var purchasesFile = req.files.file;
            var purchases = [];
                 
            csv1
             .fromString(purchasesFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['purchases']=
                 purchases.push(data);
             })
             .on("end", function(){
                 Purchase.create(purchases, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(purchases.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='rawmaterialconsumptionreports'){
            console.log("inside rawmaterialconsumptionreports");
            var rawmaterialconsumptionreportsFile = req.files.file;
            var rawmaterialconsumptionreports = [];
                 
            csv1
             .fromString(rawmaterialconsumptionreportsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['rawmaterialconsumptionreports']=
                 rawmaterialconsumptionreports.push(data);
             })
             .on("end", function(){
                 RawMaterialConsumptionReports.create(rawmaterialconsumptionreports, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(rawmaterialconsumptionreports.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='rawmaterials'){
            console.log("inside rawmaterials");
            var rawmaterialsFile = req.files.file;
            var rawmaterials = [];
                 
            csv1
             .fromString(rawmaterialsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['rawmaterials']=
                 rawmaterials.push(data);
             })
             .on("end", function(){
                 RawMaterial.create(rawmaterials, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(rawmaterials.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='rawmaterialsummaryreports'){
            console.log("inside rawmaterialsummaryreports");
            var rawmaterialsummaryreportsFile = req.files.file;
            var rawmaterialsummaryreports = [];
                 
            csv1
             .fromString(rawmaterialsummaryreportsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['rawmaterialsummaryreportsFile']=
                 rawmaterialsummaryreportsFile.push(data);
             })
             .on("end", function(){
                 RawMaterialSummaryReport.create(rawmaterialsummaryreportsFile, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(rawmaterialsummaryreportsFile.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='returnandrejections'){
            console.log("inside returnandrejections");
            var returnandrejectionsFile = req.files.file;
            var returnandrejections = [];
                 
            csv1
             .fromString(returnandrejectionsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['returnandrejections']=
                 returnandrejections.push(data);
             })
             .on("end", function(){
                 ReturnAndRejection.create(returnandrejections, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(returnandrejections.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='schedulemelts'){
            console.log("inside schedulemelts");
            var schedulemeltsFile = req.files.file;
            var schedulemelts = [];
                 
            csv1
             .fromString(customerFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['schedulemelts']=
                 schedulemelts.push(data);
             })
             .on("end", function(){
                 ScheduleMelt.create(schedulemelts, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(schedulemelts.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='rejections'){
            console.log("inside rejections");
            var rejectionsFile = req.files.file;
            var rejections = [];
                 
            csv1
             .fromString(rejectionsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['rejection']=
                 rejections.push(data);
             })
             .on("end", function(){
                 Rejection.create(rejections, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(rejections.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='shotblastings'){
            console.log("inside shotblastings");
            var shotblastingsFile = req.files.file;
            var shotblastings = [];
                 
            csv1
             .fromString(shotblastingsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['shotblastings']=
                 shotblastings.push(data);
             })
             .on("end", function(){
                 ShotBlasting.create(shotblastings, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(shotblastings.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='stocks'){
            console.log("inside stocks");
            var stocksFile = req.files.file;
            var stocks = [];
                 
            csv1
             .fromString(stocksFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['stocks']=
                 stocks.push(data);
             })
             .on("end", function(){
                 Stock.create(stocks, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(stocks.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='unschedulemelts'){
            console.log("inside unschedulemelts");
            var unschedulemeltsFile = req.files.file;
            var unschedulemelts = [];
                 
            csv1
             .fromString(unschedulemeltsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['unschedulemelts']=
                 unschedulemelts.push(data);
             })
             .on("end", function(){
                 UnScheduledMelt.create(unschedulemelts, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(unschedulemelts.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='users'){
            console.log("inside users");
            var usersFile = req.files.file;
            var users = [];
                 
            csv1
             .fromString(usersFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['users']=
                 users.push(data);
             })
             .on("end", function(){
                 User.create(users, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(users.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='vendors'){
            console.log("inside vendors");
            var vendorsFile = req.files.file;
            var vendors = [];
                 
            csv1
             .fromString(vendorsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['vendors']=
                 vendors.push(data);
             })
             .on("end", function(){
                 Vendor.create(vendors, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(vendors.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='yields'){
            console.log("inside yields");
            var yieldsFile = req.files.file;
            var yields = [];
                 
            csv1
             .fromString(yieldsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['yields']=
                 yields.push(data);
             })
             .on("end", function(){
                 Yield.create(yields, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(yields.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='mails'){
            console.log("inside mails");
            var mailsFile = req.files.file;
            var mails = [];
                 
            csv1
             .fromString(mailsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['customer']=
                 mails.push(data);
             })
             .on("end", function(){
                 Mail.create(mails, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(mails.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='tempstocks'){
            console.log("inside tempstocks");
            var tempstocksFile = req.files.file;
            var tempstocks = [];
                 
            csv1
             .fromString(tempstocksFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['tempstocks']=
                 tempstocks.push(data);
             })
             .on("end", function(){
                 TempStock.create(tempstocks, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(tempstocks.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='tempschedulemelts'){
            console.log("inside tempschedulemelts");
            var tempschedulemeltsFile = req.files.file;
            var tempschedulemelts = [];
                 
            csv1
             .fromString(tempschedulemeltsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['tempschedulemeltsFile']=
                 tempschedulemeltsFile.push(data);
             })
             .on("end", function(){
                 TempSchMelt.create(tempschedulemeltsFile, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(tempschedulemeltsFile.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='employees'){
            console.log("inside employees");
            var employeesFile = req.files.file;
            var employees = [];
                 
            csv1
             .fromString(employeesFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['employees']=
                 employees.push(data);
             })
             .on("end", function(){
                 Employee.create(employees, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(employees.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='shotblastingmasters'){
            console.log("inside shotblastingmasters");
            var shotblastingmastersFile = req.files.file;
            var shotblastingmasters = [];
                 
            csv1
             .fromString(shotblastingmastersFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['shotblastingmasters']=
                 shotblastingmasters.push(data);
             })
             .on("end", function(){
                 ShotBlastingMaster.create(shotblastingmasters, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(shotblastingmasters.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='fettlingmasters'){
            console.log("inside fettlingmasters");
            var fettingmastersFile = req.files.file;
            var fettlingmasters = [];
                 
            csv1
             .fromString(fettingmastersFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['fettlingmasters']=
                 fettlingmasters.push(data);
             })
             .on("end", function(){
                 FettlingMaster.create(fettlingmasters, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(fettlingmasters.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='paintingmasters'){
            console.log("inside customer");
            var paintingmasterFile = req.files.file;
            var paintingmasters = [];
                 
            csv1
             .fromString(paintingmasterFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['paintingmasters']=
                 paintingmasters.push(data);
             })
             .on("end", function(){
                 PaintingMaster.create(paintingmasters, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(paintingmasters.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='labours'){
            console.log("inside customer");
            var laboursFile = req.files.file;
            var labours = [];
                 
            csv1
             .fromString(laboursFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['labours']=
                 labours.push(data);
             })
             .on("end", function(){
                 Labour.create(labours, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(labours.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='lpgmasters'){
            console.log("inside lpgmasters");
            var lpgmastersFile = req.files.file;
            var lpgmasters = [];
                 
            csv1
             .fromString(lpgmastersFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['lpgmasters']=
                 customer.push(data);
             })
             .on("end", function(){
                 LpgMaster.create(lpgmasters, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(lpgmasters.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='rawmaterialcompositions'){
            console.log("inside rawmaterialcompositions");
            var rawmaterialcompositionsFile = req.files.file;
            var rawmaterialcompositions = [];
                 
            csv1
             .fromString(rawmaterialcompositionsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['rawmaterialcompositions']=
                 rawmaterialcompositions.push(data);
             })
             .on("end", function(){
                 RawMaterialPreData.create(rawmaterialcompositions, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(rawmaterialcompositions.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='departments'){
            console.log("inside departments");
            var departmentsFile = req.files.file;
            var departments = [];
                 
            csv1
             .fromString(departmentsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['departments']=
                 departments.push(data);
             })
             .on("end", function(){
                 Department.create(departments, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(departments.length + ' products have been successfully uploaded.');
             });

        }   else if(req.params.name=='shifts'){
            console.log("inside shifts");
            var shiftsFile = req.files.file;
            var shifts = [];
                 
            csv1
             .fromString(shiftsFile.data.toString(), {
                 headers: true,
                 ignoreEmpty: true
             })
             .on("data", function(data){
                 data['_id'] = new mongoose.Types.ObjectId();
                 data['shifts']=
                 shifts.push(data);
             })
             .on("end", function(){
                 Shift.create(shifts, function(err, documents) {
                    if (err) throw err;
                 });
                 res.send(shifts.length + ' products have been successfully uploaded.');
             });

        }  
};
  