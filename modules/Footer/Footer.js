import { Logo } from '../../features/Logo/Logo';
import { getContainer } from '../getContainer';

export class Footer {
  static instance = null;

  constructor() {
    if (!Footer.instance) {
      Footer.instance = this;

      this.element = document.createElement('footer');
      this.element.className = 'footer';
      this.containerElement = getContainer(this.element, 'footer__container');
      this.isMounted = false;
    }
    return Footer.instance;
  }

  getPhoneLink() {
    const phoneLink = document.createElement('a');
    phoneLink.href = 'tel:+79398391297';
    phoneLink.className = 'contacts__phone';
    phoneLink.insertAdjacentHTML(
      'afterbegin',
      `<svg width="16" height="16">
        <use href="/img/sprite.svg#phone" />
      </svg>`,
    );

    const linkText = document.createElement('span');
    linkText.textContent = '+7 (939) 839 12 97';

    phoneLink.append(linkText);
    return phoneLink;
  }

  getSocialLinks() {
    const contactsList = document.createElement('ul');
    contactsList.className = 'contacts__list';

    const vkLink = document.createElement('a');
    vkLink.className = 'contacts__link';
    vkLink.href = '#';
    vkLink.insertAdjacentHTML(
      'afterbegin',
      `<svg width="16" height="16">
        <use href="/img/sprite.svg#vk" />
      </svg>`,
    );

    const youtubeLink = document.createElement('a');
    youtubeLink.className = 'contacts__link';
    youtubeLink.href = '#';
    youtubeLink.insertAdjacentHTML(
      'afterbegin',
      `<svg width="16" height="16">
        <use href="/img/sprite.svg#youtube" />
      </svg>`,
    );

    const telegramLink = document.createElement('a');
    telegramLink.className = 'contacts__link';
    telegramLink.href = '#';
    telegramLink.insertAdjacentHTML(
      'afterbegin',
      `<svg width="16" height="16">
        <use href="/img/sprite.svg#telegram" />
      </svg>`,
    );

    [vkLink, youtubeLink, telegramLink].forEach(item => {
      const contactsItem = document.createElement('li');
      contactsItem.className = 'contacts__item';
      contactsItem.append(item);
      contactsList.append(contactsItem);
    });

    return contactsList;
  }

  getDeveloperLinks() {
    const developersList = document.createElement('ul');
    developersList.className = 'footer__developer-list';

    const developersItem = document.createElement('li');
    developersItem.className = 'footer__developer-item';

    const designerText = document.createElement('span');
    designerText.textContent = 'Designer: ';

    const designerLink = document.createElement('a');
    designerLink.href = 'https://t.me/Mrshmallowww';
    designerLink.target = '_blank';
    designerLink.textContent = 'Anastasia Ilina';

    const developerText = document.createElement('span');
    developerText.textContent = 'Developer: ';

    const developerLink = document.createElement('a');
    developerLink.href = 'https://t.me/rootdiv';
    developerLink.target = '_blank';
    developerLink.textContent = 'Vladimir';

    [
      [designerText, designerLink],
      [developerText, developerLink],
    ].forEach(items => {
      const developersItem = document.createElement('li');
      developersItem.className = 'footer__developer-item';
      developersItem.append(...items);
      developersList.append(developersItem);
    });

    return developersList;
  }

  getContacts() {
    const content = document.createElement('div');
    content.className = 'footer__contacts contacts';
    content.append(this.getPhoneLink(), this.getSocialLinks());
    return content;
  }

  getCopyright() {
    const copyright = document.createElement('p');
    copyright.className = 'footer__copyright';
    copyright.innerHTML = '&copy; Koff, 2023';
    return copyright;
  }

  mount() {
    if (this.isMounted) {
      return;
    }

    const logo = new Logo('footer').create();
    const contacts = this.getContacts();
    const developers = this.getDeveloperLinks();
    const copyright = this.getCopyright();

    this.containerElement.append(logo, contacts, developers, copyright);

    document.body.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
