import require from '@/utils/require';

export function getSingerDetail(oParams){
  return require.get('/artist/desc', {
    params: oParams.params
  });
};

export function getSinger(oParams){
  return require.get('/artists', {
    params: oParams.params
  });
};

export function getSingerMV(oParams){
  return require.get('/artist/mv', {
    params: oParams.params
  });
};

