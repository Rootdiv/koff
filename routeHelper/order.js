import { Main } from '../modules/Main/Main';
import { Order } from '../modules/Order/Order';

export const order = {
  main() {
    new Order().mount(new Main().element);
  },
  hooks: {
    leave(done) {
      new Order().unmount();
      done();
    },
  },
};
