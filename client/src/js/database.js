import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// export function to accept content and add to database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // creates connection to database and version used
  const jateDb = await openDB('jate', 1);

  // creates new transaction and specifies database and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  // opens desired object store
  const store = tx.objectStore('jate');

  // calls method to update data in the database
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  
  console.log('data saved to the database', result);
};

// export function to GET database
export const getDb = async () => {
  console.log('GET from the database');

  // creates connection to database and version used
  const jateDb = await openDB('jate', 1);

  // creates new transaction and specifies database and data privileges
  const tx = jateDb.transaction('jate', 'readonly');

  // opens desired object store
  const store = tx.objectStore('jate');

  // calls method to get all data in the database
  const request = store.getAll();

  // gets confirmation of request
  const result = await request;

  console.log('result.value', result);
  return result.value;
};

initdb();