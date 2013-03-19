#pragma strict

var plateID:int = 0;
var moveRate:float = 2;
var moveTime:float = 1;

var plate1:Transform;
var plate2:Transform;
var plate3:Transform;
var plate4:Transform;
var backpanel:Transform;

function Start () {

}

function Update () {

}

function OnCollisionEnter(collision : Collision) {

	if( collision.gameObject.tag == "Bullet" ) {
		
		Debug.Log("Pushing!!!");
		
		if( PlateController.isExtended!=0 && PlateController.isRotating==0 ) {
		
			MovePlate();
			PlateController.isExtended=0;
		
		} else if( PlateController.isRotating==0 ){
		
			MovePlate();
			PlateController.isExtended=plateID;
		
		}
		
	
	}

}

function MovePlate() {

	var zDirection:int = 1;
	var plateToMove:int = plateID;

	if( PlateController.isRotating==0 ) {
	
		PlateController.isRotating=1;

		if( PlateController.isExtended!=0 ) {
		
			plateToMove = PlateController.isExtended;
			zDirection = -1;
		
		}
		
		if( plateToMove!=1 ) {
		
			//plate1.transform.position.z += ( moveDistance*zDirection );
			MoveObject( plate1,moveRate,moveTime,zDirection );
		
		}
		if( plateToMove!=2 ) {
		
			//plate2.transform.position.z += ( moveDistance*zDirection );
			MoveObject( plate2,moveRate,moveTime,zDirection );
		
		}
		if( plateToMove!=3 ) {
		
			//plate3.transform.position.z += ( moveDistance*zDirection );
			MoveObject( plate3,moveRate,moveTime,zDirection );
		
		}
		if( plateToMove!=4 ) {
		
			//plate4.transform.position.z += ( moveDistance*zDirection );
			MoveObject( plate4,moveRate,moveTime,zDirection );
		
		}
		
		//backpanel.transform.position.z += ( moveDistance*zDirection );
		MoveObject( backpanel,moveRate,moveTime,zDirection );
	
	}

}

function MoveObject (thisTransform : Transform, distance:float, seconds : float, zDirection:int) {
    //var startLocation = thisTransform.position;
    var endZLocation = thisTransform.position.z + (moveTime*moveRate*zDirection);
    var t = 0.0;
    var rate = 1.0/seconds;
    while (t < 1.0) {
        t += Time.deltaTime * rate;
        thisTransform.position.z += (Time.deltaTime*distance*zDirection);
        //thisTransform.rotation = Quaternion.Slerp(startRotation, endRotation, t);
        yield;
    }
    thisTransform.position.z = endZLocation;
    PlateController.isRotating=0;
    
    //thisTransform
}
