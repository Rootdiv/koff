class StorageService {
  constructor(key) {
    this.key = key;
  }

  get() {
    const value = localStorage.getItem(this.key) || null;
    return value;
  }

  set(data) {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }

    localStorage.setItem(this.key, data);
    return data;
  }

  delete() {
    localStorage.removeItem(this.key);
    return null;
  }
}

export class FavoriteService extends StorageService {
  static instance = null;

  constructor(key = 'koff-favorite') {
    if (!FavoriteService.instance) {
      super(key);
      this.favorite = new Set(this.get());
      FavoriteService.instance = this;
    }

    return FavoriteService.instance;
  }

  get() {
    const data = super.get();
    if (data) {
      const favorite = JSON.parse(data);
      if (Array.isArray(favorite)) {
        return favorite;
      }
    }

    return [];
  }

  add(value) {
    this.favorite.add(value);
    this.set([...this.favorite]);
  }

  check(value) {
    return this.favorite.has(value);
  }

  remove(value) {
    if (this.check(value)) {
      this.favorite.delete(value);
      this.set([...this.favorite]);
      return true;
    }

    return false;
  }
}

export class AccessKeyService extends StorageService {
  static instance = null;

  constructor(key = 'koff-accessKey') {
    if (!AccessKeyService.instance) {
      super(key);
      this.favorite = new Set(this.get());
      AccessKeyService.instance = this;
    }

    return AccessKeyService.instance;
  }
}
