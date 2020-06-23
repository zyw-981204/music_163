<template>
  <div>
    <div class="albumPic" :style="{ backgroundImage: 'url(' + album.picUrl + ')' }">
      <div class="albumCov">
        <img :src="album.picUrl" alt class="albumimg" />
        <div>
          <div class="albumTit">{{ album.name }}</div>
          <div class="singer">
            歌手：
            <span>{{ album.artists!=null ? album.artists[0].name:'' }}</span>
          </div>
          <div class="time">发行时间：{{ parseDate(album.publishTime) }}</div>
        </div>
      </div>
    </div>
    <div class="des">
      <div class="albumDes" v-html="album.description" :style="{height: down ?'1.52rem':'auto'}"></div>
      <i class="fa fa-chevron-down desDown" @click="desDown" v-if="down"></i>
      <i class="fa fa-chevron-up desDown" @click="desUp" v-else></i>
    </div>
    <div class="smallTit">歌曲列表</div>
    <ul class="newSong-list">
      <li v-for="(item,index) in songs" :key="item.id">
        <div class="gary In">{{ index+1 }}</div>
        <router-link :to="'/song/' + item.id">
          <div class="text">
            <div class="name">
              {{ item.name }}
              <span class="span">{{ item.alia[0] != null ? '('+item.alia[0]+')' : '' }}</span>
            </div>
            <div class="singer">{{ item.ar[0] != null ? item.ar[0].name : '' }} - {{ item.al.name }}</div>
          </div>
          <i class="fa fa-play-circle-o"></i>
        </router-link>
      </li>
    </ul>
    <div class="smallTit">精彩评论</div>
    <div class="comment">
      <ul>
        <li v-for="item in comment" :key="item.id">
          <img :src="item.user.avatarUrl" alt />
          <div class="comment-li">
            <div class="hhh">
              <div class="hhh-left">
                <div class="name">{{ item.user.nickname }}</div>
                <div class="time">{{ parseDate(item.time) }}</div>
              </div>
              <span>
                <p>{{ item.likedCount }}</p>
                <i class="fa fa-thumbs-o-up"></i>
              </span>
            </div>
            <div class="content" v-html="item.content"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getAlbum, getAlbumComment } from "@/api/album";
import { parseDate } from "@/utils/date";
//click|mousedown ->  touchstart
//mousemove       ->  touchmove
//mouseup         ->  touchend

export default {
  data() {
    return {
      album: {},
      songs: [],
      artists: {},
      comment: [],
      down: true
    };
  },
  created() {
    this.getAlbum();
    this.getAlbumComment();
  },
  methods: {
    parseDate,
    getAlbum() {
      var id = Number(this.$route.params.id);
      getAlbum({
        params: {
          id
        }
      }).then(res => {
        var data = res.data;
        console.log(data, 1);
        if (data.code == 200) {
          this.album = data.album;
          this.songs = data.songs;
          this.artists = this.album.artists[0];
          this.album.description =
            "简介：" + this.album.description.replace(/\n/g, "<br/>");
        }
      });
    },
    getAlbumComment() {
      var id = Number(this.$route.params.id);
      getAlbumComment({
        params: {
          id
        }
      }).then(res => {
        var data = res.data;
        var str = "";
        var i = 0;
        console.log(data, 2);
        if (data.code == 200) {
          //成功
          this.comment = data.hotComments;
          //str=this.comment[0].content;
          //str = str.replace(/\n/g,"<br/>");
          while (this.comment[i]) {
            this.comment[i].content = this.comment[i].content.replace(
              /\n/g,
              "<br/>"
            );
            i++;
          }
        }
      });
    },
    desDown() {
      this.down = false;
    },
    desUp() {
      this.down = true;
    }
  },
  watch: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.albumPic {
  height: 372px;
  width: 100%;
  background: no-repeat center center / 200% 300%;
  .albumCov {
    display: flex;
    height: 100%;
    width: 100%;
    padding: 60px 30px;
    box-sizing: border-box;
    background: rgba(100, 100, 100, 0.8);
    .albumimg {
      height: 252px;
      width: 252px;
      padding-right: 52px;
    }
    .albumTit {
      height: 84px;
      line-height: 84px;
      font-size: 32px; /*px*/
      color: #fefefe;
      padding-bottom: 21px;
    }
    .singer {
      height: 49px;
      line-height: 49px;
      font-size: 27px; /*px*/
      color: rgba(255, 255, 255, 0.6);
      span {
        color: #fefefe;
      }
    }
    .time {
      height: 45px;
      line-height: 45px;
      font-size: 23px; /*px*/
      color: rgba(255, 255, 255, 0.6);
    }
  }
}
.des {
  width: 100%;
}
.albumDes {
  height: 114px;
  width: 690px;
  padding: 20px 30px 0 30px;
  line-height: 39px;
  font-size: 28px; /*px*/
  color: #666;
  overflow: hidden;
}
.desDown {
  height: 33px;
  width: 100%;
  text-align: right;
  padding-right: 23px;
  box-sizing: border-box;
  color: #adadad;
  font-size: 24px; /*px*/
}
.smallTit {
  padding-left: 20px;
  width: 100%;
  box-sizing: border-box;
  height: 46px;
  line-height: 46px;
  font-size: 25px; /*px*/
  color: #666;
  background-color: #eeeff0;
}
.span {
  color: #888;
}
.text {
  width: 600px;
}
.In {
  display: flex;
  align-items: center;
  width: 50px;
  font-size: 25px; /*px*/
}
.gray {
  color: #999;
}
.red {
  color: #df3436;
}
.newSong-list li {
  display: flex;
  flex-flow: wrap;
  padding-bottom: 40px;
}
.comment {
  padding: 0 30px;
  overflow: hidden;
  li {
    margin-top: 27px;
    display: flex;
    justify-content: flex-start;
    img {
      margin-right: 17px;
      height: 65px;
      width: 65px;
      border-radius: 50%;
    }
    .comment-li {
      border-bottom: #dfdfdf 1px solid; /*no*/
    }
    .hhh {
      display: flex;
    }
    .hhh-left {
      width: 520px;
    }
    .name {
      font-size: 26px; /*px*/
      color: #666;
    }
    .time {
      height: 37px;
      line-height: 37px;
      font-size: 19px; /*px*/
      color: #8a8484;
    }
    .content {
      line-height: 47px;
      width: 630px;
      font-size: 29px; /*px*/
      color: #333;
      padding-bottom: 21px;
    }
    span {
      display: flex;
      p {
        font-size: 20px; /*px*/
        color: #9a9695;
      }
    }
    .fa-thumbs-o-up {
      display: flex;
      font-size: 44px; /*px*/
      color: #96918d;
      margin-left: 8px;
    }
  }
}
</style>
