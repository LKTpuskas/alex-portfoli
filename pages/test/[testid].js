// import Archive from '../../components/Archive/Archive'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const TestRouter = (props) => {
  const router = useRouter();
return <h1>router {router.asPath}</h1>
}


const TestIdPage = props => {

  return <TestRouter {...props} />
}


export default TestIdPage;
