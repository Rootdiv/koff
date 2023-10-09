export class Pagination {
  static instance = null;

  constructor() {
    if (!Pagination.instance) {
      Pagination.instance = this;

      this.element = document.createElement('div');
      this.element.className = 'pagination';
      this.isMounted = false;
    }
    return Pagination.instance;
  }

  getNumbersPagination({ currentPage, totalPages }) {
    const pagesElem = document.createElement('p');
    pagesElem.textContent = ' из ';
    const pageElem = document.createElement('span');
    pageElem.className = 'pagination__current';
    pageElem.textContent = currentPage;
    const totalElem = document.createElement('span');
    totalElem.className = 'pagination__total';
    totalElem.textContent = totalPages;

    pagesElem.prepend(pageElem);
    pagesElem.append(totalElem);

    return pagesElem;
  }

  getPagination({ url, slug }, { currentPage, totalPages }) {
    const paramsUrl = new URLSearchParams();
    if (slug) {
      paramsUrl.set('slug', slug);
    }
    this.element.textContent = '';
    const bar = document.createElement('div');
    bar.style = `--width: calc((${currentPage} / ${totalPages}) * 100%)`;
    bar.className = 'pagination__bar';

    const arrows = document.createElement('div');
    arrows.className = 'pagination__arrows';
    const buttonLeft = document.createElement('a');
    const pagePrev = currentPage - 1;
    if (pagePrev >= 1) {
      paramsUrl.set('page', pagePrev);
      buttonLeft.href = `/${url}?${paramsUrl}`;
    }
    buttonLeft.className = 'pagination__left';
    buttonLeft.innerHTML = `
      <svg width="16" height="16">
        <use href="/img/sprite.svg#left" />
      </svg>
    `;

    const buttonRight = document.createElement('a');
    const pageNext = currentPage + 1;
    if (pageNext <= totalPages) {
      paramsUrl.set('page', pageNext);
      buttonRight.href = `/${url}?${paramsUrl}`;
    }
    buttonRight.className = 'pagination__right';
    buttonRight.innerHTML = `
      <svg width="16" height="16">
        <use href="/img/sprite.svg#right" />
      </svg>
    `;

    const numbers = this.getNumbersPagination({ currentPage, totalPages });

    arrows.append(buttonLeft, numbers, buttonRight);

    this.element.append(bar, arrows);
  }

  mount(params, data) {
    this.getPagination(params, data);

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
