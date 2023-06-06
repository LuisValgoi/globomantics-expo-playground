import { firestore, storage } from 'src/services/firebase';
import { INews } from 'src/interfaces/interfaces';
import { useEffect, useState } from 'react';
import { ReactNativeFirebase } from '@react-native-firebase/app';

function useNewsDetail(id: string) {
  const [loading, setLoading] = useState<boolean>();
  const [news, setNews] = useState<INews>();

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const newsDoc = await firestore.doc(`news/${id}`).get();
        const imageName = await storage.ref(`images/news/${id}`).name;
        const newsDetail = {
          ...newsDoc?.data(),
          id: newsDoc.id,
          imageName,
        } as INews;
        setNews(newsDetail);
      } catch (error) {
        throw Error((error as ReactNativeFirebase.NativeFirebaseError).message);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  return {
    loading,
    news,
  };
}

export default useNewsDetail;
