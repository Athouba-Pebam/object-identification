img = "";
status = "";
object = [];

function preload(){
    img = loadImage('dog_cat.jpg');
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("object").innerHTML = "Status : Detecting Objects";

}

function draw(){
    image(video, 0, 0, 380, 380);
    

    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < object.length; i++){
            document.getElementById("object").innerHTML = "Status = Object Detected";


            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are = " + object.length;

            r = random(255);
            g = random(255);
            b = random(255);

            fill(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 10, object[i].y + 20);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }

    }
}

function modelLoaded(){
    console.log("Model Loaded!")
    status = true;
    
}

function gotResult(error, results){
    if(error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}  
