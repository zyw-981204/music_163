"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

_vue["default"].use(_vuex["default"]);

var store = new _vuex["default"].Store({
  state: {
    //放数据的
    song: {
      //歌曲数据
      id: null,
      url: '',
      //当前歌曲地址
      name: '',
      //歌名
      isPlay: false,
      //是否在播放
      picUrl: '',
      //图片
      pic_str: '',
      lyric: [],
      activeIndex: 0 //歌词激活位置

    },
    songList: [] //需要播放歌的id集合

  },
  getters: {
    //在组建中得到state
    song: function song(state) {
      return state.song;
    },
    songList: function songList(state) {
      return state.songList;
    }
  },
  mutations: {
    //同步处理state
    updateSong: function updateSong(state, playload) {
      state.song = playload;
    },
    updateSongList: function updateSongList(state, palyload) {
      //palyload可以是id集合数组，可以是直接歌id
      state.songList = _toConsumableArray(new Set(state.songList.concat(palyload))); //console.log(state.songList)
    }
  },
  actions: {//异步处理
  }
});
var _default = store;
exports["default"] = _default;