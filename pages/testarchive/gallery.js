// import Archive from '../../components/Archive/Archive'
import { useRouter } from 'next/router';
// import ArchiveGallery from '../../../components/Archive/Carousel'
import Carousel from '../../components/Archive/Carousel';
const GalleryPage = props => {
  const router = useRouter();

  return <Carousel {...props} router={router}/>
}

export default GalleryPage;
