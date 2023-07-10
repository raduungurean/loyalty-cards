class StorageWrapper {
  constructor(storage) {
    this.storage = storage;
  }

  getItem(key) {
    return this.storage.getItem(key);
  }

  setItem(key, value) {
    this.storage.setItem(key, value);
  }

  removeItem(key) {
    this.storage.removeItem(key);
  }
}

class LocalStorageWrapper extends StorageWrapper {
  constructor() {
    super(localStorage);
  }
}

class SessionStorageWrapper extends StorageWrapper {
  constructor() {
    super(sessionStorage);
  }
}

export const localStorageWrapper = new LocalStorageWrapper();
export const sessionStorageWrapper = new SessionStorageWrapper();
