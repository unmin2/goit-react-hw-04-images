import React from 'react';
import '../styles.css';
const ImageGallery = ({ images, onImageClick }) => (
  <ul className="ImageGallery">
    {images.map((image) => (
      <li key={image.id} className="gallery-item">
        <img
          src={image.webformatURL}
          alt=""
          onClick={() => onImageClick(image.largeImageURL)}
        />
      </li>
    ))}
  </ul>
);

export default ImageGallery;
