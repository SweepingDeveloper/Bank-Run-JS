//For audio files:
/*
var audio = new Audio('audio.mp3');
audio.play();

*/

//------------
//System Vars
//------------
var stage = document.getElementById('gameCanvas');
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
ctx.fillStyle = "black";
ctx.font = GAME_FONTS;

//var gameloop = setInterval(update, FRAMERATE);
var counter = 0;
var lightnum = [0,0,0,0,0,0,0];
var lightshow = 0;
var boxvalue = [[100,100,100,100,100,100,100],[100,100,100,100,100,100,100]];
var boxsum = [700,700];
var boxstate = [0,0,0,0,0,0,0];
var boxstatesum = 0;
var boxvaluestring = '';
var prizebox = [0,0];
var score = [0,0];
var round = 1;
var supercounter = 0;
var turn = 0;
var guessturn = 0;
var podium_value = 0;
var game_alert = 0;
var cpu = [1,1];
var cpu_box = 0;
var cpu_amount = 0;
var cpu_strat_pick = Math.floor(Math.random()*3);		//CPU picks a random strategy.


var mouseX = 0;
var mouseY = 0;
var mouseflag = 0;

//-----------------
	//Browser Detection
	//-----------------
	navigator.sayswho= (function(){
		var N= navigator.appName, ua= navigator.userAgent, tem;
		var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
		M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];

		return M;
	})();

	var browser;
	if (navigator.sayswho[0] == "Firefox")
		browser="f";
	else if (navigator.sayswho[0] == "Chrome")
		browser="c";
	else if (navigator.sayswho[0] == "Safari")
		browser="s";
	else  if (navigator.sayswho[0] == "Microsoft")
		browser="m";
	else
		browser="f";


//---------------
//Preloading ...
//---------------
var gameImage = new Image();
gameImage.onload = setInterval(mainloop, FRAMERATE);
gameImage.src = IMAGE_PATH;


var gameLogo = new Image();
gameLogo.src = LOGO_PATH;



//------------
//Game Loop
//------------


