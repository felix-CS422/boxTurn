#pragma strict

var currentPlate:Transform;
var rotating:boolean;

function Start () {

}

function Update () {

}

function OnCollisionEnter(collision : Collision) {

	if( collision.gameObject.tag == "Bullet" ) {
		
		Debug.Log("Rotating!!!");
		RotateObject( currentPlate,Vector3.forward*-90, 5.0 );
	
	}

}

function RotateObject (thisTransform : Transform, degrees : Vector3, seconds : float) {
    if (rotating) return;
    rotating = true;
 
    var startRotation = thisTransform.rotation;
    var endRotation = thisTransform.rotation * Quaternion.Euler(degrees);
    var t = 0.0;
    var rate = 1.0/seconds;
    while (t < 1.0) {
        t += Time.deltaTime * rate;
        thisTransform.rotation = Quaternion.Slerp(startRotation, endRotation, t);
        yield;
    }
 
    rotating = false;
}