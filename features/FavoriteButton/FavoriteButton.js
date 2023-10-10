import { FavoriteService } from '../../services/StorageService';
import { favoriteSvg } from '../favoriteSvg/favoriteSvg';

export class FavoriteButton {
  constructor(className) {
    this.className = className;
    this.favoriteService = new FavoriteService();
  }

  create(id) {
    const button = document.createElement('button');
    button.className = this.className;
    button.type = 'button';
    button.dataset.id = id;
    button.innerHTML = favoriteSvg('card__svg');

    if (this.favoriteService.check(id)) {
      button.classList.add(`${this.className}_active`);
    }

    button.addEventListener('click', () => {
      if (this.favoriteService.check(id)) {
        this.favoriteService.remove(id);
        button.classList.remove(`${this.className}_active`);
      } else {
        this.favoriteService.add(id);
        button.classList.add(`${this.className}_active`);
      }
    });

    return button;
  }
}
