import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { firestore } from 'src/services/firebase';
import { NewsFormScreenCompFormValues } from 'src/components/_screens_/NewsForm';
import { StorageError, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { ref } from 'firebase/storage';
import { storage } from 'src/services/firebase';
import { useAuth } from 'src/hooks/useAuth';

function useNewsCreate() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>();

  const create = async ({
    title,
    description,
    image,
  }: NewsFormScreenCompFormValues) => {
    setLoading(true);
    try {
      const addRef = collection(firestore, 'news');
      const createdAt = serverTimestamp();
      const author = user?.uid;
      const addPayload = { title, description, createdAt, author };
      const news = await addDoc(addRef, addPayload);

      const imageRef = ref(storage, `images/news/${news.id}`);
      const imageName = imageRef.name;
      const imageSrc = await fetch(image);
      const imageBlob = await imageSrc.blob();
      await uploadBytes(imageRef, imageBlob);

      const imagePath = await getDownloadURL(imageRef);
      const updateRef = doc(firestore, news.path);
      const updatePayload = { id: news.id, imagePath, imageName };
      await updateDoc(updateRef, updatePayload);
    } catch (error) {
      throw Error((error as StorageError).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    create,
  };
}

export default useNewsCreate;
