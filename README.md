# node-d3

This module allow the interaction with the stick-de3 from nicolaudie https://www.nicolaudie.com/stick-de3.htm

## Usage

### Create the stick

```js
var StickDriver = require("node-de3");

var stick = new StickDriver("STCIK IP");
```

### Call a scene

```js
stick.triggerScene(SceneNumber);
```
