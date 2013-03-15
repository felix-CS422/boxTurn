#pragma strict

function Start () {

}

function Update () {

	if( transform.position.x < -60 || transform.position.y < -100 || transform.position.z < -60
		|| transform.position.x > 60 || transform.position.z > 60 ) {
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