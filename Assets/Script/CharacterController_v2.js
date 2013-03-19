#pragma strict

var xMovement:int = 0;		// 0 for idle, 1 for moving right, -1 for moving left
var xTime:float = 0;
var zMovement:int = 0;
var yMovement:int = 0;		// 0 for idle, 1 for jumping, -1 for falling
var yTime:float = 0;
var runSpeed:float = 3;				// Speed for moving left or right
var runAcceleration:float = 20;
var jumpSpeed:float = 3;				// Speed for jumping or falling
var jumpAcceleration:float = 20;
var jumpHeight:float = 0;				// Current jump height
var jumpMax:float = 10;				// Max jump height
var buttonPressed:int = 0;			// Tell whether both move right and left are pressed
var lastPosition:Vector3;
var maxForce:float = 10;
var slowDown:float = 10;

var projectile:Transform;		// Projectile prefab object
var projectileSpeed:int = 360;	// Projectile speed when fired

//State variables
var isRunning:int = 0;
var isJumping:int = 0;
var isFalling:int = 0;
var isShooting:int = 0;
var isHanging:int = 0;


function Start () {
	lastPosition = transform.position;
}

/*function Update () {

	checkMovement();
	handleMovement();

}*/

function FixedUpdate () {

	checkMovement();
	handleMovement();
	getState();
	lastPosition = transform.position;
}

function checkCollisions() {



}

