import 'normalize.css';
import './style.scss';
import Navigo from 'navigo';

import { Header } from './modules/Header/Header';
import { Main } from './modules/Main/Main';
import { productSlider } from './features/productSlider/productSlider';
import { Footer } from './modules/Footer/Footer';
import { Order } from './modules/Order/Order';
import { NotFound } from './modules/NotFound/NotFound';
import { ProductList } from './modules/ProductList/ProductList';
import { ApiService } from './services/ApiService';
import { Catalog } from './modules/Catalog/Catalog';
import { FavoriteService } from './services/StorageService';
import { NotFavorites } from './modules/NotFavorites/NotFavorites';
import { BreadCrumbs } from './features/BreadCrumbs/BreadCrumbs';
import { ProductCard } from './modules/ProductCard/ProductCard';

const init = async () => {
  const router = new Navigo('/', { linksSelector: 'a[href^="/"]' });
  const api = new ApiService();
  await api.getAccessKey();

  new Header().mount();
  new Main().mount();
  new Footer().mount();

  const searchForm = new Header().containerElement.querySelector('.header__search');
  const inputSearchForm = searchForm.querySelector('.header__input');

  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    if (inputSearchForm.value.trim() !== '') {
      router.navigate(`/search?q=${inputSearchForm.value}`);
    }
  });

  router
    .on(
      '/',
      async () => {
        new Catalog().mount(new Main().element);
        const products = await api.getProducts();
        new ProductList().mount(new Main().element, products);
        router.updatePageLinks();
      },
      {
        already(match) {
          match.route.handler();
        },
        leave(done) {
          new Catalog().unmount();
          new ProductList().unmount();
          done();
        },
      },
    )
    .on(
      '/search',
      async ({ url, params }) => {
        new Catalog().mount(new Main().element);
        new BreadCrumbs().mount(new Main().element, [{ text: 'Поиск' }]);
        if (params?.q) {
          const query = params.q;
          const page = params?.page || 1;
          const title = 'Результаты поиска:';
          new ProductList().containerElement.textContent = '';
          inputSearchForm.value || (inputSearchForm.value = query);
          const products = await api.getProducts({ page, q: query });
          new ProductList().mount(new Main().element, products, { url, slug: query }, title);
        }
        router.updatePageLinks();
      },
      {
        already(match) {
          match.route.handler(match);
        },
        leave(done) {
          searchForm.reset();
          new Catalog().unmount();
          new BreadCrumbs().unmount();
          new ProductList().unmount();
          done();
        },
      },
    )
    .on(
      '/favorite',
      async ({ url, params }) => {
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
      {
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
    )
    .on('/cart', () => {
      console.log('cart');
    })
    .on(
      '/category',
      async ({ url, params: { slug, page = 1 } }) => {
        new Catalog().mount(new Main().element);
        const products = await api.getProducts({ page, category: slug });
        new BreadCrumbs().mount(new Main().element, [{ text: slug }]);
        new ProductList().mount(new Main().element, products, { url, slug });
        router.updatePageLinks();
      },
      {
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
    )
    .on(
      '/product/:id',
      async ({ data: { id } }) => {
        new Catalog().mount(new Main().element);
        const data = await api.getProductById(id);
        if (data?.category) {
          new BreadCrumbs().mount(new Main().element, [
            { text: data.category, href: `/category?slug=${data.category}` },
            { text: data.name },
          ]);
          router.updatePageLinks();
          new ProductCard().mount(new Main().element, data);
          productSlider();
        } else {
          new ProductCard().mount(new Main().element, 'error');
        }
      },
      {
        leave(done) {
          new Catalog().unmount();
          new BreadCrumbs().unmount();
          new ProductCard().unmount();
          done();
        },
      },
    )
    .on(
      '/order',
      () => {
        new Order().mount(new Main().element);
      },
      {
        leave(done) {
          new Order().unmount();
          done();
        },
      },
    )
    .notFound(
      () => {
        new NotFound().mount(new Main().element);

        setTimeout(() => {
          router.navigate('/');
        }, 5000);
      },
      {
        leave(done) {
          new NotFound().unmount();
          done();
        },
      },
    );
  router.resolve();
};

init();
