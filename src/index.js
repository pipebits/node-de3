const dgram = require('node:dgram');
const EventEmitter = require('node:events').EventEmitter;

class StickDriver extends EventEmitter {
    constructor(ip = '127.0.0.1', options) {
        super()

        this.debug = options?.debug || false;

        this.header = Buffer.from(options?.id || "Stick_3A", "utf-8");
        this.OpCode = Buffer.from([options.operationCode || 109, 0]);

        this.host = ip;
        this.port = options.port || 2430;

        if (this.debug) console.log(`Initializing driver at host: ${this.host} port: ${this.port}`)

        this.dev = dgram.createSocket('udp4');
        this.dev.bind(() => this.dev.setBroadcast(true));

        if (this.debug) console.log(`Stick driver initialized with the header: ${this.header.toString('hex')} and the OpCode: ${this.OpCode.toString('hex')}`)
    }

    triggerScene(SceneNumber, cb) {
        const pkg = Buffer.concat([
            this.header,
            this.OpCode,
            Buffer.from([SceneNumber, 0]),
            Buffer.from([0]),
            Buffer.from([1]),
            Buffer.from([0, 0]),
            Buffer.from([0, 0]),
            Buffer.from([0]),
            Buffer.from([0]),
            Buffer.from([0, 0, 0, 0]),
        ]);

        if (this.debug) console.log(`Changing scene to ${SceneNumber} Sent package: ${pkg.toString('hex')}`)

        this.dev.send(pkg, 0, pkg.length, this.port, this.host);

        if (cb) cb(true, pkg.toString('hex'))
    }
}

module.exports = StickDriver;