function handleMovement(){

	//Take care of x-axis movement
	var right = transform.TransformDirection (Vector3.right) * xMovement;
	if( xMovement != 0 ) {

		/*if(xTime<0.3) {
			rigidbody.velocity.x = runSpeed * xMovement * 0.5;
		} else if(xTime<0.6) {
			rigidbody.velocity.x = runSpeed * xMovement * 0.75;
		} else {
			rigidbody.velocity.x = runSpeed * xMovement;
		}*/
		
		//Acceleration player
		if( (rigidbody.velocity.x*xMovement) < runSpeed ) {
			rigidbody.AddForce(Vector3.right*xMovement*runAcceleration,ForceMode.Acceleration);
		} else {
			rigidbody.velocity.x = runSpeed * xMovement;
		}
	
	} else {
		//Decelerate player
		/*if(xTime<0.5) {
			rigidbody.velocity.x *= 0.8;
		}else{
			rigidbody.velocity.x = 0;
		}*/
		if( (rigidbody.velocity.x*xMovement) > 1 ) {
			rigidbody.AddForce(Vector3.right*-xMovement*runAcceleration,ForceMode.Acceleration);
		} else {
			rigidbody.velocity.x = 0;
		}
		
	}
	
	if( yMovement > 0 ) {
	
		if( rigidbody.velocity.y < jumpSpeed ) {
			rigidbody.AddForce(Vector3.up*jumpAcceleration,ForceMode.Acceleration);
		} else {
			rigidbody.velocity.y = jumpSpeed;
		}
		jumpHeight += transform.position.y - lastPosition.y;
		if( jumpHeight > jumpMax )
			yMovement = -1;
	
	}
	
	/*var vert = transform.TransformDirection(Vector3.up);
	if(transform.position.y == lastPosition.y && xMovement!=0 && !Physics.Raycast(transform.position, vert*-1 , 1.1) ) {
		Debug.Log("HERE1...");
		yMovement = 0;
		jumpHeight = 0;
	
	} else if(yTime>0.02 && yMovement==0 && transform.position.y == lastPosition.y && Physics.Raycast(transform.position, vert*-1 , 1.1) ) {
		Debug.Log("HERE2...");
		yMovement = 0;
		jumpHeight = 0;
	
	} else if(yTime>0.02 && yMovement==-1 && transform.position.y == lastPosition.y ) {
		Debug.Log("HERE3...");
		yMovement = 0;
		jumpHeight = 0;
	}*/
	
	if( isHanging==1 || (isHanging==0 && isFalling==0 && isJumping==0 && yMovement<=0) ) {
		yMovement = 0;
		jumpHeight = 0;
	}
	
	/*if( transform.position == lastPosition && Physics.Raycast(transform.position, vert*-1 , 1.1) && xMovement!=0 ) {
		isHanging=1;
		isJumping=0;
		yMovement = 0;
		jumpHeight = 0;
	} else if( yMovement==0 && transform.position.y == lastPosition.y ) {
		isJumping=0;
		isHanging=0;
		yMovement = 0;
		jumpHeight = 0;
	}*/
	
	/*if(yMovement < 0 && rigidbody.velocity.y>0) {
		rigidbody.AddForce( transform.TransformDirection (Vector3.up)*-slowDown, ForceMode.Acceleration);
		if( rigidbody.velocity.y < 5 && rigidbody.velocity.y > 0 ){
			rigidbody.velocity.y = 0;
		}
	}*/
	
	/*if( xMovement!=0 && !Physics.Raycast(transform.position - Vector3(0,0.5,0), right , 1.1)
			&& !Physics.Raycast(transform.position + Vector3(0,0.5,0), right , 1.1) ) {
		rigidbody.velocity.x = runSpeed * xMovement;
	} else if(rigidbody.velocity.x>0) {
		rigidbody.AddForce( transform.TransformDirection (Vector3.right)*-slowDown, ForceMode.Acceleration);
		if( rigidbody.velocity.x < 5 && rigidbody.velocity.x > -5 ) rigidbody.velocity.x = 0;
	} else if(rigidbody.velocity.x<0) {
		rigidbody.AddForce( transform.TransformDirection (Vector3.right)*slowDown, ForceMode.Acceleration);
		if( rigidbody.velocity.x < 5 && rigidbody.velocity.x > -5 ) rigidbody.velocity.x = 0;
	}
	
	
	//Take care of vertical movement
	var vert = transform.TransformDirection(Vector3.up);
	var amtToMove:float = jumpSpeed * Time.deltaTime;
	
	if( jumpHeight>=jumpMax ) {
		//Reached max height
		verticalMovement = -1;
		jumpHeight = 0;
	} else if( verticalMovement>0 && (Physics.Raycast(transform.position - Vector3(0.5,-1.1,0), vert , 2) ||
			Physics.Raycast(transform.position + Vector3(0.5,1.1,0), vert , 2) )) {
		//Checking for collision above
		verticalMovement = -1;
		jumpHeight = 0;
	} else if( verticalMovement < 0 && ( Physics.Raycast(transform.position - Vector3(0.5,1.1,0), vert*-1 , 1) ||
			Physics.Raycast(transform.position + Vector3(0.5,-1.1,0), vert*-1, 1) ||
			Physics.Raycast(transform.position + Vector3(0,-1.3,0), vert*-1, 1) )) {
		//Checking for collision below
		verticalMovement = 0;
		jumpHeight = 0;
	}
	
	if( verticalMovement>0 ) {
		//Move Object
		rigidbody.velocity.y = jumpSpeed;
		jumpHeight += transform.position.y - lastPosition.y;
	}else if(rigidbody.velocity.y>0) {
		rigidbody.AddForce( transform.TransformDirection (Vector3.up)*-slowDown, ForceMode.Acceleration);
		if( rigidbody.velocity.y < 5 && rigidbody.velocity.y > 0 ){
			rigidbody.velocity.x = 0;
		}
	}*/
	

}

function getState() {
	
	isHanging=0;
	var vert = transform.TransformDirection(Vector3.up);
	if( transform.position == lastPosition && !Physics.Raycast(transform.position, vert*-1 , 1.1) && xMovement!=0 ) {
		//Hanging
		isHanging=1;
		isJumping=0;
		isFalling=0;
		yMovement = 0;
		jumpHeight = 0;
	} else if( yMovement==0 && transform.position.y == lastPosition.y && checkBelow(1.4) ) {
		//Grounded
		isJumping=0;
		isHanging=0;
		isFalling=0;
		yMovement = 0;
		jumpHeight = 0;
	} else if( /*rigidbody.velocity.y>0 &&*/ yMovement>0 ) {
		//Jumping
		isJumping=1;
		isFalling=0;
		isHanging=0;
	} else if( rigidbody.velocity.y<0 && yMovement<=0 && !checkBelow(1.2) ) {
		//Falling
		isFalling=1;
		isJumping=0;
		isHanging=0;
	} else {
		//Idle
		isFalling=0;
		//isJumping=0;
		isHanging=0;
	}

}

