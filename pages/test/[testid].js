// import Archive from '../../components/Archive/Archive'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const TestRouter = (props) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(Number(router.query.testid))
 
  useEffect(() => {
    setCurrentImageIndex(Number(router.query.testid))
  }, [currentImageIndex])

  const previousSlide = () => {
    const { query: { testid }} = router;
    const lastIndex = props.archiveData.length - 1;
    const shouldResetIndex = Number(testid) === 0;
    const index = shouldResetIndex ? lastIndex : Number(testid) - 1;
  debugger
    /* setTimeout(() => this.setState({
      currentImageIndex: index,
      isFaded: true
    }), 800) */
    console.log('previous index')
    setCurrentImageIndex(index)
  }

  const nextSlide = () => {
    const lastIndex = props.archiveData.length - 1;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;
    console.log('next index', index)
   setCurrentImageIndex(index)
   /*  setTimeout(() => this.setState({
      currentImageIndex: index,
      isFaded: true
    }), 800) */
  }
    const check = router.query.testid || currentImageIndex
    return (
      <div>
      <h1>Router query</h1>
      <h2>{router.query.testid}</h2>
      <Link href={`[testid]`} as={`${check}`}><a onClick={() => previousSlide()}>Previous Route</a></Link>
      <br/>
      <Link href={`[testid]`} as={String(check)}><a onClick={() => nextSlide()}>Next Route</a></Link>
    </div>
        
    )
}


const TestIdPage = props => {

  return <TestRouter {...props} />
}


export default TestIdPage;
