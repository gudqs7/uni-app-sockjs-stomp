## UNI-APP-SOCKJS-STOMP

>本项目可在uni-app 环境上兼容 WebSocket api, 使 sockjs+stomp 可如浏览器环境一般正常运行


> 该方式原理极其简单, 目前简单测试一切 ok, 关键代码在 js/websocket-uni.js 中, 在其中造一个 WebSocket 对象兼容 uni 的 API 即可

> 本项目可运行在 IOS APP 上(模拟器亲测) 以及 浏览器上(浏览器本身就支持 WebSocket), 小程序目测也是 ok的(小程序的 api 被 uni 封装过了, 所以应该是 ok 的)

> 另照此方式, 理论上 写个 websocket-wxmini.js , 然后拿到纯微信小程序上跑目测也是可行的, 单由于本人 996 日夜操劳, 就不亲测了!!
