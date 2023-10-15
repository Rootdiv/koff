import { api, router } from '../main';
import { Main } from '../modules/Main/Main';
import { Catalog } from '../modules/Catalog/Catalog';
import { BreadCrumbs } from '../features/BreadCrumbs/BreadCrumbs';
import { ProductCard } from '../modules/ProductCard/ProductCard';
import { productSlider } from '../features/productSlider/productSlider';

export const product = {
  async main({ data: { id } }) {
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
  hooks: {
    leave(done) {
      new Catalog().unmount();
      new BreadCrumbs().unmount();
      new ProductCard().unmount();
      done();
    },
  },
};
