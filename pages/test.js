import { hydrate } from 'emotion';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids);
}

const TestPage = props => {

  return (
    <>
    <h1>TestPage</h1>
    <Link href={`test/[testid]`} as={`test/${1}`} passHref>Go to route 1</Link>
    <br/>
    <Link href={`test/[testid]`} as={`test/${2}`} passHref>Go to route 2</Link>
    <br/>
    <Link href={`test/[testid]`} as={`test/${3}`} passHref>Go to route 3</Link>
    </>
  )
}

export default TestPage;