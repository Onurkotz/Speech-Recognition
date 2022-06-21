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

recognition.unresult = function (event) {
  var last = event.results.length - 1;
  var command = event.results[last][0].transcript;
  message.textContent = "Recognised speech: " + command;
  let box = document.querySelector(".box");
  var top = parseInt(window.getComputedStyle(box).getPropertyValue("top"));
  var left = parseInt(window.getComputedStyle(box).getPropertyValue("left"));

  if (command.toLowerCase() === "move up") {
    box.style.top = top - 40 + "px";
  } else if (command.toLowerCase === "move down") {
    box.style.top = top + 40 + "px";
  } else if (commmand.toLowerCase() === "move left") {
    box.style.left = left - 40 + "px";
  } else if (command.toLowerCase() === "move right") {
    box.style.left = left + 40 + "px";
  }
};

recognition.onspeechend = () => {
  recognition.stop();
  console.log("stop")
};

recognition.onerror = (event) => {
  message.textContent = "Error." + event.error;
};

recognition.onnomatch = function (event) {
  message.textContent = "I didn't recognise what you said.";
};

document.querySelector("#command-button").addEventListener("click", () => {
  recognition.start();
  console.log("start");
});
