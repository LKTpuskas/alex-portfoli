import * as React from 'react';

class Overlay extends React.Component {
  state = {
    isOpen: true
  };

  hideOverlay = () => this.setState({ isOpen: false });
  toggleOverlay = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }));

  render() {
    const { render, isMainPage = false } = this.props;
    const childProps = {
      showOverlay: isMainPage ? this.toggleOverlay : this.hideOverlay,
      isOpen: this.state.isOpen
    };
    if (typeof render === 'function') {
      return render(childProps);
    }
    return null;
  }
}

export default Overlay;
