var StickDriver = require('../src')

var stick = new StickDriver("192.168.100.96", { debug: true })

stick.triggerScene(1)
