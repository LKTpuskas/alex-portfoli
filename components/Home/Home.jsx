import * as React from 'react';

import { css } from 'emotion';
import Nav from './Nav';
import HomeContent from './HomeContent';

const homeContent = css`
  min-height: 100vh;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex-direction: column;
`
class Home extends React.Component {
  render() {
    return (
      <div className={homeContent} >
        <HomeContent {...this.props} />
      </div>
    )
  }
}

export default Home;
