import { getContainer } from '../getContainer';
import { getLogo } from '../getLogo';

export class Header {
  static instance = null;

  constructor() {
    if (!Header.instance) {
      Header.instance = this;

      this.element = document.createElement('header');
      this.element.className = 'header';
      this.containerElement = getContainer(this.element, 'header__container');
      this.isMounted = false;
    }
    return Header.instance;
  }

  getSearchForm() {
    const searchForm = document.createElement('form');
    searchForm.className = 'header__search';
    searchForm.method = 'GET';

    const input = document.createElement('input');
    input.type = 'search';
    input.name = 'search';
    input.placeholder = 'Введите запрос';
    input.className = 'header__input';

    const button = document.createElement('button');
    button.type = 'submit';
    button.className = 'header__btn';
    button.insertAdjacentHTML(
      'afterbegin',
      `<svg width="16" height="16">
        <use href="/img/sprite.svg#search" />
      </svg>`,
    );

    searchForm.append(input, button);
    return searchForm;
  }

  getNavigation() {
    const navigation = document.createElement('nav');
    navigation.className = 'header__control';

    const favoriteLink = document.createElement('a');
    favoriteLink.className = 'header__link';
    favoriteLink.href = '/favorite';
    favoriteLink.insertAdjacentHTML(
      'afterbegin',
      `<span class="header__link-text">Избранное</span>
      <svg width="16" height="16" class="header__favorite">
        <use href="/img/sprite.svg#favorite" />
      </svg>`,
    );

    const cartLink = document.createElement('a');
    cartLink.className = 'header__link';
    cartLink.href = '/cart';

    const linkText = document.createElement('span');
    linkText.className = 'header__link-text';
    linkText.textContent = 'Корзина';

    const countElement = document.createElement('span');
    countElement.className = 'header__count';
    countElement.textContent = '(0)';

    cartLink.append(linkText, countElement);

    cartLink.insertAdjacentHTML(
      'beforeend',
      `<svg width="16" height="16">
        <use href="/img/sprite.svg#cart" />
      </svg>`,
    );

    navigation.append(favoriteLink, cartLink);
    this.countElement = countElement;
    return navigation;
  }

  changeCount(n) {
    //todo n - получить
    this.countElement.textContent = `${n}`;
  }

  mount() {
    if (this.isMounted) {
      return;
    }

    const logo = getLogo('header__link-logo', 'header__logo');
    const searchForm = this.getSearchForm();
    const navigation = this.getNavigation();

    this.containerElement.append(logo, searchForm, navigation);

    document.body.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
