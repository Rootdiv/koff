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

  checkPrevData(data) {
    let isSame = false;
    if (!this.prevData) {
      this.prevData = data;
    }

    isSame = data.every((item, i) => item.text === this.prevData[i].text);

    this.prevData = data;
    return isSame;
  }

  mount(parentElem, data) {
    if (this.isMounted && this.checkPrevData(data)) {
      return;
    }

    if (this.isMounted) {
      this.render(data);
      return;
    }

    this.render(data);
    parentElem.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
