<template>
  <div>
    <div class="artist-cover">
        <div class="artist-warp"></div>
        <img :src="artistsData.picUrl">
        <div class="artist-info">
          <p class="name">{{artistsData.name}}</p>
          <p class="rank">歌手榜华语地区 NO.</p>
          <div class="simple">
            <p class="nickname">昵称：{{artistsData.name}}</p>
            <p class="follow">关注 | 粉丝</p>
            <p class="identities-area">歌手</p>
          </div>
        </div>
    </div>
    <h2>歌手简介</h2>
    <div class="intro" @click="showMore()">
      <p class="briefDesc">{{artistsData.briefDesc}}</p>
      <div class="show">
        <i class="fa fa-angle-down" v-if="isShowMore">完整介绍</i>
        <i class="fa fa-angle-up" v-else >收起介绍</i>        
      </div>
    </div>
    <h2>热门单曲</h2>
    <ul class="newSong-list">
      <li v-for="(item,index) in artistsHotData.slice(0,5)" :key="item.id">
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
    <h2>最新音乐</h2>
    <router-link class="album-info" :to="`/album/${artistsAlbumData.id}`">
      <div class="album-cover">
        <img :src="artistsAlbumData.picUrl">
        <span class="ablumImg-bg"></span>
      </div>
      <div class="album-other">
        <p class="album-name">{{artistsAlbumData.name}}</p>
        <p class="album-artist-name">{{artistsAlbumData.artist.name}}</p>
        <p class="album-songs">{{artistsAlbumData.size}}首 {{ parseDate1(artistsAlbumData.publishTime) }}</p>
      </div>
    </router-link>
    <h2>影响力<i class="fa fa-exclamation-circle" style="margin-left:4px"></i></h2>
    <div class="influence">
      <p class="hot-score">
        <i class="fa fa-fire"></i>&nbsp;&nbsp;歌手热度 歌手榜华语地区NO.&nbsp;&nbsp;<i class="fa fa-angle-right"></i>
      </p>
      <p class="totalChartTimes">
        <i class="fa fa-heart-o"></i>&nbsp;歌曲进入云音乐官方榜&nbsp;次&nbsp;&nbsp;<i class="fa fa-angle-right"></i>
      </p>
      <ul class="chart-list">
        <li>
          <img src="">
          <div class="text">
            <p>正在人气打榜，人气值</p>
            <p>云音乐热歌榜</p>
            <p>云音乐新歌榜</p>
          </div>
          <div class="chart">打榜</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getArtists , getArtistsAlbum } from '@/api/artist'
import { parseDate1 } from '@/utils/date.js';

export default {
  data() {
    return {
      artistsData:[],//歌手信息数据
      artistsHotData:[],//歌手页热门单曲
      artistsAlbumData:{
        picUrl:'',
        name:'',
        artist:'',
        size:0,

      },//歌手专辑数据
      
      isShowMore: true, //简介是否显示更多
    }
  },
  created() {
    this.getArtists();
    this.getArtistsAlbum();
  },
  methods: {
    parseDate1,
    getArtists() {
      var id = this.$route.params.id
      getArtists({
        params: {
          id,
        }
      }).then((res) => {
        let { data } = res;
        if (data.code == 200) {
          this.artistsData = data.artist;
          this.artistsHotData =data.hotSongs;
        }
      })
    }, 
    getArtistsAlbum() {
      var id = this.$route.params.id
      getArtistsAlbum({
        params: {
          id,
        }
      }).then((res) => {
        let { data } = res;
        if (data.code == 200) {
          this.artistsAlbumData = data.hotAlbums[0];
        }
      })
    },
    showMore() {
      if(this.isShowMore==true){
        document.querySelector(".briefDesc").style.height="auto";
        this.isShowMore=!this.isShowMore;
      }
      else{
         document.querySelector(".briefDesc").style.height="1.52rem";
         this.isShowMore=!this.isShowMore;
      }
    },
  },

}
</script>

<style lang="scss" scoped>
.artist-cover{
  position: relative;
  background: rgb(88, 88, 88);
  height: 612px;
  overflow: hidden;
  .artist-warp{
    position: absolute;
    z-index: 9;
    height: 612px;width: 100%;
    background: rgba(0, 0, 0, 0.2);
  }
  img{
    width: 100%;
    position:absolute;z-index: 1;
  }
  .artist-info{
    position:absolute;z-index: 99;
    left: 31px;top: 296px;
    height: 250px;
    .name{
      color: #fff;
      font-size:40px;/*px*/
    }
    .rank{
      color: #fff;
      font-size:26px;/*px*/
      margin:30px 0 0;
    }
    .simple{
      height: 112px;
      margin:30px 0 0;
      color: #fff;
      font-size:24px;/*px*/
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      .follow{
         font-size:26px;/*px*/
      }
    }
  }
}
h2{
  color: #333;
  background: #fff;
  padding: 30px;
  font-size:34px;/*px*/
}
.intro{
  position: relative;;
  height: auto;
  font-size: 28px;/*px*/
  color: #666;
  padding: 0 32px 36px;
  .briefDesc{
    height: 126px;
    overflow: hidden;
    margin-bottom: 50px;
  }
  .show{
    position: absolute;
    left: 50%;bottom: 0;
    margin-left: -65px;
  }
}
.text{//热门单曲样式修改（具体的在app.vue）
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
  .active{
    color: #df3436;
  }
}
.album-info{ //最新音乐部分
  height: 200px;
  box-sizing: border-box;
  background: #fff;
  padding: 0 30px 40px;
  display: flex;
  .album-cover{
    width: 180px;height: 160px;
    position: relative;
    margin-right: 30px;
    img{
      width: 160px;height: 160px;
      border-radius:8px;
    }
    .ablumImg-bg{
      position: absolute;right: 0;top: 2px;
      height: 156px;width: 20px;
      background: url('~@/assets/img/ablum-bg.png') no-repeat 0 center / 100% 100%;
    }
  }
  .album-other{
    height: 70px;
    .album-name{
      color: #333;
      font-size: 30px;/*px*/     
    }
    .album-artist-name,.album-songs{
      color: #888;
      font-size: 26px;/*px*/      
    }
    .album-songs{
      margin-top: 20px;
    }
  }
}
.influence{
  padding: 0 30px 30px;
  p{
    color: #333;
    font-size: 26px;/*px*/
    font-weight: bold;
  }
  .fa-angle-right{
    font-size: 32px;/*px*/
  }
  .totalChartTimes{
    margin-top: 40px;
  }
  ul{
    height: auto;
    li{
      position: relative;
      margin: 20px 0;
      padding:20px;
      display: flex;
      background: rgba(0,0,0,0.03);
      border-radius: 10px;
      img{
        height: 160px;width: 160px;
      }
      .text{
        display: flex;
        flex-flow: column;
      }
      p{
        font-size: 26px;/*px*/
        color:#333;
        padding-left: 20px;
        &:before{
          content:'·'
        }
      }
      .chart{
        position: absolute;
        right: 20px;bottom: 30px;
        width: 100px;height: 48px;
        border-radius: 50px;
        background: #ff5a4c;
        color: #fff;
        font-size: 28px;/*px*/
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
