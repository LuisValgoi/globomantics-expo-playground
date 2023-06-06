import { firestore } from 'src/services/firebase';
import { INews } from 'src/interfaces/interfaces';
import { useEffect, useState } from 'react';
import { auth } from 'src/services/firebase';

function useNews() {
  const [loading, setLoading] = useState<boolean>();
  const [news, setNews] = useState<INews[]>([]);

  useEffect(() => {
    setLoading(true);

    async function unsubscribe() {
      await firestore
        .collection('news')
        .where('author', '==', auth.currentUser?.uid)
        .get()
        .then((snapshot) => {
          const news = [] as INews[];
          snapshot.forEach((change) => news.push(change.data() as INews));
          setNews(news);
          setLoading(false);
        });
    }

    unsubscribe();

    return () => {
      unsubscribe;
    };
  }, []);

  return {
    loading,
    news,
    empty: !loading && news.length === 0,
  };
}

export default useNews;
