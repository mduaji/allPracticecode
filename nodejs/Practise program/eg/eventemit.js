const event1 = require ("events").EventEmitter;

const eventemit = new event1();

function loopProcesser(num){

    for(let i=1;i<=num;i++){
        setTimeout(()=>{
            eventemit.emit('firstevent',i);
     
        },2000);
    }
}
loopProcesser(10);

eventemit.on('firstevent',function(data){
    console.log('the event is rised'+ data);
});