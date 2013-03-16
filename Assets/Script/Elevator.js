#pragma strict

var originalPosition : Vector3;
 
function Start ()
{
    // when the object starts, we record its initial position
    originalPosition = transform.position;
}
 
function Update ()
{
    // when repositioning the object, we add an offset to the original position
    //transform.position.y = originalPosition.y + Mathf.Sin(Time.time) * 2;
    transform.position.y = originalPosition.y + Mathf.Sin(Time.time) * 2;
}