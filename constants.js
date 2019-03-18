/*

CONSTANTS FOR:

BANK RUN


Special Thanks to:

www.gaminglogy.com
W3Schools
Stack Overflow
Home and Learn


*/

/*

Coordinates for Vaults (128x128):

0 (Blank): 0,0
1 (Up Lit): 128,0
2 (Down Lit): 256,0
3 (Confirm Lit): 384,0
4 (Confirm Locked): 0,128
5 (Vault Open): 128,128
6 (Vault Closed): 256,128
7 (Lights 1): 384,128
8 (Lights 2): 0,256
9 (Lights 3): 128,256
10 (Alt Confirm): 256,256
11 (Border) :  384,256

Coordinates for Numbers (28x31): 


0: 512,0
1: 540,0
2: 568,0
3: 596,0
4: 624,0
5: 512,31
6: 540,31
7: 568,31
8: 596,31
9: 624,31
.: 512,62

For the numbers, start at (31,13) relative to the vault.
There are three digits for each vault.  Their relative 
coordinates are (31,13), (59,13), and (87,13).

Start Y: 48,176,304
Start X (Rows 1 and 3): 192,320
Start X (Row 2): 128,256,384

For the buttons, here are the coordinates relative to
the vault:

0 (Up Button): 12,52  dimensions are 40x29
1 (Down Button): 12,87  dimensions are 40x29
2 (Confirm Button): 77,64  dimensions are 39x39

*/



var STAGE_WIDTH = 640, 
    STAGE_HEIGHT= 480,
	FRAMERATE   =  33,
	GAME_FONTS  = "bold 20px sans-serif";

var COUNTER_X = 100, COUNTER_Y = 100;

var ROUND_MAX = [1000,1500,2000];
var BOX_MAX = [400,600,800];
var INCREMENT = [10,10,25]
var NUMS = '0123456789.';

var IMAGE_PATH = 'pics/vault.png';
var LOGO_PATH = 'pics/brjs_logo2.png';

var VAULT_COORDS_X = [0,128,256,384,0,128,256,384,0,128,256,384];
var VAULT_COORDS_Y = [0,0,0,0,128,128,128,128,256,256,256,256];
var VAULT_DIM_X = 128;
var VAULT_DIM_Y = 128;
var VAULT_PLACE_X = [192,320,128,256,384,192,320];
var VAULT_PLACE_Y = [48,48,176,176,176,304,304];

var NUMBER_COORDS_X = [512,540,568,596,624,512,540,568,596,624,512,652];
var NUMBER_COORDS_Y = [0,0,0,0,0,31,31,31,31,31,62,31];
var NUMBER_DIM_X = 28;
var NUMBER_DIM_Y = 31;
var NUMBER_REL_X = [31,59,87];
var NUMBER_REL_Y = [13,13,13];



var BUTTON_REL_X = [12,12,77];
var BUTTON_REL_Y = [52,87,64];
var BUTTON_DIM_X = [40,40,39];
var BUTTON_DIM_Y = [29,29,39];

var PODIUM_COORDS_X = [512,512];
var PODIUM_COORDS_Y = [101,256];
var PODIUM_DIM_X = 127;
var PODIUM_DIM_Y = 99;
var PODIUM_PLACE_X = [32,481];
var PODIUM_PLACE_Y = [381,381];

var EC_NUMBER_COORDS_X = [512,534,556,578,600,622,512,534,556,578,600,622];
var EC_NUMBER_COORDS_Y = [200,200,200,200,200,200,228,228,228,228,228,228];
var EC_NUMBER_DIM_X = 22;
var EC_NUMBER_DIM_Y = 28;
var EC_NUMBER_REL_X = [28,50,72,94];
var EC_NUMBER_REL_Y = [7,7,7,7];

var BADGE_COORDS_X = [541,572,603,634];
var BADGE_COORDS_Y = [62,62,62,62];
var BADGE_DIM_X = 31;
var BADGE_DIM_Y = 31;
var BADGE_REL_X = 32;
var BADGE_REL_Y = 38;

