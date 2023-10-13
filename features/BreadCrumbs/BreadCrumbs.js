import { getContainer } from '../../modules/getContainer';

export class BreadCrumbs {
  static instance = null;

  constructor() {
    if (!BreadCrumbs.instance) {
      BreadCrumbs.instance = this;

      this.element = document.createElement('div');
      this.element.className = 'breadcrumb';
      this.containerElement = getContainer(this.element);
      this.isMounted = false;
    }

    return BreadCrumbs.instance;
  }

  render(list) {
    this.containerElement.textContent = '';
    const listElem = document.createElement('ul');
    listElem.className = 'breadcrumb__list';

    const breadCrumbList = [{ text: 'Главная', href: '/' }, ...list];

    const listItems = breadCrumbList.map(item => {
      const listItemElem = document.createElement('li');
      listItemElem.className = 'breadcrumb__item';
      const link = document.createElement('a');
      link.className = 'breadcrumb__link';
      link.textContent = item.text;
      if (item.href) {
        link.href = item.href;
      }

      const separator = document.createElement('span');
      separator.className = 'breadcrumb__separator';
      separator.innerHTML = '&gt;';

      listItemElem.append(link, separator);

      return listItemElem;
    });

    listElem.append(...listItems);

    this.containerElement.append(listElem);
  }

  mount(parentElem, data) {
    if (this.isMounted) {
      return;
    }

    this.render(data);
    parentElem.append(this.element);
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
