import React from 'react';
import PropTypes from 'prop-types';
// import { List } from './ContactList.Styled';
import ImageGalleryItem from 'components/ImageGalleryItem';


const ImageGallery = ({ items }) => {
  return (
    <ul className="ImageGallery">
      {items.map(item => (
        <li className="ImageGalleryItem" key={item.id}>
          <ImageGalleryItem item={item} />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,).isRequired,
};

export default ImageGallery;