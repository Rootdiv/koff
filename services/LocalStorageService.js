export class LocalStorageService {
  #accessKey = null;

  get() {
    this.#accessKey = localStorage.getItem('koff-accessKey') || null;
  }

  set(key) {
    this.#accessKey = key;
    localStorage.setItem('koff-accessKey', this.#accessKey);
  }

  delete() {
    this.#accessKey = null;
    localStorage.removeItem('koff-accessKey');
  }
}
