

let time = {
    getRemainder: function(dateEnd){
        this.timeInSec = Math.floor((dateEnd - Date.now())/1000);
    },
    getSeconds: function (){
        this.seconds = this.timeInSec % 60;
        this.timeInSec = this.timeInSec - this.seconds;
    },
    getMins:function (){
        let factor = 60;
        this.min = Math.ceil(this.timeInSec / factor);
    },
    getHours: function (){
        let factor = 24;
        this.hour =  Math.ceil(this.min / factor);
        this.min = this.min % factor;
    },
    getDays: function(timeInSec){
        let factor = 365;
        this.days =  Math.ceil(this.hour / factor);
        this.hour = this.hour % factor;
    },
    getSeparatedTime: function(dateEnd){
        this.getRemainder(dateEnd);
        this.getSeconds();
        this.getMins();
        this.getHours();
        this.getDays();
        return {
            sec: this.seconds,
            min: this.min,
            hour: this.hour,
            day: this.days
        }
    }
}
const dateEnd = new Date('2023-12-20');
let late = time.getRemainder(dateEnd);