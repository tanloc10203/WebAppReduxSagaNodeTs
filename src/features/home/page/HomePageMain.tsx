import { Page } from 'components/Common';
import { Banner, Features } from '../components';

export interface HomePageMainProps {}

export default function HomePageMain(props: HomePageMainProps) {
  return (
    <Page title="Trang chủ">
      <Banner />
      <Features />
    </Page>
  );
}
