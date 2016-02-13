window.onload = function() {

	//BUILD OUR TIMER OBJECT
	var Timer = function(){

		var vm = this;

		//Public Functions
		vm.stopTime = stopTime;
		vm.startTime = startTime;
		vm.resetTime = resetTime;
		vm.adjustTime = adjustTime;

		var timeObj = {
			min : 25, //default to match dropdown
			brk : 5,
			inBreak : false,
			count : 25 //default to match dropdown
		}

		var myInterval;//variable for our timer

		var breakAlarm = new Audio('../media/rooster.mp3');
		var workAlarm = new Audio('../media/alarm-clock.mp3');

		breakAlarm.addEventListener('ended', function() {
		    this.currentTime = 0;
		    this.play();
		}, false);
		workAlarm.addEventListener('ended', function(){
			this.currentTime = 0;
			this.play();
		}, false);


			//myInterval : window.setInterval(myCallback, 500);
			function stopTime(){
				clearInterval(myInterval);
			};

			function resetTime(){

				breakAlarm.pause();
				workAlarm.pause();
				stopTime();
				timeObj.count = 0;
				button.innerText = 'Click To Start';

				var timeArr = timeOpt.value.split(',');
				if(timeArr)
				{
					timeObj.min = timeArr[0];
					timeObj.brk = timeArr[1];
					timeObj.inBreak = false;
					timeObj.count = timeArr[0];
				}
				button.disabled = false;
				minute.innerText = timeObj.count;

			};
			
			function startTime(){//Clock operation functions
				button.disabled = true;
				breakAlarm.pause();
				workAlarm.pause();
				myInterval = setInterval(adjustTime, 1000*60);
			};

			function adjustTime(){

				timeObj.count -= 1;

				if(timeObj.count <= 0)
				{
					button.disabled = false;
					if(timeObj.inBreak){
						stopTime();
						timeObj.inBreak = false; //change our break state
						workAlarm.play();//sound our alarm
						button.innerText = 'GET BACK TO WORK';
						timeObj.count = timeObj.min;
					} else {
						stopTime();
						timeObj.inBreak = true; //change our break state
						breakAlarm.play();//sound our alarm again
						button.innerText = 'GO ON BREAK';
						timeObj.count = timeObj.brk; 
					}
				}

				minute.innerText = timeObj.count;
			};

			

			return vm;
	}//End timer constructor



	//Make a new instance of our timer object
	var curTimer = new Timer();

	// setup all our eventlisteners here....
	// button onclick is inline and therefore not allowed in
	// chrome extensions or popups.
	document.getElementById('button').addEventListener('click', function(){
    	curTimer.startTime();
    });
    document.getElementById('timeOpt').addEventListener('change', function(event){
    	curTimer.resetTime();
    });
    document.getElementById('reset').addEventListener('click', function(event){
    	//curTimer.stopTime();
    	curTimer.resetTime();
    });
    document.getElementById('quit').addEventListener('click', function(event){
    	window.close();
    });
  

   	//Link actions
    var pomodoro = document.getElementById('pomodoro'); 
    pomodoro.addEventListener('click', function() {
    	console.log("WORKING");
          window.open('http://pomodorotechnique.com/');
    });

    var me = document.getElementById('me'); 
    me.addEventListener('click', function() {
          window.open('http://www.jeremyroelfs.com/?p=118')
    });

    var galvanize = document.getElementById('galvanize'); 
    galvanize.addEventListener('click', function() {
          window.open('http://www.galvanize.com/')
    });

     //-------SYNTAX FOR LINKS----------
    // chrome.browserAction.onClicked.addListener(function() {
    // 	chrome.tabs.create
    // 	(
    // 		//Pass in an object to create method
    // 		{
    // 			'url': "http://www.your-link-goes-here.com"
    // 		}
    // 	);
    // });


}();//END window onload


/* END OF FILE */