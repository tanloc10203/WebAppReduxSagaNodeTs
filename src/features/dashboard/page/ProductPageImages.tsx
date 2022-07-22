import * as React from 'react';
import { useParams } from 'react-router-dom';

export interface ProductPageImagesProps {}

export default function ProductPageImages(props: ProductPageImagesProps) {
  const { productId } = useParams();

  console.log(productId);

  return <div></div>;
}
