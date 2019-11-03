console.log('This is java script file')




const weather = document.querySelector('form')
const dat = document.querySelector('input')
const first=  document.querySelector('#first')
const second = document.querySelector('#second')

 weather.addEventListener('submit',(e)=>{
     e.preventDefault()
     const location = dat.value
     fetch('/data?search='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                second.textContent=data.error
            }
            else{
                second.textContent=data.place
                first.textContent=data.forecast
                // console.log(data.place)
                // console.log(data.forecast)
            }
      
    })

})
     
     
     console.log(location)
 })