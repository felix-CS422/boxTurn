#pragma strict

var plate1:Transform;
var plate2:Transform;
var plate3:Transform;
var plate4:Transform;

function Start () {

}

function Update () {

}

function OnCollisionEnter(collision : Collision) {

	var t = 6.0;

	if( collision.gameObject.tag == "Bullet" ) {
		
		Debug.Log("Rotating!!!");
		
		if( PlateController.isExtended>0 && PlateController.isRotating==0 ) {
		
			PlateController.isRotating=1;
			if( PlateController.isExtended==1 ) {
				RotateObject( plate1,Vector3.forward*-90, t );
			} else if( PlateController.isExtended==2 ) {
				RotateObject( plate2,Vector3.forward*90, t );
			} else if( PlateController.isExtended==3 ) {
				RotateObject( plate3,Vector3.forward*90, t );
			} else if( PlateController.isExtended==4 ) {
				RotateObject( plate4,Vector3.forward*-90, t );
			}
		
		} else if( PlateController.isRotating==0 ) {
		
			PlateController.isRotating=1;
			RotateObject( plate1,Vector3.forward*-90, t );
			RotateObject( plate2,Vector3.forward*90, t );
			RotateObject( plate3,Vector3.forward*90, t );
			RotateObject( plate4,Vector3.forward*-90, t );
		
		}
	
	}

}

function RotateObject (thisTransform : Transform, degrees : Vector3, seconds : float) {
    var startRotation = thisTransform.rotation;
    var endRotation = thisTransform.rotation * Quaternion.Euler(degrees);
    var t = 0.0;
    var rate = 1.0/seconds;
    while (t < 1.0) {
        t += Time.deltaTime * rate;
        thisTransform.rotation = Quaternion.Slerp(startRotation, endRotation, t);
        yield;
    }
    PlateController.isRotating=0;
    
    //thisTransform
}

/*function RotateObject (thisTransform : Transform, degrees : Vector3, seconds : float) {
	//isRotating=true;
    var startRotation = transform.rotation;
    var initPosition = transform.position;
    var endRotation = transform.rotation * Quaternion.Euler(degrees*-1);
    var angle:float = 0;
    var done:boolean=false;
    rg.angularVelocity = transform.forward * 2;
    
    while(!done) {
    	angle = Quaternion.Angle(endRotation, transform.rotation);
    	rg.angularVelocity = transform.forward * 2;
    	if( angle < 5) {
	    	rigidbody.angularVelocity = Vector3(0,0,0);
	    	PlateController.isRotating=0;
	    	transform.rotation = endRotation;
	    	transform.rotation.x = 0;
	    	done=true;
    	}
    	yield;
    }
    PlateController.isRotating=0;
    
    
}*/