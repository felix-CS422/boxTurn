#pragma strict

// Author: Felix

//movement parameters
var amplitude: float = 5; 	// platform excursion (+/- 5 units, in this case)
var speed: float = 0.2; 	// movements per second
var direction: Vector3 = Vector3(1,0,0); // direction relative to the platform
private var p0: Vector3;	//holds initial postion for platform
//store transform of rotationCube
var platformT: Transform;
//store euler angles
var eux: float = 0.0;
var euy: float = 0.0;
var euz: float = 0.0;

function Start(){
  	p0 = transform.position;		//get starting position for platform
  	//print("Initial Euler Angles:");	testing
	eux= platformT.eulerAngles.x;
	euy= platformT.eulerAngles.y;
	euz= platformT.eulerAngles.z;
	//print("x: " + eux + " y: " + euy + " z: " + euz); testing
	//print("Euler Angles about x,y,z: "); testing
  while (true){
    // convert direction to local space
    var dir = transform.TransformDirection(direction);
    // set platform position:
    transform.position = p0 + amplitude * dir * Mathf.Sin(6.28 * speed * Time.time);
    yield; // let Unity free till the next frame
  }
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
	platformT.Rotate(0,0,90);
	/*//print euler angles [TESTING CAN COMMENT OUT]
	eux= platformT.eulerAngles.x;
	euy= platformT.eulerAngles.y;
	euz= platformT.eulerAngles.z;
	print("platform\nx: " + eux + " y: " + euy + " z: " + euz);
	*/
}