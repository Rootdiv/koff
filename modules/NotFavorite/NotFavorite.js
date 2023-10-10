import { getContainer } from '../getContainer';

export class NotFavorite {
  static instance = null;

  constructor() {
    if (!NotFavorite.instance) {
      NotFavorite.instance = this;
      this.element = document.createElement('section');
      this.element.className = 'favorite';
      this.containerElement = getContainer(this.element);
      this.isMounted = false;
    }

    return NotFavorite.instance;
  }

  getMessage() {
    const error = document.createElement('h2');
    error.className = 'favorite__message';
    error.textContent = 'В избранное ничего не добавлено';

    return error;
  }

  getButton() {
    const button = document.createElement('a');
    button.className = 'favorite__link-btn';
    button.href = '/';
    button.textContent = 'На главную';
    return button;
  }

  mount(parentElement) {
    if (this.isMounted) {
      return;
    }

    this.containerElement.append(this.getMessage(), this.getButton());

    parentElement.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