var PLAYER_NUMBER_COORDS_X = [512,543,574,512,543,574];
var PLAYER_NUMBER_COORDS_Y = [355,355,355,386,386,386];
var PLAYER_NUMBER_DIM_X = 31;
var PLAYER_NUMBER_DIM_Y = 31;
//88  220   352
//64   196  328
var PLAYER_NUMBER_PLACE_X = [120,253,384];
var PLAYER_NUMBER_PLACE_Y = [300,300,300];
var PLAYER_NUMBER_STRETCH_X = 128;
var PLAYER_NUMBER_STRETCH_Y = 128;

var LOGO_COORD_X = 0;
var LOGO_COORD_Y = 0;
var LOGO_DIM_X = 449;
var LOGO_DIM_Y = 105;
var LOGO_PLACE_X = 96;
var LOGO_PLACE_Y = 64;


var GRADIENT_STOPS = [0,.80,.81,.82,.83,.84,.85,.92,.93,1];
var GRADIENT_VALUES_BACK = [
						    ["#00254D","#0080FF","#E6F2FF","#0000FF","#E6F2FF","#0000FF","#E6F2FF","#E6F2FF","#00264D","#00254D"]
						   ,["#00254D","#0080FF","#E6F2FF","#0000FF","#E6F2FF","#0000FF","#E6F2FF","#E6F2FF","#00264D","#00254D"]
						   ,["#4D0000","#E60000","#E6F2FF","#FF0000","#E6F2FF","#FF0000","#E6F2FF","#E6F2FF","#4D0000","#4D0000"]
						   ,["#4D0000","#E60000","#E6F2FF","#FF0000","#E6F2FF","#FF0000","#E6F2FF","#E6F2FF","#4D0000","#4D0000"]
						   ];
var GRADIENT_VALUES_FRONT =	[
						    ["#007BFF","#99CAFF","#E6F2FF","#007BFF","#E6F2FF","#007BFF","#E6F2FF","#E6F2FF","#00264D","#00264D"]
						   ,["#007BFF","#99CAFF","#E6F2FF","#007BFF","#E6F2FF","#007BFF","#E6F2FF","#E6F2FF","#00264D","#00264D"]
						   ,["#E60000","#FF6666","#E6F2FF","#FF0000","#E6F2FF","#FF0000","#E6F2FF","#E6F2FF","#4D0000","#4D0000"]
						   ,["#E60000","#FF6666","#E6F2FF","#FF0000","#E6F2FF","#FF0000","#E6F2FF","#E6F2FF","#4D0000","#4D0000"]
						   ];					   



var ALERT_ROW_X = [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40];
var ALERT_ROW_Y = [60,84,108,132,156,180,204,228,252,276,300,324,348,372,396,420];


