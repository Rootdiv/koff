import { api, router } from '../main';
import { Main } from '../modules/Main/Main';
import { Catalog } from '../modules/Catalog/Catalog';
import { FavoriteService } from '../services/StorageService';
import { BreadCrumbs } from '../features/BreadCrumbs/BreadCrumbs';
import { ProductList } from '../modules/ProductList/ProductList';
import { NotFavorites } from '../modules/NotFavorites/NotFavorites';

export const favorites = {
  async main({ url, params }) {
    new Catalog().mount(new Main().element);
    const favorites = new FavoriteService().get();
    if (favorites.length) {
      const text = 'Избранное';
      const page = params?.page || 1;
      new BreadCrumbs().mount(new Main().element, [{ text }]);
      const products = await api.getProducts({ page, list: favorites });
      new ProductList().mount(new Main().element, products, { url }, text);
      router.updatePageLinks();
    } else {
      new NotFavorites().mount(new Main().element);
    }
  },
  hooks: {
    already(match) {
      match.route.handler(match);
    },
    leave(done) {
      new Catalog().unmount();
      new BreadCrumbs().unmount();
      new ProductList().unmount();
      new NotFavorites().unmount();
      done();
    },
  },
};
