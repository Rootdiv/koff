import { Card } from '../../features/Card/Card';
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

  updateListElem(data = []) {
    const listElem = document.createElement('ul');
    listElem.className = 'goods__list';

    const listItems = data.map(({ id, images: [image], name: title, price }) => {
      const listItemElem = document.createElement('li');
      listItemElem.className = 'goods__item';
      listItemElem.append(new Card({ id, image, title, price }).create());
      return listItemElem;
    });

    listElem.append(...listItems);
    this.containerElement.append(listElem);
  }

  mount(parentElem, products, params, title) {
    this.containerElement.textContent = '';
    const titleElem = document.createElement('h2');
    titleElem.textContent = title ? title : 'Список товаров';
    titleElem.className = title ? 'goods__title' : 'goods__title visually-hidden';

    this.containerElement.append(titleElem);

    const isArray = Array.isArray(products);
    const productsData = isArray ? products : products.data;
    this.updateListElem(productsData);

    if (products.pagination && products.pagination.totalPages > 1) {
      new Pagination().mount(params, products.pagination);
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
