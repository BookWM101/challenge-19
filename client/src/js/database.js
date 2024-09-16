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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  
  // Open the database
  const db = await openDB('jate', 1);
  
  // Create a transaction and specify the store
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  
  // Add or update content
  const request = store.put({ id: 1, value: content });
  
  // Wait for the transaction to complete
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  
  // Open the database
  const db = await openDB('jate', 1);
  
  // Create a transaction and specify the store
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  
  // Get the content from the store
  const request = store.get(1);
  
  // Wait for the transaction to complete
  const result = await request;
  console.log('result.value', result?.value);
  return result?.value;
};


initdb();
