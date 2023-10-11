import { getContainer } from '../getContainer';

export class NotFavorites {
  static instance = null;

  constructor() {
    if (!NotFavorites.instance) {
      NotFavorites.instance = this;
      this.element = document.createElement('section');
      this.element.className = 'favorites';
      this.containerElement = getContainer(this.element);
      this.isMounted = false;
    }

    return NotFavorites.instance;
  }

  getMessage() {
    const error = document.createElement('h2');
    error.className = 'favorites__message';
    error.textContent = 'В избранное ничего не добавлено';

    return error;
  }

  getButton() {
    const button = document.createElement('a');
    button.className = 'favorites__link-btn';
    button.href = '/';
    button.textContent = 'На главную';
    return button;
  }

  mount(parentElement) {
    if (this.isMounted) {
      return;
    }

    if (!this.containerElement.childElementCount) {
      this.containerElement.append(this.getMessage(), this.getButton());
    }

    parentElement.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
