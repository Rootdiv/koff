import { API_URL } from '../../const';
import { CardButton } from '../../features/CardButton/CardButton';
import { FavoriteButton } from '../../features/FavoriteButton/FavoriteButton';
import { Pagination } from '../../features/Pagination/Pagination';
import { getContainer } from '../getContainer';

export class ProductCard {
  static instance = null;

  constructor() {
    if (!ProductCard.instance) {
      ProductCard.instance = this;

      this.element = document.createElement('section');
      this.element.className = 'product';
      this.containerElement = getContainer(this.element, 'product__container');
      this.isMounted = false;
    }
    return ProductCard.instance;
  }

  getMainSlider(images) {
    const productSliderMain = document.createElement('div');
    productSliderMain.className = 'swiper product__slider-main';

    const productMainList = document.createElement('ul');
    productMainList.className = 'swiper-wrapper product__main-list';

    const mainSliderItems = images.map(item => {
      const productSlide = document.createElement('li');
      productSlide.className = 'swiper-slide product__slide';

      const productImage = new Image();
      productImage.src = `${API_URL}/${item}`;
      productImage.className = 'product__image';

      productSlide.append(productImage);
      return productSlide;
    });

    productMainList.append(...mainSliderItems);
    productSliderMain.append(productMainList);

    return productSliderMain;
  }

  getThumbnailsSlider(images) {
    const productSliderThumbnails = document.createElement('div');
    productSliderThumbnails.className = 'swiper product__slider-thumbnails';

    const productThumbnailsList = document.createElement('ul');
    productThumbnailsList.className = 'swiper-wrapper product__thumbnails-list';

    const thumbnailsSliderItems = images.map(item => {
      const productThumbnailsSlide = document.createElement('li');
      productThumbnailsSlide.className = 'swiper-slide product__thumbnails-slide';

      const productThumbnailsImg = new Image();
      productThumbnailsImg.src = `${API_URL}/${item}`;
      productThumbnailsImg.className = 'product__thumbnails-img';

      productThumbnailsSlide.append(productThumbnailsImg);
      return productThumbnailsSlide;
    });

    productThumbnailsList.append(...thumbnailsSliderItems);
    productSliderThumbnails.append(productThumbnailsList);

    return productSliderThumbnails;
  }

  getProductPicture(images) {
    const productPicture = document.createElement('div');
    productPicture.className = 'product__picture';

    const productSliderMain = this.getMainSlider(images);
    productPicture.prepend(productSliderMain);

    if (images.length > 1) {
      const productArrowPrev = document.createElement('button');
      productArrowPrev.className = 'product__arrow product__arrow_prev';
      productArrowPrev.innerHTML = `
        <svg width="32" height="32" class="product__arrow-svg">
          <use href="/img/sprite.svg#prev" />
        </svg>`;

      const productArrowNext = document.createElement('button');
      productArrowNext.className = 'product__arrow product__arrow_next';
      productArrowNext.innerHTML = `
        <svg width="32" height="32" class="product__arrow-svg">
          <use href="/img/sprite.svg#next" />
        </svg>`;

      productSliderMain.append(productArrowPrev, productArrowNext);

      const productSliderThumbnails = this.getThumbnailsSlider(images);
      productPicture.append(productSliderThumbnails);
    }

    return productPicture;
  }

  getProductInfo(data) {
    const productInfo = document.createElement('div');
    productInfo.className = 'product__info';

    const productPrice = document.createElement('p');
    productPrice.className = 'product__price';
    productPrice.innerHTML = `${data.price.toLocaleString()}&nbsp;&#8381;`;

    const productArticle = document.createElement('p');
    productArticle.className = 'product__article';
    productArticle.innerHTML = `арт.&nbsp;${data.article}`;

    const productCharacteristics = document.createElement('div');
    productCharacteristics.className = 'product__characteristics';
    const productCharacteristicsTitle = document.createElement('h3');
    productCharacteristicsTitle.className = 'product__characteristics-title';
    productCharacteristicsTitle.textContent = 'Общие характеристики';

    const productCharacteristicsTable = document.createElement('table');
    productCharacteristicsTable.className = 'product__characteristics-table table';

    const tableCharacteristicsRows = data.characteristics.map(([filed, value]) => {
      const tableRow = document.createElement('tr');
      tableRow.className = 'table__row';
      const tableFiled = document.createElement('td');
      tableFiled.className = 'table__filed';
      tableFiled.textContent = filed;
      const tableValue = document.createElement('td');
      tableValue.className = 'table__value';
      tableValue.textContent = value;

      tableRow.append(tableFiled, tableValue);

      return tableRow;
    });

    productCharacteristicsTable.append(...tableCharacteristicsRows);
    productCharacteristics.append(productCharacteristicsTitle, productCharacteristicsTable);

    const productButtons = document.createElement('div');
    productButtons.className = 'product__btns';
    const productBtn = new CardButton('product__btn', 'В корзину').create(data.id);
    const productFavorite = new FavoriteButton('product').create(data.id);

    productButtons.append(productBtn, productFavorite);

    productInfo.append(productPrice, productArticle, productCharacteristics, productButtons);

    return productInfo;
  }

  render(data) {
    this.containerElement.textContent = '';

    if (data === 'error') {
      this.containerElement.insertAdjacentHTML(
        'beforeend',
        `<p class="product__empty">Товар не найден или не существует</p>`,
      );
      return;
    }

    const titleElem = document.createElement('h2');
    titleElem.className = 'product__title';

    const productImages = this.getProductPicture(data.images);
    const productInfo = this.getProductInfo(data);

    this.containerElement.append(titleElem, productImages, productInfo);
  }

  mount(parentElem, data) {
    this.render(data);

    if (this.isMounted) {
      return;
    }

    parentElem.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
