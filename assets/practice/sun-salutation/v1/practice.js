(function () {
  "use strict";

  var POSES = [
    { sanskrit: "Pranamasana", english: "Prayer Pose", breath: "Exhale", line: "Palms together at the heart.", family: "Standing", gaze: "Nose tip", align: "Heart", figure: "prayer.svg" },
    { sanskrit: "Hasta Uttanasana", english: "Raised Arms Pose", breath: "Inhale", line: "Reach the arms up and open the chest.", family: "Backbend", gaze: "Thumbs", align: "Chest open", figure: "raised.svg" },
    { sanskrit: "Padahastasana", english: "Standing Forward Bend", breath: "Exhale", line: "Fold from the hips. Soften the knees if you need to.", family: "Forward bend", gaze: "Nose tip", align: "Hinge", figure: "fold.svg" },
    { sanskrit: "Ashwa Sanchalanasana", english: "Equestrian Pose", breath: "Inhale", cue: "Right leg back", line: "Right leg steps back. Front knee over the ankle.", family: "Lunge", gaze: "Forward", align: "Lunge", figure: "lunge.svg" },
    { sanskrit: "Dandasana", english: "Plank", breath: "Hold or exhale", line: "Body in one line from heels to crown.", family: "Plank", gaze: "Floor", align: "Long spine", figure: "plank.svg" },
    { sanskrit: "Ashtanga Namaskara", english: "Eight-Point Salute", breath: "Exhale", line: "Knees, chest, and chin come to the floor.", family: "Floor", gaze: "Floor", align: "Eight points", figure: "eight.svg" },
    { sanskrit: "Bhujangasana", english: "Cobra Pose", breath: "Inhale", line: "Press the hands down and lift the chest.", family: "Backbend", gaze: "Brow", align: "Chest open", figure: "cobra.svg" },
    { sanskrit: "Adho Mukha Svanasana", english: "Downward-Facing Dog", breath: "Exhale", line: "Hips lift. Heels move toward the floor.", family: "Inversion", gaze: "Navel", align: "Inverted V", figure: "dog.svg" },
    { sanskrit: "Ashwa Sanchalanasana", english: "Equestrian Pose", breath: "Inhale", cue: "Right foot forward", line: "Right foot steps forward between the hands.", family: "Lunge", gaze: "Forward", align: "Lunge", figure: "lunge-forward.svg" },
    { sanskrit: "Padahastasana", english: "Standing Forward Bend", breath: "Exhale", line: "Fold from the hips again.", family: "Forward bend", gaze: "Nose tip", align: "Hinge", figure: "fold.svg" },
    { sanskrit: "Hasta Uttanasana", english: "Raised Arms Pose", breath: "Inhale", line: "Rise all the way up and reach.", family: "Backbend", gaze: "Thumbs", align: "Chest open", figure: "raised.svg" },
    { sanskrit: "Pranamasana", english: "Prayer Pose", breath: "Exhale", line: "Palms return to the heart.", family: "Standing", gaze: "Nose tip", align: "Heart", figure: "prayer.svg" }
  ];

  var SOUND_LABELS = { tick: "Tick", bowl: "Bowl", breath: "Breath", voice: "Voice" };
  var root = document.querySelector("[data-practice]");
  if (!root) return;

  var screens = {
    choose: root.querySelector('[data-screen="choose"]'),
    run: root.querySelector('[data-screen="run"]')
  };
  var doneDialog = root.querySelector("[data-done-dialog]");
  var ledeEl = root.querySelector("[data-lede]");
  var voiceSelect = root.querySelector("[data-voice]");
  var figureEl = root.querySelector("[data-figure]");
  var figureBase = root.getAttribute("data-figures");
  var sanskritEl = root.querySelector("[data-sanskrit]");
  var englishEl = root.querySelector("[data-english]");
  var breathEl = root.querySelector("[data-breath]");
  var cueEl = root.querySelector("[data-cue]");
  var cueWrapEl = root.querySelector("[data-cue-wrap]");
  var lineEl = root.querySelector("[data-line]");
  var liveEl = root.querySelector("[data-live]");
  var doneSummaryEl = root.querySelector("[data-done-summary]");
  var doneTitleEl = root.querySelector("[data-done-title]");
  var clockEl = root.querySelector("[data-clock]");
  var meterEl = root.querySelector("[data-meter]");
  var cycleEl = root.querySelector("[data-cycle]");
  var cycleOfEl = root.querySelector("[data-cycle-of]");
  var breathTimeEl = root.querySelector("[data-breath-time]");
  var breathBarEl = root.querySelector("[data-breath-bar]");
  var breathDurationEl = root.querySelector("[data-breath-duration]");
  var roundLabelEl = root.querySelector("[data-round-label]");
  var roundChipEl = root.querySelector("[data-round-chip]");
  var stepLabelEl = root.querySelector("[data-step-label]");
  var stepChipEl = root.querySelector("[data-step-chip]");
  var gazeEl = root.querySelector("[data-gaze]");
  var familyEl = root.querySelector("[data-family]");
  var familyLiveEl = root.querySelector("[data-family-live]");
  var readoutBreathEl = root.querySelector("[data-readout-breath]");
  var readoutHoldEl = root.querySelector("[data-readout-hold]");
  var alignEl = root.querySelector("[data-align]");
  var nextInEl = root.querySelector("[data-next-in]");
  var nextStepEl = root.querySelector("[data-next-step]");
  var nextNameEl = root.querySelector("[data-next-name]");
  var nextBreathEl = root.querySelector("[data-next-breath]");
  var pausedEl = root.querySelector("[data-paused]");
  var pauseButton = root.querySelector('[data-action="pause"]');
  var pauseLabel = root.querySelector("[data-pause-label]");
  var pauseIcon = root.querySelector('[data-icon="pause"]');
  var playIcon = root.querySelector('[data-icon="play"]');
  var muteButton = root.querySelector('[data-action="mute"]');
  var soundLabelEl = root.querySelector("[data-sound-label]");
  var fullscreenButton = root.querySelector('[data-action="fullscreen"]');
  var fullscreenLabel = root.querySelector("[data-fullscreen-label]");
  var stepCells = root.querySelectorAll(".studio-step");

  var selectedRounds = 5;
  var selectedPoseSeconds = 4;
  var selectedSound = "voice";
  var selectedVoiceName = "";
  var soundMuted = false;
  var FEMALE_VOICES = ["ava", "allison", "zoe", "samantha", "susan", "karen", "moira", "fiona", "serena", "kate", "tessa", "kathy", "victoria", "nicky", "joanna", "salli", "kimberly", "ivy", "female"];
  var MALE_VOICES = ["alex", "daniel", "fred", "tom", "aaron", "nathan", "rishi", "arthur", "oliver", "evan", "reed", "bruce", "gordon", "junior", "male"];
  var audioCtx = null;
  var wakeLock = null;
  var timerId = null;
  var session = null;

  POSES.forEach(function (pose, index) {
    if (stepCells[index]) stepCells[index].title = pose.sanskrit;
  });

  function show(name) {
    Object.keys(screens).forEach(function (key) {
      if (screens[key]) screens[key].hidden = key !== name;
    });
    document.body.classList.toggle("practice-session", name === "run");
  }

  function pad2(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function formatClock(ms) {
    var total = Math.max(0, Math.floor(ms / 1000));
    var minutes = Math.floor(total / 60);
    var seconds = total % 60;
    return pad2(minutes) + ":" + pad2(seconds);
  }

  function breathPhase(breath) {
    var label = String(breath).toLowerCase();
    if (label.indexOf("inhale") !== -1) return "Inhale";
    if (label.indexOf("hold") !== -1) return "Hold";
    return "Exhale";
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
    if (!voices.length || !voiceSelect) return;
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
    if (soundMuted) return;
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
    if (liveEl) liveEl.textContent = parts.join(". ");
  }

  function paintSound() {
    var name = SOUND_LABELS[session ? session.sound : selectedSound] || "Sound";
    var label = soundMuted ? "Sound: off" : name + ": on";
    text(soundLabelEl, label);
    if (!muteButton) return;
    muteButton.setAttribute("aria-label", soundMuted ? "Sound off" : name + " on");
    muteButton.setAttribute("aria-pressed", soundMuted ? "true" : "false");
  }

  function paintFullscreen() {
    var on = !!document.fullscreenElement;
    text(fullscreenLabel, on ? "Exit" : "Projection");
    if (fullscreenButton) {
      fullscreenButton.setAttribute("aria-label", on ? "Exit studio projection" : "Studio projection");
    }
  }

  function setPaused(paused) {
    if (screens.run) screens.run.classList.toggle("is-paused", paused);
    if (pausedEl) pausedEl.hidden = !paused;
    text(pauseLabel, paused ? "Resume practice" : "Pause practice");
    if (pauseButton) pauseButton.setAttribute("aria-pressed", paused ? "true" : "false");
    if (pauseIcon) pauseIcon.hidden = paused;
    if (playIcon) playIcon.hidden = !paused;
  }

  function text(el, value) {
    if (el) el.textContent = value;
  }

  function paint(elapsed) {
    var poseMs = session.poseSeconds * 1000;
    var perRound = session.poseSeconds * POSES.length;
    var totalMs = session.rounds * perRound * 1000;
    var clamped = Math.min(Math.max(0, elapsed), Math.max(0, totalMs - 1));
    var secondIndex = Math.floor(clamped / 1000);
    var poseIndex = Math.floor(secondIndex / session.poseSeconds) % POSES.length;
    var roundIndex = Math.floor(secondIndex / perRound);
    var into = clamped % poseMs;
    var remainMs = poseMs - into;
    var secondsLeft = Math.max(1, Math.ceil(remainMs / 1000));
    var ratio = remainMs / poseMs;
    var pose = POSES[poseIndex];
    var nextIndex = (poseIndex + 1) % POSES.length;
    var next = POSES[nextIndex];
    var lastPose = roundIndex + 1 === session.rounds && poseIndex === POSES.length - 1;
    var holdLabel = session.poseSeconds.toFixed(1) + "s";
    var roundText = "Cycle " + pad2(roundIndex + 1) + " / " + pad2(session.rounds);
    var stepText = "Step " + pad2(poseIndex + 1) + " / " + pad2(POSES.length);

    text(cycleEl, pad2(roundIndex + 1));
    text(cycleOfEl, "of " + pad2(session.rounds));
    text(clockEl, formatClock(clamped) + " total");
    if (meterEl) meterEl.style.width = (totalMs ? (clamped / totalMs) * 100 : 0) + "%";
    text(roundLabelEl, roundText);
    text(roundChipEl, roundText);
    text(stepLabelEl, stepText);
    text(stepChipEl, stepText);
    text(breathEl, breathPhase(pose.breath));
    if (breathTimeEl) breathTimeEl.innerHTML = (remainMs / 1000).toFixed(1) + "<span>s</span>";
    text(breathDurationEl, holdLabel);
    if (breathBarEl) breathBarEl.style.width = (ratio * 100) + "%";
    text(lineEl, pose.line);
    text(readoutBreathEl, breathPhase(pose.breath));
    text(readoutHoldEl, holdLabel);
    text(alignEl, pose.align);
    text(gazeEl, "Gaze: " + pose.gaze);
    text(familyEl, pose.family);
    text(familyLiveEl, pose.family);
    text(sanskritEl, pose.sanskrit);
    text(englishEl, pose.english);
    if (cueWrapEl) cueWrapEl.hidden = !pose.cue;
    text(cueEl, pose.cue || "");

    if (lastPose) {
      text(nextInEl, "Last pose · " + pad2(secondsLeft) + "s");
      text(nextStepEl, "Then finish");
      text(nextNameEl, "Session complete");
      text(nextBreathEl, "");
    } else {
      text(nextInEl, "Up next in " + pad2(secondsLeft) + "s");
      text(nextStepEl, "Next: step " + pad2(nextIndex + 1));
      text(nextNameEl, next.sanskrit);
      text(nextBreathEl, breathPhase(next.breath) + " · " + holdLabel);
    }

    stepCells.forEach(function (cell, index) {
      cell.classList.toggle("is-done", index < poseIndex);
      cell.classList.toggle("is-now", index === poseIndex);
    });

    if (poseIndex !== session.poseShown || roundIndex !== session.roundShown) {
      session.poseShown = poseIndex;
      session.roundShown = roundIndex;
      if (figureEl) figureEl.src = figureBase + pose.figure;
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
    var poseSeconds = session.poseSeconds;
    var totalSec = rounds * POSES.length * poseSeconds;
    if (!session.completionBellPlayed && !soundMuted) {
      session.completionBellPlayed = true;
      playBell();
    }
    session.phase = "done";
    stopLoop();
    releaseWakeLock();
    stopSpeech();
    text(doneSummaryEl, rounds + (rounds === 1 ? " cycle" : " cycles") + " · " + formatClock(totalSec * 1000));
    if (doneDialog && !doneDialog.open) doneDialog.showModal();
    if (doneTitleEl) doneTitleEl.focus();
  }

  function sync() {
    if (!session || session.phase === "done") return;
    var perRound = session.poseSeconds * POSES.length;
    var totalMs = session.rounds * perRound * 1000;
    var elapsed = elapsedMs();

    if (session.phase === "run" && elapsed >= totalMs) {
      session.completionBellPlayed = true;
      if (!soundMuted) playBell();
      finish();
      return;
    }

    if (session.phase === "run") {
      var secondIndex = Math.floor(elapsed / 1000);
      if (secondIndex !== session.lastSecond) {
        var previous = session.lastSecond;
        session.lastSecond = secondIndex;
        var secondInPose = secondIndex % session.poseSeconds;
        var pose = POSES[Math.floor(secondIndex / session.poseSeconds) % POSES.length];
        if (previous >= 0 && Math.floor(secondIndex / perRound) > Math.floor(previous / perRound)) {
          if (!soundMuted) playBell();
        }
        try {
          playPoseSound(session.sound, pose, secondInPose);
        } catch (error) {}
      }
    }

    paint(session.phase === "run" ? elapsed : session.accumulated);
  }

  function loop() {
    if (!session || session.phase !== "run") return;
    try {
      sync();
    } catch (error) {}
    if (session && session.phase === "run") {
      timerId = window.setTimeout(loop, 100);
    }
  }

  function begin(rounds) {
    if (session && session.phase !== "done") return;
    ensureAudio();
    stopSpeech();
    soundMuted = false;
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
    paintSound();
    show("run");
    if (screens.run) screens.run.focus();
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

  function jumpPose(delta) {
    if (!session || session.phase === "done") return;
    var poseMs = session.poseSeconds * 1000;
    var perRoundMs = poseMs * POSES.length;
    var totalMs = session.rounds * POSES.length * poseMs;
    var elapsed = elapsedMs();
    var poseStart = Math.floor(elapsed / poseMs) * poseMs;
    var target = poseStart + delta * poseMs;
    if (target < 0) target = 0;
    if (target >= totalMs) {
      finish();
      return;
    }
    var previousRound = Math.floor(elapsed / perRoundMs);
    var nextRound = Math.floor(target / perRoundMs);
    if (session.phase === "run") {
      session.accumulated = target;
      session.startedAt = performance.now();
    } else {
      session.accumulated = target;
    }
    session.poseShown = -1;
    session.roundShown = -1;
    var secondIndex = Math.floor(target / 1000);
    session.lastSecond = secondIndex;
    if (nextRound > previousRound && !soundMuted) playBell();
    var pose = POSES[Math.floor(secondIndex / session.poseSeconds) % POSES.length];
    playPoseSound(session.sound, pose, 0);
    paint(target);
  }

  function endSession() {
    session = null;
    stopLoop();
    releaseWakeLock();
    stopSpeech();
    soundMuted = false;
    setPaused(false);
    paintSound();
    if (liveEl) liveEl.textContent = "";
    show("choose");
    if (doneDialog && doneDialog.open) doneDialog.close();
    var current = root.querySelector('[data-rounds="' + selectedRounds + '"]');
    window.setTimeout(function () {
      if (current) current.focus();
    }, 0);
  }

  function selectExclusive(button, attr) {
    root.querySelectorAll("[" + attr + "]").forEach(function (other) {
      other.setAttribute("aria-pressed", other === button ? "true" : "false");
    });
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

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(function () {});
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(function () {});
    }
  }

  root.addEventListener("click", function (event) {
    var button = event.target.closest("button");
    if (!button || !root.contains(button)) return;

    if (button.hasAttribute("data-rounds")) {
      selectedRounds = Number(button.getAttribute("data-rounds"));
      selectExclusive(button, "data-rounds");
      return;
    }
    if (button.hasAttribute("data-pose-seconds")) {
      selectedPoseSeconds = Number(button.getAttribute("data-pose-seconds"));
      selectExclusive(button, "data-pose-seconds");
      ledeEl.textContent = "Twelve poses, " + selectedPoseSeconds + " seconds each.";
      return;
    }
    if (button.hasAttribute("data-sound")) {
      selectedSound = button.getAttribute("data-sound");
      selectExclusive(button, "data-sound");
      return;
    }

    var action = button.getAttribute("data-action");
    if (action === "preview") previewSound();
    else if (action === "start") begin(selectedRounds);
    else if (action === "pause") pauseOrResume();
    else if (action === "prev") jumpPose(-1);
    else if (action === "next") jumpPose(1);
    else if (action === "end") finish();
    else if (action === "again" || action === "close") endSession();
    else if (action === "mute") {
      soundMuted = !soundMuted;
      if (soundMuted) stopSpeech();
      paintSound();
    } else if (action === "fullscreen") {
      toggleFullscreen();
    }
  });

  if (voiceSelect) {
    voiceSelect.addEventListener("change", function () {
      selectedVoiceName = voiceSelect.value;
    });
  }

  fillVoices();
  if (window.speechSynthesis) {
    window.speechSynthesis.addEventListener("voiceschanged", fillVoices);
  }

  document.addEventListener("fullscreenchange", paintFullscreen);
  paintSound();
  paintFullscreen();

  if (doneDialog) {
    doneDialog.addEventListener("close", function () {
      if (session) endSession();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (doneDialog && doneDialog.open) return;
    if (!session || screens.run.hidden) return;
    var tag = event.target && event.target.tagName;
    if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
    if (event.key === " " && event.target.closest && event.target.closest("button")) return;
    if (event.key === " " || event.code === "Space") {
      event.preventDefault();
      pauseOrResume();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      jumpPose(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      jumpPose(-1);
    }
  });

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && session && session.phase === "run") {
      acquireWakeLock();
    }
  });
})();
