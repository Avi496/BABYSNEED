song="";
statusx="";
objects=[];
function preload(){
    song=loadSound("z_alert.mp3");
}
function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelloaded(){
    console.log("CocoSSD model has loaded.");
    statusx=true;
}
function gotResults(results, error){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(statusx!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResults);
        for(g=0; g<objects.length; g++){
            document.getElementById("status").innerHTML="Status : Objects Detected.";
            fill(r,g,b);
            percent=floor(objects[g].confidence*100);
            text(objects[g].label+" "+percent+"%", objects[g].x+15, objects[g].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[g].x, objects[g].y, object[g].width, object[g].height);
            if(objects[g].label=="person"){
                document.getElementById("objectsno").innerHTML="Baby Found";
                song.stop();
            }
            else{
                document.getElementById("objectsno").innerHTML="Baby Not Found";
                song.play();
            }
        }
        if(objects.length==0){
            document.getElementById("objectsno").innerHTML="Baby Not Found";
            song.play();
        }
    }
}