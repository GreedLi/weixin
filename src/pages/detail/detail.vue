<template>
    <div class="detailContainer">
        <img class="detail_img" v-if="isMusicPlay" :src="detailObj.music.coverImgUrl" alt="">
        <img class="detail_img" v-else :src="detailObj.detail_img" alt="">
        <img @tap="handleMusicPlay" v-if="isMusicPlay" class="music_img" src="../../../static/images/music/music-start.png" alt="">
        <img @tap="handleMusicPlay" v-else class="music_img" src="../../../static/images/music/music-stop.png" alt="">
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
                <img @tap="handleShare" src="../../../static/images/icon/share-anti.png" alt="">
            </div>
            <div class="line"></div>
        </div>
        <Button open-type="share">转发此文章</Button>
        <p class="content">{{detailObj.detail_content}}</p>
    </div>
</template>
<script>
import isPlayObj from '../../datas/isPlay'
import {mapState} from 'vuex'
export default {
    beforeMount(){
        let index = this.$mp.query.index
        // 预处理：本地是否收藏的缓存
        let oldStorage = wx.getStorageSync('isCollected')
        if (!oldStorage) { 
            wx.setStorage({
                key:'isCollected',
                data:{}
            })
        }else{
            // 用户缓存过
            this.isCollected=(oldStorage[this.index]?true:false)
        }
        // 判断页面加载时音乐是否播放
        isPlayObj.pageIndex === this.index && isPlayObj.isPlay?this.isMusicPlay = true:this.isMusicPlay = false
        // 监听音乐的暂停和播放
        wx.onBackgroundAudioPlay(()=>{
            console.log('播放');
            this.isMusicPlay = true
            isPlayObj.pageIndex = this.index
            isPlayObj.isPlay = true
        })
        wx.onBackgroundAudioPause(()=>{
            console.log('暂停');
            this.isMusicPlay = false
            isPlayObj.isPlay = false
        })
    },
    data(){
        return{
            detailObj: {},
            isCollected: false,
            isMusicPlay: false
             //标识音乐是否播放
        }
    },
    methods: {
        handleCollection(){
            let isCollected = !this.isCollected
            this.isCollected = isCollected
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
        },
        handleMusicPlay(){
            let isMusicPlay = !this.isMusicPlay
            this.isMusicPlay = isMusicPlay
            // this.isMusicPlay = !this.isMusicPlay
            let {dataUrl,title} = this.detailObj.music
            if (isMusicPlay) {
                wx.playBackgroundAudio({
                    dataUrl,
                    title
                })
            }else{
                wx.pauseBackgroundAudio()
            }
            
        },
        handleShare(){
            wx.showActionSheet({
                itemList: [
                    '分享到朋友圈','分享到微博','分享给微信好友'
                ],
            });
        }
    },
    mounted(){
        // console.log(this);
        this.detailObj = this.listTmp[this.$mp.query.index]
    },
    computed: {
        ...mapState(['listTmp']),
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
    .music_img{
        height: 60rpx;
        width: 60rpx;
        position: absolute;
        top: 200rpx;
        left: 50%;
        margin-left: -30rpx;
    }
</style>