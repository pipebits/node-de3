// Call the stick driver
var StickDriver = require('../src')

// Create the stick with the ip 192.168.100.96
var stick = new StickDriver("192.168.100.96", { debug: true })

// Trigger the scene number 1
stick.triggerScene(9)
