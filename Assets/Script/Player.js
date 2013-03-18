#pragma strict

var curState:int = 0;			// Determines whether character is moving
var jump:int = 0;				// Checks if character is jumping

var height:float = 0.5;			// Height/2 of character object
var width:float = 0.5;			// Width/2 of character object
var depth:float = 0.5;			// Depth/2 of character object

var projectile:Transform;		// Projectile prefab object
var projectileSpeed:int = 360;	// Projectile speed when fired

var lastLocation:Vector3;
var cameraObject:Transform;
var zoomScale:int;
var curZoom:int=1;
var constantz:float=0;

function Start () {

	lastLocation = transform.position;
	constantz = transform.position.z;

}

function Update () {

	getInputData();
	
	if( curState>0 ) {
	
		playAnimation();
	
	}
	
	transform.position.z = constantz;
	var posChange = transform.position - lastLocation;
	lastLocation = transform.position;
	cameraObject.transform.position += posChange;
	

}

//Get the current state of the character
function getInputData() {

	checkJump();
	
	if( Input.GetKey(KeyCode.LeftArrow) || Input.GetKey(KeyCode.RightArrow)
		|| Input.GetKey(KeyCode.UpArrow) || Input.GetKey(KeyCode.DownArrow) ) {
		
		//Debug.Log("Running...");		//Running
		curState = 1;
		
	} else if( jump>0 ) {				//Jumping
	
		//Debug.Log("Jumping...");
		curState = 2;
		
	} else {							//Idle
		curState = 0;
	}
	
	//Fire a projectile when SHIFT button is pressed
	if( Input.GetKeyDown(KeyCode.LeftAlt) || Input.GetKeyDown(KeyCode.RightAlt) ) {
	
		var steam = Instantiate(projectile, transform.position + (transform.forward*0.5), transform.rotation);
		steam.rigidbody.AddForce(steam.transform.forward * projectileSpeed);
		Physics.IgnoreCollision(steam.collider, collider);
		
		if( curState == 0 ) {
			//Set state to play shooting animation if not running or jumping
			curState = 3;
		
		}
	}
	
	if( Input.GetKeyDown(KeyCode.Z) ) {
		cameraObject.transform.position.z -= zoomScale*curZoom;
		curZoom *= -1;
	} //else if( Input.GetKeyUp(KeyCode.Z)) {
		//cameraObject.transform.position.z += zoomScale;
	//}

}

//Find out whether character is jumping
function checkJump() {

	jump=0;
	var vert = transform.TransformDirection(Vector3.down);
	var margin1:Vector3 = Vector3(width,-height,depth);  //Bottom upper right corner
	var margin2:Vector3 = Vector3(-width,-height,depth);  //Bottom upper left corner
	var margin3:Vector3 = Vector3(width,-height,-depth);  //Bottom lower right corner
	var margin4:Vector3 = Vector3(-width,-height,-depth);  //Bottom lower left corner
	
	//Raycast the bottom four corners downward to check for collisions
	if( !Physics.Raycast(transform.position + margin1 , vert , 0.5)
		&& !Physics.Raycast(transform.position + margin2 , vert , 0.5)
		&& !Physics.Raycast(transform.position + margin3 , vert , 0.5)
		&& !Physics.Raycast(transform.position + margin4 , vert , 0.5) ) {
		jump=1;
	}

}

function playAnimation() {

	//Debug.Log("Animation...");
	switch(curState) {
		case 1:
			//play running animation
			break;
		case 2:
			//play jumping animation
			break;
		case 3:
			//play shooting animation
			curState = 0;
			break;
		default:
			break;
			
	}

}