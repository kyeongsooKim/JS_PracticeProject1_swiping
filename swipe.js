var centralIdx = 1; // indicite which page is on central position
var intro_pages = document.getElementsByClassName('intro_page');
var lp = intro_pages[centralIdx-1]; //left position when it comes to swiping
var cp = intro_pages[centralIdx]; //page where user would touch
var rp = intro_pages[centralIdx+1]; //right position when it comes to swiping

var startingX;
var startingTime;

var threshold1 = screen.width * 0.05;
var threshold2 = screen.width * 0.45;


function handleTouchStart(evt) {
	lp.style.transition = '';
	cp.style.transition = '';
	if (centralIdx < 5){ //except last page (id : p5) is on center position
		rp.style.transition = '';
	}
	startingX = evt.touches[0].clientX;
	startingTime = Date.now();
};

function handleTouchMove(evt) {
	
	var change = startingX - evt.touches[0].clientX;

	//swipe to the right
	
	if ((change > 0) && (centralIdx != 5))//last page (id : p5) cannot move to the right
	{

		cp.style.left = '-' + change + 'px';
		rp.style.left = (screen.width - change) + 'px';
	}
	else if (change < 0 ) //swipe to the left
	{
		change = Math.abs(change);
		if (centralIdx == 1 && change > 30) // show dummy page only a little bit
		{
			lp.style.left = (30 - screen.width) + 'px';
			cp.style.left =  30 + 'px';
		}
		else{
			lp.style.left = (change - screen.width) + 'px';
			cp.style.left =  change + 'px';
		}
		
	}
	else { //no swiping
	}

	evt.preventDefault();
};

function handleTouchEnd(evt){
	var swipeDistance = startingX - evt.changedTouches[0].clientX;
	var swipeSpeedX = Date.now() - startingTime;
	
	//if user swipes too little or too slow, screen won't move
	if (swipeDistance > 0 ){ //swipe to the right
		
		if (centralIdx == 5) //last page (id : p5) cannot move to the right
		{
			console.log("last page cannot move to the right");
			return;
		}

		if ((swipeSpeedX < 200 && swipeDistance > threshold1)
			||(swipeDistance > threshold2 ) ) //swipe success
		{
			

			cp.style.transition = 'all .2s';
			rp.style.transition = 'all .2s';
			switch(centralIdx){
				case 1: p2ToCenter(); break;
				case 2: p3ToCenter(); break;
				case 3: p4ToCenter(); break;
				case 4: p5ToCenter();
			}
			centralIdx++;
			lp = intro_pages[centralIdx-1];
			cp = intro_pages[centralIdx];
			rp = intro_pages[centralIdx+1];
			console.log("swipe to the right");
		
		}
		else { //swipe fail
			cp.style.transition = 'all .3s';
			rp.style.transition = 'all .3s';
			switch(centralIdx){
				case 1: p1ToCenter(); break;
				case 2: p2ToCenter(); break;
				case 3: p3ToCenter(); break;
				case 4: p4ToCenter();
			}

			console.log("no swiping");
	
		}
	}
	else //swipe to the left
	{
		swipeDistance = Math.abs(swipeDistance);
		if ((swipeSpeedX < 200 && swipeDistance > threshold1)
			||(swipeDistance > threshold2 ) ) //swipe success
		{
			lp.style.transition = 'all .2s';
			cp.style.transition = 'all .2s';

			switch(centralIdx){
				case 1: p1ToCenter(); break;
				case 2: p1ToCenter(); break;
				case 3: p2ToCenter(); break;
				case 4: p3ToCenter(); break;
				case 5: p4ToCenter();
			}

			if (centralIdx == 1) 
			{
				console.log("fisrt page never move to the left");
				return;
			}
			centralIdx--;
			
			lp = intro_pages[centralIdx-1];
			cp = intro_pages[centralIdx];
			rp = intro_pages[centralIdx+1];
			
			console.log("swipe to the left");
		}
		else { //swipe fail
			
			lp.style.transition = 'all .3s';
			cp.style.transition = 'all .3s';
			switch(centralIdx){
				case 1: p1ToCenter(); break;
				case 2: p2ToCenter(); break;
				case 3: p3ToCenter(); break;
				case 4: p4ToCenter(); break;
				case 5: p5ToCenter();
			}
			
			console.log("no swiping");
		}
	}
};

function p1ToCenter(){
	intro_pages[0].style.left = '-100%';
	intro_pages[1].style.left = '0';
	intro_pages[2].style.left = '100%';
	intro_pages[3].style.left = '200%';
	intro_pages[4].style.left = '300%';
	intro_pages[5].style.left = '400%';
};

function p2ToCenter(){
	intro_pages[0].style.left = '-200%';
	intro_pages[1].style.left = '-100%';
	intro_pages[2].style.left = '0';
	intro_pages[3].style.left = '100%';
	intro_pages[4].style.left = '200%';
	intro_pages[5].style.left = '300%';
};

function p3ToCenter(){
	intro_pages[0].style.left = '-300%';
	intro_pages[1].style.left = '-200%';
	intro_pages[2].style.left = '-100%';
	intro_pages[3].style.left = '0';
	intro_pages[4].style.left = '100%';
	intro_pages[5].style.left = '200%';
};

function p4ToCenter(){
	intro_pages[0].style.left = '-400%';
	intro_pages[1].style.left = '-300%';
	intro_pages[2].style.left = '-200%';
	intro_pages[3].style.left = '-100%';
	intro_pages[4].style.left = '0';
	intro_pages[5].style.left = '100%';
};


function p5ToCenter(){
	intro_pages[0].style.left = '-500%';
	intro_pages[1].style.left = '-400%';
	intro_pages[2].style.left = '-300%';
	intro_pages[3].style.left = '-200%';
	intro_pages[4].style.left = '-100%';
	intro_pages[5].style.left = '0';
};

