import require from '@/utils/require'

export function getSongList(oParams) {
  return require.get('/playlist/detail', {
    params: oParams.params
  })
}


