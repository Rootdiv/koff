import { getContainer } from '../getContainer';

export class Order {
  static instance = null;

  constructor() {
    if (!Order.instance) {
      Order.instance = this;
      this.element = document.createElement('section');
      this.element.className = 'order';
      this.containerElement = getContainer(this.element, 'order__container');
      this.isMounted = false;

      this.deliveryTypeList = {
        delivery: 'Доставка',
        pickup: 'Самовывоз',
      };
      this.paymentTypeList = {
        card: 'Картой при получении',
        cash: 'Наличными при получении',
      };
    }

    return Order.instance;
  }

  getOrderInfo(id, totalPrice) {
    const orderInfo = document.createElement('div');
    orderInfo.className = 'order__info';

    const title = document.createElement('p');
    title.className = 'order__title';
    title.textContent = 'Заказ успешно размещен';
    const price = document.createElement('p');
    price.className = 'order__price';
    price.innerHTML = `${totalPrice.toLocaleString()}&nbsp;&#8381;`;
    const number = document.createElement('p');
    number.className = 'order__number';
    number.innerHTML = `&numero;${id}`;

    orderInfo.append(title, price, number);

    return orderInfo;
  }

  getTableHTML(data) {
    return `
      <table class="order__table table">
        <caption class="table__title">Данные доставки</caption>
        <tr class="table__row">
          <td class="table__field">Получатель</td>
          <td class="table__value">${data.name}</td>
        </tr>
        <tr class="table__row">
          <td class="table__field">Телефон</td>
          <td class="table__value">${data.phone}</td>
        </tr>
        <tr class="table__row">
          <td class="table__field">E-mail</td>
          <td class="table__value">${data.email}</td>
        </tr>
        ${
          data.address
            ? `<tr class="table__row">
                <td class="table__field">Адрес доставки</td>
                <td class="table__value">${data.address}</td>
              </tr>`
            : ''
        }
        <tr class="table__row">
          <td class="table__field">Способ оплаты</td>
          <td class="table__value">${this.paymentTypeList[data.paymentType]}</td>
        </tr>
        <tr class="table__row">
          <td class="table__field">Способ получения</td>
          <td class="table__value">${this.deliveryTypeList[data.deliveryType]}</td>
        </tr>
      </table>
		`;
  }

  getButton() {
    const button = document.createElement('a');
    button.className = 'order__link-btn';
    button.href = '/';
    button.textContent = 'На главную';
    return button;
  }

  getWrapper(data) {
    const { id } = data;
    const totalPrice = parseInt(data.totalPrice) + (data.deliveryType === 'delivery' ? 500 : 0);

    const wrapper = document.createElement('div');
    wrapper.className = 'order__wrapper';
    if (!data) {
      wrapper.insertAdjacentHTML('beforeend', '<div>Заказ не найден!</div>');
    } else {
      wrapper.insertAdjacentElement('afterbegin', this.getOrderInfo(id, totalPrice));
      wrapper.insertAdjacentHTML('beforeend', this.getTableHTML(data));
      wrapper.append(this.getButton());
    }

    return wrapper;
  }

  mount(parentElement, data) {
    if (this.isMounted) {
      return;
    }

    this.containerElement.append(this.getWrapper(data));

    parentElement.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
