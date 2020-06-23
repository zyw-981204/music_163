import require from '@/utils/require'

export function getSeachHot(oParams) {
  return require.get('/search/hot', {
    params: oParams.params
  })
}

export function getSeach(oParams) {
  return require.get('/search', {
    params: oParams.params
  })
}

export function getAlbum(oParams) {
  return require.get('/album', {
    params: oParams.params
  })
}
export function getAlbumComment(oParams) {
  return require.get('/comment/album', {
    params: oParams.params
  })
}

export function getArtists(oParams) {
  return require.get('/artists', {
    params: oParams.params
  })
}
export function getArtistsDesc(oParams) {
  return require.get('/artist/desc', {
    params: oParams.params
  })
}