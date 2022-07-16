import { useParams } from 'react-router-dom';

export interface CategoryPageProps {}

export default function CategoryPage(props: CategoryPageProps) {
  const { slug } = useParams();

  return <div>{slug && slug}</div>;
}
