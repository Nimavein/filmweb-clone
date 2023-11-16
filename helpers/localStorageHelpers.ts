interface StoredItem {
  value: string;
  expiry?: number;
}

const setStorageItem = (
  key: string,
  value: string,
  timeToExpire?: number
): void => {
  const now = new Date().getTime();
  const item: StoredItem = {
    value,
    expiry: timeToExpire ? now + timeToExpire : undefined,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getStorageItem = (key: string): string => {
  if (typeof window !== "undefined") {
    const itemString = localStorage.getItem(key);
    if (!itemString) return "";

    const parsedItem: StoredItem = JSON.parse(itemString);
    const { value, expiry } = parsedItem;

    return value;
  }
  return "";
};

const removeStorageItem = (key: string): void => {
  localStorage.removeItem(key);
};

export { setStorageItem, getStorageItem, removeStorageItem };
