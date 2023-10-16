import { api, router } from '../main';
import { Main } from '../modules/Main/Main';
import { Cart } from '../modules/Cart/Cart';

export const cart = {
  async main() {
    const cartItems = await api.getCart();
    const emptyText = 'В корзину ничего не добавлено';
    new Cart().mount(new Main().element, cartItems, emptyText);

    const form = new Cart().containerElement.querySelector('.form-order');
    //Слушатель навешивается если форма найдена
    form?.addEventListener('submit', async event => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const { orderId } = await api.postOrder(data);
      router.navigate(`/order/${orderId}`);
    });
  },
  hooks: {
    leave(done) {
      new Cart().unmount();
      done();
    },
  },
};
