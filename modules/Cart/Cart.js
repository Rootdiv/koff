import { API_URL } from '../../const';
import { debounce, declOfNum } from '../../helpers';
import { ApiService } from '../../services/ApiService';
import { Header } from '../Header/Header';
import { getContainer } from '../getContainer';

export class Cart {
  static instance = null;

  constructor() {
    if (!Cart.instance) {
      Cart.instance = this;

      this.element = document.createElement('section');
      this.element.className = 'cart';
      this.containerElement = getContainer(this.element, 'cart__container');
      this.isMounted = false;
      this.debUpdateCart = debounce(this.updateCart.bind(this), 300);
    }
    return Cart.instance;
  }

  updateCart(id, quantity) {
    if (quantity === 0) {
      new ApiService().deleteProductFromCart(id);
      const index = this.cartData.products.findIndex(item => item.id === id);
      this.cartData.products.splice(index, 1);
      new Header().changeCount(this.cartData.products.length);
    } else {
      new ApiService().updateQuantityProductToCart(id, quantity);
      this.cartData.products.forEach(item => {
        if (item.id === id) {
          item.quantity = quantity;
        }
      });
    }

    this.cartData.totalPrice = this.cartData.products.reduce((acc, item) => acc + item.price * item.quantity, 0);

    this.cartPlaceCount.textContent = `${declOfNum(this.cartData.products.length, this.words)} на сумму:`;
    this.cartPlacePrice.innerHTML = `${this.cartData.totalPrice.toLocaleString()}&nbsp;&#8381;`;

    if (this.cartData.products.length === 0) {
      this.containerElement.textContent = '';
      this.containerElement.insertAdjacentHTML('beforeend', '<p class="cart__empty">В корзину ничего не добавлено</p>');
    }
  }

  renderProducts() {
    this.listProducts = this.cartData.products;

    const listElem = document.createElement('ul');
    listElem.className = 'cart__products';

    const listItems = this.listProducts.map(item => {
      const listItemElem = document.createElement('li');
      listItemElem.className = 'cart__product';

      const img = new Image();
      img.className = 'cart__img';
      img.src = `${API_URL}/${item.images[0]}`;
      img.alt = item.name;

      const title = document.createElement('h3');
      title.className = 'cart__title-product';
      title.textContent = item.name;

      const price = document.createElement('p');
      price.className = 'cart__price';
      price.innerHTML = `${(item.price * item.quantity).toLocaleString()}&nbsp;&#8381;`;

      const article = document.createElement('p');
      article.className = 'cart__article';
      article.innerHTML = `арт.&nbsp;${item.article}`;

      const productControl = document.createElement('div');
      productControl.className = 'cart__product-control';

      const cartProductBtnDecrement = document.createElement('button');
      cartProductBtnDecrement.className = 'cart__product-btn';
      cartProductBtnDecrement.textContent = '-';

      const cartProductCount = document.createElement('p');
      cartProductCount.className = 'cart__product-count';
      cartProductCount.textContent = item.quantity;

      const cartProductBtnIncrement = document.createElement('button');
      cartProductBtnIncrement.className = 'cart__product-btn';
      cartProductBtnIncrement.textContent = '+';

      cartProductBtnDecrement.addEventListener('click', () => {
        if (item.quantity > 0) {
          item.quantity--;
          cartProductCount.textContent = item.quantity;
        }

        if (item.quantity === 0) {
          this.debUpdateCart(item.id, item.quantity);
          listItemElem.remove();
          return;
        }

        price.innerHTML = `${(item.price * item.quantity).toLocaleString()}&nbsp;&#8381;`;

        this.debUpdateCart(item.id, item.quantity);
      });
      cartProductBtnIncrement.addEventListener('click', () => {
        item.quantity++;
        cartProductCount.textContent = item.quantity;
        price.innerHTML = `${(item.price * item.quantity).toLocaleString()}&nbsp;&#8381;`;

        this.debUpdateCart(item.id, item.quantity);
      });

      productControl.append(cartProductBtnDecrement, cartProductCount, cartProductBtnIncrement);

      listItemElem.append(img, title, price, article, productControl);
      return listItemElem;
    });

    listElem.append(...listItems);
    this.containerElement.append(listElem);
  }

