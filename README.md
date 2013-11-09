## openkarotz-js ##

### Description ###

JavaScript library for OpenKarotz API.

Current version is 0.2.1.

This library depends on [jQuery](http://jquery.com/).

OpenKarotz can be found [here](http://openkarotz.filippi.org/).

### Usage ###

Include external libraries
```
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="openkarotz-0.2.1.min.js"></script>
```

Example call to status, leds and ears API
```
var K = new OpenKarotz("192.168.1.10");
console.log("OpenKarotz IP: " + K.ip);

K.status(
  function() { console.log("Status success"); },
  function() { console.error("Status error"); });

console.log("OpenKarotz version: " + K.state.version);

K.ledPulse("FF00FF", function() { K.ears(5, 5); });
```

### Available API ###

- ears
- leds
- moods
- reboot
- sleep
- sound
- sound_control
- status
- tts
- wakeup

### License ###

Copyright (c) 2013 Olivier Bagot

Licensed under [The MIT License (MIT)](http://opensource.org/licenses/MIT)

See [LICENSE](https://github.com/hobbe/openkarotz-js/raw/master/LICENSE)
