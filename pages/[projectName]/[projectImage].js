import { hydrate } from 'emotion';
import Archive from '../../components/Archive/Archive'
import ArchiveGallery from '../../components/Archive/ArchiveGallery'

/* if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
} */

const ArchiveGalleryPage = props => {
  return <ArchiveGallery {...props}/>
}

export default ArchiveGalleryPage;
