detectionStatus= "";
objects= [];

function preload() {
    img= loadImage("dog_cat.jpg");
}

function setup() {
    canvas= createCanvas(380, 380);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380, 380)
    video.hide();
}

function start() {
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML= "Status: Detecting Objects";
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (detectionStatus!= "") {
        r= random(225);
        g= random(225);
        b= random(225);
        objectDetector.detect(video, gotResults);
        for (index = 0; index < objects.length; index++) {
            document.getElementById("status").innerHTML= "Status: Objects Detected";
            document.getElementById("no_of_objects").innerHTML= "no. of objects detected= " + objects.length;
            fill(r,g,b);
            confidence= floor(objects[index].confidence*100);
            text(objects[index].label + " " + confidence + " %", objects[index].x, objects[index].y);
            noFill(r,g,b);
            stroke("#FF0000");
            rect(objects[index].x, objects[index].y, objects[index].width, objects[index].height);
        }
    }
}

function modelLoaded() {
    console.log("model initialized");
    detectionStatus= true;
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects= results;
    }
}