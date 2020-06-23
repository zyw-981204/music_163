<template>
  <div>
    <div class="songListHead" :style="{ backgroundImage: 'url(' + songListPic + ')' }">
      <div class="listCover">
        <div class="listname">{{ songListname }}</div>
        <div class="time">每周三更新</div>   
        <div class="listdes" v-html="songListdes">{{ '<p>' + songListdes +'</p>' }}</div> 
      </div>
    </div>
    <div class="listtitle">歌曲列表</div>
    <ul class="newSong-list">
      <li v-for="(item,index) in songListData" :key="item.id">
        <div class="gary In">{{ index+1 }}</div>
        <router-link :to="'/song/' + item.id">
          <div class="text">
            <div class="name">{{ item.name }}<span class="span">{{ item.alia[0] != null ? '('+item.alia[0]+')' : '' }}</span></div>
            <div class="singer">{{ item.ar[0] != null ? item.ar[0].name : '' }} - {{ item.al.name }}</div>
          </div>
          <i class="fa fa-play-circle-o"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSongList } from '@/api/songList'

export default {
  data() {
    return {
      songListPic: '',
      songListname: '',
      songListdes: '',
      songListData: [],
    }
  },
  created() {
    this.getSongList();
  },
  methods: {
    getSongList() {
      var id = Number(this.$route.params.id);
      var str='';
      getSongList({
        params: {
          id
        }
      }).then((res) => {
        var data = res.data;
        console.log(data);
        if (data.code == 200) {
          //成功
          this.songListPic=data.playlist.coverImgUrl;
          this.songListname=data.playlist.name;
          str=data.playlist.description;
          str=str.replace(/\n/g,"<br/>")
          this.songListdes=str;
          this.songListData=data.playlist.tracks;
          console.log('success');
        }
      })
    },
  },
  components: {
    
  }
}
</script>

<style lang="scss" scoped>
.songListHead{
  height:420px;
  width:100%;
  background: no-repeat center center / 200% 250%;
  .listCover{
    height:100%;
    width:100%;
    padding:82px 58px 0 40px;
    box-sizing:border-box;
    background: rgba(0, 0, 0, 0.4);
    overflow-x: hidden;
    .listname{
      font-size:34px;/*px*/
      line-height:52px;
      color:#fff;
    }
    .time{
      margin:21px 0;
      height:30px;
      width:112px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      font-size:20px;/*px*/
      line-height:30px;
      text-align:center;
      color:#d8d3d7;
    }
    .listdes{
      padding-top:23px;
      font-size:26px;/*px*/
      line-height:52px;
      color:#e8e1e5;
      overflow:hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
.listtitle{
  width:100%;
  height:46px;
  padding-left:20px;
  box-sizing:border-box;
  background-color:#eeeff0;
  font-size:24px;/*px*/
  line-height:46px;
  color:#666;
}
.span{
  color:#888;
}
.text{
  width:600px;
}
.In{
  display:flex;
  align-items: center;
  width:50px;
  font-size:25px;/*px*/
}
.gray{
  color:#999;
}
.red{
  color:#df3436;
}
.newSong-list li{
  display:flex;
  flex-flow: wrap;
}
</style>
