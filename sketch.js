let mic, recorder, soundFile;
let isRecording = false;
let hasRecording = false;
let rateSlider;
let cnv;
let fft;



function mousePressed() {
  mic = new p5.AudioIn();
  mic.start();
}

function setup() {
  background("pink");
  cnv = createCanvas(600, 400);
  cnv.mousePressed(clicked);
  
  // mic created
  mic = new p5.AudioIn();
  mic.start();
  
  //recorder setup
  recorder = new p5.SoundRecorder();
  // connect the mic to the recorder
  recorder.setInput(mic);
  // this sound file will be used to
  // playback & save the recording
  soundFile = new p5.SoundFile();
  
  //creating a slider
  fill("brown");
  rateSlider = createSlider(0.1, 4, 1, 0.01); 
  rateSlider.position(400, 100);
  rateSlider.style('height', '260px');

  
}

function clicked() {
  // First click: start recording
  if (!isRecording && !hasRecording) {
    userStartAudio(); // ensure browser allows mic
    isRecording = true;
    recorder.record(soundFile);
    console.log("Recording...");
    setTimeout(stopRecording, 5000); // record 5 seconds max
  }
  else if (hasRecording) {
    toggleSound();
  }
}

function stopRecording() {
  recorder.stop();
  mic.stop();
  isRecording = false;
  hasRecording = true;
  console.log("Recording stopped. Click to play audio");
}


function toggleSound() {
  if (soundFile.isPlaying()) {
    soundFile.pause();
  } else {
    soundFile.loop();
  }
}


function draw() {
  
  //helps the slider
  let playbackRate = rateSlider.value();
  soundFile.rate(playbackRate);
  
  //this is all the coloring
  background("pink");
  let colorss = random(["#d4f8ff", "#cbffe3","#fffecf", "#ffd5e5", "#fbd3ff"]);
  //setting up instructions + drawing the dango stick
  fill("white");
  let textin = text('Click the empty dango stick to start recording', 200, 30);
  let textin3 = text("Use slider to adjust your dangaudio", 380, 200)
  stroke("brown");
  strokeWeight(15); 
  let stick = line(300,400,300,100); 
  
  
  //this is where the dango are getting drawn/mic starts being used frfr
   if (isRecording) {
    let vol = mic.getLevel();  
  // Map the volume to a radius (0 to 1.0 * 200)
  let h = map(vol, 0, 1, 2, width);
 fill(colorss);
 circle(width /2, height/2, h*3); 
 fill(colorss);
 circle(width/2, (height/2+30), h*3);
 fill(colorss);
 circle(width/2, (height/2+60), h*3);
 fill(colorss);
 circle(width/2, (height/2+80), h*3);
   }
  
  // Control the playback speed
  if (hasRecording && !isRecording) {
    let rate = rateSlider.value();
    soundFile.rate(rate);}
    let textin2 = text("after the dangos are gone click to play the audio", 200, 50);

}