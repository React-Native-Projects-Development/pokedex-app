export const useEvolution = () => {
  const getPicture = (id: string | number) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const getId = (url: string) => {
    if (url?.length > 0) {
      const splitUrl = url.split('/');
      if (splitUrl?.length > 0) {
        return splitUrl[splitUrl.length - 2];
      }
    }
  };
  return {getPicture, getId};
};
