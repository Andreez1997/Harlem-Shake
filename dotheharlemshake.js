javascript:(function () {
  "use strict";

  var prefix = "harlem-shake-2026-";
  var root = "https://cdn.jsdelivr.net/gh/Andreez1997/Harlem-Shake@main/";
  var shakeClass = "mw-harlem_shake_me";
  var firstClass = "im_first";
  var effects = ["im_drunk", "im_baked", "im_trippin", "im_blown"];

  if (window[prefix + "running"]) {
    window[prefix + "running"]();
    return;
  }

  var style = document.createElement("link");
  style.id = prefix + "style";
  style.rel = "stylesheet";
  style.href = root + "harlem-shake-style.css";
  document.head.appendChild(style);

  var audio = document.createElement("audio");
  audio.id = prefix + "audio";
  audio.src = root + "harlem-shake.mp3";
  audio.preload = "auto";
  audio.style.display = "none";
  document.body.appendChild(audio);

  var strobeTimer;
  var finishTimer;
  var remainingTimers = [];

  function removeAnimation(element) {
    [shakeClass, firstClass].concat(effects).forEach(function (className) {
      element.classList.remove(className);
    });
  }

  function stop() {
    clearTimeout(strobeTimer);
    clearTimeout(finishTimer);
    remainingTimers.forEach(clearTimeout);
    audio.pause();
    audio.currentTime = 0;
    Array.from(document.querySelectorAll("." + shakeClass)).forEach(removeAnimation);
    document.querySelectorAll(".mw-strobe_light").forEach(function (strobe) {
      strobe.remove();
    });
    style.remove();
    audio.remove();
    window[prefix + "running"] = null;
  }

  window[prefix + "running"] = stop;

  function startEffects() {
    var candidates = Array.from(document.body.querySelectorAll("*")).filter(function (element) {
      if (element.tagName === "SCRIPT" || element.tagName === "STYLE" || element.tagName === "LINK") {
        return false;
      }
      var rect = element.getBoundingClientRect();
      return rect.width > 30 && rect.width < 350 && rect.height > 30 && rect.height < 350;
    });

    var visible = candidates.filter(function (element) {
      var rect = element.getBoundingClientRect();
      var top = rect.top + window.scrollY;
      var bottom = rect.bottom + window.scrollY;
      return bottom > window.scrollY && top < window.innerHeight + window.scrollY;
    });

    var target = visible[Math.floor(Math.random() * visible.length)];
    if (target) {
      target.classList.add(shakeClass, firstClass);
    }

    visible.forEach(function (element) {
      if (element === target) {
        return;
      }
      var effect = effects[Math.floor(Math.random() * effects.length)];
      element.classList.add(shakeClass, effect);
    });
  }

  audio.addEventListener("ended", stop);
  audio.addEventListener("error", function () {
    console.error("Harlem Shake audio could not be loaded.");
    stop();
  }, { once: true });

  var playPromise = audio.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(function () {
      console.error("The browser blocked bookmarklet audio playback.");
      stop();
    });
  } else if (audio.paused) {
    stop();
    return;
  }

  strobeTimer = setTimeout(function () {
    var strobe = document.createElement("div");
    strobe.className = "mw-strobe_light";
    strobe.style.pointerEvents = "none";
    document.body.appendChild(strobe);
    remainingTimers.push(setTimeout(function () {
      strobe.remove();
    }, 100));
    startEffects();
  }, 15500);

  finishTimer = setTimeout(stop, 31000);
})(window);
