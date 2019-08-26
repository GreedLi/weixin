<template>
    <div>
        <div @tap="toMoviesDetail(index)" v-for="(item,index) in moviesArr" :key = "index" class="moviesContainer">
            <img class="movies_img" :src="item.images.large" alt="">
            <div class="movies_info">
                <p class="name">{{item.original_title}}</p>
                <p class="year">年份:{{item.year}}</p>
                <p class="dir">导演:{{item.directors[0].name}}</p>
            </div>
            <p class="rating">{{item.rating.average}}</p>
        </div>
    </div>
</template>
<script>
const MOVIE_URL = 'http://t.yushu.im/v2/movie/top250';
export default {
    data() {
        return {
            moviesArr:[]
        }
    },
    beforeMount() {
        this.$fly.get(MOVIE_URL)
        .then((response)=> {
            console.log(response);
            let moviesArr = response.data.subjects
            this.$store.dispatch('getMoviesArr',moviesArr)
            this.moviesArr = moviesArr
        }).catch((error)=> {
            console.log(error);
        })
    },
    methods:{
        toMoviesDetail(index){
            wx.navigateTo({
                url: '/pages/movieDetail/main?index='+index,
            });
        }
    }
}
</script>
<style>
    .moviesContainer{
        display: flex;
        padding: 10rpx;
        border-bottom: 1px solid #eee;
    }
    .movies_img{
        width: 129rpx;
        height: 129rpx;
    }
    .movies_info{
        width: 70%;
        margin-left: 20rpx;
    }
    .name{
        font-size: 32rpx;
        color: #333;
        /* white-space: normal;
        text-overflow: ellipsis; */
    }
    .year{
        font-size: 29rpx;
        color: #999;
        margin: 5rpx 0;
    }
    .dir{
        font-size: 30rpx;
        color: #666;
    }
    .rating{
        font-size: 36rpx;
        font-weight: bold;
        color: red;
    }
</style>