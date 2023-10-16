export const debounce = (fn, ms) => {
  let lastCall = 0;
  let lastCallTimer = 0;

  return (...args) => {
    const previousCall = lastCall;
    lastCall = Date.now();
    if (previousCall && lastCall - previousCall <= ms) {
      clearTimeout(lastCallTimer);
    }
    lastCallTimer = setTimeout(() => {
      fn(...args);
    }, ms);
  };
};

export const declOfNum = (num, words) =>
  num + ' ' + words[num % 100 > 4 && num % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? Math.abs(num) % 10 : 5]];
