console.log("cient js loaded");

function fetchForcast(location, callback){
    fetch(`/weather?address=${location}`).then(res=>{
        //console.log(res);
        res.json().then(data=>{
            // if(data.error){
            //     callback(data);
            // }
           callback(data);
        })
    })
}


const weatherForm= document.querySelector('form')

const Search= document.querySelector('input');
const address=document.querySelector('#address');
const forcast=document.querySelector('#forcast')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    forcast.className='';
    forcast.innerHTML='Loading.....'
    address.innerHTML=''
   fetchForcast(Search.value,(data)=>{
        if(data.error){
            forcast.className='error';
            return  forcast.innerHTML=data.error;
          }
          address.innerHTML=`Address: ${data.address}`
          forcast.innerHTML=`Forcast: ${data.forcast}`
    })
   
//console.log(Search.value);
})