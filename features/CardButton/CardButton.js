import { Header } from '../../modules/Header/Header';
import { ApiService } from '../../services/ApiService';

export class CardButton {
  constructor(className, text) {
    this.className = className;
    this.text = text;
  }

  create(id) {
    const button = document.createElement('button');
    button.className = this.className;
    button.type = 'button';
    button.dataset.id = id;
    button.textContent = this.text;

    button.addEventListener('click', async () => {
      const count = await new ApiService().postProductToCart(id);
      new Header().changeCount(count.totalCount);
    });

    return button;
  }
}
