import { api, router } from '../main';
import { Main } from '../modules/Main/Main';
import { Catalog } from '../modules/Catalog/Catalog';
import { BreadCrumbs } from '../features/BreadCrumbs/BreadCrumbs';
import { ProductList } from '../modules/ProductList/ProductList';

export const category = {
  async main({ url, params: { slug, page = 1 } }) {
    new Catalog().mount(new Main().element);
    const products = await api.getProducts({ page, category: slug });
    new BreadCrumbs().mount(new Main().element, [{ text: slug }]);
    new ProductList().mount(new Main().element, products, { url, slug });
    router.updatePageLinks();
  },
  hooks: {
    already(match) {
      match.route.handler(match);
    },
    leave(done) {
      new Catalog().unmount();
      new BreadCrumbs().unmount();
      new ProductList().unmount();
      done();
    },
  },
};
