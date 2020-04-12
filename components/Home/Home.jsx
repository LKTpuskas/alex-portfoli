import React from 'react';

import { css } from 'emotion';
import Archive from '../Archive/Archive';

const homeContent = css`
  min-height: 100vh;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex-direction: column;
`
const Home = props => {
    return (
      <div className={homeContent} >
        <Archive {...props} />
      </div>
    )
}

export default Home;
