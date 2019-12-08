import { hydrate } from 'emotion';
import Archive from '../components/Archive/Archive'

if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids);
}

const ArchivePage = props => (
  <Archive {...props} />
);

export default ArchivePage;
