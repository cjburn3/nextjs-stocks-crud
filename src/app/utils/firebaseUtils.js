import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

/**
 * Generic that gets all documents from a firestore database and returns an array of objects
 * @param {database instance} db
 * @param {string} collectionName
 * @returns {array}
 * @returns an array of objects
 */
async function getAllDocuments(db, collectionName) {
  const query = await getDocs( collection(db, collectionName) )
  const documents= [];

  query.forEach( (doc)=>{
    documents.push( { id: doc.id, ...doc.data() } )  
  } );
  return documents;
}

async function addDocument(db, collectionName, data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export { getAllDocuments, addDocument, updateDocument, deleteDocument  };


