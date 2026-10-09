(function () {
  "use strict";

  var POSES = [
    { sanskrit: "Pranamasana", english: "Prayer Pose", breath: "Exhale", figure: "prayer.svg" },
    { sanskrit: "Hasta Uttanasana", english: "Raised Arms Pose", breath: "Inhale", figure: "raised.svg" },
    { sanskrit: "Padahastasana", english: "Standing Forward Bend", breath: "Exhale", figure: "fold.svg" },
    { sanskrit: "Ashwa Sanchalanasana", english: "Equestrian Pose", breath: "Inhale", cue: "Right leg back", figure: "lunge.svg" },
    { sanskrit: "Dandasana", english: "Plank", breath: "Hold or exhale", figure: "plank.svg" },
    { sanskrit: "Ashtanga Namaskara", english: "Eight-Point Salute", breath: "Exhale", figure: "eight.svg" },
    { sanskrit: "Bhujangasana", english: "Cobra Pose", breath: "Inhale", figure: "cobra.svg" },
    { sanskrit: "Adho Mukha Svanasana", english: "Downward-Facing Dog", breath: "Exhale", figure: "dog.svg" },
    { sanskrit: "Ashwa Sanchalanasana", english: "Equestrian Pose", breath: "Inhale", cue: "Right foot forward", figure: "lunge-forward.svg" },
    { sanskrit: "Padahastasana", english: "Standing Forward Bend", breath: "Exhale", figure: "fold.svg" },
    { sanskrit: "Hasta Uttanasana", english: "Raised Arms Pose", breath: "Inhale", figure: "raised.svg" },
    { sanskrit: "Pranamasana", english: "Prayer Pose", breath: "Exhale", figure: "prayer.svg" }
  ];

  var root = document.querySelector("[data-practice]");
  if (!root) return;

  var screens = {
    choose: root.querySelector('[data-screen="choose"]'),
    run: root.querySelector('[data-screen="run"]')
  };
  var doneDialog = root.querySelector("[data-done-dialog]");
  var roundButtons = root.querySelectorAll("[data-rounds]");
  var secondButtons = root.querySelectorAll("[data-pose-seconds]");
  var soundButtons = root.querySelectorAll("[data-sound]");
  var ledeEl = root.querySelector("[data-lede]");
  var previewButton = root.querySelector('[data-action="preview"]');
  var startButton = root.querySelector('[data-action="start"]');
  var pauseButton = root.querySelector('[data-action="pause"]');
  var endButton = root.querySelector('[data-action="end"]');
  var againButton = root.querySelector('[data-action="again"]');
  var roundEl = root.querySelector("[data-round]");
  var roundOfEl = root.querySelector("[data-round-of]");
  var voiceSelect = root.querySelector("[data-voice]");
  var poseIndexEl = root.querySelector("[data-pose-index]");
  var secondsEl = root.querySelector("[data-seconds]");
  var figureEl = root.querySelector("[data-figure]");
  var figureBase = root.getAttribute("data-figures");
  var sanskritEl = root.querySelector("[data-sanskrit]");
  var englishEl = root.querySelector("[data-english]");
  var breathEl = root.querySelector("[data-breath]");
  var cueEl = root.querySelector("[data-cue]");
  var statusEl = root.querySelector("[data-status]");
  var liveEl = root.querySelector("[data-live]");
  var doneSummaryEl = root.querySelector("[data-done-summary]");
  var doneTitleEl = root.querySelector("[data-done-title]");

  var selectedRounds = 5;
  var selectedPoseSeconds = 4;
  var selectedSound = "voice";
  var selectedVoiceName = "";
  var FEMALE_VOICES = ["ava", "allison", "zoe", "samantha", "susan", "karen", "moira", "fiona", "serena", "kate", "tessa", "kathy", "victoria", "nicky", "joanna", "salli", "kimberly", "ivy", "female"];
  var MALE_VOICES = ["alex", "daniel", "fred", "tom", "aaron", "nathan", "rishi", "arthur", "oliver", "evan", "reed", "bruce", "gordon", "junior", "male"];
  var audioCtx = null;
  var wakeLock = null;
  var timerId = null;
  var session = null;

  function show(name) {
    Object.keys(screens).forEach(function (key) {
      screens[key].hidden = key !== name;
    });
    document.body.classList.toggle("practice-session", name === "run");
  }

  function elapsedMs() {
    if (!session) return 0;
    if (session.phase === "run") {
      return session.accumulated + (performance.now() - session.startedAt);
    }
    return session.accumulated;
  }

  function ensureAudio() {
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return Promise.resolve();
      if (!audioCtx) audioCtx = new Ctx();
      if (audioCtx.state === "suspended") return audioCtx.resume();
    } catch (error) {
      return Promise.resolve();
    }
    return Promise.resolve();
  }

  function tone(frequency, peak, attack, decay, type) {
    if (!audioCtx) return;
    var t = audioCtx.currentTime;
    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    osc.type = type || "sine";
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(peak, t + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + decay + 0.02);
  }

  function playClick(kind) {
    if (kind === "tick") tone(880, 0.12, 0.004, 0.05, "sine");
    else tone(440, 0.1, 0.004, 0.07, "sine");
  }

  function playBell() {
    var fundamental = 392;
    var ratios = [1, 2, 2.98, 4.07];
    ratios.forEach(function (ratio, index) {
      tone(fundamental * ratio, 0.16 / (index + 1), 0.012, 1.5 - index * 0.28, "sine");
    });
  }

  function playBowl() {
    var fundamental = 246.94;
    [1, 2, 2.76, 5.04].forEach(function (ratio, index) {
      tone(fundamental * ratio, 0.09 / (index + 1), 0.02, 2.2 - index * 0.35, "sine");
    });
  }

  function playBreath(breath) {
    if (!audioCtx) return;
    var label = String(breath).toLowerCase();
    var inhale = label.indexOf("inhale") !== -1;
    var hold = label.indexOf("hold") !== -1;
    var t = audioCtx.currentTime;
    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(hold ? 262 : inhale ? 196 : 330, t);
    osc.frequency.exponentialRampToValueAtTime(hold ? 262 : inhale ? 349 : 174, t + 0.85);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.07, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.95);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + 1);
  }

  function stopSpeech() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  function scoreVoice(voice) {
    var name = voice.name.toLowerCase();
    var lang = (voice.lang || "").toLowerCase().replace("_", "-");
    if (lang.indexOf("en") !== 0) return -1;
    var score = lang.indexOf("en-us") === 0 || lang.indexOf("en-gb") === 0 ? 3 : 1;
    FEMALE_VOICES.forEach(function (hint) {
      if (name.indexOf(hint) !== -1) score += 8;
    });
    MALE_VOICES.forEach(function (hint) {
      if (name.indexOf(hint) !== -1) score -= 6;
    });
    if (/premium|enhanced|natural|neural/.test(name)) score += 6;
    return score;
  }

  function englishVoices() {
    if (!window.speechSynthesis) return [];
    return window.speechSynthesis.getVoices().filter(function (voice) {
      return scoreVoice(voice) >= 0;
    }).sort(function (a, b) {
      var aGoogle = a.name === "Google US English" ? 1 : 0;
      var bGoogle = b.name === "Google US English" ? 1 : 0;
      if (aGoogle !== bGoogle) return bGoogle - aGoogle;
      return scoreVoice(b) - scoreVoice(a);
    });
  }

  function preferredVoice(voices) {
    var i;
    var name;
    var lang;
    for (i = 0; i < voices.length; i += 1) {
      if (voices[i].name === "Google US English") return voices[i];
    }
    for (i = 0; i < voices.length; i += 1) {
      name = voices[i].name.toLowerCase();
      lang = (voices[i].lang || "").toLowerCase().replace("_", "-");
      if (name.indexOf("google") !== -1 && lang.indexOf("en-us") === 0) return voices[i];
    }
    for (i = 0; i < voices.length; i += 1) {
      lang = (voices[i].lang || "").toLowerCase().replace("_", "-");
      if (lang.indexOf("en-us") === 0) return voices[i];
    }
    return voices[0] || null;
  }

  function voiceLabel(voice) {
    var pretty = voice.lang || "";
    try {
      pretty = new Intl.DisplayNames(["en"], { type: "language" }).of(voice.lang) || pretty;
    } catch (error) {}
    return voice.name + " · " + pretty;
  }

  function chosenVoice() {
    var voices = englishVoices();
    var i;
    for (i = 0; i < voices.length; i += 1) {
      if (voices[i].name === selectedVoiceName) return voices[i];
    }
    return preferredVoice(voices);
  }

  function fillVoices() {
    var voices = englishVoices();
    var preferred;
    if (!voices.length) return;
    if (!selectedVoiceName) {
      preferred = preferredVoice(voices);
      selectedVoiceName = preferred ? preferred.name : voices[0].name;
    }
    voiceSelect.textContent = "";
    voices.forEach(function (voice) {
      var option = document.createElement("option");
      option.value = voice.name;
      option.textContent = voiceLabel(voice);
      option.selected = voice.name === selectedVoiceName;
      voiceSelect.appendChild(option);
    });
  }

  function speak(pose) {
    if (!window.speechSynthesis) return;
    stopSpeech();
    var text = pose.breath + ". " + pose.english;
    if (pose.cue) text += ". " + pose.cue;
    var utterance = new SpeechSynthesisUtterance(text);
    var voice = chosenVoice();
    utterance.lang = voice ? voice.lang : "en-US";
    utterance.rate = 0.9;
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  }

  function playPoseSound(sound, pose, secondInPose) {
    if (sound === "tick") {
      playClick(secondInPose % 2 === 0 ? "tick" : "tock");
      return;
    }
    if (secondInPose !== 0) return;
    if (sound === "bowl") playBowl();
    else if (sound === "breath") playBreath(pose.breath);
    else if (sound === "voice") speak(pose);
  }

  function acquireWakeLock() {
    if (!navigator.wakeLock) return;
    navigator.wakeLock.request("screen").then(function (lock) {
      wakeLock = lock;
    }).catch(function () {});
  }

  function releaseWakeLock() {
    if (!wakeLock) return;
    wakeLock.release().catch(function () {});
    wakeLock = null;
  }

  function announce(roundNumber, pose) {
    var parts = [
      "Cycle " + roundNumber,
      pose.sanskrit,
      pose.english,
      pose.breath
    ];
    if (pose.cue) parts.push(pose.cue);
    liveEl.textContent = parts.join(". ");
  }

  function render(secondIndex) {
    var poseSeconds = session.poseSeconds;
    var poseIndex = Math.floor(secondIndex / poseSeconds) % POSES.length;
    var roundIndex = Math.floor(secondIndex / (poseSeconds * POSES.length));
    var secondsLeft = poseSeconds - (secondIndex % poseSeconds);
    var pose = POSES[poseIndex];

    secondsEl.textContent = String(secondsLeft);
    roundEl.textContent = String(roundIndex + 1);
    roundOfEl.textContent = "of " + session.rounds;
    poseIndexEl.textContent = "Pose " + (poseIndex + 1) + " of " + POSES.length;
    sanskritEl.textContent = pose.sanskrit;
    englishEl.textContent = pose.english;
    breathEl.textContent = pose.breath;
    cueEl.hidden = !pose.cue;
    cueEl.textContent = pose.cue || "";

    if (poseIndex !== session.poseShown || roundIndex !== session.roundShown) {
      session.poseShown = poseIndex;
      session.roundShown = roundIndex;
      figureEl.src = figureBase + pose.figure;
      announce(roundIndex + 1, pose);
    }
  }

  function stopLoop() {
    if (timerId !== null) {
      window.clearTimeout(timerId);
      timerId = null;
    }
  }

  function finish() {
    if (!session || session.phase === "done") return;
    var rounds = session.rounds;
    session.phase = "done";
    stopLoop();
    releaseWakeLock();
    stopSpeech();
    if (doneSummaryEl) {
      doneSummaryEl.textContent = rounds + (rounds === 1 ? " cycle" : " cycles");
    }
    if (doneDialog && !doneDialog.open) doneDialog.showModal();
    if (doneTitleEl) doneTitleEl.focus();
  }

  function sync() {
    if (!session || session.phase !== "run") return;
    var perRound = session.poseSeconds * POSES.length;
    var totalMs = session.rounds * perRound * 1000;
    var elapsed = elapsedMs();

    if (elapsed >= totalMs) {
      if (!session.completionBellPlayed) {
        session.completionBellPlayed = true;
        playBell();
      }
      finish();
      return;
    }

    var secondIndex = Math.floor(elapsed / 1000);
    if (secondIndex !== session.lastSecond) {
      var previous = session.lastSecond;
      session.lastSecond = secondIndex;
      var secondInPose = secondIndex % session.poseSeconds;
      var pose = POSES[Math.floor(secondIndex / session.poseSeconds) % POSES.length];
      if (previous >= 0 && Math.floor(secondIndex / perRound) > Math.floor(previous / perRound)) {
        playBell();
      }
      playPoseSound(session.sound, pose, secondInPose);
    }
    render(secondIndex);
  }

  function loop() {
    if (!session || session.phase !== "run") return;
    sync();
    if (session && session.phase === "run") {
      timerId = window.setTimeout(loop, 100);
    }
  }

  function setPaused(paused) {
    statusEl.hidden = !paused;
    pauseButton.textContent = paused ? "Resume" : "Pause";
    pauseButton.setAttribute("aria-pressed", paused ? "true" : "false");
  }

  function begin(rounds) {
    if (session && session.phase !== "done") return;
    ensureAudio();
    stopSpeech();
    session = {
      rounds: rounds,
      poseSeconds: selectedPoseSeconds,
      sound: selectedSound,
      phase: "run",
      accumulated: 0,
      startedAt: performance.now(),
      lastSecond: -1,
      poseShown: -1,
      roundShown: -1,
      completionBellPlayed: false
    };
    setPaused(false);
    show("run");
    sanskritEl.focus();
    acquireWakeLock();
    loop();
  }

  function pauseOrResume() {
    if (!session || session.phase === "done") return;
    if (session.phase === "run") {
      session.accumulated = elapsedMs();
      session.phase = "paused";
      stopLoop();
      releaseWakeLock();
      stopSpeech();
      setPaused(true);
      return;
    }
    ensureAudio();
    session.phase = "run";
    session.startedAt = performance.now();
    setPaused(false);
    acquireWakeLock();
    loop();
  }

  function endSession() {
    session = null;
    stopLoop();
    releaseWakeLock();
    stopSpeech();
    setPaused(false);
    if (liveEl) liveEl.textContent = "";
    show("choose");
    if (doneDialog && doneDialog.open) doneDialog.close();
    var current = selectedRounds ? root.querySelector('[data-rounds="' + selectedRounds + '"]') : null;
    window.setTimeout(function () {
      if (current) current.focus();
    }, 0);
  }

  roundButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedRounds = Number(button.getAttribute("data-rounds"));
      roundButtons.forEach(function (other) {
        other.setAttribute("aria-pressed", other === button ? "true" : "false");
      });
      startButton.disabled = false;
    });
  });

  secondButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedPoseSeconds = Number(button.getAttribute("data-pose-seconds"));
      secondButtons.forEach(function (other) {
        other.setAttribute("aria-pressed", other === button ? "true" : "false");
      });
      ledeEl.textContent = "Twelve poses, " + selectedPoseSeconds + " seconds each.";
    });
  });

  soundButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedSound = button.getAttribute("data-sound");
      soundButtons.forEach(function (other) {
        other.setAttribute("aria-pressed", other === button ? "true" : "false");
      });
    });
  });

  voiceSelect.addEventListener("change", function () {
    selectedVoiceName = voiceSelect.value;
  });

  fillVoices();
  if (window.speechSynthesis) {
    window.speechSynthesis.addEventListener("voiceschanged", fillVoices);
  }

  function previewSound() {
    ensureAudio();
    stopSpeech();
    if (selectedSound === "tick") {
      playClick("tick");
      window.setTimeout(function () { playClick("tock"); }, 220);
    } else if (selectedSound === "bowl") {
      playBowl();
    } else if (selectedSound === "breath") {
      playBreath("Inhale");
    } else if (selectedSound === "voice") {
      speak({ breath: "Inhale", english: "Raised Arms Pose" });
    }
  }

  previewButton.addEventListener("click", previewSound);

  startButton.addEventListener("click", function () {
    if (!selectedRounds) return;
    begin(selectedRounds);
  });

  pauseButton.addEventListener("click", pauseOrResume);
  endButton.addEventListener("click", finish);
  if (againButton) againButton.addEventListener("click", endSession);
  var closeButton = root.querySelector('[data-action="close"]');
  if (closeButton) closeButton.addEventListener("click", endSession);
  if (doneDialog) {
    doneDialog.addEventListener("close", function () {
      if (session) endSession();
    });
  }

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && session && session.phase === "run") {
      acquireWakeLock();
    }
  });
})();
