import require from '@/utils/require';

export function getHot(oParams){
  return require.get('/top/list', {
    params: oParams.params
  });
};
