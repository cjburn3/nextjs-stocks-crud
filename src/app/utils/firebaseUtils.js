import { collection, getDocs } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";

/**
 * Generic that gets all documents from a firestore database and returns an array of objects
 * @param {database} db
 * @param {string} collectionName
 * Utility Function that gets all documents from a firestore database and returns an array of objects
 * @param {database instance} db An instance of a Cloud Firestore Database
 * @param {string} collectionName The name of a Firestore db collection
 * @returns {array}
 * @returns an array of objects
 */
@@ -20,4 +20,19 @@ async function getAllDocuments(db, collectionName) {
  return documents;
}

export { getAllDocuments };
/**
 * Utility Function that adds a document to a Google Cloud Firestore Database
 * @param {database instance} db An instance of a Cloud Firestore Database
 * @param {string} collectionName The name of a Firestore db collection
 * @param {object} data An object representing a collection document
 */
async function addDocument(db, collectionName, data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export { getAllDocuments, addDocument };