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
  console.log('✅ Using real localStorage on client');
} else {
  storage = createNoopStorage();
  console.log('🖥️ Using noop storage on server');
}

export default storage;