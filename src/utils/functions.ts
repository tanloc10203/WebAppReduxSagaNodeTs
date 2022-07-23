import { storage } from 'config/firebase';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { Dispatch, SetStateAction } from 'react';

export function uploadFileProgress(
  file: File,
  subFolder: string,
  setProgress: Dispatch<SetStateAction<number>>
) {
  return new Promise((resolve, reject) => {
    if (!file) return;

    setProgress(0);

    const ext = file.name.split('.');
    const newExt = ext[ext.length - 1];
    const newName = `${Date.now()}.${newExt}`;

    const imageRef = ref(storage, `${subFolder}/${newName}`);

    const upload = uploadBytesResumable(imageRef, file);

    console.log('check');

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

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
