import React, { Component } from 'react';
import classNames from 'classnames';

import { BodyHtml, Body } from './PageStyle';

class Page extends Component {
  render() {
    return (
      <div className={classNames(BodyHtml, Body)} >
        {this.props.children}
      </div>
    );
  }
}

export default Page;
