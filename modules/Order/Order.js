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
    }

    return Order.instance;
  }

  getOrderInfo() {
    const orderInfo = document.createElement('div');
    orderInfo.className = 'order__info';

    const title = document.createElement('p');
    title.className = 'order__title';
    title.textContent = 'Заказ успешно размещен';
    const price = document.createElement('p');
    price.className = 'order__price';
    price.innerHTML = '20&nbsp;000&nbsp;&#8381;';
    const number = document.createElement('p');
    number.className = 'order__number';
    number.innerHTML = '&numero;43435';

    orderInfo.append(title, price, number);

    return orderInfo;
  }

  getTableHTML() {
    return `
      <table class="order__table table">
        <caption class="table__title">Данные доставки</caption>
        <tr class="table__row">
          <td class="table__filed">Получатель</td>
          <td class="table__value">Иванов Петр Александрович</td>
        </tr>
        <tr class="table__row">
          <td class="table__filed">Телефон</td>
          <td class="table__value">+7 (737) 346 23 00</td>
        </tr>
        <tr class="table__row">
          <td class="table__filed">E-mail</td>
          <td class="table__value">Ivanov84@gmail.com</td>
        </tr>
        <tr class="table__row">
          <td class="table__filed">Адрес доставки</td>
          <td class="table__value">Москва, ул. Ленина, 21, кв. 33</td>
        </tr>
        <tr class="table__row">
          <td class="table__filed">Способ оплаты</td>
          <td class="table__value">Картой при получении</td>
        </tr>
        <tr class="table__row">
          <td class="table__filed">Способ получения</td>
          <td class="table__value">Доставка</td>
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

  getWrapper() {
    const wrapper = document.createElement('div');
    wrapper.className = 'order__wrapper';
    wrapper.insertAdjacentElement('afterbegin', this.getOrderInfo());
    wrapper.insertAdjacentHTML('beforeend', this.getTableHTML());
    wrapper.append(this.getButton());
    return wrapper;
  }

  mount(parentElement) {
    if (this.isMounted) {
      return;
    }

    this.containerElement.append(this.getWrapper());

    parentElement.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
