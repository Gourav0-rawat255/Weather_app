/*................... This is use to acess the path which is core library or inbuilt..................*/



const geodooce = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const path = require('path')



const express  = require('express')

const hbs = require('hbs')
const port =process.env.PORT || 3000




/*...........................................................*/


/*............... __dirname is use to get the directory.............. */

/*.............console.log(__dirname) ...................   */

/* path.join is used to join the file of different directory into this __dirname is use to get the directory */




/*    console.log(path.join(__dirname,'../assets/index.html')) ..............*/




/*...........................................................*/






//Creating the server

const app = express()




/*  ...................Alternative methode......................*/
// path to the directory 
const directory = path.join(__dirname,'../assets')
const viewPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')



/*...................this is acessing the file from the directory................*/
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(directory))










/*...........................................................*/

/*Handle the incoming request
/*and respond to incoming request

*app.get('',(req,res)=>{
*    // res.send('hello express')
*    res.send('<h1>Hello Express</h1>')
})

*/



/*...........................................................*/

/*

app.get('/help',(req,res)=>{
    res.send('<h1>we dont need any help</h1>')

})


*/


/*...........................................................*/

/*

app.get('/about',(req,res)=>{
    res.send('<h1>how about you</h1>')
})


*/



app.get('',(req,res)=>{
    res.render('index',{
      
        title:'WEATHER-APP',
        creator:'Goruav'

    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'HELP',
        info:'We dont need any help',
        creator:'Goruav Rawat'
    })
})


app.get('/about',(req,res)=>{

    res.render('about',{
        title:'ABOUT',
        info:'How you Doin ?',
        creator:'Rawat'
        
    })

})


app.get("/data",(req,res)=>{
       
    if(!req.query.search){
        return res.send({
            error:'not searched anything'
        })

    }
      geodooce(req.query.search, (error,{latitude,langitude,place}={})  =>{
        if(error){
    return res.send({error})
    
        //   return console.log(error)
        }
      
    
      forecast(latitude,langitude, (error, forecastData) => {
          if(error){
    
           return res.send(error)
              
          }
               res.send({
                   
                   place,
                   forecast: forecastData,
                   address: req.query.search
            })
               
         
        })
    
      
    })
    
    // res.send({
//     product:[]
// })

})





/*...........................................................*/

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You havnt search anything'
        })
    }
    console.log(req.query.address)
    res.send({
        data:req.query.address
    })
})




app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Help article not found',
        creator:'Gourav'
    })
})



app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 Error',
        creator:'Gourav'
    })

})


/*...........................................................*/


// ....................Listen to the request


app.listen(port,()=>{
    console.log('server is on 3000 port')
})

