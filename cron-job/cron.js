const cron = require("node-cron")

function create_cron_datetime(seconds, minute, hour, day_of_the_month, month, day_of_the_week){

    return seconds + " " + minute + " " + hour + " " + day_of_the_month + " " + month + " " + day_of_the_week;



}

let counter=0;

console.log("The process has started")

let another_job = () =>cron.schedule(
    create_cron_datetime('*/5', '*','*','*','*','*'),
    function(){
        if(counter==5){
            process.exit()
        }


        console.log('its been five seconds')

        counter+=1

    }
)


cron.schedule(
    create_cron_datetime(0, 34, 17, '*', '*', '*'),

  function(){
    another_job();
    console.log('Timer check has begun')
  }

)