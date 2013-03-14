#pragma strict

function Start () {

}

function Update () {

	if( transform.position.x < -50 || transform.position.y < -1 || transform.position.z < -50
		|| transform.position.x > 50 || transform.position.z > 50 ) {
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