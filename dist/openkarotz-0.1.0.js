/*!
 * OpenKarotz.js - openkarotz-js
 * Copyright (c) 2013 Olive
 *
 * http://opensource.org/licenses/MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

if (karotz_ip === undefined) {
	console.log("variable karotz_ip is required!");
	throw new Error("variable karotz_ip is required!");
}

// Global variables
var currentStatus = new Array();

// API URLs
var karotz_api = "http://" + karotz_ip + "/cgi-bin";

var apiStatus = karotz_api + '/status';
var apiSleep = karotz_api + '/sleep';
var apiWakeup = karotz_api + '/wakeup';
var apiReboot = karotz_api + '/reboot';
var apiSound = karotz_api + '/sound';
var apiSoundControl = karotz_api + '/sound_control';
var apiLeds = karotz_api + '/leds';
var apiEars = karotz_api + '/ears';
var apiEarsReset = karotz_api + '/ears_reset';
var apiEarsRandom = karotz_api + '/ears_random';
var apiMoods = karotz_api + '/moods';
var apiTts = karotz_api + '/tts';


/*
 * OpenKarotz APIs
 */

/**
 * Status API: get OpenKarotz status, stored in currentStatus variable.
 * @param onSuccess if defined, called on successful API execution
 * @param onFailure if defined, called on failed API execution
 */
function status(onSuccess, onFailure) {
  $.get(apiStatus, function(data) {
    console.log("status: " + data);
	// /!\ no "return" in status api response
    if (data) {
      var result = JSON.parse(data);
      currentStatus = result;
      if (onSuccess) {
        onSuccess();
      }
    } else {
      currentStatus.sleep = 1;
      if (onFailure) {
        onFailure();
      }
    }
  });
}

/**
 * Sleep API: put Karotz to sleep.
 * @param onSuccess if defined, called on successful API execution
 * @param onFailure if defined, called on failed API execution with parameter: error_message
 */
function sleep(onSuccess, onFailure) {
  $.get(apiSleep, function(data) {
    console.log("sleep: " + data);
    var result = JSON.parse(data);
    if (result.return == 0) {
      currentStatus.sleep = 1;
      if (onSuccess) {
        onSuccess();
      }
    } else {
      if (onFailure) {
        onFailure(result.msg);
      }
    }
  });
}

/**
 * Wake up API: wake up Karotz.
 * @param onSuccess if defined, called on successful API execution
 * @param onFailure if defined, called on failed API execution with parameter: error_message
 */
function wakeup(onSuccess, onFailure) {
  $.get(apiWakeup + "?silent=1", function(data) {
    console.log("wakeup: " + data);
    var result = JSON.parse(data);
    if (result.return == 0) {
      currentStatus.sleep = 0;
      if (onSuccess) {
        onSuccess();
      }
    } else {
      if (onFailure) {
        onFailure(result.msg);
      }
    }
  });
}

/**
 * Reboot API: reboot Karotz.
 * @param onSuccess if defined, called on successful API execution
 * @param onFailure if defined, called on failed API execution with parameter: error_message
 */
function reboot(onSuccess, onFailure) {
  $.get(apiReboot, function(data) {
    console.log("reboot: " + data);
    var result = JSON.parse(data);
    if (result.return == 0) {
      if (onSuccess) {
        onSuccess();
      }
    } else {
      if (onFailure) {
        onFailure(result.msg);
      }
    }
  });
}

/**
 * Sound API: play sound from URL.
 * @param url URL of sound to play (mp3, m3u)
 * @param onSuccess if defined, called on successful API execution
 * @param onFailure if defined, called on failed API execution with parameter: error_message
 */
function sound(url, onSuccess, onFailure) {
  $.get(apiSound + "?url=" + url, function(data) {
    console.log("sound: " + data);
    var result = JSON.parse(data);
    if (result.return == 0) {
      if (onSuccess) {
        onSuccess();
      }
    } else {
      if (onFailure) {
        onFailure(result.msg);
      }
    }
  });
}

/**
 * Sound API for internal sound: play internal sound with given ID.
 * @param id internal sound ID
 * @param onSuccess if defined, called on successful API execution
 * @param onFailure if defined, called on failed API execution with parameter: error_message
 */
function soundInternal(id, onSuccess, onFailure) {
  $.get(apiSound + "?id=" + id, function(data) {
    console.log("sound id " + id + ": " + data);
    var result = JSON.parse(data);
    if (result.return == 0) {
      if (onSuccess) {
        onSuccess();
      }
    } else {
      if (onFailure) {
        onFailure(result.msg);
      }
    }
  });
}

/**
 * Sound control API: pause or stop playing current sound.
 * @param cmd command to execute: pause, quit
 * @param onSuccess if defined, called on successful API execution
 * @param onFailure if defined, called on failed API execution with parameter: error_message
 */
function soundControl(cmd, onSuccess, onFailure) {
  $.get(apiSoundControl + "?cmd=" + cmd, function(data) {
    console.log("sound_control(" + cmd + ": " + data);
    var result = JSON.parse(data);
    if (result.return == 0) {
      if (onSuccess) {
        onSuccess();
      }
    } else {
      if (onFailure) {
        onFailure(result.msg);
      }
    }
  });
}

/**
 * Sound control API: utility method for pause.
 * @param onSuccess if defined, called on successful API execution
 * @param onFailure if defined, called on failed API execution with parameter: error_message
 */
