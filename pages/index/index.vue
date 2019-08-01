<template>
	<view class="content">
        
		<view>
            <text class="title">{{title}}</text>
        </view>
        
        <button type="primary" v-on:click="startReceive()">接单</button>
	</view>
</template>

<script>
    import {WebSocket} from '../../js/websocket-uni.js'
    import {SockJS} from '../../js/sockjs.min.js'
    import {Stomp} from '../../js/stomp.js'
    
    var stompClient = null;
	export default {
		data() {
			return {
				title: '点击接单, 接单成功后返回订单 id, 接单请求成功返回 json 信息'
			}
		},
		onLoad() {
            var info = uni.getSystemInfoSync();
            console.log('platform:: '+info.platform);
            if (info.platform =='other' && typeof window ==='object') {
                window.WebSocket = uni.webSocketBackup;
            } 
            this.say();
		},
		methods: {
            say() {
                var that = this;
                var headers = {
                    token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3cSIsImV4cCI6MTU2NzI0MTIwMiwiaWF0IjoxNTY0NjQ5MjAyLCJyb2wiOltdfQ.Zq_9DvZca57TNTkKAUgQaks21JmHTvIvqHjhMNinKNUWNjJ6R2qm2iCMQeh0T3gEJrUVlzWRO4qnLU4PlJJuHA'
                };
                var socket = new SockJS('http://localhost:8888/ws/order?token=' + headers.token);
                stompClient = Stomp.over(socket);
                stompClient.connect(headers, function (frame) {
                    console.log('Connected:' + frame);

                    // 地址 (/user/{userName}/task/success) userName 为登录 用户名
                    stompClient.subscribe('/user/wq/task/success', function (response) {
                        console.log('Find order:: ', response);
                        that.title = response.body;
                    });

                    // 发起接单后回调, code=0 代表成功, 其他情况参考 msg
                    stompClient.subscribe('/user/task/result', function (response) {
                        console.log('From 注解:: ', response);
                        that.title = response.body;
                    });

                });
            },
            startReceive() {
                stompClient.send("/startReceive", {}, JSON.stringify({'accountId': 1}));
            }
            

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
    .logo{
        height: 200upx;
        width: 200upx;
        margin-top: 200upx;
    }
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
