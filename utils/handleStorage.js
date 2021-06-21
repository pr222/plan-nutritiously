import localForage from 'localforage';

/**
 * Get access to what is stored in a key.
 *
 * @param {string} collection - Name of the key for accessing something in storage.
 * @returns - What what stored in the key.
 */
export async function getFromStorage(key) {
  const storedItems = await localForage.getItem(key);

  return storedItems;
}

export async function setToStorage(key, value) {
  await localForage.setItem(key, value);
}

/**
 * Add something into a stored array and update storage.
 *
 * @param {string} collection - The name of the array in storage.
 * @param {*} newItem - Something to add into the array.
 */
export async function addItemToArray(collection, newItem) {
  let arrayToStore;

  const previouslyStored = await localForage.getItem(collection);
  if (!previouslyStored) {
    const initial = [];
    await localForage.setItem(collection, initial);
    arrayToStore = initial;
  } else {
    arrayToStore = previouslyStored;
  }

  arrayToStore.push(newItem);

  await localForage.setItem(collection, arrayToStore);
}

/**
 * Replace an item in stored array and update storage.
 *
 * @param {string} collection  - The name of the array in storage.
 * @param {*} newItem - Something to add into the array.
 */
export async function updateItemInArray(collection, newItem) {
  const oldItems = await localForage.getItem(collection);

  const itemIndex = oldItems.findIndex((elem) => elem.id === newItem.id);

  const newItems = Array.from(oldItems);
  newItems.splice(itemIndex, 1, newItem);

  await localForage.setItem(collection, newItems);
}

/**
 * Replace an item in stored array and update storage.
 *
 * @param {string} collection - The name of the array in storage.
 * @param {*} item - Something to remove from the array.
 */
export async function deleteItemInArray(collection, item) {
  const previouslyStored = await localForage.getItem(collection);

  const filteredItems = previouslyStored.filter((elem) => elem.id !== item.id);

  await localForage.setItem(collection, filteredItems);
}
