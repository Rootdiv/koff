import { api, router } from '../main';
import { Header } from '../modules/Header/Header';
import { Main } from '../modules/Main/Main';
import { Catalog } from '../modules/Catalog/Catalog';
import { BreadCrumbs } from '../features/BreadCrumbs/BreadCrumbs';
import { ProductList } from '../modules/ProductList/ProductList';

export const search = {
  async main({ url, params }) {
    new Catalog().mount(new Main().element);
    new BreadCrumbs().mount(new Main().element, [{ text: 'Поиск' }]);
    if (params?.q) {
      const query = params.q;
      const page = params?.page || 1;
      const title = 'Результаты поиска:';
      new ProductList().containerElement.textContent = '';
      const products = await api.getProducts({ page, q: query });
      new ProductList().mount(new Main().element, products, { url, slug: query }, title);
    }
    router.updatePageLinks();
  },
  hooks: {
    already(match) {
      match.route.handler(match);
    },
    leave(done) {
      new Header().searchForm.reset();
      new Catalog().unmount();
      new BreadCrumbs().unmount();
      new ProductList().unmount();
      done();
    },
  },
};
