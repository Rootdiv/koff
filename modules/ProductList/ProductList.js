import { API_URL } from '../../const';
import { Pagination } from '../Pagination/Pagination';
import { getContainer } from '../getContainer';

export class ProductList {
  static instance = null;

  constructor() {
    if (!ProductList.instance) {
      ProductList.instance = this;

      this.element = document.createElement('section');
      this.element.className = 'goods';
      this.containerElement = getContainer(this.element, 'goods__container');
      this.isMounted = false;
      this.addEvents();
    }
    return ProductList.instance;
  }

  addEvents() {}

  getHTMLTemplateItem({ id, images: [image], name: title, price }) {
    return `<article class="goods__card card">
      <a href="/product/${id}" class="card__link card__link_img">
        <img src="${API_URL}/${image}" alt="${title}" class="card__img">
      </a>
      <div class="card__info">
        <h3 class="card__title">
          <a href="/product/${id}" class="card__link">
            ${title}
          </a>
        </h3>
        <p class="card__price">${price.toLocaleString()}&nbsp;&#8381;</p>
      </div>
      <button type="button" class="card__btn" data-id="${id}">В корзину</button>
      <button type="button" class="card__favorite" data-id="${id}">
        <svg width="16" height="16" class="card__svg">
          <use href="/img/sprite.svg#favorite" />
        </svg>
      </button>
    </article>`;
  }

  updateListElem(data = []) {
    const listElem = document.createElement('ul');
    listElem.className = 'goods__list';

    const listItems = data.map(item => {
      const listItemElem = document.createElement('li');
      listItemElem.className = 'goods__item';
      listItemElem.innerHTML = this.getHTMLTemplateItem(item);
      return listItemElem;
    });

    listElem.append(...listItems);
    this.containerElement.append(listElem);
  }

  mount(parentElem, products, title) {
    this.containerElement.textContent = '';
    const titleElem = document.createElement('h2');
    titleElem.textContent = title ? title : 'Список товаров';
    titleElem.className = title ? 'goods__title' : 'goods__title visually-hidden';

    this.containerElement.append(titleElem);

    const isArray = Array.isArray(products);
    const productsData = isArray ? products : products.data;
    this.updateListElem(productsData);

    if (products.pagination && products.pagination.totalPages > 1) {
      new Pagination().mount(products.pagination);
      this.containerElement.append(new Pagination().element);
    }

    parentElem.append(this.element);
    if (this.isMounted) {
      return;
    }
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
