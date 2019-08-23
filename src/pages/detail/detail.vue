<template>
    <div class="detailContainer">
        <img class="detail_img" :src="detailObj.detail_img" alt="">
        <div class="avatar_date">
            <img :src="detailObj.avatar" alt="">
            <span>{{detailObj.author}}</span>
            <span>发布于</span>
            <span>{{detailObj.date}}</span>
        </div>
        <p class="company">{{detailObj.title}}</p>
        <div class="share_container">
            <div class="share">
                <!-- <img :src="isCollected?'../../../static/images/icon/collection.png':'../../../static/images/icon/collection-anti.png'" alt=""> -->
                <img @click="handleCollection" v-if="isCollected" src="../../../static/images/icon/collection.png" alt="">
                <img @click="handleCollection" v-else src="../../../static/images/icon/collection-anti.png" alt="">
                <img src="../../../static/images/icon/share-anti.png" alt="">
            </div>
            <div class="line"></div>
        </div>
        <Button>转发此文章</Button>
        <p class="content">{{detailObj.detail_content}}</p>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    beforeMount(){
        let index = this.$mp.query.index
        let oldStorage = wx.getStorageSync('isCollected')
        if (!oldStorage) { 
            wx.setStorage({
                key:'isCollected',
                data:{}
            })
        }else{
            this.isCollected=(oldStorage[this.index]?true:false)
        }
    },
    data(){
        return{
            detailObj: {},
            isCollected: false
        }
    },
    methods: {
        handleCollection(){
            this.isCollected = !this.isCollected
            let title = this.isCollected?"收藏成功":"取消收藏"
            wx.showToast({
                title,
                icon:'success'
            })

            // 读取之前本地缓存的状态查看是否收藏
            let oldStorage = wx.getStorageSync('isCollected')
            oldStorage[this.index] = isCollected
            // 将本次设置的结果再缓存到本地
            wx.setStorage({
                key:'isCollected',
                data:oldStorage
            })
        }
    },
    mounted(){
        // console.log(this);
        this.detailObj = this.listTmp[this.$mp.query.index]
    },
    computed: {
        ...mapState(['listTmp']),
        // src(){
        //     this.isCollected?'../../../static/images/icon/collection.png':'../../../static/images/icon/collection-anti.png'
        // }
        // src(){
        //     if (this.isCollected==='true') {
        //         console.log(1);
        //         return '../../../static/images/icon/collection.png'
        //     }
        //     console.log(2);
        //     return '../../../static/images/icon/collection-anti.png'
        // }
    },
}
</script>
<style>
    .detailContainer{
        display: flex;
        flex-direction: column;
    }
    .detail_img{
        width: 100%;
        height: 460rpx;
    }
    .avatar_date{
        padding: 10rpx;
    }
    .avatar_date img{
        width: 46rpx;
        height: 46rpx;
        vertical-align: middle;
    }
    .avatar_date span{
        font-weight: 29rpx;
        margin-left: 6rpx;
    }
    .company{
        font-size: 32rpx;
        font-weight: bold;
        padding: 10rpx;
    }
    .share_container{
        position: relative;
    }
    .share{
        float: right;
        margin-right: 30rpx;
    }
    .share img{
        width: 90rpx;
        height: 90rpx;
        margin-right: 20rpx;
    }
    .line{
        position: absolute;
        top: 45rpx;
        left: 5%;
        width: 90%;
        height: 1rpx;
        background: "#eee";
        z-index: -1;
    }
    .content{
        font-size: 32rpx;
        text-indent: 32rpx;
        letter-spacing: 3rpx;
        line-height: 50rpx;
    }
</style>