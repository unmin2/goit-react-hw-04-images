import React from 'react';
import '../styles.css';
const ImageGalleryItem = ({ image, onImageClick }) => (
  <li className="ImageGalleryItem">
    <img className="mageGalleryItem-image"
      src={image.webformatURL}
      alt=""
      onClick={() => onImageClick(image.largeImageURL)}
    />
  </li>
);

export default ImageGalleryItem;
