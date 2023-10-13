import { FavoriteService } from '../../services/StorageService';
import { favoriteSvg } from '../favoriteSvg/favoriteSvg';

export class FavoriteButton {
  constructor(className) {
    this.className = className;
    this.favoriteService = new FavoriteService();
  }

  create(id) {
    const button = document.createElement('button');
    button.className = `${this.className}__favorite`;
    button.type = 'button';
    button.dataset.id = id;
    button.innerHTML = favoriteSvg(`${this.className}__svg`);

    if (this.favoriteService.check(id)) {
      button.classList.add(`${this.className}__favorite_active`);
    }

    button.addEventListener('click', () => {
      if (this.favoriteService.check(id)) {
        this.favoriteService.remove(id);
        button.classList.remove(`${this.className}__favorite_active`);
      } else {
        this.favoriteService.add(id);
        button.classList.add(`${this.className}__favorite_active`);
      }
    });

    return button;
  }
}