//Check for collisions below
function checkBelow( distance:float ) {

	var vert = transform.TransformDirection(Vector3.up);
	if( Physics.Raycast(transform.position, vert*-1 , distance)
		|| Physics.Raycast(transform.position + Vector3(0.1,0,0), vert*-1 , distance)
		|| Physics.Raycast(transform.position + Vector3(-0.1,0,0), vert*-1 , distance)
		|| Physics.Raycast(transform.position + Vector3(0.2,0,0), vert*-1 , distance)
		|| Physics.Raycast(transform.position + Vector3(-0.2,0,0), vert*-1 , distance)
		|| Physics.Raycast(transform.position + Vector3(0.3,0,0), vert*-1 , distance)
		|| Physics.Raycast(transform.position + Vector3(-0.3,0,0), vert*-1 , distance)
		|| Physics.Raycast(transform.position + Vector3(0.4,0,0), vert*-1 , distance)
		|| Physics.Raycast(transform.position + Vector3(-0.4,0,0), vert*-1 , distance)
		|| Physics.Raycast(transform.position + Vector3(0.5,0,0), vert*-1 , distance)
		|| Physics.Raycast(transform.position + Vector3(-0.5,0,0), vert*-1 , distance) ) {
			return true;
		}
	return false;

}

function checkMovement() {

	
	
	var vert = transform.TransformDirection(Vector3.up);
	//Check vertical movement
	if( Input.GetKeyDown(KeyCode.Space) && yMovement==0 /*&& buttonPressed==0*/ ) {
		yMovement=1;
		yTime=0;
		isJumping=1;
		//buttonPressed=1;
	}
	if( Input.GetKeyUp(KeyCode.Space) && yMovement==1 /*&& buttonPressed==1*/ ) {
		yMovement=-1;
		//buttonPressed=0;
	}

	//Check to see if character is moving on x-axis
	isRunning=1;
	if( Input.GetKeyDown(KeyCode.LeftArrow) ) {
		xMovement = -1;
		rotatePlayer();
		//buttonsPressed++;
	} else if( Input.GetKeyDown(KeyCode.RightArrow) ) {
		xMovement = 1;
		rotatePlayer();
		//buttonsPressed++;
	} else if( Input.GetKey(KeyCode.LeftArrow) ) {
		xMovement = -1;
		//buttonsPressed++;
	} else if( Input.GetKey(KeyCode.RightArrow) ) {
		xMovement = 1;
		//buttonsPressed++;
	} 
	else {
		xMovement = 0;
		xTime = 0;
		isRunning=0;
	}
	
	//Check to see if character is moving on z-axis
	if( Input.GetKey(KeyCode.DownArrow) ) {
		zMovement = -1;
	} else if( Input.GetKey(KeyCode.UpArrow) ) {
		zMovement = 1;
	} else {
		zMovement = 0;
	}
	
	//Fire a projectile when ALT button is pressed
	if( Input.GetKeyDown(KeyCode.LeftAlt) || Input.GetKeyDown(KeyCode.RightAlt) ) {
	
		var steam = Instantiate(projectile, transform.position + (transform.forward*0.5), transform.rotation);
		steam.rigidbody.AddForce(steam.transform.forward * projectileSpeed);
		Physics.IgnoreCollision(steam.collider, collider);
		isShooting = 1;
		//if( curState == 0 ) {
			//Set state to play shooting animation if not running or jumping
			//curState = 3;
		
		//}
	} else if( Input.GetKeyUp(KeyCode.LeftAlt) || Input.GetKeyUp(KeyCode.RightAlt) ) {
		isShooting = 0;
	}
}

function OnCollisionEnter(other:Collision){
	
	Debug.Log("Collision");
	
	if( yMovement!=0 ) {
	
		var vert = transform.TransformDirection(Vector3.up);
		if( yMovement>0 && Physics.Raycast(transform.position, vert , 1.1) ) {
			//Collision above while jumping
			yMovement = -1;
			//rigidbody.velocity.y = 0;
		} else if( checkBelow(1.1)/*Physics.Raycast(transform.position, vert*-1 , 1.1)/* ||
				Physics.Raycast(transform.position + Vector3(0.5,0,0), vert*-1 , 1.1) || 
				Physics.Raycast(transform.position + Vector3(-0.5,0,0), vert*-1 , 1.1) */) {
			yMovement = 0;
			jumpHeight = 0;
		}
	
	}
	
}

//Rotate player to face the direction he is moving
function rotatePlayer() {
    transform.rotation = Quaternion.LookRotation(Vector3.right*xMovement);
	xTime = 0;
}