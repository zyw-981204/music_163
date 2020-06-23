import require from '@/utils/require'

export function getArtists(oParams) {
  return require.get('/artists', {
    params: oParams.params
  })
}
export function getArtistsAlbum(oParams) {
  return require.get('/artist/album', {
    params: oParams.params
  })
}