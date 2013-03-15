#pragma strict

var plate1:Transform;
var plate2:Transform;
var plate3:Transform;
var plate4:Transform;
var rotating1:boolean;
var rotating2:boolean;
var rotating3:boolean;
var rotating4:boolean;

function Start () {

}

function Update () {

}

function OnCollisionEnter(collision : Collision) {

	if( collision.gameObject.tag == "Bullet" ) {
		
		Debug.Log("Rotating!!!");
		
		if( PlateController.isExtended>0 ) {
		
			if( PlateController.isExtended==1 ) {
				RotateObject1( plate1,Vector3.forward*-90, 5.0 );
			} else if( PlateController.isExtended==2 ) {
				RotateObject2( plate2,Vector3.forward*90, 5.0 );
			} else if( PlateController.isExtended==3 ) {
				RotateObject3( plate3,Vector3.forward*90, 5.0 );
			} else if( PlateController.isExtended==4 ) {
				RotateObject4( plate4,Vector3.forward*-90, 5.0 );
			}
		
		} else {
		
			RotateObject1( plate1,Vector3.forward*-90, 5.0 );
			RotateObject2( plate2,Vector3.forward*90, 5.0 );
			RotateObject3( plate3,Vector3.forward*90, 5.0 );
			RotateObject4( plate4,Vector3.forward*-90, 5.0 );
		
		}
	
	}

}

function RotateObject1 (thisTransform : Transform, degrees : Vector3, seconds : float) {
    if (PlateController.isRotating1) return;
    PlateController.isRotating1 = true;
 
    var startRotation = thisTransform.rotation;
    var endRotation = thisTransform.rotation * Quaternion.Euler(degrees);
    var t = 0.0;
    var rate = 1.0/seconds;
    while (t < 1.0) {
        t += Time.deltaTime * rate;
        thisTransform.rotation = Quaternion.Slerp(startRotation, endRotation, t);
        yield;
    }
 
    PlateController.isRotating1 = false;
}

function RotateObject2 (thisTransform : Transform, degrees : Vector3, seconds : float) {
    if (PlateController.isRotating2) return;
    PlateController.isRotating2 = true;
 
    var startRotation = thisTransform.rotation;
    var endRotation = thisTransform.rotation * Quaternion.Euler(degrees);
    var t = 0.0;
    var rate = 1.0/seconds;
    while (t < 1.0) {
        t += Time.deltaTime * rate;
        thisTransform.rotation = Quaternion.Slerp(startRotation, endRotation, t);
        yield;
    }
 
    PlateController.isRotating2 = false;
}

function RotateObject3 (thisTransform : Transform, degrees : Vector3, seconds : float) {
    if (PlateController.isRotating3) return;
    PlateController.isRotating3 = true;
 
    var startRotation = thisTransform.rotation;
    var endRotation = thisTransform.rotation * Quaternion.Euler(degrees);
    var t = 0.0;
    var rate = 1.0/seconds;
    while (t < 1.0) {
        t += Time.deltaTime * rate;
        thisTransform.rotation = Quaternion.Slerp(startRotation, endRotation, t);
        yield;
    }
 
    PlateController.isRotating3 = false;
}

function RotateObject4 (thisTransform : Transform, degrees : Vector3, seconds : float) {
    if (PlateController.isRotating4) return;
    PlateController.isRotating4 = true;
 
    var startRotation = thisTransform.rotation;
    var endRotation = thisTransform.rotation * Quaternion.Euler(degrees);
    var t = 0.0;
    var rate = 1.0/seconds;
    while (t < 1.0) {
        t += Time.deltaTime * rate;
        thisTransform.rotation = Quaternion.Slerp(startRotation, endRotation, t);
        yield;
    }
 
    PlateController.isRotating4 = false;
}