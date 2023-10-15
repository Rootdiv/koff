import { api } from '../main';
import { Main } from '../modules/Main/Main';
import { Cart } from '../modules/Cart/Cart';

export const cart = {
  async main() {
    const cartItems = await api.getCart();
    const emptyText = 'В корзину ничего не добавлено';
    new Cart().mount(new Main().element, cartItems, emptyText);
  },
  hooks: {
    leave(done) {
      new Cart().unmount();
      done();
    },
  },
};
