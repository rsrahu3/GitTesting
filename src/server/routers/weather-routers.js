const weatherModel = require("../model/weather-model")
const express = require("express");
const router = new express.Router()

const medianResult = arr => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  }

let getAggregatedData = (result)=>{
    
        let max = 0,min = 0,sum = 0,avg = 0 ,median,length=0,arr = [];
        
       // min = result.sort({temp : 1}).limit(1);
        length  = result.length;
        let temperature = 0;
        min = result[0].temp;
        for(let i=0;i<length;i++){
            temperature = result[i].temp;
            sum+= temperature;
            arr.push(temperature);
            if(temperature>max){
                max = temperature;
            }
            if(temperature<min){
                min = temperature;
            }
        }
        avg = sum/result.length;
        median = medianResult(arr);

       return aggregatedDate = {'avg':avg,'max':max,'min':min,'median':median};

};

router.post("/save",async(req,res)=>{
    const data = new weatherModel(req.body);
    try{
        await data.save();
        const result = await weatherModel.find({});
        res.status(200).send({result,'aggregatedData':getAggregatedData(result)});
    }
    catch(e){
        res.status(400).send(e);
    }
});

router.get("/getData", async(req,res)=>{
    try{
        const result = await weatherModel.find({});
        res.status(200).send({result,'aggregatedData':getAggregatedData(result)});
    }
    catch(e){
        res.status(400).send(e);
    }
});

router.delete("/deleteRecord/:id", async(req,res)=>{
    try{
        const deletedRecord = await weatherModel.findByIdAndDelete(req.params.id);
        const result = await weatherModel.find({});
        res.status(200).send({result,'aggregatedData':getAggregatedData(result)});
    }
    catch(e){
        res.status(400).send(e);
    }
})


module.exports = router