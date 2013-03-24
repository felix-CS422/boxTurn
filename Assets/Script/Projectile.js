#pragma strict
var maxDistance:float = 8;
var startPosition:Vector3;

function Start () {
	startPosition = transform.position;
}

function Update () {

	//if( transform.position.x < -60 || transform.position.y < -100 || transform.position.z < -60
	//	|| transform.position.x > 60 || transform.position.z > 60 ) {
	//	Destroy(gameObject);
	//}
	var totalDistance = Vector3.Distance(transform.position,startPosition);
	
	if(totalDistance >= maxDistance) {
		Destroy(gameObject);
	}

}

function OnCollisionEnter(collision : Collision) {
   if( collision.gameObject.tag == "Player" ) {
      //Do nothing
    } else {
       Destroy(gameObject);
    }
}