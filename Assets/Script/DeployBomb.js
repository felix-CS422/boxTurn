#pragma strict

//prefab objects
var bombChute : Transform;		//used to get transform position
var bomb: Transform;			//used to deploy bomb
//used to hold position vectors
private var deployPosition: Vector3;
private var bombChutePosition: Vector3;
//repeat bomb deployment
var startDeploy : float=3.0;	//first bomb deployment (in sec)
var deployDelay : float=4.0;	//reoccurring bomb deployment (in sec)
//timer
private var timerStart : float;	//holds time at beginning of game
var textTime: String;			//holds time for printing on gui
//euler angles
var eux: float = 0.0;			//stores x
var euy: float = 0.0;			//stores y
var euz: float = 0.0;			//stores z

function Start () {
	
	//get vector position of bombchute
	bombChutePosition = bombChute.position;
	//this will be the deployment transform for the bomb (10 units underneath its center)
	deployPosition = Vector3(bombChute.position.x, bombChute.position.y-1,bombChute.position.z);
	//get time at beginning of game [TESTING CAN COMMENT OUT BUT PLEASE COMMENT GUI TIMER OUT TOO]
	timerStart = Time.time;
	//start deployment of bombs right away
	InvokeRepeating("LaunchBomb", startDeploy, deployDelay);
	
	//print euler angles of bomb chute at the beginning of game [TESTING CAN COMMENT OUT]
	//get euler angles
	eux= bombChute.eulerAngles.x;
	euy= bombChute.eulerAngles.y;
	euz= bombChute.eulerAngles.z;
	print("Initial Euler Angles of Bomb Chute:\n"+
		"x: " + eux + " y: " + euy + " z: " + euz+
		"\nEuler Angles about x,y,z: ");
	
}

function getStartDeployment(){
	return  startDeploy;
}
function getDeployDelay(){
	return deployDelay;
}
//set the amount of seconds before first bomb deployment (start must be a float)
function setStartDeployment(start){
	startDeploy = start;
}
//(delay must be a float)
function setDeployDelay(delay){
	deployDelay = delay;
}
//displays a timer on the gui (gui updates on every frame)
function OnGUI () {

	//[TESTING CAN COMMENT OUT]
	//get current time
	var now = Time.time;
	//set time 
	var guiTime = now - timerStart;
	var minutes : int = guiTime / 60;
	var seconds : int = guiTime % 60;
	var fraction : int = (guiTime * 100) % 100;
 	//display time in gui
	textTime = String.Format ("{0:00}:{1:00}:{2:000}", minutes, seconds, fraction);
	GUI.Label (Rect (100, 25, 100, 30), textTime);
} 

function Update () {
	
	//check for mouse button down
	if(Input.GetMouseButtonDown(0)){
		//rotate bomb chute on left mouse click down
		Rotate();		
	}
}

//rotates bomb chute called on left mouse button down
function Rotate(){		
	//rotate bomb chute 90deg about z axis
	bombChute.Rotate(90,0,0);
	//print euler angles [TESTING CAN COMMENT OUT]
	eux= bombChute.eulerAngles.x;
	euy= bombChute.eulerAngles.y;
	euz= bombChute.eulerAngles.z;
	print("x: " + eux + " y: " + euy + " z: " + euz);
		
}

//this is a reoccurring function for lauching bombs
function LaunchBomb(){
	//get current euler angles of bomb chute
	eux= bombChute.eulerAngles.x;
	euy= bombChute.eulerAngles.y;
	euz= bombChute.eulerAngles.z;
	//if bomb chute's bottom is facing the game world down position deploy
	if(eux== 0 && euy ==0){
		//print("***BOMB DEPLOY! ***");	TESTING
		//deploy bomb prefab 10 units under center of chute
		Instantiate(bomb, deployPosition , Quaternion.identity);
	}
		
}