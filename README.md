## openkarotz-js ##

### Description ###

JavaScript library for OpenKarotz API.

OpenKarotz can be found [here](http://openkarotz.filippi.org/).

### Usage ###

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