function soundControlPause(onSuccess, onFailure) {
  soundControl("pause", onSuccess, onFailure);
}

/**
 * Sound control API: utility method for quit.
 * @param onSuccess if defined, called on successful API execution
 * @param onFailure if defined, called on failed API execution with parameter: error_message
 */
function soundControlQuit(onSuccess, onFailure) {
  soundControl("quit", onSuccess, onFailure);
}

/**
 * Leds API: change led color, optional pulse.
 * @param color led color
 * @param pulse if 1, led will pulse ; if 0, led will be fixed
 * @param onSuccess if defined, called on successful API execution
 * @param onFailure if defined, called on failed API execution with parameter: error_message
 */
function leds(color, pulse, onSuccess, onFailure) {
  var pulseOption = "?"
  if (pulse) {
	pulseOption += "pulse=" + pulse + "&";
  }
  $.get(apiLeds + pulseOption + "color=" + color, function(data) {
    console.log("leds: " + data);
    var result = JSON.parse(data);
    if (result.return == 0) {
      if (onSuccess) {
        onSuccess();
      }
    } else {
      if (onFailure) {
        onFailure(result.msg);
      }
    }
  });
}

/**
 * Leds API: utility method for pulse led.
 * @param color led color
 * @param onSuccess if defined, called on successful API execution
 * @param onFailure if defined, called on failed API execution with parameter: error_message
 */
function ledsPulse(color, onSuccess, onFailure) {
	leds(color, 1, onSuccess, onFailure);
}

/**
 * Leds API: utility method for pulse.
 * @param color led color
 * @param onSuccess if defined, called on successful API execution
 * @param onFailure if defined, called on failed API execution with parameter: error_message
 */
function ledsFixed(color, onSuccess, onFailure) {
	leds(color, 0, onSuccess, onFailure);
}

/**
 * Ears API: change position of Karotz ears.
 * @param left position of left ear
 * @param right position of right ear
 * @param onSuccess if defined, called on successful API execution
 * @param onFailure if defined, called on failed API execution with parameter: error_message
 */
function ears(left, right, onSuccess, onFailure) {
  $.get(apiEars + "?left=" + left + "&right=" + right, function(data) {
    console.log("ears: " + data);
    var result = JSON.parse(data);
    if (result.return == 0) {
      if (onSuccess) {
        onSuccess();
      }
    } else {
      if (onFailure) {
        onFailure(result.msg);
      }
    }
  });
}

/**
 * Ears reset API: reset position of Karotz ears.
 * @param onSuccess if defined, called on successful API execution
 * @param onFailure if defined, called on failed API execution with parameter: error_message
 */
function earsReset(onSuccess, onFailure) {
  $.get(apiEarsReset, function(data) {
    console.log("ears_reset: " + data);
    var result = JSON.parse(data);
    if (result.return == 0) {
      if (onSuccess) {
        onSuccess();
      }
    } else {
      if (onFailure) {
        onFailure(result.msg);
      }
    }
  });
}

/**
 * Ears random API: random position of Karotz ears.
 * @param onSuccess if defined, called on successful API execution with parameters: left, right
 * @param onFailure if defined, called on failed API execution with parameter: error_message
 */
function earsRandom(onSuccess, onFailure) {
  $.get(apiEarsRandom, function(data) {
    console.log("ears_random: " + data);
    var result = JSON.parse(data);
    if (result.return == 0) {
      if (onSuccess) {
        onSuccess(result.left, result.right);
      }
    } else {
      if (onFailure) {
        onFailure(result.msg);
      }
    }
  });
}

/**
 * Moods API: trigger an optional mood.
 * @param id if defined, the ID of the mood to trigger ; if undefined, a random mood will be used
 * @param onSuccess if defined, called on successful API execution
 * @param onFailure if defined, called on failed API execution with parameter: error_message
 */
function moods(id, onSuccess, onFailure) {
  var idOption = "";
  if (id) {
    idOption += "?id=" + id;
  }
  $.get(apiMoods + idOption, function(data) {
    console.log("moods: " + data);
    var result = JSON.parse(data);
    if (result.return == 0) {
      if (onSuccess) {
        onSuccess();
      }
    } else {
      if (onFailure) {
        onFailure(result.msg);
      }
    }
  });
}

/**
 * TTS API: speak up!
 * @param text the text to speak
 * @param voice the voice to use
 * @param nocache if set to 1, the phrase will not be cached
 * @param onSuccess if defined, called on successful API execution
 * @param onFailure if defined, called on failed API execution with parameter: error_message
 */
function tts(text, voice, nocache, onSuccess, onFailure) {
  var textOption = '?text="Bonjour"';
  if (text) {
    textOption = '?text="' + encodeURIComponent(text) + '"';
  }
  var voiceOption = "&voice=margaux";
  if (voice) {
    voiceOption = "&voice=" + voice;
  }
  var nocacheOption = "&nocache=1";
  if (nocache) {
    nocacheOption = "&nocache=" + nocache;
  }
  var cmd = apiTts + textOption + voiceOption + nocacheOption;
  console.log("tts: " + cmd);
  $.get(cmd, function(data) {
    console.log("tts: " + data);
    var result = JSON.parse(data);
    if (result.return == 0) {
      if (onSuccess) {
        onSuccess();
      }
    } else {
      if (onFailure) {
        onFailure(result.msg);
      }
    }
  });
}

