<template>
    <div class="imgcenter">
        <img v-if="isShow" class="index_img" :src="userInfo.avatarUrl" alt="">
        <Button class="btn" v-else open-type="getUserInfo" @getuserinfo="getUserInfo">点击获取用户信息</Button>
        <p class="userName"> hello {{userInfo.nickName}}</p>
        <div @tap="toDetail" class="goStudy">
            <p>开启小程序</p>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            userInfo:{},
            isShow:false
        }
    },
    beforeMount() {
        // 获取用户信息
      this.handleGetUserInfo();
    },
    methods: {
        handleGetUserInfo(){
            wx.getUserInfo({
                success: (data)=>{
                    // console.log(data);
                    this.userInfo = data.userInfo
                    this.isShow = true;
                },
                fail: ()=>{
                    console.log('获取失败');
                }
            });
        },
        getUserInfo(data){
            // console.log(data);
            if (data.mp.detail.rawData) {
                this.handleGetUserInfo()
            }
        },
        toDetail(){
            console.log("toDetail");
            wx.switchTab({
                url: '/pages/list/main',
            });
        }
    },
}
</script>

<style>
    page{
        background: #8ed145;
    }
    .imgcenter{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .index_img{
        width: 200rpx;
        height: 200rpx;
        margin: 100rpx 0;
        border-radius: 100rpx;
    }
    .userName{
        font-size: 40rpx;
        font-weight: bold;
        margin: 100rpx 0;
    }
    .goStudy{
        width: 200rpx;
        height: 80rpx;
        border: 1rpx solid #eee;
        border-radius: 10rpx;
        line-height: 80rpx;
        text-align: center;
        font-size: 24rpx;
    }
    .btn{
        width: 300rpx;
        height: 300rpx;
        border-radius: 150rpx;
        margin: 100rpx 0;
        line-height: 300rpx;
        text-align: center;
        font-size: 26rpx;
    }
</style>