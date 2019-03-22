/* 
Module Name: Production Monitoring
Sub Module Name:Cost Calculation
*/

/* Module */
const mongoose = require('mongoose');
/* import Datetime */
const dateTime = require('node-datetime');

/* model */
const OnGoingMelt = require('../../model/production/onGoing-Melt');
const OverAllCostCalculation = require('../../model/production/over-all-calculation');
const RawMaterial = require('../../model/production/raw-material');
const CostCalculation=require('../../model/production/cost-calculation');

/* controller */
const MeltController = require('../../controller/production/Melt');




exports.over_all_cost_calculation = (req, res, next) => {
    const meltNo = req.params.meltNo;
    /* finding the meltno using meltId from melt controller*/
    MeltController.find_melt(meltNo)
        .then(meltData => {
            const heatCode=meltData.heatCode;
            /*  ongoing melt data fetching  */
            OnGoingMelt.find({ meltId: meltData._id })
                .populate('coremaking','perCost')
                .populate('moulding', 'perCost')
                .populate('melting', 'perCost')
                .populate('fettling', 'perCost')
                .populate('shotblasting', 'perCost')
                .populate('painting', 'perCost')
                .then(onGoingData => {
                    onGoingData.forEach(val => {
                        console.log('result',val);
                        /* painting percost value setting */
                        var paintingPerCost;
                        if (onGoingData.painting == undefined) {

                            paintingPerCost = 0.0;
                        } else {

                            paintingPerCost = val.painting.perCost;

                        }

                        /* each process individual cost calculation  */
                        var coreMakingCost=(Number(val.coremaking.perCost) * Number(val.quantity)).toFixed(2);
                        var mouldingCost = (Number(val.moulding.perCost) * Number(val.quantity)).toFixed(2);
                        var meltingCost = (Number(val.melting.perCost) * Number(val.meltWeight)).toFixed(2);
                        var fettlingCost = (Number(val.fettling.perCost) * Number(val.quantity)).toFixed(2);
                        var shotBlastingCost = (Number(val.shotblasting.perCost) * Number(val.quantity)).toFixed(2);
                        var paintingCost = (Number(paintingPerCost) * Number(val.quantity)).toFixed(2);
                        var RawMaterialCost;
                        /*    raw material total cost calculation function */
                        raw_material_consumption_cost_calculation(meltNo)
                            .then(result => {
                                RawMaterialCost = (Number(result) / Number(val.meltWeight)).toFixed(2);
                                /* total cost of all process*/
                                var totalCost = (Number(coreMakingCost)+Number(mouldingCost) + Number(meltingCost)  + Number(fettlingCost) + Number(shotBlastingCost) + Number(paintingCost) + Number(RawMaterialCost)).toFixed(2);

                                /* overall cost calculation save method*/
                                over_all_cost_save(req, res, val, meltNo,heatCode,coreMakingCost, mouldingCost, meltingCost, shotBlastingCost, fettlingCost, RawMaterialCost, paintingCost, totalCost);
                                res.status(200).json({
                                    "message": "success"
                                });


                            });

                    });
                })


        });



}

/* overall cost calculation save method*/
async function over_all_cost_save(req, res, val, meltNo, heatCode,coreMakingCost,mouldingCost, meltingCost, shotBlastingCost, fettlingCost, RawMaterialCost, paintingCost, totalCost) {

    const overAllCostCalculation = new OverAllCostCalculation({
        _id: new mongoose.Types.ObjectId(),
        orderId: val.orderId,
        batchId: val.batchId,
        partId: val.partId,
        customerName:val.customerName,
        meltNo: meltNo,
        heatCode:heatCode,
        RawMaterialCost: RawMaterialCost,
        coreMakingCost:coreMakingCost,
        mouldingCost: mouldingCost,
        meltingCost: meltingCost,
        shotBlastingCost: shotBlastingCost,
        fettlingCost: fettlingCost,
        paintingCost: paintingCost,
        quantity: val.quantity,
        totalMeltWeight: val.meltWeight,
        totalCost: totalCost
    });

    overAllCostCalculation.save()
        .then(result => {
            console.log('Result', result);
        });
       


}

/* total cost getting rawmaterial */
async function raw_material_consumption_cost_calculation(meltNo) {
    var totalCost;
    /* finding the sum of cost  of rawmaterial and consumption */
    await RawMaterial.aggregate([
        {

            $match:
                { meltNo: meltNo }
        },
        {

            $group:
                {
                    _id: null,
                    totalCost: { $sum: "$totalCost" },

                }
        }
    ])
        .exec()
        .then(result => {


            result.forEach(element => {
                totalCost = element.totalCost;
            });
            return totalCost;


        });
    return totalCost;
}

/*  cost calculation save */
exports.cost_calculation_save=(req,res,next)=>{
     /* import Date and Time */
     const dt = dateTime.create();
     const date = dt.format('Y-m-d H:M:S');
    /* getting data from overAllcost calculation */
    OverAllCostCalculation.findOne({$and:[{'batchId':req.params.batchId},{'orderId':req.params.orderId}]})
        .exec()
        .then(result=>{
            /* count the record in a collection*/
            CostCalculation.countDocuments()
            .then(result1=>{
                 var i=Number(result1)+Number(01);
                const month=date.substring(5,7);
                const year=date.substring(2,4);

                /* cost calculation save */
                const costCalculation=new CostCalculation({
                    _id: new mongoose.Types.ObjectId(),
                    customerName: result.customerName,
                    orderId:result.orderId,
                    partId:result.partId,
                    meltNo:result.meltNo,
                    heatCode:result.heatCode,
                    quantity:result.quantity,
                    totalCost:result.totalCost,
                    totalWeight:result.meltWeight,
                    perKgCost:(Number(result.totalCost)/Number(result.totalMeltWeight)).toFixed(2),
                    individualPartWeight:(Number(result.totalMeltWeight)/Number(result.quantity)).toFixed(2),
                    invoiceNo:month+year+0+i,
                    status:'Unpaid'
                });
                costCalculation.save()
               . then(costResult=>{
                    res.status(200).json(costResult);
                })
                .catch(err=>{
                    res.status(err).json({
                        'message':err
                    });
                });

            })
        })
        .catch(err=>{
            res.status(err).json({
                'message':err
            });
        });

}
