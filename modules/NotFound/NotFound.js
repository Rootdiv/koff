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

  getMessage() {
    const message = document.createElement('p');
    message.className = 'error__info';
    message.textContent = 'Через 5 секунд Вы будете перенаправлены ';

    const link = document.createElement('a');
    link.href = '/';
    link.className = 'error__link';
    link.textContent = 'на главную страницу';

    message.append(link);

    return message;
  }

  mount(parentElement) {
    if (this.isMounted) {
      return;
    }

    if (!this.containerElement.childElementCount) {
      this.containerElement.append(this.getError(), this.getMessage());
    }

    parentElement.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
