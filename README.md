# openkarotz-js #

## Description ##

JavaScript library for OpenKarotz API.

Current version is 0.3.1.

This library depends on [jQuery](http://jquery.com/).

OpenKarotz can be found [here](http://openkarotz.filippi.org/).

## Usage ##

Include external libraries
```
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="openkarotz-0.3.1.min.js"></script>
```

Example call to status, leds and ears API
```
var K = new OpenKarotz("192.168.1.10");
console.log("OpenKarotz IP: " + K.getIp());

K.status(
  function(result) { console.log("Status success"); },
  function(errorMessage) { console.error("Status error"); });

console.log("OpenKarotz version: " + K.getState().version);

K.ledPulse("FF00FF", function() { K.ears(5, 5); });
```

## Available API ##

- clear_cache
- clear_snapshots
- ears
- leds
- moods
- moods_list
- reboot
- rfid_delete
- rfid_info
- rfid_list
- rfid_list_ext
- rfid_start_record
- rfid_stop_record
- sleep
- snapshot
- snapshot_list
- sound
- sound_control
- status
- tts
- wakeup

## License ##

Copyright (c) 2013 Olivier Bagot

Licensed under [The MIT License (MIT)](http://opensource.org/licenses/MIT)

See [LICENSE](https://github.com/hobbe/openkarotz-js/raw/master/LICENSE)
