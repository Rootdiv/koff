import { api } from '../main';
import { Header } from '../modules/Header/Header';
import { Main } from '../modules/Main/Main';
import { Order } from '../modules/Order/Order';

export const order = {
  main({ data: { id } }) {
    new Header().changeCount(0);
    api.getOrder(id).then(data => {
      new Order().mount(new Main().element, data);
    });
  },
  hooks: {
    leave(done) {
      new Order().unmount();
      done();
    },
  },
};
