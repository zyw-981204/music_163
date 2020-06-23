import Vue from 'vue'
import Router from 'vue-router'
import recommendationIndex from '@/views/recommendation/'
import songIndex from '@/views/song/'
import searchIndex from '@/views/search/'
import hotSongIndex from '@/views/hot/'
import albumIndex from '@/views/search/album'
import artistsIndex from '@/views/search/artist'
import playlistIndex from '@/views/recommendation/playlist'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'recommendation Index',
      component: recommendationIndex
    },
    {
      path: '/song/:id',
      name: 'play song',
      component: songIndex
    },
    {
      path: '/search',
      name: 'search index',
      component: searchIndex
    },
    {
      path: '/hot',
      name: 'hot index',
      component: hotSongIndex
    },
    {
      path: '/album/:id',
      name: 'album index',
      component: albumIndex
    },
    {
      path: '/artists/:id',
      name: 'artists index',
      component: artistsIndex
    },
    {
      path: '/playlist/:id',
      name: 'playlist index',
      component: playlistIndex
    }
  ]
})
