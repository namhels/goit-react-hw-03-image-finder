import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Img, ModalStyled, Overlay } from './Modal.Styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    };
  };

  handleBackdropClick = event => {
    if (event.target.tagName !== 'IMG') {
      this.props.onClose();
    };
  };

  render() {
    const { item: {largeImageURL, tags} } = this.props;
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalStyled>
          <Img src={largeImageURL} alt={tags} />
        </ModalStyled>
      </Overlay>,
      modalRoot,
    );
  };
};

export default Modal;