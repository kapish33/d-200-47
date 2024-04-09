import { crudOperations } from '@/firebase/firestore-db/crud';
import { redirect } from 'next/navigation';

export const revalidate = 1;


export default async function qr() {
  const url = await crudOperations('GET', 'cource');
  // console.log('url', url);
  redirect(url[0].url);
  return <></>;
}
