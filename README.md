## openkarotz-js ##

### Description ###

JavaScript library for OpenKarotz API, version 0.2.0.

This library depends on [jQuery](http://jquery.com/).

OpenKarotz can be found [here](http://openkarotz.filippi.org/).

### Usage ###

Include external libraries
```
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="openkarotz-0.2.0.min.js"></script>
```

Example call to status API
```
var K = new OpenKarotz("192.168.1.10");
console.log("OpenKarotz IP: " + K.ip);
K.status(
  function() { console.log("Status success"); },
  function() { console.error("Status error"); });
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
