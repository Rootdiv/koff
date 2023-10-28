import { ApiService } from '../../services/ApiService';
import { getContainer } from '../getContainer';

export class Catalog {
  static instance = null;

  constructor() {
    if (!Catalog.instance) {
      Catalog.instance = this;

      this.element = document.createElement('nav');
      this.element.className = 'catalog';
      this.containerElement = getContainer(this.element, 'catalog__container');
      this.listElem = document.createElement('ul');
      this.listElem.className = 'catalog__list';
      this.containerElement.append(this.listElem);
      this.isMounted = false;
      this.linksList = [];
    }
    return Catalog.instance;
  }

  renderListElem(data) {
    this.listElem.textContent = '';
    const listItems = data.map(item => {
      const listItemElem = document.createElement('li');
      listItemElem.className = 'catalog__item';
      const link = document.createElement('a');
      link.className = 'catalog__link';
      link.href = `/category?slug=${item}`;
      link.textContent = item;
      this.linksList.push(link);

      listItemElem.append(link);
      return listItemElem;
    });

    this.listElem.append(...listItems);
  }

  async getData() {
    this.catalogData = await new ApiService().getProductCategories();
  }

  setActiveLink(slug) {
    const encodedSlug = encodeURIComponent(slug);
    this.linksList.forEach(link => {
      const linkSlug = new URL(link.href).searchParams.get('slug');
      if (encodeURIComponent(linkSlug) === encodedSlug) {
        link.classList.add('catalog__link_active');
      } else {
        link.classList.remove('catalog__link_active');
      }
    });
  }

  async mount(parentElem) {
    if (this.isMounted) {
      return this;
    }

    if (!this.catalogData) {
      await this.getData();
      this.renderListElem(this.catalogData);
    }

    parentElem.prepend(this.element);
    this.isMounted = true;
    return this;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
