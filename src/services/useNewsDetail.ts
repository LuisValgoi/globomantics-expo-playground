import { FirestoreError, doc, getDoc } from 'firebase/firestore';
import { firestore, storage } from 'src/services/firebase';
import { INews } from 'src/interfaces/interfaces';
import { useEffect, useState } from 'react';
import { ref } from 'firebase/storage';

function useNewsDetail(id: string) {
  const [error, setError] = useState<FirestoreError>();
  const [loading, setLoading] = useState<boolean>();
  const [news, setNews] = useState<INews>();

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const newsDocRef = doc(firestore, 'news', id);
        const newsDoc = await getDoc(newsDocRef);

        const imageName = ref(storage, `images/news/${id}`).name;
        const newsDetail = { ...newsDoc?.data(), id: newsDoc.id, imageName } as INews;
        setNews(newsDetail);
      } catch (error) {
        setError(error as FirestoreError);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  return {
    loading,
    error,
    news,
  };
}

export default useNewsDetail;