var ALERT_TEXT =[
				 //game_alert == 0
				  ''
				 ,''
				 ,''
				 ,''
				 ,''
				 ,''
				 ,'                       BY THE SWEEPING DEVELOPER'
				 ,'                                    MADE IN 2016'
				 ,''
				 ,'             HOW MANY PLAYERS ARE HERE TODAY?'
				 ,''
				 ,''
				 ,''
				 ,''
				 ,''
				 ,''
				 
				 //game_alert == 1
				 ,'','','','','','','','','','','','','','','',''
				
				 
				 //game_alert == 2
				 ,'Welcome to Bank Run!'
				 ,''
				 ,'In this game, you will place money in seven safe-deposit boxes.'
				 ,''
				 ,'Your opponent will then try to withdraw as much money as he'
				 ,'can. If he tries to withdraw too much, you get the money'
				 ,'in the box.  The placer and collector then switch roles.'
				 ,''
				 ,'In the first round, you must place $1,000 in the boxes, with   '
				 ,'no more than $400 in each box.  Adjust the boxes by $10 at'
				 ,'a time with the arrows, and press the round button to'
				 ,'confirm.  As always, you\'re playing with play money.'
				 ,'not real money.'
				 ,''
				 ,'Click anywhere on this box to begin.'
				 ,''
				 
				 //game_alert == 3
				 ,'','','','','','','','','','','','','','','',''
				 
				 
				 //game_alert == 4
				 ,'And now, it\'s the collector\'s turn.'
				 ,''
				 ,'Again, with the arrows, make your withdrawal guess, then'
				 ,'press the round button for that box.  If it lights up green,'
				 ,'you get your withdrawal guess.  If it lights up red, your'
				 ,'opponent gets all the money in the box.'
				 ,''
				 ,'After you have tried all seven boxes, the roles get'
				 ,'reversed, and the collector becomes the placer, and the'
				 ,'placer becomes the collector.'
				 ,''
				 ,''
				 ,''
				 ,'Click anywhere on this box to begin.'
				 ,''
				 ,''
				 
				 
				 //game_alert == 5
				 ,'','','','','','','','','','','','','','','',''
				 
				 //game_alert == 6
				 ,'It\'s now time for Round 2 of Bank Run!'
				 ,''
				 ,'This time, you must place $1,500 in the boxes, with'
				 ,'no more than $600 in each box.'
				 ,''
				 ,''
				 ,''
				 ,''
				 ,''
				 ,''
				 ,''
				 ,''
				 ,''
				 ,'Click anywhere on this box to begin.'
				 ,''
				 ,''
				 
				 //game_alert == 7
				 ,'','','','','','','','','','','','','','','',''
				 
				 //game_alert == 8
				 ,'It\'s now time for Round 3 of Bank Run!'
				 ,''
				 ,'Now it really gets interesting.  The maximum value of'
				 ,'the boxes is now $2,000, with the maximum value per'
				 ,'box going up to $800.'
				 ,''
				 ,'In addition, since there\'s so much money being'
				 ,'involved, the arrows change the value by $25 instead'
				 ,'of $10!'
				 ,''
				 ,''
				 ,''
				 ,''
				 ,'Click anywhere on this box to begin.'
				 ,''
				 ,''

				 //game_alert == 9
				 ,'','','','','','','','','','','','','','','',''
				 
				 //game_alert == 10
				 ,'And that\'s the game!'
				 ,''
				 ,'Thanks for playing!'
				 ,''
				 ,'Click anywhere on this box to see your final scores.'
				 ,''
				 ,''
				 ,''
				 ,''
				 ,''
				 ,''
				 ,''
				 ,''
				 ,''
				 ,''
				 ,''
				 ];



var CPU_STRATEGY_MIN = [
						 [0,0,8,10,0,0,0,     0,0,10,14,0,0,0,     0,0,5,7,0,0,0]
						,[20,15,10,5,3,0,0,     30,15,20,10,0,0,0,     12,11,10,8,4,0,0]
						,[1,2,3,5,10,20,30,     2,3,5,10,20,30,50,     2,3,4,8,12,14,17]
					   ];
						
						
var CPU_STRATEGY_MAX = [
						 [20,20,25,30,40,40,40,     30,30,20,30,40,50,60,     16,16,24,28,32,32,32]
						,[40,30,20,10,40,40,40,     60,50,40,30,60,60,60,     32,32,32,32,32,32,32]
						,[40,30,20,40,40,40,40,     60,50,40,30,60,60,60,     32,32,32,32,32,32,32]						
					   ];



var THEME = new Audio('audio/bankruntheme.wav');
var CORRECT = new Audio('audio/correct.wav');
var WRONG = new Audio('audio/miss.mp3');
var APPLAUSE = new Audio('audio/bankrunapplause.wav');
var DING = new Audio('audio/scoreding.mp3');
var COMMERCIAL = new Audio('audio/bankruntocommercial.wav');

