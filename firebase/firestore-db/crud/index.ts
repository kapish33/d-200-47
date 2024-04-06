'use server'

import { db } from '@/firebase/config';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';

type OPERATIONS = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'GET_BY_ID';

export interface Data {
  id?: string;
  name?: string;
  email?: string;
}

export default async function crudOperations(
  action: OPERATIONS,
  collectionName: string,
  data?: any
) {
  const dataCollection = collection(db, collectionName);

  switch (action) {
    case 'GET':
      try {
        // Perform GET operation (e.g., fetch data)
        const data: Data[] = [];
        const querySnapshot = await getDocs(dataCollection);
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as Data);
        });
        return data;
      } catch (error) {
        throw new Error('Internal server error');
      }

    case 'POST':
      try {
        // Perform POST operation (e.g., create a new document)
        const newDocRef = await addDoc(dataCollection, data);
        return { id: newDocRef.id, ...data };
      } catch (error) {
        throw new Error('Internal server error');
      }

    case 'DELETE':
      try {
        // Perform DELETE operation (e.g., delete a document)
        await deleteDoc(doc(dataCollection, data!.id));
        return { message: 'Document deleted successfully' };
      } catch (error) {
        throw new Error('Internal server error');
      }

    case 'GET_BY_ID':
      try {
        // Perform GET_BY_ID operation (retrieve a specific document by ID)
        if (!data?.id) {
          throw new Error('ID is required for GET_BY_ID operation');
        }

        const documentSnapshot = await getDoc(doc(dataCollection, data.id));

        if (documentSnapshot.exists()) {
          const documentData = documentSnapshot.data();
          return { id: documentSnapshot.id, ...documentData };
        } else {
          throw new Error('Document not found');
        }
      } catch (error) {
        throw new Error('Internal server error');
      }

    default:
      throw new Error('Invalid operation');
  }
}