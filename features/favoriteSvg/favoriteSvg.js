export const favoriteSvg = className => `
  <svg width="16" height="16" class="${className}">
    <use href="/img/sprite.svg#favorite" />
  </svg>
`;

/* let favorite = null
export const favoriteSvg = async () => {
  if(!favorite){
    const response = await fetch('/img/favorite.svg');
    const svg = await response.text();
    favorite = new DOMParser().parseFromString(svg, 'image/svg+xml').querySelector('svg');
    return favorite.cloneNode(true);
  }
}; */
