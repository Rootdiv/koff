import { api } from '../main';
import { Main } from '../modules/Main/Main';
import { Catalog } from '../modules/Catalog/Catalog';
import { ProductList } from '../modules/ProductList/ProductList';

export const root = {
  async main() {
    new Catalog().mount(new Main().element);
    const products = await api.getProducts();
    new ProductList().mount(new Main().element, products);
  },
  hooks: {
    already(match) {
      match.route.handler();
    },
    leave(done) {
      new Catalog().unmount();
      new ProductList().unmount();
      done();
    },
  },
};
