export const favoriteSvg = className => `
  <svg width="16" height="16" class="${className}">
    <use href="/img/sprite.svg#favorite" />
  </svg>
`;

/* export const favoriteSvg = async () => {
  const response = await fetch('/img/favorite.svg');
  const svg = await response.text();
  return new DOMParser().parseFromString(svg, 'image/svg+xml').querySelector('svg');
}; */
