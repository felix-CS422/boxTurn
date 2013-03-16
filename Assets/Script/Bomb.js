#pragma strict

var hitCounter : int = 2;	//keeps record of number of hits

function Start () {
	print("intial hit counter: " + hitCounter);
}

function Update () {

}
//get the number of hits needed to kill bomb
function getHitCounter(){
	return hitCounter;
}
//set the number of hits needed to kill bomb (must be int)
function setHitCounter(hit){
	hitCounter = hit;
}
//kill bomb after touching floor 2 times
function OnCollisionEnter(bCollision : Collision){

	if(bCollision.gameObject.name == "Floor"){
		print("Collision with Floor"); //testing
		hitCounter-=1;	//increment hit counter
		//print("HitCounter: " + hitCounter); //testing
		
		//if bomb hits floor 2 or more times destroy
		if(hitCounter <= 0){
			print("**DESTROY BOMB**" + hitCounter);
			Destroy(gameObject, 1); //destroy after 1 second
		}
	}
}
