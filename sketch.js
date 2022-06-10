let sourceText = "anthonyriera";
let startIndex = 0;

let video;
let asciiDiv;

let recordFrames = false;
let asciiFrames = [];
const density = "       .:-i|=+%O#@";

function setup() {
  noCanvas();
  video = createVideo(["assets/face.mp4", "assets/face.webp"], onVideoLoad);
  asciiDiv = createDiv();
  asciiDiv.class("animation");

  video.onended((ev) => {
    console.log("VIDEO ENDED");
    recordFrames = false;
    console.log(JSON.stringify(asciiFrames));
  });
}

function onVideoLoad() {
  video.autoplay(false);
  video.volume(0);
  video.size(60, 60);
  video.noLoop();
}

function mouseClicked() {
  recordFrames = true;
  video.play();
}

function draw() {
  frameRate(15);

  if (!recordFrames) {
    return;
  }

  video.loadPixels();

  let asciiImage = "";
  // let charIndex = startIndex;

  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const brightness = (r + g + b) / 3;

      const len = density.length;
      const charIndex = floor(map(brightness, 0, 255, 0, len));
      const c = density.charAt(charIndex);

      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;

      // charIndex++;
    }
    asciiImage += "<br/>";
  }

  asciiDiv.html(asciiImage);
  asciiFrames.push(asciiImage);
}
