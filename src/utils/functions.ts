import { storage } from 'config/firebase';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { Dispatch, SetStateAction } from 'react';

export function uploadFileProgress(
  file: File,
  subFolder: string,
  setProgress: Dispatch<SetStateAction<number>>
) {
  return new Promise((resolve, reject) => {
    if (file === null) return;

    setProgress(0);

    const ext = file.name.split('.');
    const newExt = ext[ext.length - 1];
    const newName = `${Date.now()}.${newExt}`;

    const imageRef = ref(storage, `${subFolder}/${newName}`);

    const upload = uploadBytesResumable(imageRef, file);

    upload.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => reject(error),
      async () => {
        try {
          const url = await getDownloadURL(imageRef);
          resolve(url);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
}

export function uploadFirebase(file: File, subFolder: string) {
  return new Promise((resolve, reject) => {
    try {
      if (file) {
        const ext = file.name.split('.');
        const newExt = ext[ext.length - 1];
        const newName = `${Date.now()}.${newExt}`;

        const imageRef = ref(storage, `${subFolder}/${newName}`);

        uploadBytes(imageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            resolve(url);
          });
        });
      }
    } catch (error) {
      reject('Upload Error' + error);
      console.log(error);
    }
  });
}
