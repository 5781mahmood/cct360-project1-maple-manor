// The Curious Case of Maple Manor
// Project 1 - Interactive Discovery
// variables, functions, conditionals, click events

// remembers what the player did
let clueCount = 0;
let interviewCount = 0;

let foundGun = false;
let foundClock = false;
let foundNote = false;
let foundPan = false;

let talkedCook = false;
let talkedWife = false;
let talkedButler = false;
let talkedGardener = false;

let caseStarted = false;
let caseSolved = false;

let clues = [];

// page elements
let hud = document.getElementById("hud");
let clueCountSpan = document.getElementById("clueCount");
let interviewCountSpan = document.getElementById("interviewCount");

let studyMsg = document.getElementById("studyMsg");
let kitchenMsg = document.getElementById("kitchenMsg");
let livingMsg = document.getElementById("livingMsg");
let clueList = document.getElementById("clueList");
let boardNote = document.getElementById("boardNote");
let hallwayHint = document.getElementById("hallwayHint");
let goAccuse = document.getElementById("goAccuse");

let ending = document.getElementById("ending");
let endingTitle = document.getElementById("endingTitle");
let endingText = document.getElementById("endingText");

function showScene(sceneId) {
  let scenes = document.querySelectorAll(".scene");
  let i = 0;

  while (i < scenes.length) {
    scenes[i].classList.remove("active");
    i = i + 1;
  }

  let next = document.getElementById(sceneId);
  next.classList.add("active");

  // scroll up when switching scenes
  window.scrollTo(0, 0);
}

function updateHud() {
  clueCountSpan.innerHTML = clueCount;
  interviewCountSpan.innerHTML = interviewCount;

  // unlock accusation after enough progress
  if (clueCount >= 2 && interviewCount >= 1) {
    goAccuse.disabled = false;
    goAccuse.classList.remove("locked");
    hallwayHint.innerHTML = "You have enough to make an accusation... or keep looking.";
  }

  if (clueCount === 0) {
    boardNote.innerHTML = "Empty board. Kinda sad.";
  } else if (clueCount < 3) {
    boardNote.innerHTML = "Some pieces... but not the whole story yet.";
  } else if (foundPan === true && foundNote === true) {
    boardNote.innerHTML = "The frying pan + the torn note. Someone was making breakfast... at night??";
  } else {
    boardNote.innerHTML = "Getting closer. Talk to more people.";
  }

  updateClueList();
}

function updateClueList() {
  if (clues.length === 0) {
    clueList.innerHTML = '<li class="empty">Nothing yet. Go look around.</li>';
  } else {
    let html = "";
    let i = 0;
    while (i < clues.length) {
      html = html + "<li>" + clues[i] + "</li>";
      i = i + 1;
    }
    clueList.innerHTML = html;
  }
}

function addClue(text) {
  clues.push(text);
  clueCount = clueCount + 1;
  updateHud();
}

document.getElementById("startBtn").addEventListener("click", function () {
  caseStarted = true;
  hud.classList.remove("hidden");
  showScene("scene-hallway");
  updateHud();
});

document.getElementById("goStudy").addEventListener("click", function () {
  showScene("scene-study");
});

document.getElementById("goKitchen").addEventListener("click", function () {
  showScene("scene-kitchen");
});

document.getElementById("goLiving").addEventListener("click", function () {
  showScene("scene-living");
});

document.getElementById("goBoard").addEventListener("click", function () {
  showScene("scene-board");
  updateHud();
});

document.getElementById("boardBtn").addEventListener("click", function () {
  showScene("scene-board");
  updateHud();
});

document.getElementById("goAccuse").addEventListener("click", function () {
  if (clueCount >= 2 && interviewCount >= 1) {
    showScene("scene-accuse");
  }
});

document.getElementById("backFromStudy").addEventListener("click", function () {
  showScene("scene-hallway");
});

document.getElementById("backFromKitchen").addEventListener("click", function () {
  showScene("scene-hallway");
});

document.getElementById("backFromLiving").addEventListener("click", function () {
  showScene("scene-hallway");
});

document.getElementById("backFromBoard").addEventListener("click", function () {
  showScene("scene-hallway");
});

document.getElementById("clueGun").addEventListener("click", function () {
  if (foundGun === false) {
    foundGun = true;
    addClue("Empty holster on the desk. The gun was taken from here, not from a drawer.");
    studyMsg.innerHTML = "The holster is empty. Whoever shot him already had the gun on them... or took it from this desk.";
    document.getElementById("clueGun").classList.add("found");
  } else {
    studyMsg.innerHTML = "You already checked the holster.";
  }
});

document.getElementById("clueClock").addEventListener("click", function () {
  if (foundClock === false) {
    foundClock = true;
    addClue("Clock stopped at 7:40pm, around when the shot was heard.");
    studyMsg.innerHTML = "The clock face is cracked. It stopped at 7:40. So the murder was in the evening.";
    document.getElementById("clueClock").classList.add("found");
  } else {
    studyMsg.innerHTML = "Still says 7:40.";
  }
});

