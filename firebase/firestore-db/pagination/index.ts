'use server'
// pages/api/crud/getPaginatedData.ts
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

interface PaginatedData {
  data: any[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalDocs: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export default async function getPaginatedData(
  collectionName: string,
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedData> {
  const dataCollection = collection(db, collectionName);

  try {
    // Calculate the starting index for pagination
    const startIndex = (page - 1) * pageSize;

    // Fetch paginated data from Firestore
    const querySnapshot = await getDocs(dataCollection);
    const totalDocs = querySnapshot.docs.length;
    const paginatedData = querySnapshot.docs
      .slice(startIndex, startIndex + pageSize)
      .map((doc) => ({ id: doc.id, ...doc.data() }));

    // Calculate hasNext and hasPrevious indicators
    const hasNext = startIndex + pageSize < totalDocs;
    const hasPrevious = startIndex > 0;

    const result: PaginatedData = {
      data: paginatedData,
      page,
      pageSize,
      totalPages: Math.ceil(totalDocs / pageSize),
      totalDocs,
      hasNext,
      hasPrevious,
    };

    return result;
  } catch (error) {
    throw new Error('Internal server error');
  }
}