  renderPlace() {
    this.words = ['товар', 'товара', 'товаров'];
    const totalCount = this.cartData.totalCount;
    const totalPrice = this.cartData.totalPrice;

    const cartPlace = document.createElement('div');
    cartPlace.className = 'cart__place';

    const cartPlaceTitle = document.createElement('h3');
    cartPlaceTitle.className = 'cart__subtitle';
    cartPlaceTitle.textContent = 'Оформление';

    const cartPlaceInfo = document.createElement('div');

    this.cartPlaceCount = document.createElement('p');
    this.cartPlaceCount.className = 'cart__place-count';
    this.cartPlaceCount.textContent = `${declOfNum(totalCount, this.words)} на сумму:`;

    this.cartPlacePrice = document.createElement('p');
    this.cartPlacePrice.className = 'cart__place-price';
    this.cartPlacePrice.innerHTML = `${totalPrice.toLocaleString()}&nbsp;&#8381;`;

    cartPlaceInfo.append(this.cartPlaceCount, this.cartPlacePrice);

    const cartPlaceDelivery = document.createElement('p');
    cartPlaceDelivery.className = 'cart__place-delivery';
    cartPlaceDelivery.innerHTML = 'Доставка 0 &#8381;';

    const cartPlaceBtn = document.createElement('button');
    cartPlaceBtn.type = 'submit';
    cartPlaceBtn.setAttribute('form', 'order');
    cartPlaceBtn.className = 'cart__place-btn';
    cartPlaceBtn.textContent = 'Оформить заказ';

    cartPlace.append(cartPlaceTitle, cartPlaceInfo, cartPlaceDelivery, cartPlaceBtn);
    this.containerElement.append(cartPlace);
  }
  renderForm() {
    const form = document.createElement('form');
    form.id = 'order';
    form.method = 'POST';
    form.className = 'cart__form form-order';

    const formTitle = document.createElement('h3');
    formTitle.className = 'cart__subtitle cart__subtitle_form-order';
    formTitle.textContent = 'Данные для доставки';

    const fieldsetInput = document.createElement('fieldset');
    fieldsetInput.className = 'form-order__fieldset form-order__fieldset_input';
    const inputName = document.createElement('input');
    inputName.name = 'name';
    inputName.placeholder = 'Фамилия';
    inputName.className = 'form-order__input';
    inputName.required = true;
    const inputPhone = document.createElement('input');
    inputPhone.name = 'phone';
    inputPhone.placeholder = 'Телефон';
    inputPhone.className = 'form-order__input';
    inputPhone.required = true;
    const inputEmail = document.createElement('input');
    inputEmail.name = 'email';
    inputEmail.placeholder = 'E-mail';
    inputEmail.className = 'form-order__input';
    inputEmail.required = true;
    const inputAddress = document.createElement('input');
    inputAddress.name = 'address';
    inputAddress.placeholder = 'Адрес доставки';
    inputAddress.className = 'form-order__input';
    const comments = document.createElement('textarea');
    comments.name = 'comments';
    comments.placeholder = 'Комментарий к заказу';
    comments.className = 'form-order__textarea';

    fieldsetInput.append(inputName, inputPhone, inputEmail, inputAddress, comments);

    const fieldsetDelivery = document.createElement('fieldset');
    fieldsetDelivery.className = 'form-order__fieldset form-order__fieldset_radio';
    const legendDelivery = document.createElement('legend');
    legendDelivery.className = 'form-order__legend';
    legendDelivery.textContent = 'Доставка';

    const labelDelivery = document.createElement('label');
    labelDelivery.className = 'form-order__label radio';
    labelDelivery.textContent = 'Доставка';
    const inputDelivery = document.createElement('input');
    inputDelivery.type = 'radio';
    inputDelivery.name = 'deliveryType';
    inputDelivery.value = 'delivery';
    inputDelivery.required = true;
    inputDelivery.className = 'radio__input';
    labelDelivery.append(inputDelivery);

    const labelPickup = document.createElement('label');
    labelPickup.className = 'form-order__label radio';
    labelPickup.textContent = 'Самовывоз';
    const inputPickup = document.createElement('input');
    inputPickup.type = 'radio';
    inputPickup.name = 'deliveryType';
    inputPickup.value = 'pickup';
    inputPickup.required = true;
    inputPickup.className = 'radio__input';
    labelPickup.append(inputPickup);
    fieldsetDelivery.append(legendDelivery, labelDelivery, labelPickup);

    const fieldsetPayment = document.createElement('fieldset');
    fieldsetPayment.className = 'form-order__fieldset form-order__fieldset_radio';
    const legendPayment = document.createElement('legend');
    legendPayment.className = 'form-order__legend';
    legendPayment.textContent = 'Оплата';

    const labelPaymentCard = document.createElement('label');
    labelPaymentCard.className = 'form-order__label radio';
    labelPaymentCard.textContent = 'Картой при получении';
    const inputPaymentCard = document.createElement('input');
    inputPaymentCard.type = 'radio';
    inputPaymentCard.name = 'paymentType';
    inputPaymentCard.value = 'payment';
    inputPaymentCard.required = true;
    inputPaymentCard.className = 'radio__input';
    labelPaymentCard.append(inputPaymentCard);

    const labelPaymentCash = document.createElement('label');
    labelPaymentCash.className = 'form-order__label radio';
    labelPaymentCash.textContent = 'Наличными при получении';
    const inputPaymentCash = document.createElement('input');
    inputPaymentCash.type = 'radio';
    inputPaymentCash.name = 'paymentType';
    inputPaymentCash.value = 'cash';
    inputPaymentCash.required = true;
    inputPaymentCash.className = 'radio__input';
    labelPaymentCash.append(inputPaymentCash);
    fieldsetPayment.append(legendPayment, labelPaymentCard, labelPaymentCash);

    form.append(formTitle, fieldsetInput, fieldsetDelivery, fieldsetPayment);

    fieldsetDelivery.addEventListener('change', ({ target }) => {
      if (target.value === 'delivery') {
        inputAddress.disabled = false;
        inputAddress.required = true;
      } else if (target.value === 'pickup') {
        inputAddress.disabled = true;
        inputAddress.required = false;
      }
    });

    form.addEventListener('submit', event => {
      event.preventDefault();
      for (const [key, value] of new FormData(form)) {
        console.log(`${key} - ${value}`);
      }
    });

    this.containerElement.append(form);
  }

  async mount(parentElem, data, emptyText) {
    if (this.isMounted) {
      return;
    }

    this.containerElement.textContent = '';

    const titleElem = document.createElement('h2');
    titleElem.className = 'cart__title';
    titleElem.textContent = 'Корзина';

    this.cartData = data;

    if (data.products && data.products.length) {
      this.renderProducts();
      this.renderPlace();
      this.renderForm();
    } else {
      this.containerElement.insertAdjacentHTML(
        'beforeend',
        `<p class="cart__empty">${emptyText || 'Произошла ошибка, попробуйте зайти позже'}</p>`,
      );
    }

    this.containerElement.prepend(titleElem);
    parentElem.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
