import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { firestore, storage } from 'src/services/firebase';
import { NewsFormScreenCompFormValues } from 'src/components/_screens_/NewsForm';
import {
  StorageError,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { useState } from 'react';

function useNewsEdit(id: string) {
  const [loading, setLoading] = useState<boolean>();

  const update = async ({
    title,
    description,
    image,
  }: NewsFormScreenCompFormValues) => {
    setLoading(true);
    try {
      const updatedAt = serverTimestamp();
      const updateRef = doc(firestore, 'news', id);
      const updatePayload = { title, description, imagePath: null, updatedAt };
      await updateDoc(updateRef, updatePayload);

      const imageRef = ref(storage, `images/news/${id}`);
      const imagePath = await getDownloadURL(imageRef);
      const imageSrc = await fetch(image);
      const imageBlob = await imageSrc.blob();
      await deleteObject(imageRef);
      await uploadBytes(imageRef, imageBlob);
      await updateDoc(updateRef, { imagePath });
    } catch (error) {
      throw Error((error as StorageError).message);
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
