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

    const inputFieldset = document.createElement('fieldset');
    inputFieldset.className = 'form-order__fieldset form-order__fieldset_input';

    const name = document.createElement('input');
    name.name = 'name';
    name.placeholder = 'Фамилия';
    name.className = 'form-order__input';
    name.required = true;
    const phone = document.createElement('input');
    phone.name = 'phone';
    phone.placeholder = 'Телефон';
    phone.className = 'form-order__input';
    phone.required = true;
    const email = document.createElement('input');
    email.name = 'email';
    email.placeholder = 'E-mail';
    email.className = 'form-order__input';
    email.required = true;
    const address = document.createElement('input');
    address.name = 'address';
    address.placeholder = 'Адрес доставки';
    address.className = 'form-order__input';
    const comments = document.createElement('textarea');
    comments.name = 'comments';
    comments.placeholder = 'Комментарий к заказу';
    comments.className = 'form-order__textarea';

    inputFieldset.append(name, phone, email, address, comments);

    const deliveryFieldset = document.createElement('fieldset');
    deliveryFieldset.className = 'form-order__fieldset form-order__fieldset_radio';
    const deliveryLegend = document.createElement('legend');
    deliveryLegend.className = 'form-order__legend';
    deliveryLegend.textContent = 'Доставка';

    const deliveryLabel = document.createElement('label');
    deliveryLabel.className = 'form-order__label radio';
    deliveryLabel.textContent = 'Доставка';
    const deliveryInput = document.createElement('input');
    deliveryInput.type = 'radio';
    deliveryInput.name = 'deliveryType';
    deliveryInput.value = 'delivery';
    deliveryInput.required = true;
    deliveryInput.className = 'radio__input';
    deliveryLabel.append(deliveryInput);

    const pickupLabel = document.createElement('label');
    pickupLabel.className = 'form-order__label radio';
    pickupLabel.textContent = 'Самовывоз';
    const pickupInput = document.createElement('input');
    pickupInput.type = 'radio';
    pickupInput.name = 'deliveryType';
    pickupInput.value = 'pickup';
    pickupInput.required = true;
    pickupInput.className = 'radio__input';
    pickupLabel.append(pickupInput);
    deliveryFieldset.append(deliveryLegend, deliveryLabel, pickupLabel);

    const paymentFieldset = document.createElement('fieldset');
    paymentFieldset.className = 'form-order__fieldset form-order__fieldset_radio';
    const legendPayment = document.createElement('legend');
    legendPayment.className = 'form-order__legend';
    legendPayment.textContent = 'Оплата';

    const cardPaymentLabel = document.createElement('label');
    cardPaymentLabel.className = 'form-order__label radio';
    cardPaymentLabel.textContent = 'Картой при получении';
    const cardPaymentInput = document.createElement('input');
    cardPaymentInput.type = 'radio';
    cardPaymentInput.name = 'paymentType';
    cardPaymentInput.value = 'card';
    cardPaymentInput.required = true;
    cardPaymentInput.className = 'radio__input';
    cardPaymentLabel.append(cardPaymentInput);

    const cashPaymentLabel = document.createElement('label');
    cashPaymentLabel.className = 'form-order__label radio';
    cashPaymentLabel.textContent = 'Наличными при получении';
    const cashPaymentInput = document.createElement('input');
    cashPaymentInput.type = 'radio';
    cashPaymentInput.name = 'paymentType';
    cashPaymentInput.value = 'cash';
    cashPaymentInput.required = true;
    cashPaymentInput.className = 'radio__input';
    cashPaymentLabel.append(cashPaymentInput);
    paymentFieldset.append(legendPayment, cardPaymentLabel, cashPaymentLabel);

    form.append(formTitle, inputFieldset, deliveryFieldset, paymentFieldset);

    deliveryFieldset.addEventListener('change', ({ target }) => {
      if (target === deliveryInput) {
        address.disabled = false;
        address.required = true;
      } else if (target === pickupInput) {
        address.disabled = true;
        address.required = false;
        address.value = '';
      }
    });

    this.containerElement.append(form);
  }

  mount(parentElem, data, emptyText) {
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
