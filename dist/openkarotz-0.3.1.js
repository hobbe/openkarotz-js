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

'use strict';

/**
 * @module openkarotz-js
 * @overview JavaScript library to control {@link http://openkarotz.filippi.org/ OpenKarotz}.
 * This library enables integration with an OpenKarotz device through its APIs.
 * @version 0.3.1
 * @copyright 2013, Olivier Bagot ({@link http://github.com/hobbe})
 * @license {@link http://github.com/hobbe/openkarotz-js/raw/master/LICENSE MIT License}
 * @author Olivier Bagot ({@link http://github.com/hobbe/openkarotz-js})
 */

/**
 * Create a new OpenKarotz instance.
 * @class OpenKarotz
 * @param {string} karotz_ip - the IP address of the OpenKarotz device
 * @return {Object} the OpenKarotz controller
 * @throws {Error} An error is thrown if the IP address is undefined
 */
var OpenKarotz = function (karotz_ip) {

	if (karotz_ip === undefined) {
		console.log("variable karotz_ip is required!");
		throw new Error("variable karotz_ip is required!");
	}

	/**
	 * Constant for white color.
	 * @constant {string} OpenKarotz#WHITE
	 */
	this.WHITE = "FFFFFF";

	/**
	 * Constant for black color.
	 * @constant {string} OpenKarotz#BLACK
	 */
	this.BLACK = "000000";

	/**
	 * Constant for red color.
	 * @constant {string} OpenKarotz#RED
	 */
	this.RED = "FF0000";

	/**
	 * Constant for green color.
	 * @constant {string} OpenKarotz#GREEN
	 */
	this.GREEN = "00FF00";

	/**
	 * Constant for blue color.
	 * @constant {string} OpenKarotz#BLUE
	 */
	this.BLUE = "0000FF";

	/**
	 * Constant for violet color.
	 * @constant {string} OpenKarotz#VIOLET
	 */
	this.VIOLET = "660099";

	/**
	 * Constant for cyan color.
	 * @constant {string} OpenKarotz#CYAN
	 */
	this.CYAN = "00FFFF";

	/**
	 * Constant for yellow color.
	 * @constant {string} OpenKarotz#YELLOW
	 */
	this.YELLOW = "FFFF00";

	/**
	 * Constant for pink color.
	 * @constant {string} OpenKarotz#PINK
	 */
	this.PINK = "FF00CB";

	/**
	 * Constant for orange color.
	 * @constant {string} OpenKarotz#ORANGE
	 */
	this.ORANGE = "FF9900";


	/* OpenKarotz IP. */
	this.ip = karotz_ip;

	/* OpenKarotz state: sleep status, version, memory, led color, etc. */
	this.state = {
		"sleep": 1,
		"version": "unknown",
		"karotz_free_space": "unknown"
	};

	//
	// OpenKarotz URLs.
	// These should not change: HTTP on port 80, http://ip:80/cgi-bin
	//
	var karotz_url = "http://" + karotz_ip;
	var karotz_api = karotz_url + "/cgi-bin";

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
	var apiTts = karotz_api + '/tts';
	var apiSnapshot = karotz_api + '/snapshot';
	var apiSnapshotGet = karotz_api + '/snapshot_get';
	var apiSnapshotList = karotz_api + '/snapshot_list';
	var apiClearSnapshots = karotz_api + '/clear_snapshots';
	var apiClearCache = karotz_api + '/clear_cache';
	var apiRfidInfo = karotz_api + '/rfid_info';
	var apiRfidList = karotz_api + '/rfid_list';
	var apiRfidListExt = karotz_api + '/rfid_list_ext';
	var apiRfidDelete = karotz_api + '/rfid_delete';
	var apiRfidStartRecord = karotz_api + '/rfid_start_record';
	var apiRfidStopRecord = karotz_api + '/rfid_stop_record';
	var apiMoodsList = karotz_api + '/moods_list';

	var apiMoods = karotz_api + '/apps/moods';

	/**
	 * Get OpenKarotz IP or hostname.
	 * @function OpenKarotz#getIp
	 * @return {string} the Karotz IP or hostname
	 */
	this.getIp = function () {
		return this.ip;
	};

	/**
	 * Get OpenKarotz web server URL: http://karotz
	 * @function OpenKarotz#getUrl
	 * @return the Karotz web server URL
	 */
	this.getUrl = function () {
		return karotz_url;
	};

	/**
	 * Get OpenKarotz web server API URL: http://karotz/cgi-bin
	 * @function OpenKarotz#getApiUrl
	 * @return the Karotz web server API URL
	 */
	this.getApiUrl = function () {
		return karotz_api;
	};

	/**
	 * Get OpenKarotz state: sleep status, version, memory, led color, etc.
	 * @function OpenKarotz#getState
	 * @return {Object} the Karotz state
	 */
	this.getState = function () {
		return this.state;
	};

	/**
	 * API call.
	 * @param api - The API command: url + query string
	 * @param {requestCallback} onSuccess - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} onFailure - if defined, called on failed API execution with parameter: error message
	 */
	function callapi(api, onSuccess, onFailure) {
		console.log('Calling: ' + api);
		$.get(api, function(data) {
			console.log(api + ' result: ' + data);
			var result = JSON.parse(data);
			if (result["return"] == 0) {
				if (onSuccess) {
					onSuccess(result);
				}
			} else {
				if (onFailure) {
					onFailure(result.msg);
				}
			}
		});
	}

	/**
	 * Status API: get OpenKarotz status, stored in state variable.
	 * @function OpenKarotz#status
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 */
	this.status = function (onSuccess, onFailure) {
		// Special handling of status API because no "return" in response
		var api = apiStatus;
		var carrot = this;
		console.log('Calling: ' + api);
		$.get(api, function(data) {
			console.log(api + ' result: ' + data);
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
	 * @function OpenKarotz#sleep
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 */
	this.sleep = function (onSuccess, onFailure) {
		var carrot = this;
		var api = apiSleep;
		callapi(api, function() {
			carrot.state.sleep = 1;
			onSuccess();
		}, onFailure);
	};

	/**
	 * Wake up API: wake up Karotz.
	 * @function OpenKarotz#wakeup
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 */
	this.wakeup = function (onSuccess, onFailure) {
		var carrot = this;
		var api = apiWakeup;
		callapi(api, function() {
			carrot.state.sleep = 0;
			onSuccess();
		}, onFailure);
	};

	/**
	 * Reboot API: reboot Karotz.
	 * @function OpenKarotz#reboot
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 */
	this.reboot = function (onSuccess, onFailure) {
		var api = apiReboot;
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * Sound API: play sound from URL.
	 * @function OpenKarotz#sound
	 * @param {string} url - URL of sound to play (mp3, m3u)
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 */
	this.sound = function (url, onSuccess, onFailure) {
		var api = apiSound + "?url=" + url;
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * Sound API for internal sound: play internal sound with given ID.
	 * @function OpenKarotz#soundInternal
	 * @param {integer} id - internal sound ID
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 */
	this.soundInternal = function (id, onSuccess, onFailure) {
		var api = apiSound + "?id=" + id;
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * Sound control API: pause or stop playing current sound.
	 * @function OpenKarotz#soundControl
	 * @param {string} cmd - command to execute: pause, quit
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 */
	this.soundControl = function (cmd, onSuccess, onFailure) {
		var api = apiSoundControl + "?cmd=" + cmd;
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * Sound control API: utility method for pause.
	 * @function OpenKarotz#soundControlPause
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 * @see OpenKarotz#soundControl
	 */
	this.soundControlPause = function (onSuccess, onFailure) {
		this.soundControl("pause", onSuccess, onFailure);
	};

	/**
	 * Sound control API: utility method for quit.
	 * @function OpenKarotz#soundControlQuit
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 * @see OpenKarotz#soundControl
	 */
	this.soundControlQuit = function (onSuccess, onFailure) {
		this.soundControl("quit", onSuccess, onFailure);
	};

	/**
	 * Leds API: change led color, optional pulse.
	 * @function OpenKarotz#leds
	 * @param {string} color - led color in RGB HEX format: "FF0000" for red
	 * @param {boolean} [pulse] - if true, led will pulse ; else led will be fixed
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 */
	this.leds = function (color, pulse, onSuccess, onFailure) {
		var pulseOption = "?";
		if (pulse && pulse == true) {
			pulseOption += "pulse=1&";
		}
		var api = apiLeds + pulseOption + "color=" + color;
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * Leds API: utility method for pulse led.
	 * @function OpenKarotz#ledsPulse
	 * @param {string} color - led color in RGB HEX format: "FF0000" for red
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 * @see OpenKarotz#leds
	 */
	this.ledsPulse = function (color, onSuccess, onFailure) {
		this.leds(color, true, onSuccess, onFailure);
	};

	/**
	 * Leds API: utility method for fixed led.
	 * @function OpenKarotz#ledsFixed
	 * @param {string} color - led color in RGB HEX format: "FF0000" for red
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 * @see OpenKarotz#leds
	 */
	this.ledsFixed = function (color, onSuccess, onFailure) {
		this.leds(color, false, onSuccess, onFailure);
	};

	/**
	 * Ears API: change position of Karotz ears.
	 * @function OpenKarotz#ears
	 * @param {number} left - position of left ear
	 * @param {number} right - position of right ear
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 */
	this.ears = function (left, right, onSuccess, onFailure) {
		var api = apiEars + "?left=" + left + "&right=" + right;
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * Ears reset API: reset position of Karotz ears.
	 * @function OpenKarotz#earsReset
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 */
	this.earsReset = function (onSuccess, onFailure) {
		var api = apiEarsReset;
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * Ears random API: random position of Karotz ears.
	 * @function OpenKarotz#earsRandom
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 */
	this.earsRandom = function (onSuccess, onFailure) {
		var api = apiEarsRandom;
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * Moods API: trigger an optional mood.
	 * @function OpenKarotz#moods
	 * @param {number} [id] - if defined, the ID of the mood to trigger ; if undefined, a random mood will be used
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 */
	this.moods = function (id, onSuccess, onFailure) {
		var idOption = "";
		if (id) {
			idOption += "?id=" + id;
		}
		var api = apiMoods + idOption;
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * TTS API: speak up!
	 * @function OpenKarotz#tts
	 * @param {string} text - the text to speak
	 * @param {string} [voice=margaux] - the voice to use
	 * @param {boolean} [nocache=false] - if set to true, the phrase will not be cached
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 */
	this.tts = function (text, voice, nocache, onSuccess, onFailure) {
		var textOption = '?text="Bonjour"';
		if (text) {
			// Hack: remove quotes
			textOption = '?text="' + encodeURIComponent(text.replace(new RegExp("'","g"), "")) + '"';
		}
		var voiceOption = "&voice=margaux";
		if (voice) {
			voiceOption = "&voice=" + encodeURIComponent(voice);
		}
		var nocacheOption = "&nocache=0";
		if (nocache && nocache == true) {
			nocacheOption = "&nocache=1";
		}
		var api = apiTts + textOption + voiceOption + nocacheOption;
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * Snapshot API: take a picture
	 * @function OpenKarotz#snapshot
	 * @param {boolean} [silent=false] - silent mode
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 * @since 0.3.0
	 */
	this.snapshot = function (silent, onSuccess, onFailure) {
		var silentOption = '?silent=0';
		if (silent && silent == true) {
			silentOption = '?silent=1';
		}
		var api = apiSnapshot + silentOption;
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * Get the snapshot url from a given snapshot name. This uses the
	 * correct form for the snapshot_get API, which returns the JPEG image.
	 * @function OpenKarotz#getSnapshotUrl
	 * @param {string} filename - the snapshot name, as given by filename or thumb of the snapshot API.
	 * @return {string} the snapshot URL
	 * @since 0.3.0
	 */
	this.getSnapshotUrl = function (filename) {
		var url = apiSnapshotGet + '?filename=' + filename;
		console.log("getSnapshotUrl: " + url);
		return url;
	};

	/**
	 * Get the snapshot thumbnail url from a given snapshot name. This uses the
	 * correct form for the snapshot_get API, which returns the GIF image.
	 * @function OpenKarotz#getSnapshotThumbnailUrl
	 * @param {string} filename - the snapshot name, as given by filename or thumb of the snapshot API.
	 * @return {string} the snapshot thumbnail URL
	 * @since 0.3.1
	 */
	this.getSnapshotThumbnailUrl = function (filename) {
		var tn = filename.replace('.jpg', '.thumb.gif');
		var url = apiSnapshotGet + '?filename=' + tn;
		console.log("getSnapshotThumbnailUrl: " + url);
		return url;
	};

	/**
	 * Snapshot list API: list existing snapshots
	 * @function OpenKarotz#snapshotList
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 * @since 0.3.1
	 */
	this.snapshotList = function (onSuccess, onFailure) {
		var api = apiSnapshotList;
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * Clear snapshots API: clear existing snapshots
	 * @function OpenKarotz#clearSnapshots
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 * @since 0.3.1
	 */
	this.clearSnapshots = function (onSuccess, onFailure) {
		var api = apiClearSnapshots;
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * Clear cache API: clear TTS cache
	 * @function OpenKarotz#clearCache
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 * @since 0.3.1
	 */
	this.clearCache = function (onSuccess, onFailure) {
		var api = apiClearCache;
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * RFID Info API: give information on RFID tag
	 * @function OpenKarotz#rfidInfo
	 * @param tag - the ID of the RFID tag to get info for
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 * @since 0.3.1
	 */
	this.rfidInfo = function (tag, onSuccess, onFailure) {
		var api = apiRfidInfo + "?tag=" + encodeURIComponent(tag);
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * RFID list API: give list of RFID tag
	 * @function OpenKarotz#rfidList
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 * @since 0.3.1
	 */
	this.rfidList = function (onSuccess, onFailure) {
		var api = apiRfidList;
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * RFID list extended API: give extended list of RFID tag
	 * @function OpenKarotz#rfidListExt
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 * @since 0.3.1
	 */
	this.rfidListExt = function (onSuccess, onFailure) {
		var api = apiRfidListExt;
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * RFID Delete API: delete an RFID tag
	 * @function OpenKarotz#rfidDelete
	 * @param tag - the ID of the RFID tag to delete
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 * @since 0.3.1
	 */
	this.rfidDelete = function (tag, onSuccess, onFailure) {
		var api = apiRfidDelete + "?tag=" + encodeURIComponent(tag);
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * RFID Start Record API: start of RFID tag recording
	 * @function OpenKarotz#rfidStartRecord
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 * @since 0.3.1
	 */
	this.rfidStartRecord = function (onSuccess, onFailure) {
		var api = apiRfidStartRecord;
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * RFID Stop Record API: stop of RFID tag recording
	 * @function OpenKarotz#rfidStopRecord
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 * @since 0.3.1
	 */
	this.rfidStopRecord = function (onSuccess, onFailure) {
		var api = apiRfidStopRecord;
		callapi(api, onSuccess, onFailure);
	};

	/**
	 * Moods List API: list existing moods
	 * @function OpenKarotz#moodsList
	 * @param {requestCallback} [onSuccess] - if defined, called on successful API execution with parameter: API resulting object
	 * @param {requestCallback} [onFailure] - if defined, called on failed API execution with parameter: error message
	 * @since 0.3.1
	 */
	this.moodsList = function (onSuccess, onFailure) {
		var api = apiMoodsList;
		callapi(api, onSuccess, onFailure);
	};


	// Return object
	return this;
};
