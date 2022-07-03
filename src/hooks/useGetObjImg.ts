import { useEffect, useState } from 'react';

function useGetObjImg(files: File) {
  const [objUrl, setObjUrl] = useState<string>('');

  useEffect(() => {
    const getBaseFile = (file: File) => {
      if (!file) return;

      const reader = new FileReader();
      let objURL = URL.createObjectURL(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        setObjUrl(objURL);
      };
    };
    getBaseFile(files);

    return () => {
      getBaseFile(files);
    };
  }, [files]);

  return objUrl;
}

export default useGetObjImg;
