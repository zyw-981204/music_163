import require from '@/utils/require';

export function getPersonalized(oParams){
  return require.get('/personalized', {
    params: oParams.params
  });
};

export function getPersonalizedNewsong(oParams){
  return require.get('/personalized/newsong', {
    params: oParams.params
  });
};
export function getPlaylistDetail(oParams){
  return require.get('/playlist/detail', {
    params: oParams.params
  });
};
export function getPlaylistComment(oParams){
  return require.get('/comment/playlist', {
    params: oParams.params
  });
};