document.getElementById("clueNote").addEventListener("click", function () {
  if (foundNote === false) {
    foundNote = true;
    addClue("Torn note: \"meet me after dinner - P\"");
    studyMsg.innerHTML = "A torn scrap. It says \"meet me after dinner - P\". Who is P?";
    document.getElementById("clueNote").classList.add("found");
  } else {
    studyMsg.innerHTML = "You already read the note.";
  }
});

document.getElementById("talkCook").addEventListener("click", function () {
  if (talkedCook === false) {
    talkedCook = true;
    interviewCount = interviewCount + 1;
    updateHud();
  }

  // cook says breakfast but its nighttime
  kitchenMsg.innerHTML = "\"I was making breakfast,\" Pell says. \"Eggs. For Mr. Harlan. He likes them early.\" He won't look at you.";
});

document.getElementById("cluePan").addEventListener("click", function () {
  if (foundPan === false) {
    foundPan = true;
    addClue("Warm frying pan + half-cooked eggs. Someone really was cooking... but it's evening.");
    kitchenMsg.innerHTML = "The pan is still warm. Eggs are half done. Weird thing to cook at 7:40pm... unless the cook is covering for something.";
    document.getElementById("cluePan").classList.add("found");
  } else {
    kitchenMsg.innerHTML = "Still warm. Still weird.";
  }
});

document.getElementById("askWife").addEventListener("click", function () {
  if (talkedWife === false) {
    talkedWife = true;
    interviewCount = interviewCount + 1;
    updateHud();
  }

  if (foundNote === true) {
    livingMsg.innerHTML = "Mrs. Harlan: \"I was reading by the fire.\" You show her the note. She flinches. \"P? That's... Pell. The cook. They argued earlier. About money.\"";
  } else {
    livingMsg.innerHTML = "Mrs. Harlan: \"I was reading by the fire the whole evening. I heard a bang but I thought it was the greenhouse door.\"";
  }
});

document.getElementById("askButler").addEventListener("click", function () {
  if (talkedButler === false) {
    talkedButler = true;
    interviewCount = interviewCount + 1;
    updateHud();
  }

  if (foundClock === true) {
    livingMsg.innerHTML = "Graves: \"I was giving instructions in the living room.\" You mention 7:40. \"Yes, that was when Pell rushed past me toward the study. Said he forgot the tea.\"";
  } else {
    livingMsg.innerHTML = "Graves: \"I was giving instructions to the staff in the living room. I didn't see anyone go upstairs.\"";
  }
});

document.getElementById("askGardener").addEventListener("click", function () {
  if (talkedGardener === false) {
    talkedGardener = true;
    interviewCount = interviewCount + 1;
    updateHud();
  }

  livingMsg.innerHTML = "Sam: \"I was watering plants in the greenhouse. Hands were wet the whole time. I don't even own a gun.\"";
});

function finishCase(who) {
  ending.classList.remove("hidden");
  caseSolved = true;

  // correct killer is the cook
  if (who === "cook") {
    endingTitle.innerHTML = "Case closed.";

    if (foundPan === true && foundNote === true) {
      endingText.innerHTML = "You accuse Mr. Pell. The warm pan proves he was in the kitchen at night, and claiming \"breakfast\" is a lie. The note signed \"P\" ties him to a secret meeting. Pell confesses: Harlan was going to fire him and expose a theft. Good detective work.";
    } else if (clueCount >= 2) {
      endingText.innerHTML = "You accuse Mr. Pell. He's the cook who said he was making breakfast... in the evening. That's enough for an arrest. Next time, grab more clues for a cleaner case file.";
    } else {
      endingText.innerHTML = "You accuse Mr. Pell and somehow you're right, but the captain is annoyed you barely collected evidence.";
    }
  } else if (who === "wife") {
    endingTitle.innerHTML = "Wrong suspect.";
    endingText.innerHTML = "Mrs. Harlan was reading by the fire. Graves confirms he saw her there. The real killer slips away. Restart and look closer at the kitchen.";
  } else if (who === "butler") {
    endingTitle.innerHTML = "Wrong suspect.";
    endingText.innerHTML = "Graves has three staff members who back his story. You wasted the arrest. Try again. Someone else's alibi doesn't make sense.";
  } else {
    endingTitle.innerHTML = "Wrong suspect.";
    endingText.innerHTML = "Sam's hands were wet from the greenhouse. No gunpowder. The killer is still in the house. Check the cook's story again.";
  }
}

document.getElementById("accuseWife").addEventListener("click", function () {
  finishCase("wife");
});

document.getElementById("accuseButler").addEventListener("click", function () {
  finishCase("butler");
});

document.getElementById("accuseCook").addEventListener("click", function () {
  finishCase("cook");
});

document.getElementById("accuseGardener").addEventListener("click", function () {
  finishCase("gardener");
});

// restart just reloads the page
document.getElementById("restartBtn").addEventListener("click", function () {
  location.reload();
});
