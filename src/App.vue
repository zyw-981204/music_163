<template>
  <div id="app">
    <router-view />
    <app-player></app-player>
  </div>
</template>

<script>
import appPlayer from '@/components/app-player'

export default {
  name: 'App',
  components: {
    appPlayer
  }
}
</script>

<style lang="scss">
.newSong-list {
  li {
    padding-left: 20px;
    & > a {
      display: flex;
      justify-content: space-between;
      border-bottom: #e2e2e3 1px solid; /*no*/
    }
    .text {
      padding: 13px 0;
    }
    .name {
      font-size: 26px; /*px*/
      line-height: 48px; /*px*/
    }
    .singer {
      font-size: 24px; /*px*/
      line-height: 36px; /*px*/
      color: #888888;
    }
    .fa-play-circle-o {
      display: flex;
      align-items: center;
      font-size: 44px; /*px*/
      color: #aaaaaa;
      margin-right: 20px;
    }
  }
}
.hotComment-list{
  .song_title{
    padding: 0 30px;
    font-size: 36px;/*px*/
    line-height: 48px; /*px*/
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 110px;
    color: #fff;
  }  
  li{
    padding: 0 0 30px 30px;
    .infomation{
    display: flex;
    justify-content: space-between;
    }

    .pic_text{
      display: flex;
      justify-content: space-between;
      .photo img{
        width: 66px;
        height: 66px;
        background: #fff;
        border-radius: 50%
      }
      .text{
        margin-left: 20px;
        display: flex;
        flex-flow: column;
        
      }
      .name{
        font-size: 26px;/*px*/
        line-height: 36px;/*px*/
        color:#666;
      }
      .time{
        font-size: 20px;/*px*/
        line-height: 30px;/*px*/
        color:#999;
      }
    }
    .likedCount{
      display: flex;
      align-items: center;
      .count{
        font-size: 20px;
        font-style:normal;
        margin-right: 8px;
      }
      .fa-thumbs-o-up{
        font-size: 26px;/*px*/
      }
      color: #999;
      margin-right: 30px;
    }
    .content{
      color: #333;
      font-size: 26px;/*px*/
      line-height: 38px;/*px*/
      padding:25px 30px 25px 86px;
    }
  }
}
</style>
