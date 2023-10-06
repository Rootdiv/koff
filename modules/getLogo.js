export const getLogo = (classLink, classLogo) => {
  const logo = document.createElement('a');
  logo.className = classLink;
  logo.href = '/';

  const imgLogo = new Image();
  imgLogo.src = '/img/logo.svg';
  imgLogo.className = classLogo;
  imgLogo.alt = 'Логотип мебельного маркета Koff';

  logo.append(imgLogo);

  return logo;
};
