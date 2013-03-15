#pragma strict

var plateID:int = 0;
var moveDistance:float = 20;

var plate1:Transform;
var plate2:Transform;
var plate3:Transform;
var plate4:Transform;

function Start () {

}

function Update () {

}

function OnCollisionEnter(collision : Collision) {

	if( collision.gameObject.tag == "Bullet" ) {
		
		Debug.Log("Pushing!!!");
		
		if( PlateController.isExtended!=0 ) {
		
			MovePlate();
			PlateController.isExtended=0;
		
		} else {
		
			MovePlate();
			PlateController.isExtended=plateID;
		
		}
		
	
	}

}

function MovePlate() {

	var zDirection:int = 1;
	var plateToMove:int = plateID;

	if( PlateController.isExtended!=0 ) {
	
		plateToMove = PlateController.isExtended;
		zDirection = -1;
	
	}
	
	if( plateToMove!=1 ) {
	
		plate1.transform.position.z += ( moveDistance*zDirection );
	
	}
	if( plateToMove!=2 ) {
	
		plate2.transform.position.z += ( moveDistance*zDirection );
	
	}
	if( plateToMove!=3 ) {
	
		plate3.transform.position.z += ( moveDistance*zDirection );
	
	}
	if( plateToMove!=4 ) {
	
		plate4.transform.position.z += ( moveDistance*zDirection );
	
	}

}
