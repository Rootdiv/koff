import { API_URL } from '../../const';
import { CardButton } from '../CardButton/CardButton';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';

export class Card {
  constructor({ id, image, title, price }) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.price = price;
    this.cardButton = new CardButton('card__btn', 'В корзину');
    this.favoriteButton = new FavoriteButton('card__favorite');
  }

  create() {
    const article = document.createElement('article');
    article.className = 'goods__card card';

    const linkImg = document.createElement('a');
    linkImg.className = 'card__link card__link_img';
    linkImg.href = `/product/${this.id}`;

    const img = new Image();
    img.src = `${API_URL}/${this.image}`;
    img.className = 'card__img';
    img.alt = this.title;

    linkImg.append(img);

    const info = document.createElement('div');
    info.className = 'card__info';

    const title = document.createElement('h3');
    title.className = 'card__title';

    const linkTitle = document.createElement('a');
    linkTitle.href = `/product/${this.id}`;
    linkTitle.className = 'card__link';
    linkTitle.textContent = this.title;
    title.append(linkTitle);

    const price = document.createElement('p');
    price.className = 'card__price';
    price.innerHTML = `${this.price.toLocaleString()}&nbsp;&#8381;`;

    info.append(title, price);

    const btnCard = this.cardButton.create(this.id);
    const btnFavorite = this.favoriteButton.create(this.id);

    article.append(linkImg, info, btnCard, btnFavorite);

    return article;
  }
}
