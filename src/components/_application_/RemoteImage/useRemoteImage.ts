import { StorageError, getBlob, ref } from 'firebase/storage';
import { storage } from 'src/services/firebase';
import { useEffect, useState } from 'react';

function useRemoteImage(path: string) {
  const imgRef = ref(storage, path);
  const [loading, setLoading] = useState<boolean>();
  const [src, setSrc] = useState<string>();
  const [error, setError] = useState<StorageError>();

  useEffect(() => {
    async function fetch() {
      if (imgRef.parent === null) {
        return;
      }

      setLoading(true);
      try {
        const blob = await getBlob(imgRef);
        const src = URL.createObjectURL(blob);
        setSrc(src);
      } catch (error) {
        setError(error as StorageError)
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, [imgRef]);

  return {
    filename: imgRef.name,
    loading,
    error,
    src,
  };
}

export default useRemoteImage;
