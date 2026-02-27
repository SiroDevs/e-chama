import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

let storage: ReturnType<typeof createWebStorage> | ReturnType<typeof createNoopStorage>;

if (typeof window !== 'undefined') {
  storage = createWebStorage('local');
} else {
  storage = createNoopStorage();
}

export default storage;