function mainloop()
{
				if (counter % 100 == 0) {console.log('Game Alert mode: '+game_alert)};

	// Turn   Guessturn  Podium 0 Value   CPU 00 01 10 11
	//  0         0           L turn*2+guessturn
	//  0         1           R turn*2+guessturn
	//  1         0           R  turn*2+guessturn
	//  1         1           L turn*2+guessturn
	
	// Is CPU?
    // Podium Value 0:  check CPU[0]
	// Podium Value 1:  check CPU[1]
	// Podium Value 2:  check CPU[1]
	// Podium Value 3:  check CPU[0][]
	
	
	     if (turn == 0 && guessturn == 0)	{podium_value = 0;}		
	else if (turn == 0 && guessturn == 1)   {podium_value = 1;}
	else if (turn == 1 && guessturn == 0)   {podium_value = 1;}
	else                                    {podium_value = 0;}

		
	
	stage.addEventListener("mousedown", mouseDown, false);
	stage.addEventListener("mouseup", mouseUp, false);
	
	
	var numtouse = 0;
	ctx.fillStyle = "#000000";
	
	var grad = ctx.createLinearGradient(0,0,0,479);
	
	for (var a = 0; a <= 9; a++)
	{
		grad.addColorStop(GRADIENT_STOPS[a], GRADIENT_VALUES_BACK[round-1][a]);
	}
	ctx.fillStyle = grad;
	ctx.fillRect(0,0,stage.width,stage.height);

	var grad = ctx.createLinearGradient(0,0,0,479);
	
	for (var a = 0; a <= 9; a++)
	{
		grad.addColorStop(GRADIENT_STOPS[a], GRADIENT_VALUES_FRONT[round-1][a]);
	}
	ctx.fillStyle = grad;
	if (turn == 0) {ctx.fillRect(0,0,stage.width/2,stage.height);}
	if (turn == 1) {ctx.fillRect(stage.width/2,0,stage.width/2,stage.height);}

	/*
	if (round == 1)	
	{
		ctx.fillStyle = "#000080";
	}
		
	if (round == 2) 
	{
		ctx.fillStyle = "#800000";
	}
	if (round == 3) 
	{
		ctx.fillStyle = "#800080";
	}
	*/
	
	
	//Draw Boxes and Numbers
	
	

	for (var a = 0; a <= 6; a++)
	{
		if (round < 4)
		{
			ctx.drawImage(gameImage,VAULT_COORDS_X[boxstate[a]], VAULT_COORDS_Y[boxstate[a]],VAULT_DIM_X, VAULT_DIM_Y, VAULT_PLACE_X[a], VAULT_PLACE_Y[a], VAULT_DIM_X, VAULT_DIM_Y);
			if (cpu[podium_value] == 1 && guessturn == 0)
			{
				boxvaluestring = '???';
			}
			else
			{
				boxvaluestring = NumberString(boxvalue[guessturn][a]);
			}
		}
		if (round == 4)
		{
			ctx.drawImage(gameImage,VAULT_COORDS_X[7+lightshow], VAULT_COORDS_Y[7+lightshow],VAULT_DIM_X, VAULT_DIM_Y, VAULT_PLACE_X[a], VAULT_PLACE_Y[a], VAULT_DIM_X, VAULT_DIM_Y);
			if (counter % 10 == a) {boxvalue[guessturn][a] = Math.floor(Math.random()*1000)}
			boxvaluestring = NumberString(boxvalue[guessturn][a]);
		}
		
		for (var b = 0; b <= 2; b++)
		{
			if (boxvaluestring.substring(b,b+1) == '.')
			{numtouse = 10;}
			else if (boxvaluestring.substring(b,b+1) == '?')
			{numtouse = 11;}
			else
			{numtouse = parseInt(boxvaluestring.substring(b,b+1));}
			ctx.drawImage(gameImage,NUMBER_COORDS_X[numtouse],NUMBER_COORDS_Y[numtouse],NUMBER_DIM_X, NUMBER_DIM_Y, VAULT_PLACE_X[a]+NUMBER_REL_X[b], VAULT_PLACE_Y[a]+NUMBER_REL_Y[b], NUMBER_DIM_X, NUMBER_DIM_Y);				
		}

	}
	
	
	//Draw Info
	ctx.font = '12px Arial';
	ctx.fillStyle = '#FFFF00';
	//ctx.fillText(counter,8,64);
	ctx.font = '20px Arial';
	ctx.fillStyle = '#FFFFFF';
	
	//if (round < 4)
	if (round < 4 && turn == 0)
	{
		ctx.fillStyle = "#000000";
		ctx.fillText('Placer',10,34);
		ctx.fillText('Collector',502,34);
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText('Placer',8,32);
		ctx.fillText('Collector',500,32);
	}
	if (round < 4 && turn == 1)
	{
		ctx.fillStyle = "#000000";
		ctx.fillText('Collector',10,34);
		ctx.fillText('Placer',502,34);
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText('Collector',8,32);
		ctx.fillText('Placer',500,32);
	}
		
	boxsum[guessturn] = 0;
	for (var a = 0; a<= 6; a++) { boxsum[guessturn] += boxvalue[guessturn][a]; }

	
	if (round < 4 && guessturn == 0 && game_alert > 0)
	{
		ctx.fillStyle = '#000000';
		ctx.fillText('You have $'+(ROUND_MAX[round-1]-boxsum[guessturn])+ ' left to place.',194,34);
		ctx.fillStyle = '#FFFFFF';
		ctx.fillText('You have $'+(ROUND_MAX[round-1]-boxsum[guessturn])+ ' left to place.',192,32);
		
	}

	
	ctx.fillText(mouseX + " " + mouseY, 100,100);
	
	
	if (turn + guessturn == 0 || turn + guessturn == 2)
	{
		ctx.drawImage(gameImage, PODIUM_COORDS_X[1],PODIUM_COORDS_Y[1],PODIUM_DIM_X, PODIUM_DIM_Y,PODIUM_PLACE_X[0], PODIUM_PLACE_Y[0], PODIUM_DIM_X,PODIUM_DIM_Y);
		ctx.drawImage(gameImage, PODIUM_COORDS_X[0],PODIUM_COORDS_Y[0],PODIUM_DIM_X, PODIUM_DIM_Y,PODIUM_PLACE_X[1], PODIUM_PLACE_Y[1], PODIUM_DIM_X,PODIUM_DIM_Y);		
	}
	else
	{
		ctx.drawImage(gameImage, PODIUM_COORDS_X[0],PODIUM_COORDS_Y[0],PODIUM_DIM_X, PODIUM_DIM_Y,PODIUM_PLACE_X[0], PODIUM_PLACE_Y[0], PODIUM_DIM_X,PODIUM_DIM_Y);
		ctx.drawImage(gameImage, PODIUM_COORDS_X[1],PODIUM_COORDS_Y[1],PODIUM_DIM_X, PODIUM_DIM_Y,PODIUM_PLACE_X[1], PODIUM_PLACE_Y[1], PODIUM_DIM_X,PODIUM_DIM_Y);				
	}
	if (round == 4)
	{
		ctx.drawImage(gameImage, PODIUM_COORDS_X[0],PODIUM_COORDS_Y[0],PODIUM_DIM_X, PODIUM_DIM_Y,PODIUM_PLACE_X[0], PODIUM_PLACE_Y[0], PODIUM_DIM_X,PODIUM_DIM_Y);
		ctx.drawImage(gameImage, PODIUM_COORDS_X[0],PODIUM_COORDS_Y[0],PODIUM_DIM_X, PODIUM_DIM_Y,PODIUM_PLACE_X[1], PODIUM_PLACE_Y[1], PODIUM_DIM_X,PODIUM_DIM_Y);				
		
	}
	
		
	ctx.drawImage(gameImage, BADGE_COORDS_X[cpu[0]*2], BADGE_COORDS_Y[cpu[0]*2], BADGE_DIM_X, BADGE_DIM_Y, PODIUM_PLACE_X[0]+BADGE_REL_X, PODIUM_PLACE_Y[0]+BADGE_REL_Y, BADGE_DIM_X*2, BADGE_DIM_Y*2);
	ctx.drawImage(gameImage, BADGE_COORDS_X[cpu[1]*2+1], BADGE_COORDS_Y[cpu[1]*2+1], BADGE_DIM_X, BADGE_DIM_Y, PODIUM_PLACE_X[1]+BADGE_REL_X, PODIUM_PLACE_Y[1]+BADGE_REL_Y, BADGE_DIM_X*2, BADGE_DIM_Y*2);
	
	for (a = 0; a <= 1; a++)
	{
		//if (counter == 0) {console.log(score[a]);}
		var scorestring = NumberString2(score[a]);
		
		//if (counter == 0) {console.log(score[a]);}
		for (b = 0; b <= 3; b++)
		{
			if (scorestring.substring(b,b+1) == '.')
			{
				ctx.drawImage(gameImage, EC_NUMBER_COORDS_X[10]
									   , EC_NUMBER_COORDS_Y[10]
									   , EC_NUMBER_DIM_X
									   , EC_NUMBER_DIM_Y
									   , PODIUM_PLACE_X[a]+EC_NUMBER_REL_X[b]
									   , PODIUM_PLACE_Y[a]+EC_NUMBER_REL_Y[b]
									   , EC_NUMBER_DIM_X
									   , EC_NUMBER_DIM_Y);
				
			}
			else
			{
				ctx.drawImage(gameImage, EC_NUMBER_COORDS_X[parseInt(scorestring.substring(b,b+1))]
									   , EC_NUMBER_COORDS_Y[parseInt(scorestring.substring(b,b+1))]
									   , EC_NUMBER_DIM_X
									   , EC_NUMBER_DIM_Y
									   , PODIUM_PLACE_X[a]+EC_NUMBER_REL_X[b]
									   , PODIUM_PLACE_Y[a]+EC_NUMBER_REL_Y[b]
									   , EC_NUMBER_DIM_X
									   , EC_NUMBER_DIM_Y);
				
			}
			
				
		
			//console.log(parseInt(scorestring.substring(b,b+1)));
		}
	}
	
	
	
	/*
	
	GAME ALERTS
	
	*/
	
	if (game_alert % 2 == 0)
	{
		
		var grad = ctx.createLinearGradient(0,0,0,479);
		grad.addColorStop(0,"#005F17");
		grad.addColorStop(1,"#27AE60");
		ctx.fillStyle = grad;
		//ctx.fillStyle = "#008000";
		ctx.fillRect(32,32,stage.width-64, stage.height-64);
		ctx.strokeStyle="#FFFF00";
		ctx.rect(32,32,stage.width-64, stage.height-64);
		ctx.stroke();
		
		
		
		for (var a = 0+ (16*game_alert); a <= 15 + (16*game_alert); a++)
		{
			//console.log(game_alert, a);
			ctx.fillStyle = "#000000";
			ctx.fillText(ALERT_TEXT[a], ALERT_ROW_X[a % 16]+2, ALERT_ROW_Y[a % 16]+2);
			ctx.fillStyle = "#FFFFFF";
			ctx.fillText(ALERT_TEXT[a], ALERT_ROW_X[a % 16], ALERT_ROW_Y[a % 16]);
		}
		
		
		if (game_alert == 0)
		{
			
			ctx.drawImage(gameLogo, LOGO_COORD_X, LOGO_COORD_Y, LOGO_DIM_X, LOGO_DIM_Y, LOGO_PLACE_X, LOGO_PLACE_Y,LOGO_DIM_X,LOGO_DIM_Y);
			
			
			
			
			
			
			for (var a = 0; a <= 2; a++)
			{
				
				ctx.drawImage(gameImage, PLAYER_NUMBER_COORDS_X[a]
										   , PLAYER_NUMBER_COORDS_Y[a]
										   , PLAYER_NUMBER_DIM_X
										   , PLAYER_NUMBER_DIM_Y
										   , PLAYER_NUMBER_PLACE_X[a]
										   , PLAYER_NUMBER_PLACE_Y[a]
										   , PLAYER_NUMBER_STRETCH_X
										   , PLAYER_NUMBER_STRETCH_Y);
										   
										   
										   
				var boundx1 = PLAYER_NUMBER_PLACE_X[a] 
				var boundx2 = PLAYER_NUMBER_PLACE_X[a] + PLAYER_NUMBER_STRETCH_X;
				var boundy1 = PLAYER_NUMBER_PLACE_Y[a];
				var boundy2 = PLAYER_NUMBER_PLACE_Y[a] + PLAYER_NUMBER_STRETCH_Y;
				
				if (mouseflag == 1 && mouseX >= boundx1 && mouseX <= boundx2 && mouseY >= boundy1 && mouseY <= boundy2)
				{
					ctx.drawImage(gameImage, PLAYER_NUMBER_COORDS_X[a+3]
											   , PLAYER_NUMBER_COORDS_Y[a+3]
											   , PLAYER_NUMBER_DIM_X
											   , PLAYER_NUMBER_DIM_Y
											   , PLAYER_NUMBER_PLACE_X[a]
											   , PLAYER_NUMBER_PLACE_Y[a]
											   , PLAYER_NUMBER_STRETCH_X
											   , PLAYER_NUMBER_STRETCH_Y);	
					if (a == 0) {cpu[0] = 1; cpu[1] = 1;}
					if (a == 1) {cpu[0] = 0; cpu[1] = 1;}
					if (a == 2) {cpu[0] = 0; cpu[1] = 0;}
					console.log(cpu[0], cpu[1]);
					
				}					
				
				
			}
		}
	}
	
	
	
	
	
	
	
	
	
	if (game_alert == 11) 
		{
			ctx.fillStyle = "#000000";
			ctx.fillText('Game will reset in '+ Math.floor(((1983-supercounter)/FRAMERATE)) + ' seconds.',10,26);
			ctx.fillStyle = "#FFFFFF";
			ctx.fillText('Game will reset in '+ Math.floor(((1983-supercounter)/FRAMERATE)) + ' seconds.',8,24);
		}
	//ctx.fillText('Scores: 0: '+ score[0] + ', 1:' + score[1], 8,464);
	
	boxsum[guessturn] = 0;
	for (var a = 0; a<= 6; a++) { boxsum[guessturn] += boxvalue[guessturn][a]; }
	
	
	//Mouse Down
	if (round < 4 && mouseflag == 1 && game_alert % 2 == 1 && cpu[podium_value] == 0)
	{
		for (var a = 0; a <= 6; a++)
		{
			for (var b = 0; b <= 2; b++)
			{
				var boundx1 = VAULT_PLACE_X[a] + BUTTON_REL_X[b];
				var boundx2 = VAULT_PLACE_X[a] + BUTTON_REL_X[b] + BUTTON_DIM_X[b];
				var boundy1 = VAULT_PLACE_Y[a] + BUTTON_REL_Y[b];
				var boundy2 = VAULT_PLACE_Y[a] + BUTTON_REL_Y[b] + BUTTON_DIM_Y[b];
				
			if (mouseX >= boundx1 && mouseX <= boundx2 && mouseY >= boundy1 && mouseY <= boundy2 && boxstate[a] != 10 && boxstate[a] != 5 && boxstate[a] != 6)
				{
					boxstate[a] = b+1;
				}
			}
		}
		
	}
	
	//If the counter reaches a multiple of ??, and it's the CPU's move...
	if (round < 4 && counter % 100 == 0 && cpu[podium_value] == 1 && guessturn == 0 && game_alert % 2 == 1)
	{



		while (boxsum[guessturn] != ROUND_MAX[round-1])
		{
					boxsum[guessturn] = 0;

			for (var a = 0; a <= 6; a++)
			{
				cpu_amount = (CPU_STRATEGY_MIN[cpu_strat_pick][a + (round-1)*7]
						   + Math.floor(Math.random()*
							 CPU_STRATEGY_MAX[cpu_strat_pick][a + (round-1)*7]
						   - CPU_STRATEGY_MIN[cpu_strat_pick][a + (round-1)*7]
							 )) * INCREMENT[round-1];
				console.log(cpu_amount, boxsum[guessturn], ROUND_MAX[round-1]);
				console.log('The computer is placing.');
				//boxsum[guessturn] = 0;	for (var a = 0; a<= 6; a++) { boxsum[guessturn] += boxvalue[guessturn][a]; }
				if (boxsum[guessturn] + cpu_amount <= ROUND_MAX[round-1])
					{
						console.log('Its less than the max.')
						boxvalue[guessturn][a] = cpu_amount;
						boxstate[a] = 3;
						
						console.log(cpu_amount, boxsum[guessturn], ROUND_MAX[round-1]);
					}
				else
					{
						a = 7;
					}	
			}
			
			/*
			if (boxsum[guessturn] + cpu_amount <= ROUND_MAX[round-1] && ROUND_MAX[round-1] - boxsum[guessturn] <= BOX_MAX[round-1])
			{
					boxvalue[guessturn][6] = ROUND_MAX[round-1] - boxsum[guessturn];
					boxstate[a] = 3;
					console.log('Last one:' + boxvalue[guessturn][6], boxsum[guessturn], ROUND_MAX[round-1]);
			}
			*/
			
			boxsum[guessturn] = 0;	for (var a = 0; a<= 6; a++) { boxsum[guessturn] += boxvalue[guessturn][a]; }
		}
		
	}
	
	
	
	if (round < 4 && counter % 100 == 0 && cpu[podium_value] == 1 && guessturn == 1 && game_alert % 2 == 1)
	{
		cpu_amount = (CPU_STRATEGY_MIN[cpu_strat_pick][cpu_box + (round-1)*7]
             	   + Math.floor(Math.random()*
				     CPU_STRATEGY_MAX[cpu_strat_pick][cpu_box + (round-1)*7]
				   - CPU_STRATEGY_MIN[cpu_strat_pick][cpu_box + (round-1)*7]
				     )) * INCREMENT[round-1];
		console.log(cpu_amount, boxsum[guessturn], ROUND_MAX[round-1]);

		console.log('The computer is collecting.');
			console.log('He guesses $'+ cpu_amount+ '.')
			boxvalue[guessturn][cpu_box] = cpu_amount;
			console.log('The game registers this as $'+ boxvalue[guessturn][cpu_box]+ '.');
			boxstate[cpu_box] = 3;
			cpu_box++;
	}
	
	
	
	
	
	//Mouse Up
	if (round < 4 && mouseflag == 0 && game_alert % 2 == 1)
	{
		for (var a = 0; a <= 6; a++)
		{
			
			if (guessturn == 0 && boxstate[a] == 1 && boxvalue[guessturn][a] < BOX_MAX[round-1] && boxsum[guessturn] < ROUND_MAX[round-1])
			{
				boxvalue[guessturn][a] += INCREMENT[round-1];
				//boxsum[guessturn] += INCREMENT[round-1];
				boxstate[a] = 0;
			}
			else if (guessturn == 1 && boxstate[a] == 1 && boxvalue[guessturn][a] < BOX_MAX[round-1])
			{
				boxvalue[guessturn][a] += INCREMENT[round-1];
				boxstate[a] = 0;
			}
			else if (boxstate[a] == 2 && boxvalue[guessturn][a] > 0)
			{
				boxvalue[guessturn][a] -= INCREMENT[round-1];
				//if (guessturn == 0) {boxsum[guessturn] -= INCREMENT[round-1];}
				boxstate[a] = 0;
			}
			else if (boxstate[a] == 3 && guessturn == 0)
			{
				DING.play();
				boxstate[a] = 10;
				boxstatesum = 0;
				for (var b = 0; b <= 6; b++)  {if (boxstate[b] >= 5) {boxstatesum++;};}
				console.log('Boxstatesum = '+boxstatesum);
				if (boxstatesum == 7)
				{
					boxsum[guessturn] = 0;
					for (var a = 0; a<= 6; a++) { boxsum[guessturn] += boxvalue[guessturn][a]; }
					console.log('Boxsum[guessturn] = '+ boxsum[guessturn]);
					console.log('ROUND_MAX[round-1] = '+ ROUND_MAX[round-1]);
					if (boxsum[guessturn] != ROUND_MAX[round-1])
					{
						cpu_box = 0;
						setTimeout(vaultBlink1,250);
					}
					else
					{
						setTimeout(function()
						{
							for (var c = 0; c <= 6; c++) 
							{
								boxstate[c] = 0; 
							}
								guessturn++;
								cpu_box = 0;
								cpu_strat_pick = Math.floor(Math.random()*3);		//CPU picks a random strategy.
								if (guessturn == 2) 
								{
										if (round == 1) {boxvalue = [[100,100,100,100,100,100,100],[100,100,100,100,100,100,100]];  }
										if (round == 2) {boxvalue = [[150,150,150,150,150,150,150],[150,150,150,150,150,150,150]]; }
										if (round == 3) {boxvalue = [[200,200,200,200,200,200,200],[200,200,200,200,200,200,200]]; }
									
									guessturn = 0; 
									turn = 1-turn; 
									if (turn == 0) 
									{
										round++;
										if (round == 1) {boxvalue = [[100,100,100,100,100,100,100],[100,100,100,100,100,100,100]];  }
										if (round == 2) {boxvalue = [[150,150,150,150,150,150,150],[150,150,150,150,150,150,150]]; }
										if (round == 3) {boxvalue = [[200,200,200,200,200,200,200],[200,200,200,200,200,200,200]]; }
									}
								}
							if (round == 1 && guessturn == 1 && turn == 0) {game_alert++;}						
						},2000);
					}
					
				}
				
			}
			else if (boxstate[a] == 3 && guessturn == 1)
			{
			
				
					
					//setTimeout(function()
					//{
						if (boxvalue[guessturn][a] <= boxvalue[1-guessturn][a])
						{
							CORRECT.play();
							boxstate[a] = 5;
							score[1-turn] += boxvalue[guessturn][a];
						}
						
						else if (boxvalue[guessturn][a] > boxvalue[1-guessturn][a])
						{
							WRONG.play();
							boxstate[a] = 6;
							score[turn] += boxvalue[1-guessturn][a];
							boxvalue[guessturn][a] = boxvalue[1-guessturn][a];
						}
					//},1000);
				
				
				boxstatesum = 0;
				for (var b = 0; b <= 6; b++)  {if (boxstate[b] >= 5) {boxstatesum++;};}
				console.log(boxstatesum);
				if (boxstatesum == 7)
				{
					setTimeout(function()
					{
						for (var c = 0; c <= 6; c++) 
						{
							boxstate[c] = 0; 
						}
							guessturn++;
							cpu_strat_pick = Math.floor(Math.random()*3);		//CPU picks a random strategy.
							if (guessturn == 2) 
							{
										if (round == 1) {boxvalue = [[100,100,100,100,100,100,100],[100,100,100,100,100,100,100]]; }
										if (round == 2) {boxvalue = [[150,150,150,150,150,150,150],[150,150,150,150,150,150,150]]; }
										if (round == 3) {boxvalue = [[200,200,200,200,200,200,200],[200,200,200,200,200,200,200]]; }
								
								guessturn = 0; 
								turn = 1-turn;
							
								if (turn == 0) 
								{
									COMMERCIAL.play();
									game_alert++;
									round++;
									if (round == 1) {boxvalue = [[100,100,100,100,100,100,100],[100,100,100,100,100,100,100]]; }
									if (round == 2) {boxvalue = [[150,150,150,150,150,150,150],[150,150,150,150,150,150,150]]; }
									if (round == 3) {boxvalue = [[200,200,200,200,200,200,200],[200,200,200,200,200,200,200]]; }
								}
							}
						
					},2000);
					
					
				}
				
			}
			
		}
		
		
	}

	counter++;
	if (game_alert > 10) {supercounter++;}
	
	if (supercounter >= 1980)
	{
		supercounter = 0;
		counter = 0;
		lightnum = [0,0,0,0,0,0,0];
		lightshow = 0;
		boxvalue = [[100,100,100,100,100,100,100],[100,100,100,100,100,100,100]];
		boxsum = [700,700];
		boxstate = [0,0,0,0,0,0,0];
		boxstatesum = 0;
		boxvaluestring = '';
		prizebox = [0,0];
		score = [0,0];
		round = 1;
		supercounter = 0;
		turn = 0;
		guessturn = 0;
		podium_value = 0;
		game_alert = 0;
		cpu = [1,1];
		cpu_box = 0;
		cpu_amount = 0;
		cpu_strat_pick = Math.floor(Math.random()*3);		//CPU picks a random strategy.


	}
	
	
	if (counter % 5 == 0)
	{
	if (counter == 100) {counter = 0;}
		lightshow++;
		if (lightshow == 3)
		{
			lightshow = 0;
		}
	}
}

