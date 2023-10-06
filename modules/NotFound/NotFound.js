import { getContainer } from '../getContainer';

export class NotFound {
  static instance = null;

  constructor() {
    if (!NotFound.instance) {
      NotFound.instance = this;
      this.element = document.createElement('section');
      this.element.className = 'error';
      this.containerElement = getContainer(this.element);
      this.isMounted = false;
    }

    return NotFound.instance;
  }

  getError() {
    const error = document.createElement('h2');
    error.className = 'error__message';
    error.textContent = 'Страница не найдена';
    return error;
  }

  mount(parentElement) {
    if (this.isMounted) {
      return;
    }

    this.containerElement.append(this.getError());

    parentElement.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
