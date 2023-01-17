import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';


class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };


  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { item: {webformatURL, tags} } = this.props;
    const { isModalOpen } = this.state;
    return (
      <>
        <img
          className="ImageGalleryItem-image"
          src={webformatURL} alt={tags}
          onClick={this.openModal}
        />
        {isModalOpen &&
          <Modal
            item={this.props.item}
            onClose={this.closeModal} />
        }
      </>
    );
  };
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};

export default ImageGalleryItem;
