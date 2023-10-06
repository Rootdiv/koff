import 'normalize.css';
import './style.scss';
import Navigo from 'navigo';

import { Header } from './modules/Header/Header';
import { Main } from './modules/Main/Main';
import { productSlider } from './modules/productSlider';
import { Footer } from './modules/Footer/Footer';
import { Order } from './modules/Order/Order';
import { NotFound } from './modules/NotFound/NotFound';

const init = () => {
  new Header().mount();
  new Main().mount();
  new Footer().mount();

  const router = new Navigo('/', { linksSelector: 'a[href^="/"]' });
  router
    .on('/', () => {
      console.log('На главной');
    })
    .on('/search', obj => {
      console.log('obj:', obj);
      console.log('search');
    })
    .on('/favorite', () => {
      console.log('favorite');
    })
    .on('/cart', () => {
      console.log('cart');
    })
    .on('/category', obj => {
      console.log('obj:', obj);
      console.log('category');
    })
    .on('/product/:id', obj => {
      console.log('obj:', obj);
      productSlider();
    })
    .on('/order', () => {
      new Order().mount(new Main().element);
    })
    .notFound(() => {
      new NotFound().mount(new Main().element);
    });

  router.resolve();
};

init();
