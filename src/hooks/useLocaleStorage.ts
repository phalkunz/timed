import { useState } from 'react';

/**
 * React hook for reading and writing value to session storage
 *
 * @param key
 * @param defaultData
 * @return array of data, setData, resetData
 */
const useLocalStorage = (key: string, defaultData: any) => {
  const storage = window.localStorage;
  const [state, setState] = useState<any>(JSON.parse(storage.getItem(key) || ''));

  const setData = (data: any) => {
    storage.setItem(key, JSON.stringify(data));
    setState(data);
  };

  const resetData = () => {
    storage.removeItem(key);
    setState(defaultData);
  };

  return [state, setData, resetData];
};

export default useLocalStorage;

