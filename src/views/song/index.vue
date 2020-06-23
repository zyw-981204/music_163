<template>
  <div
    class="song"
    :style="{ backgroundImage: 'url(http://music.163.com/api/img/blur/' + song.pic_str + ')' }"
  >
    <div class="song-wrap">
      <div class="clearfix" @click="songFun" :style="{ height: screen.height + 'px' }">
        <div class="song-player" ref="songPlayerNode">
          <i class="pointer" :style="{ transform: song.isPlay ? 'rotate(20deg)' : 'rotate(0deg)' }"></i>
          <i class="img-bg" :style="{ 'animation-play-state': song.isPlay ? 'running' : 'paused' }"></i>
          <div class="img" :style="{ 'animation-play-state': song.isPlay ? 'running' : 'paused' }">
            <img :src="song.picUrl" alt />
            <i class="status" v-show="!song.isPlay"></i>
          </div>
        </div>

        <div class="lyric" :style="{ height: screen.lyricHeight + 'px' }">
          <div class="lyric-wrap">
            <ul
              ref="lyricNode"
              class="lyric-list"
              :style="{ 'transition-duration': transitionDurationTime, transform: 'translate(0, ' + -getLiPosY() + 'px)' }"
            >
              <li
                :class="{ active: index == activeIndex }"
                v-for="(item, index) in song.lyric"
                :key="index"
              >{{ item.content }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="simi">
        <div class="simi-title">
          喜欢这首个歌的人也听
          <a class="fa fa-play-circle-o" @click="pushSongs" href="javascript:;">一键收听</a>
        </div>
        <ul class="simi-list">
          <li v-for="item in simiSong" :key="item.id" @click="$router.replace(`/song/${item.id}`)">
            <div class="simi-song">
              <img :src="item.picUrl" alt />
              <dl>
                <dt>{{ item.name }}</dt>
                <dd>{{ item.artist }} - {{ item.albumName }}</dd>
              </dl>
            </div>
            <i class="fa fa-play-circle-o"></i>
          </li>
        </ul>
      </div>
      <div class="clearfix">
        <ul class="hotComment-list">
          <div class="song_title">精彩评论</div>
          <li v-for="item in hotCommentData" :key="item.id">
            <div class="infomation">
              <div class="pic_text">
                <div class="photo">
                  <img :src="item.user.avatarUrl" />
                </div>
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
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import {
  getSongUrl,
  getSongDetail,
  getSongLyric,
  getSimiSong,
  getHotComment
} from "@/api/song";
import { parseDate } from "@/utils/date.js";

export default {
  created() {
    this.init();
  },
  mounted() {
    var dpr = document.documentElement.getAttribute("data-dpr");
    var windowResize = () => {
      this.screen.height = window.screen.height * dpr;
      this.screen.lyricHeight =
        this.screen.height -
        this.$refs.songPlayerNode.clientHeight -
        this.$refs.songPlayerNode.offsetTop; //得到可视高度

      //console.log(this.screen.height, this.screen.lyricHeight)
    };
    window.onresize = windowResize;
    windowResize();
  },
  data() {
    return {
      song: {
        id: null,
        isPlay: true, //是否在播放
        name: "", //歌名
        url: null,
        picUrl: "", //图片
        pic_str: "",
        lyric: [], //{ time: 0, content: '歌词' }
        activeIndex: 0 //歌词激活位置
      },

      simiSong: [], //相似歌曲
      hotCommentData: [], //热门评论

      screen: {
        height: null, //屏幕的高度,以px作为单位返回的值
        lyricHeight: null //歌词可以占据的高度,以px作为单位返回的值
      },

      transitionDurationTime: 0 //过渡的动画时间
    };
  },
  methods: {
    parseDate,
    async init() {
      //此三个接口，同步执行，目的是为了得到一首歌的完整信息
      await this.getSongDetail();
      await this.getSongLyric();
      this.getSongUrl();

      this.getSimiSong();
      this.getHotComment();

      this.song.id = Number(this.$route.params.id);
    },
    songFun() {
      this.song.isPlay = !this.song.isPlay;
      this.$store.commit("updateSong", this.song);
      this.$store.commit("updateSongList", this.song.id);
    },
    getLiPosY() {
      if (this.$refs.lyricNode) {
        var liNode = this.$refs.lyricNode.querySelector(
          "li:nth-child(" + (this.activeIndex + 1) + ")"
        );
        if (liNode) {
          var offsetTop = liNode.offsetTop;
          return offsetTop;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    },
    pushSongs() {
      //一键收听，将歌的id加入播放器列表
      var payload = this.simiSong.map(itme => itme.id); //等价this.simiSong.map(itme =>{ return itme.id;});
      Toast("收听成功！");
      this.$store.commit("updateSongList", payload);
    },
    getSongUrl() {
      //歌url接口
      return new Promise((resolve, reject) => {
        var id = this.$route.params.id;
        getSongUrl({
          params: {
            id
          }
        }).then(res => {
          var data = res.data;
          if (data.code == 200) {
            var song = data.data[0];
            if (song) {
              if (this.url != song.url) {
                //对同一首歌进入不做重新播放处理
                this.song.url = song.url;
                this.songFun();
              }
            }
          }
          resolve(true);
        });
      });
    },
    getSongDetail() {
      //歌详情接口
      return new Promise((resolve, reject) => {
        var ids = this.$route.params.id;
        getSongDetail({
          params: {
            ids
          }
        }).then(res => {
          var data = res.data;
          if (data.code == 200) {
            var songData = data.songs[0];
            if (songData) {
              var al = songData.al;
              this.song.name = al.name;
              this.song.picUrl = al.picUrl;
              this.song.pic_str = al.pic_str;
              //this.song.id = songData.id;
            }
          }
          resolve(true);
        });
      });
    },
    getSongLyric() {
      return new Promise((resolve, reject) => {
        var id = this.$route.params.id;
        getSongLyric({
          params: {
            id
          }
        }).then(res => {
          var data = res.data;
          if (data.code == 200) {
            var lyric = data.lrc.lyric;
            if (lyric) {
              var lyricArr = lyric.split(/\n/);
              var newLyricArr = lyricArr.map(item => {
                var arrItem = item.split("]");
                var arrTime = arrItem[0].slice(1).split(":");
                var time = arrTime[0] * 60 + Number(arrTime[1]);
                var content = arrItem[1];
                return {
                  time,
                  content
                };
              });
              this.song.lyric = newLyricArr;
              console.log(newLyricArr);
            }
          }
          resolve(true);
        });
      });
    },
    getSimiSong() {
      //获取类似音乐
      var id = this.$route.params.id;
      getSimiSong({
        params: {
          id
        }
      }).then(res => {
        var data = res.data;
        if (data.code == 200) {
          this.simiSong = data.songs.map(item => {
            return {
              id: item.id, //歌id
              name: item.name, //歌名
              picUrl: item.album.picUrl, //专辑图片
              albumName: item.album.name, //专辑名
              artist: item.artists[0] ? item.artists[0].name : "" //歌手
            };
          });
        }
      });
    },
    getHotComment() {
      var id = this.$route.params.id;
      getHotComment({
        params: {
          id,
          type: 0,
          limit: 10
        }
      }).then(res => {
        var data = res.data;
        if (data.code == 200) {
          //成功
          this.hotCommentData = data.hotComments;
        }
      });
    },
    transitionDuration() {
      //得到过渡时间
      var activeLyric = this.song.lyric[this.activeIndex]; //当前歌词
      var nextIndex = this.activeIndex + 1; //得到下一个索引
      while (true) {
        //优化，找到下一句有歌词的时间
        var nextLyric = this.song.lyric[nextIndex]; //下一个索引的歌词对象
        if (nextLyric) {
          if (nextLyric.content == "") {
            nextIndex++;
          } else {
            this.transitionDurationTime =
              nextLyric.time - activeLyric.time + "s";
            break; //跳出循环
          }
        } else {
          this.transitionDurationTime = 0;
          break; //跳出循环
        }
      }

      /* var nextLyric = this.song.lyric[this.activeIndex + 1];//下一句歌词
      if (nextLyric) {
        this.transitionDurationTime = nextLyric.time - activeLyric.time + "s";
      } else {
        this.transitionDurationTime = 0;
      }*/
      console.log(this.transitionDurationTime);
    }
  },
  computed: {
    songStore() {
      //得到歌的数据
      return this.$store.getters.song;
    },
    activeIndex() {
      return this.songStore.activeIndex;
    },
    url() {
      return this.songStore.url;
    },
    isPlay() {
      return this.songStore.isPlay;
    }
  },
  watch: {
    isPlay(newval) {
      this.song.isPlay = newval;
    },
    activeIndex(newval) {
      this.transitionDuration();
    },
    ["$route"](newval, oldval) {
      this.init();
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
@keyframes circle {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.song {
  background: #484848 no-repeat center 0 / auto 100%;
}
.song-wrap {
  background: rgba(0, 0, 0, 0.5);
  overflow-x: hidden;
  .lyric {
    box-sizing: border-box;
    padding: 46px 0;
    display: flex;
  }
  .lyric-wrap {
    width: 100%;
    text-align: center;
    color: rgba(255, 255, 255, 0.4);
    font-size: 34px; /*px*/
    overflow: hidden;
    .lyric-list {
      transition-property: transform;
    }
    li {
      min-height: 80px;
      line-height: 80px;
    }
    .active {
      color: rgba(255, 255, 255, 1);
    }
  }
}
.song-player {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 585px;
  height: 585px;
  margin: 175px auto 0;
  .pointer {
    position: absolute;
    left: 50%;
    top: -185px;
    z-index: 8;
    width: 207px;
    height: 315px;
    background: url("~@/assets/img/needle.png") no-repeat center 0 / 168px 244px;
    transition: transform 0.5s;
    transform-origin: 80px 0;
  }
  .img-bg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: url("~@/assets/img/disc.png") no-repeat 0 0 / 100% 100%;
    animation: circle 5s linear infinite;
  }
  .img {
    position: relative;
    z-index: 5;
    width: 370px;
    height: 370px;
    border-radius: 50%;
    overflow: hidden;
    background: #000;
    animation: circle 5s linear infinite;
  }
  .status {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -50px 0 0 -50px;
    width: 100px;
    height: 100px;
    background: url("~@/assets/img/play-icon.png") no-repeat 0 0 / 100% 100%;
  }
}
.simi {
  padding: 0 30px;
  color: #fff;
  font-size: 36px; /*px*/
  .simi-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 110px;
    .fa-play-circle-o {
      border: 1px solid #fff; /*no*/
      border-radius: 24px;
      padding: 0 16px;
      color: #fff;
      line-height: 48px;
      font-size: 26px; /*px*/
    }
  }
  .simi-list {
    display: flex;
    flex-flow: wrap;
    li {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 120px;
    }
    .simi-song {
      display: flex;
      height: 82px;
      img {
        width: 82px;
        height: 82px;
        border-radius: 5px;
        margin-right: 20px;
      }
      dt {
        font-size: 32px; /*px*/
        line-height: 42px;
      }
      dd {
        font-size: 24px; /*px*/
        color: #b4b0aa;
        line-height: 40px;
      }
    }
    .fa-play-circle-o {
      font-size: 54px; /*px*/
      color: #b4b0aa;
    }
  }
}
.hotComment-list {
  .song_title {
    padding: 0 30px;
    font-size: 36px; /*px*/
    line-height: 48px; /*px*/
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 110px;
    color: #fff;
  }
  li {
    padding: 0 0 30px 30px;
    .infomation {
      display: flex;
      justify-content: space-between;
    }

    .pic_text {
      display: flex;
      justify-content: space-between;
      .photo img {
        width: 66px;
        height: 66px;
        background: #fff;
        border-radius: 50%;
      }
      .text {
        margin-left: 20px;
      }
      .name {
        font-size: 26px; /*px*/
        line-height: 36px; /*px*/
        color: #ccc;
      }
      .time {
        font-size: 20px; /*px*/
        line-height: 30px; /*px*/
        color: #8a8a8a;
        font-weight: bold;
      }
    }
    .likedCount {
      display: flex;
      align-items: center;
      .count {
        font-size: 20px;
        font-style: normal;
        margin-right: 8px;
      }
      .fa-thumbs-o-up {
        font-size: 26px; /*px*/
      }
      color: #aaa;
      margin-right: 30px;
    }
    .content {
      color: #dcdcdc;
      font-size: 26px; /*px*/
      line-height: 38px; /*px*/
      padding: 25px 30px 25px 86px;
    }
  }
}
</style>
