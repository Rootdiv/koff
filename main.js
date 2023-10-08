import 'normalize.css';
import './style.scss';
import Navigo from 'navigo';

import { Header } from './modules/Header/Header';
import { Main } from './modules/Main/Main';
import { productSlider } from './modules/productSlider';
import { Footer } from './modules/Footer/Footer';
import { Order } from './modules/Order/Order';
import { NotFound } from './modules/NotFound/NotFound';
import { ProductList } from './modules/ProductList/ProductList';
import { ApiService } from './services/ApiService';
import { Catalog } from './modules/Catalog/Catalog';

const init = () => {
  const router = new Navigo('/', { linksSelector: 'a[href^="/"]' });
  const api = new ApiService();

  new Header().mount();
  new Main().mount();
  new Footer().mount();

  api.getProductCategories().then(data => {
    new Catalog().mount(new Main().element, data);
    router.updatePageLinks();
  });

  router
    .on(
      '/',
      async () => {
        const products = await api.getProducts();
        new ProductList().mount(new Main().element, products);
        router.updatePageLinks();
      },
      {
        already() {},
      },
      {
        leave(done) {
          new ProductList().unmount();
          done();
        },
      },
    )
    .on('/search', obj => {
      console.log('obj:', obj);
      console.log('search');
    })
    .on(
      '/favorite',
      async () => {
        const products = await api.getProducts();
        new ProductList().mount(new Main().element, products, 'Избранное');
        router.updatePageLinks();
      },
      {
        already() {},
      },
      {
        leave(done) {
          new ProductList().unmount();
          done();
        },
      },
    )
    .on('/cart', () => {
      console.log('cart');
    })
    .on(
      '/category',
      async ({ params: { slug } }) => {
        const products = await api.getProducts(1, 12, undefined, slug);
        new ProductList().mount(new Main().element, products, slug);
        router.updatePageLinks();
      },
      {
        leave(done) {
          new ProductList().unmount();
          done();
        },
      },
    )
    .on('/product/:id', obj => {
      console.log('obj:', obj);
      productSlider();
    })
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
