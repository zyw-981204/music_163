<template>
  <div>
    <div class="singerPic" :style="{ backgroundImage: 'url(' + singer.picUrl + ')' }">
      <div class="singerCov">
        <div class="singerName">{{ singer.name }}</div>
      </div>
    </div>
    <div class="title">歌手简介</div>
    <div class="briefInt">{{ singer.briefDesc }}</div>
    <div class="title">热门单曲</div>
    <ul class="newSong-list">
      <li v-for="(item,index) in songs" :key="item.id">
        <div class="gary In">{{ index+1 }}</div>
        <router-link :to="'/song/' + item.id">
          <div class="text">
            <div class="name">
              {{ item.name }}
              <span
                class="span"
              >{{ item.alia[0] != null ? '('+item.alia[0]+')' : '' }}</span>
            </div>
            <div class="singer">{{ item.ar[0] != null ? item.ar[0].name : '' }} - {{ item.al.name }}</div>
          </div>
          <i class="fa fa-play-circle-o"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSingerDetail, getSinger, getSingerMV } from "@/api/singer";
//click|mousedown ->  touchstart
//mousemove       ->  touchmove
//mouseup         ->  touchend

export default {
  data() {
    return {
      singer: {},
      songs: [],
      MV: []
    };
  },
  created() {
    this.getSinger();
  },
  methods: {
    getSinger() {
      var id = Number(this.$route.params.id);
      getSinger({
        params: {
          id
        }
      }).then(res => {
        var data = res.data;
        console.log(data, 1);
        if (data.code == 200) {
          this.singer = data.artist;
          this.songs = data.hotSongs;
        }
      });
    }
  },
  watch: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.singerPic {
  height: 611px;
  width: 100%;
  background: no-repeat center center / 150% 150%;
  .singerCov {
    height: 100%;
    width: 100%;
    padding: 277px 0 0 32px;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.4);
    .singerName {
      height: 79px;
      line-height: 79px;
      font-size: 37px; /*px*/
      color: #fff;
    }
  }
}
.title {
  padding: 0 0 0 30px;
  height: 111px;
  line-height: 111px;
  font-size: 33px; /*px*/
  font-weight: 600;
}
.briefInt {
  height: 120px;
  width: 100%;
  padding: 0 50px 35px 32px;
  box-sizing: border-box;
  border-bottom: #fcfcfd 16px solid;
  font-size: 27px; /*px*/
  line-height: 50px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
}
</style>
