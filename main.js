var message = document.querySelector("#message");

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var grammar = "#JSGF V1.0;";

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = "en-US";
recognition.interimResults = false;

recognition.onstart = () => {
  console.log("Speech recognition has started");
};

recognition.onspeechend = () => {
  recognition.stop();
};

recognition.onerror = (event) => {
  message.textContent = "Error." + event.error;
};

recognition.onnomatch = (event) => {
  message.textContent = "I didn't recognise what you said.";
};

recognition.onend = () => {
  console.log("Speech recognition has stopped");
};

document.querySelector("#command-button").addEventListener("click", () => {
  recognition.start();
});

recognition.onresult = (event) => {
  var interim_transcript = "";
  var final_transcript = "";

  for (var i = event.resultIndex; i < event.results.length; ++i) {
    // Verify if the recognized text is the last with the isFinal property
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
    } else {
      interim_transcript += event.results[i][0].transcript;
    }
  }

  console.log("Final: ", final_transcript);

  console.log("Simple: ", event.results[0][0].transcript);

  var last = event.results.length - 1;
  var command = event.results[last][0].transcript;
  message.innerHTML =
    "Recognised Speech: <b>" +
    command.charAt(0).toUpperCase() +
    command.slice(1) +
    "</b>";
  let box = document.querySelector(".box");
  var top = parseInt(window.getComputedStyle(box).getPropertyValue("top"));
  var left = parseInt(window.getComputedStyle(box).getPropertyValue("left"));

  if (command.toLowerCase() === "up") {
    box.style.top = top - 40 + "px";
  } else if (command.toLowerCase === "down") {
    box.style.top = top + 40 + "px";
  } else if (command.toLowerCase() === "left") {
    box.style.left = left - 40 + "px";
  } else if (command.toLowerCase() === "right") {
    box.style.left = left + 40 + "px";
  }
};
