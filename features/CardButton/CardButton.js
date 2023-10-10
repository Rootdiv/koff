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

    button.addEventListener('click', () => {
      console.log('Добавить товар в корзину');
    });

    return button;
  }
}
