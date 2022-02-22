left_wristX = "";
left_wristY = "";
right_wristX = "";
right_wristY = "";
left_wristS = "";
right_wristS = "";
model_ready = false;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600, 500);
    video.hide();
    model = ml5.poseNet(video, modelLoaded);
    model.on("pose", getResults);
}

function preload() {
    music1 = loadSound("1.mp3");
    music2 = loadSound("2.mp3");
}

function draw() {
    if (model_ready == true) {
        image(video, 0, 0, 600, 500);
        fill("blue");
        stroke("red");
        if (left_wristS > 0.2) {
            circle(left_wristX, left_wristY, 30);
            music2.stop();
            if (music1.isPlaying() == false) {
                music1.play();
                document.getElementById("song_name").innerHTML = "Song 1 is playing";
            }
        }
        
        if (right_wristS > 0.2) {
            circle(right_wristX, right_wristY, 30);
            music1.stop();
            if (music2.isPlaying() == false) {
                music2.play();
                document.getElementById("song_name").innerHTML = "Song 2 is playing";
            }

        }
       
    }
}

function modelLoaded() {
    model_ready = true;
}

function getResults(pose_array) {
    if (pose_array.length > 0) {
        left_wristX = pose_array[0].pose.leftWrist.x;
        left_wristY = pose_array[0].pose.leftWrist.y;
        right_wristX = pose_array[0].pose.rightWrist.x;
        right_wristY = pose_array[0].pose.rightWrist.y;
        left_wristS = pose_array[0].pose.keypoints[9].score;
        right_wristS = pose_array[0].pose.keypoints[10].score;
    }
}