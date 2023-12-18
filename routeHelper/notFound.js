import { router } from '../main';
import { Main } from '../modules/Main/Main';
import { NotFound } from '../modules/NotFound/NotFound';

export const notFound = {
  main() {
    new NotFound().mount(new Main().element);

    setTimeout(() => {
      router.navigate('/');
    }, 5000);
  },
  hooks: {
    leave(done) {
      new NotFound().unmount();
      done();
    },
  },
};
