export class Logo {
  constructor(mainClassName) {
    this.mainClassName = mainClassName;
  }

  create() {
    const logo = document.createElement('a');
    logo.className = `${this.mainClassName}__link-logo`;
    logo.href = '/';

    const imgLogo = new Image();
    imgLogo.src = '/img/logo.svg';
    imgLogo.className = `${this.mainClassName}__logo`;
    imgLogo.alt = 'Логотип мебельного маркета Koff';

    logo.append(imgLogo);

    return logo;
  }
}
