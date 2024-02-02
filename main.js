import 'normalize.css';
import './style.scss';
import Navigo from 'navigo';

import { Header } from './modules/Header/Header';
import { Main } from './modules/Main/Main';
import { Footer } from './modules/Footer/Footer';
import { ApiService } from './services/ApiService';
import { root } from './routeHelper/root';
import { search } from './routeHelper/search';
import { favorites } from './routeHelper/favorites';
import { cart } from './routeHelper/cart';
import { category } from './routeHelper/category';
import { product } from './routeHelper/product';
import { order } from './routeHelper/order';
import { notFound } from './routeHelper/notFound';
import { Catalog } from './modules/Catalog/Catalog';

export const api = new ApiService();
export const router = new Navigo('/', { linksSelector: 'a[href^="/"]' });

const init = async () => {
  await api.getAccessKey();
  const count = await new ApiService().getCart();

  new Header().mount();
  new Main().mount();
  new Footer().mount();
  new Header().changeCount(count.totalCount);

  const searchForm = new Header().searchForm;
  const inputSearchForm = searchForm.querySelector('.header__input');

  //Получаем данные для формы после перезагрузки страницы если они есть
  inputSearchForm.value = router.getCurrentLocation()?.params?.q || '';

  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    if (inputSearchForm.value.trim() !== '') {
      router.navigate(`/search?q=${inputSearchForm.value}`);
    }
  });

  router.hooks({
    after() {
      new Catalog().setActiveLink();
    },
  });

  router
    .on('/', root.main, root.hooks)
    .on('/search', search.main, search.hooks)
    .on('/favorite', favorites.main, favorites.hooks)
    .on('/cart', cart.main, cart.hooks)
    .on('/category', category.main, category.hooks)
    .on('/product/:id', product.main, product.hooks)
    .on('/order/:id', order.main, order.hooks)
    .notFound(notFound.main, notFound.hooks);
  router.resolve();
};

init();