function NumberString(n)
{
	if (n >= 0 && n <= 9)
	{
		return '..'+ n.toString();
	}
	else if (n >= 10 && n <= 99)
	{
		return '.'+ n.toString();
	}
	else
	{
		return n.toString();
	}
}
function NumberString2(n)
{
	if (n >= 0 && n <= 9)
	{
		return '...'+ n.toString();
	}
	else if (n >= 10 && n <= 99)
	{
		return '..'+ n.toString();
	}
	else if (n >= 100 && n <= 999)
	{
		return '.' + n.toString();
	}
	else		
	{
		return n.toString();
	}
	
}

function mouseDown(event)
{
	if (mouseflag == 0) {mouseflag = 1;}

	if (browser == "f" || browser == "m")
	{
	mouseX = event.clientX - stage.offsetLeft + document.documentElement.scrollLeft;
	mouseY = event.clientY - stage.offsetTop + document.documentElement.scrollTop;
	}
	else //"s" or "c"
	{
	mouseX = event.clientX - stage.offsetLeft + document.body.scrollLeft;
	mouseY = event.clientY - stage.offsetTop + document.body.scrollTop;
	}
		

}

function mouseUp(event)
{	
	if (mouseflag == 1) 
	{
		mouseflag = 0;
		if (game_alert % 2 == 0) 
		{
			game_alert++;
			if (game_alert == 1)
			{
				game_alert++;
				APPLAUSE.play();

			}
				
		}
		
	}
	if (browser == "f" || browser == "m")
	{
	mouseX = event.clientX - stage.offsetLeft + document.documentElement.scrollLeft;
	mouseY = event.clientY - stage.offsetTop + document.documentElement.scrollTop;
	}
	else //"s" or "c"
	{
	mouseX = event.clientX - stage.offsetLeft + document.body.scrollLeft;
	mouseY = event.clientY - stage.offsetTop + document.body.scrollTop;
	}
}	




function vaultBlink1()  
{
	if (cpu[podium_value] == 0)
	{
		WRONG.play(); for (var a = 0; a <= 6; a++) {boxstate[a] = 6;}  setTimeout(vaultBlink2,250);
	}
	else
	{
		for (var a = 0; a <= 6; a++) {boxvalue[guessturn][a] = 0;  boxstate[a] = 0;}
		
		//Leave the computer alone!
	}
}
function vaultBlink2()  {for (var a = 0; a <= 6; a++) {boxstate[a] = 10;} setTimeout(vaultBlink3,250);}
function vaultBlink3()  {for (var a = 0; a <= 6; a++) {boxstate[a] = 6;} setTimeout(vaultBlink4,250);}
function vaultBlink4()  {for (var a = 0; a <= 6; a++) {boxstate[a] = 10;} setTimeout(vaultBlink5,250);}
function vaultBlink5()  {for (var a = 0; a <= 6; a++) {boxstate[a] = 6;} setTimeout(vaultBlink6,250);}
function vaultBlink6()  {for (var a = 0; a <= 6; a++) {boxstate[a] = 10;} setTimeout(vaultBlink7,250); }
function vaultBlink7()  {for (var a = 0; a <= 6; a++) {boxstate[a] = 0;}}




	