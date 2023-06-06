import { firestore } from 'src/services/firebase';
import { useState } from 'react';
import { storage } from 'src/services/firebase';
import { useAuth } from 'src/hooks/useAuth';
import { ReactNativeFirebase } from '@react-native-firebase/app';
import { app } from 'src/services/firebase';
import { NewsFormScreenCompFormValues } from 'src/components/_screens_/NewsForm';

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
      const createdAt = app.firestore.FieldValue.serverTimestamp();
      const author = user?.uid;
      const addPayload = { title, description, createdAt, author };
      const news = await firestore.collection('news').add(addPayload);

      const imageRef = storage.ref(`images/news/${news.id}`);
      const imageName = imageRef.name;
      const imageSrc = await fetch(image);
      const imageBlob = await imageSrc.blob();
      await storage.ref().child(imageRef.name).put(imageBlob);

      const imagePath = await imageRef.getDownloadURL();
      const updatePayload = { id: news.id, imagePath, imageName };
      await firestore.doc(news.path).update(updatePayload);
    } catch (error) {
      throw Error((error as ReactNativeFirebase.NativeFirebaseError).message);
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
