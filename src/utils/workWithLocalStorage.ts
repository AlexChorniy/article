export const workWithLS = {
  getData<T>(key: string): T | undefined {
    try {
      const serializedState = localStorage.getItem(key);
      if (serializedState === null) {
        return undefined;
      }

      return JSON.parse(serializedState);
    } catch (error) {
      return undefined;
    }
  },
  setData<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Ignore write errors
    }
  },
  removeData(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      // Ignore write errors
    }
  },
};
