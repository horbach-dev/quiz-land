export const debounce = (fn, delay = 300) => {
  let timeout: number;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};
