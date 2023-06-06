import { storage } from 'src/services/firebase';
import { useEffect, useState } from 'react';
import { ReactNativeFirebase } from '@react-native-firebase/app';

function useRemoteImage(path: string) {
  const imgRef = storage.ref(path);
  const [loading, setLoading] = useState<boolean>();
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    async function fetch() {
      if (imgRef.parent === null) {
        return;
      }

      setLoading(true);
      try {
        const src = await imgRef.getDownloadURL();
        setSrc(src);
      } catch (error) {
        throw Error((error as ReactNativeFirebase.NativeFirebaseError).message);
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, []);

  return {
    filename: imgRef.name,
    loading,
    src,
  };
}

export default useRemoteImage;
