<template>
  <div>
    <app-nav :activeIndex="1"></app-nav>
    <div>
      <div class="hotCover">
        <div class="hoticon">
          <img src="@/assets/img/hoticon.png" />
        </div>
        <div class="hottime">更新日期：{{ hotDate(updateTime) }}</div>
      </div>
      <ul class="newSong-list">
        <li v-for="(item,index) in hotData.slice(0,19)" :key="item.id">
          <router-link :to="'/song/' + item.id">
            <div class="text">
              <div class="sorting" :class="{ active: index < 3 }">{{ getIndex(index+1) }}</div>
              <div class="name-singer">
                <div class="name">
                  {{ item.name }}
                  <i
                    class="originSing"
                    style="color:#888"
                  >{{ item.alia[0] != null ? '('+item.alia[0] + ')' : '' }}</i>
                </div>
                <div
                  class="singer"
                >{{ item.ar[0].name != null ? item.ar[0].name : '' }} - {{ item.al.name }}</div>
              </div>
            </div>
            <i class="fa fa-play-circle-o"></i>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import appNav from "@/components/app-nav";
import { getHot } from "@/api/hot";
import { hotDate } from "@/utils/date.js";

export default {
  created() {
    this.getHot();
  },
  data() {
    return {
      hotData: [], //热歌榜数据
      updateTime: 0
    };
  },
  methods: {
    hotDate,
    getHot() {
      getHot({
        params: {
          idx: 1
        }
      }).then(res => {
        let { data } = res;
        if (data.code == 200) {
          //成功
          console.log(data);
          this.hotData = data.playlist.tracks;
          this.updateTime = data.playlist.updateTime;
        }
      });
    },
    getIndex(x) {
      if (x < 10) {
        return "0" + x;
      } else return x;
    }
  },
  components: {
    appNav
  }
};
</script>

<style lang="scss" scoped>
.newSong-list {
  li {
    padding-left: 0;
  }
}
.text {
  display: flex;
  justify-content: space-between;
  .sorting {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px; /*px*/
    color: #888888;
    width: 80px;
  }
  .active {
    color: #df3436;
  }
}
.hotCover {
  height: 292px;
  background-color: #bd6351;
  padding: 55px 0 0 50px;
  .hoticon {
    width: 285px;
    height: 136px;
  }
  .hottime {
    font-size: 24px; /*px*/
    color: #f7f0ee;
    margin-top: 25px;
  }
}
</style>
