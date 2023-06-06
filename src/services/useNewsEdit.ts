import { app, firestore, storage } from 'src/services/firebase';
import { NewsFormScreenCompFormValues } from 'src/components/_screens_/NewsForm';
import { useState } from 'react';
import { ReactNativeFirebase } from '@react-native-firebase/app';

function useNewsEdit(id: string) {
  const [loading, setLoading] = useState<boolean>();

  const update = async ({
    title,
    description,
    image,
  }: NewsFormScreenCompFormValues) => {
    setLoading(true);
    try {
      const imageRef = storage.ref(`images/news/${id}`);
      const imagePath = await imageRef.getDownloadURL();
      const updatedAt = app.firestore.FieldValue.serverTimestamp();
      const payload = { title, description, imagePath, updatedAt };
      await firestore.doc(`news/${id}`).update(payload);

      const imageSrc = await fetch(image);
      const imageBlob = await imageSrc.blob();
      await imageRef.delete();
      await storage.ref().child(imageRef.name).put(imageBlob);
    } catch (error) {
      throw Error((error as ReactNativeFirebase.NativeFirebaseError).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    update,
  };
}

export default useNewsEdit;
