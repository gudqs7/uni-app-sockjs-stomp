(function () {

    uni.webSocketBackup = WebSocket;
    WebSocket = function (uri) {
        this.uri = uri;
        uni.connectSocket({
            url: uri
        });
        this.eventMap = {};
        var that = this;
        uni.onSocketOpen(function () {
            console.log('uni:: ws open');
            if (that.eventMap.hasOwnProperty('open')) {
                that.eventMap['open']();
            } else {
                that.onopen();
            }

        });
        uni.onSocketMessage(function (res) {
            console.log('uni:: ws message:: ', res);
            if (that.eventMap.hasOwnProperty('message')) {
                that.eventMap['message'](res);
            } else {
                that.onmessage(res);
            }
        });
        uni.onSocketClose(function () {
            console.log('uni:: ws close');
            if (that.eventMap.hasOwnProperty('close')) {
                that.eventMap['close']();
            } else {
                that.onclose();
            }
        });
        uni.onSocketError(function (res) {
            console.log('uni:: ws error', res);
            if (that.eventMap.hasOwnProperty('error')) {
                that.eventMap['error'](res);
            } else {
                that.onerror(res);
            }
        });
    };

    var event = {};

    WebSocket.prototype = {
        addEventListener: function (event, callback) {
            this.eventMap[event] = callback;
        },
        onopen: function () {

        },
        onmessage: function (res) {
            console.log('default 实现:: ' + res)
        },
        onclose: function () {

        },
        onerror: function (res) {

        },
        send: function (data) {
            uni.sendSocketMessage({
                data: data
            });
        }
    };

    if (typeof exports !== "undefined" && exports !== null) {
        exports.WebSocket = WebSocket;
    }

}).call(this);