<template>
  <div>
   <div class="album-header" :style="{ backgroundImage: 'url(http://music.163.com/api/img/blur/' + albumData.pic + ')' }">
      <div class="album-wrap">
        <div class="header-img">
            <i>专辑</i>
            <img :src="albumData.picUrl">
            <span class="ablumImg-bg"></span>
        </div>
        <div class="header-text">
          <i class="album-name">{{albumData.name}}</i>
          <span>歌手：<i class="singer-name">{{albumData.artist.name}}</i></span>
          <span class="publish-time">发行时间：{{parseDate1(albumData.publishTime)}}</span>
        </div>
      </div>

   </div>
   <div class="ablum-intro" @click="showMore()">
     <div class="intro-text">
        <p v-for="(item, index) in description" :key="index">{{getIntro(index,item)}}</p>
     </div>
     <i class="fa fa-angle-down" v-if="isShowMore"></i>
     <i class="fa fa-angle-up" v-else ></i>
   </div>

   <div class="songsList">
      <div class="ablum-title">歌曲列表</div>
      <ul class="newSong-list">
        <li v-for="(item,index) in songsData" :key="item.id">
          <router-link :to="'/song/' + item.id">
            <div class="text">
              <div class="sorting">{{ index+1 }}</div>
              <div class="name-singer">
                <div class="name">{{ item.name }}
                  <i class="originSing" style="color:#888"> {{ item.alia[0]  != null ?  '('+item.alia[0] + ')' : '' }}</i>
                </div>
                <div class="singer">{{ item.ar[0].name != null ? item.ar[0].name : '' }} - {{ item.al.name }}</div>                
              </div>
            </div>
            <i class="fa fa-play-circle-o"></i>              
          </router-link>
        </li>
      </ul>
   </div>

   <div class="clearfix" >
      <ul class="hotComment-list">
        <div class="ablum-title">精彩评论</div>
        <li v-for="item in hotCommentData" :key="item.id">
          <div class="infomation">
            <div class="pic_text">
              <div class="photo"><img :src="item.user.avatarUrl"></div>
              <div class="text">
                <div class="name">{{ item.user.nickname }}</div>
                <div class="time">{{ parseDate(item.time)}}</div>
              </div>
            </div>
            <div class="likedCount">
              <i class="count">{{item.likedCount}}</i>
              <i class="fa fa-thumbs-o-up"></i>
            </div>
          </div>
          <div class="content">{{ item.content }}</div>
        </li>
      </ul>        
   </div>
   <div class="clearfix" >
      <ul class="hotComment-list">
        <div class="ablum-title">最新评论</div>
        <li v-for="item in newCommentData" :key="item.id">
          <div class="infomation">
            <div class="pic_text">
              <div class="photo"><img :src="item.user.avatarUrl"></div>
              <div class="text">
                <div class="name">{{ item.user.nickname }}</div>
                <div class="time">{{ parseDate(item.time)}}</div>
              </div>
            </div>
            <div class="likedCount">
              <i class="count">{{item.likedCount}}</i>
              <i class="fa fa-thumbs-o-up"></i>
            </div>
          </div>
          <div class="content">{{ item.content }}</div>
        </li>
      </ul>        
   </div> 

  </div>
</template>

<script>
import { getAlbum,getAlbumComment} from '@/api/search'
import { parseDate1 ,parseDate} from '@/utils/date.js';

export default {
  data() {
    return {
      albumData:{
        name:'',
        artist:'',
        publishTime:'',
      },
      description:{}, //专辑页面的简介
      isShowMore: true, //简介是否显示更多
      arrowStatus:true, //简介上的箭头上下状态

      songsData:[], //专辑里歌曲列表数据
      hotCommentData:[],//专辑精彩评论
      newCommentData:[],//专辑最新评论
    }
  },
  created() {
    this.getAlbum();
    this.getAlbumComment();
  },
  methods: {
    parseDate1,parseDate,
    getAlbum() {
      var id = this.$route.params.id
      getAlbum({
        params: {
          id,
        }
      }).then((res) => {
        let { data } = res;
        if (data.code == 200) {
          this.albumData = data.album;
          this.description = data.album.description;
          this.songsData = data.songs;
          if(this.description){
            var descriptionArr = this.description.split(/\n/)
          }
          this.description=descriptionArr;
        }
      })
    }, 
    getAlbumComment() {
      var id = this.$route.params.id
      getAlbumComment({
        params: {
          id,
        }
      }).then((res) => {
        let { data } = res;
        if (data.code == 200) {
          this.hotCommentData = data.hotComments;
          this.newCommentData = data.comments;
        }
      })
    }, 
    getIntro(index,item){
      if(index==0){
        return `简介:${item}`;
      }
      else return item;
    },
    showMore() {
      if(this.isShowMore==true){
        document.querySelector(".intro-text").style.height="auto";
        this.isShowMore=!this.isShowMore;
      }
      else{
         document.querySelector(".intro-text").style.height="1.52rem";
         this.isShowMore=!this.isShowMore;
      }
    },
  },

}
</script>

<style lang="scss" scoped>
.album-header{
  background: no-repeat center center / 2000% 2000%;
  .album-wrap{
    display: flex;
    justify-content: flex-start;
    background: rgba(0, 0, 0, 0.3);
    padding: 60px 30px 0 30px; 
    width: 100%;
    height: 372px;
    box-sizing: border-box;
  }
  .header-img{
    width: 290px;
    height: 252px;
    position: relative;
    
    img{
      width: 252px;height: 252px;
    }
    .ablumImg-bg{
      width: 32px;height:242px;
      position: absolute;
      right:6px;top:4px;
      background: url('~@/assets/img/ablum-bg.png') no-repeat 0 center / 100% 100%;
    }
    i{
      position: absolute;
      top:20px;left:0;
      width: 80px;height: 34px;
      font-size: 18px;/*px*/  color: #fff;
      background-color: #c33c3c;
      border-radius:0 17px 17px 0;
      display: flex;
      text-align: center;
      justify-content: center;
    }
  }
  .header-text{
    display: flex;
    flex-flow: column;
    padding: 25px 0 0 15px;
    i{
      color: #fefefe;
      font-size: 34px;/*px*/
    }
    span{
      color: rgba(255,255,255,0.5);
      font-size: 24px;/*px*/
    }
    .singer-name{
      font-size: 24px;/*px*/
    }
    .album-name{
      margin-bottom: 52px;
    }
    .publish-time{
      margin-top: 20px;
    }
  }
}
.ablum-intro{
  position: relative;
  height: 100%;
  padding:20px 20px 0 30px;
  font-size: 28px;/*px*/
  color:#666;
  margin-bottom: 42px;
  .intro-text{
    height: 114px;
    overflow: hidden;
  }
  .fa-angle-down,.fa-angle-up{
    position: absolute;
    bottom:-42px; right:22px;
    font-size: 46px;/*px*/
    color:#666;
  }
}
.newSong-list{
  li{
     padding-left: 0;
  }
}
.text{
  display: flex;
  justify-content: space-between; 
  .sorting{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;/*px*/
    color: #888888;
    width: 80px;
  }
}
.ablum-title{
  display: flex;
  align-items: center;;
  padding:0 20px;
  margin-bottom: 10px;;
  color: #666;
  font-size: 24px;/*px*/
  height: 46px;
  background-color: #eeeff0;
}
</style>
