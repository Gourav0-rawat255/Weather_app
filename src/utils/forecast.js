const request = require('request')


const forecast = (latitude, langitude , callback)=>{

    const url = 'https://api.darksky.net/forecast/fbf809ba71309a97f15ad660434d6280/'+ latitude+','+ langitude

    request({url :url , json :true},(error, {body})=>{

        if(error){
            callback('Unable to connect weather service',undefined)
        }    
        else if(body.error){
            callback('unable to find service',undefined)


        }else{
            callback((undefined),'Weather is '+body.hourly.data[0].summary + '.The temperature is '+ body.hourly.data[0].temperature+'°F. There is %'+body.hourly.data[0].precipProbability+ ' of raining')

        }


    })

}

module.exports= forecast