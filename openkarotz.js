/*!
 * OpenKarotz.js - openkarotz-js
 * Copyright (c) 2013 Olivier Bagot (http://github.com/hobbe/openkarotz-js)
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
 *
 * http://opensource.org/licenses/MIT
 *
 */

/**
 * Create a new OpenKarotz instance.
 *
 * @param karotz_ip the IP address of your OpenKarotz device
 */
var OpenKarotz = function (karotz_ip) {

	if (karotz_ip === undefined) {
		console.log("variable karotz_ip is required!");
		throw new Error("variable karotz_ip is required!");
	}

	/** OpenKarotz IP */
	this.ip = karotz_ip;

	this.colorWhite = "FFFFFF";
	this.colorBlack = "000000";
	this.colorRed = "FF0000";
	this.colorGreen = "00FF00";
	this.colorBlue = "0000FF";
	this.colorViolet = "660099";
	this.colorCyan = "00FFFF";
	this.colorYellow = "FFFF00";
	this.colorPink = "FF00CB";
	this.colorOrange = "FF9900";

	/** OpenKarotz state: memory, led color, version, etc. */
	this.state = { "sleep": 1, "version": "unknown", "karotz_free_space": "unknown" };

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
	var apiSnapshot = karotz_api + '/snapshot';


	/**
	 * Status API: get OpenKarotz status, stored in state variable.
	 *
	 * @param onSuccess if defined, called on successful API execution with
	 *            parameter: api resulting object
	 * @param onFailure if defined, called on failed API execution with
	 *            parameter: error message
	 */
	this.status = function (onSuccess, onFailure) {
		console.log('status: ' + apiStatus);
		var carrot = this;
		$.get(apiStatus, function(data) {
			console.log("status: " + data);
			// /!\ no "return" in status api response
			if (data) {
				var result = JSON.parse(data);
				carrot.state = result;
				console.log(carrot.state);
				if (onSuccess) {
					onSuccess(result);
				}
			} else {
				carrot.state.sleep = 1;
				if (onFailure) {
					onFailure("rabbit is offline");
				}
			}
		});
	};

	/**
	 * Sleep API: put Karotz to sleep.
	 *
	 * @param onSuccess if defined, called on successful API execution with
	 *            parameter: api resulting object
	 * @param onFailure if defined, called on failed API execution with
	 *            parameter: error message
	 */
	this.sleep = function (onSuccess, onFailure) {
		var carrot = this;
		$.get(apiSleep, function(data) {
			console.log("sleep: " + data);
			var result = JSON.parse(data);
			if (result.return == 0) {
				carrot.state.sleep = 1;
				if (onSuccess) {
					onSuccess(result);
				}
			} else {
				if (onFailure) {
					onFailure(result.msg);
				}
			}
		});
	};

	/**
	 * Wake up API: wake up Karotz.
	 *
	 * @param onSuccess if defined, called on successful API execution with
	 *            parameter: api resulting object
	 * @param onFailure if defined, called on failed API execution with
	 *            parameter: error message
	 */
	this.wakeup = function (onSuccess, onFailure) {
		var carrot = this;
		$.get(apiWakeup + "?silent=1", function(data) {
			console.log("wakeup: " + data);
			var result = JSON.parse(data);
			if (result.return == 0) {
				carrot.state.sleep = 0;
				if (onSuccess) {
					onSuccess(result);
				}
			} else {
				if (onFailure) {
					onFailure(result.msg);
				}
			}
		});
	};

	/**
	 * Reboot API: reboot Karotz.
	 *
	 * @param onSuccess if defined, called on successful API execution with
	 *            parameter: api resulting object
	 * @param onFailure if defined, called on failed API execution with
	 *            parameter: error message
	 */
	this.reboot = function (onSuccess, onFailure) {
		$.get(apiReboot, function(data) {
			console.log("reboot: " + data);
			var result = JSON.parse(data);
			if (result.return == 0) {
				if (onSuccess) {
					onSuccess(result);
				}
			} else {
				if (onFailure) {
					onFailure(result.msg);
				}
			}
		});
	};

	/**
	 * Sound API: play sound from URL.
	 *
	 * @param url URL of sound to play (mp3, m3u)
	 * @param onSuccess if defined, called on successful API execution with
	 *            parameter: api resulting object
	 * @param onFailure if defined, called on failed API execution with
	 *            parameter: error message
	 */
	this.sound = function (url, onSuccess, onFailure) {
		$.get(apiSound + "?url=" + url, function(data) {
			console.log("sound: " + data);
			var result = JSON.parse(data);
			if (result.return == 0) {
				if (onSuccess) {
					onSuccess(result);
				}
			} else {
				if (onFailure) {
					onFailure(result.msg);
				}
			}
		});
	};

	/**
	 * Sound API for internal sound: play internal sound with given ID.
	 *
	 * @param id internal sound ID
	 * @param onSuccess if defined, called on successful API execution with
	 *            parameter: api resulting object
	 * @param onFailure if defined, called on failed API execution with
	 *            parameter: error message
	 */
	this.soundInternal = function (id, onSuccess, onFailure) {
		$.get(apiSound + "?id=" + id, function(data) {
			console.log("sound id " + id + ": " + data);
			var result = JSON.parse(data);
			if (result.return == 0) {
				if (onSuccess) {
					onSuccess(result);
				}
			} else {
				if (onFailure) {
					onFailure(result.msg);
				}
			}
		});
	};

	/**
	 * Sound control API: pause or stop playing current sound.
	 *
	 * @param cmd command to execute: pause, quit
	 * @param onSuccess if defined, called on successful API execution with
	 *            parameter: api resulting object
	 * @param onFailure if defined, called on failed API execution with
	 *            parameter: error message
	 */
	this.soundControl = function (cmd, onSuccess, onFailure) {
		$.get(apiSoundControl + "?cmd=" + cmd, function(data) {
			console.log("sound_control(" + cmd + "): " + data);
			var result = JSON.parse(data);
			if (result.return == 0) {
				if (onSuccess) {
					onSuccess(result);
				}
			} else {
				if (onFailure) {
					onFailure(result.msg);
				}
			}
		});
	};

	/**
	 * Sound control API: utility method for pause.
	 *
	 * @param onSuccess if defined, called on successful API execution with
	 *            parameter: api resulting object
	 * @param onFailure if defined, called on failed API execution with
	 *            parameter: error message
	 * @see #soundControl
	 */
	this.soundControlPause = function (onSuccess, onFailure) {
		this.soundControl("pause", onSuccess, onFailure);
	};

	/**
	 * Sound control API: utility method for quit.
	 *
	 * @param onSuccess if defined, called on successful API execution with
	 *            parameter: api resulting object
	 * @param onFailure if defined, called on failed API execution with
	 *            parameter: error message
	 * @see #soundControl
	 */
	this.soundControlQuit = function (onSuccess, onFailure) {
		this.soundControl("quit", onSuccess, onFailure);
	};

	/**
	 * Leds API: change led color, optional pulse.
	 *
	 * @param color led color
	 * @param pulse if 1, led will pulse ; if 0, led will be fixed
	 * @param onSuccess if defined, called on successful API execution with
	 *            parameter: api resulting object
	 * @param onFailure if defined, called on failed API execution with
	 *            parameter: error message
	 */
	this.leds = function (color, pulse, onSuccess, onFailure) {
		var pulseOption = "?";
		if (pulse) {
		pulseOption += "pulse=" + pulse + "&";
		}
		$.get(apiLeds + pulseOption + "color=" + color, function(data) {
			console.log("leds: " + data);
			var result = JSON.parse(data);
			if (result.return == 0) {
				if (onSuccess) {
					onSuccess(result);
				}
			} else {
				if (onFailure) {
					onFailure(result.msg);
				}
			}
		});
	};

	/**
	 * Leds API: utility method for pulse led.
	 *
	 * @param color led color
	 * @param onSuccess if defined, called on successful API execution with
	 *            parameter: api resulting object
	 * @param onFailure if defined, called on failed API execution with
	 *            parameter: error message
	 */
	this.ledsPulse = function (color, onSuccess, onFailure) {
		this.leds(color, 1, onSuccess, onFailure);
	};

	/**
	 * Leds API: utility method for pulse.
	 *
	 * @param color led color
	 * @param onSuccess if defined, called on successful API execution with
	 *            parameter: api resulting object
	 * @param onFailure if defined, called on failed API execution with
	 *            parameter: error message
	 */
	this.ledsFixed = function (color, onSuccess, onFailure) {
		this.leds(color, 0, onSuccess, onFailure);
	};

	/**
	 * Ears API: change position of Karotz ears.
	 *
	 * @param left position of left ear
	 * @param right position of right ear
	 * @param onSuccess if defined, called on successful API execution with
	 *            parameter: api resulting object
	 * @param onFailure if defined, called on failed API execution with
	 *            parameter: error message
	 */
	this.ears = function (left, right, onSuccess, onFailure) {
		$.get(apiEars + "?left=" + left + "&right=" + right, function(data) {
			console.log("ears: " + data);
			var result = JSON.parse(data);
			if (result.return == 0) {
				if (onSuccess) {
					onSuccess(result);
				}
			} else {
				if (onFailure) {
					onFailure(result.msg);
				}
			}
		});
	};

	/**
	 * Ears reset API: reset position of Karotz ears.
	 *
	 * @param onSuccess if defined, called on successful API execution with
	 *            parameter: api resulting object
	 * @param onFailure if defined, called on failed API execution with
	 *            parameter: error message
	 */
	this.earsReset = function (onSuccess, onFailure) {
		$.get(apiEarsReset, function(data) {
			console.log("ears_reset: " + data);
			var result = JSON.parse(data);
			if (result.return == 0) {
				if (onSuccess) {
					onSuccess(result);
				}
			} else {
				if (onFailure) {
					onFailure(result.msg);
				}
			}
		});
	};

	/**
	 * Ears random API: random position of Karotz ears.
	 *
	 * @param onSuccess if defined, called on successful API execution with
	 *            parameter: api resulting object, in particular left and right,
	 *            the positions randomly selected
	 * @param onFailure if defined, called on failed API execution with
	 *            parameter: error message
	 */
	this.earsRandom = function (onSuccess, onFailure) {
		$.get(apiEarsRandom, function(data) {
			console.log("ears_random: " + data);
			var result = JSON.parse(data);
			if (result.return == 0) {
				if (onSuccess) {
					onSuccess(result);
				}
			} else {
				if (onFailure) {
					onFailure(result.msg);
				}
			}
		});
	};

	/**
	 * Moods API: trigger an optional mood.
	 *
	 * @param id if defined, the ID of the mood to trigger ; if undefined, a
	 *            random mood will be used
	 * @param onSuccess if defined, called on successful API execution with
	 *            parameter: api resulting object
	 * @param onFailure if defined, called on failed API execution with
	 *            parameter: error message
	 */
	this.moods = function (id, onSuccess, onFailure) {
		var idOption = "";
		if (id) {
			idOption += "?id=" + id;
		}
		$.get(apiMoods + idOption, function(data) {
			console.log("moods: " + data);
			var result = JSON.parse(data);
			if (result.return == 0) {
				if (onSuccess) {
					onSuccess(result);
				}
			} else {
				if (onFailure) {
					onFailure(result.msg);
				}
			}
		});
	};

	/**
	 * TTS API: speak up!
	 *
	 * @param text the text to speak
	 * @param voice the voice to use
	 * @param nocache if set to 1, the phrase will not be cached
	 * @param onSuccess if defined, called on successful API execution with
	 *            parameter: api resulting object
	 * @param onFailure if defined, called on failed API execution with
	 *            parameter: error message
	 */
	this.tts = function (text, voice, nocache, onSuccess, onFailure) {
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
					onSuccess(result);
				}
			} else {
				if (onFailure) {
					onFailure(result.msg);
				}
			}
		});
	};

	/**
	 * Snapshot API: take a picture
	 *
	 * @param silent silent mode: 0 = inactive, 1 = active
	 * @param onSuccess if defined, called on successful API execution with
	 *            parameter: api resulting object
	 * @param onFailure if defined, called on failed API execution with
	 *            parameter: error message
	 */
	this.snapshot = function (silent, onSuccess, onFailure) {
		var silentOption = '?silent=0';
		if (silent) {
			if (silent == 1) {
				silentOption = '?silent=1';
			}
		}
		var cmd = apiSnapshot + silentOption;
		console.log("silent: " + cmd);
		$.get(cmd, function(data) {
			console.log("silent: " + data);
			var result = JSON.parse(data);
			if (result.return == 0) {
				if (onSuccess) {
					// Return resulting object
					onSuccess(result);
				}
			} else {
				if (onFailure) {
					onFailure(result.msg);
				}
			}
		});
	}


	// Return object
	return this;
};
