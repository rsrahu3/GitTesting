const mongoose = require("mongoose");
const weatherModel = mongoose.model('weather-data',{
    temp:{
        type:'Number',
        required:true,
        validate(value){
            if(value<0){
                throw new Error("Too Much Cold change the condtion");
            }
        }

    },
    date :{
        type:'Date',
        required:true
    }
})
module.exports = weatherModel