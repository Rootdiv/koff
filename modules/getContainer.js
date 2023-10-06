export const getContainer = (parent, className) => {
  const container = document.createElement('div');
  container.className = 'container';
  if (className) {
    container.classList.add(className);
  }
  parent.append(container);
  return container;
};
