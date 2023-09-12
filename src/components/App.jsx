import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './LoadMoreButton/LoadMoreButton';
import Spinner from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImages } from './api'; // Імпортуйте функцію fetchImages з правильного файлу
import './styles.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImageURL, setModalImageURL] = useState('');



  const handleSubmit = (newQuery) => {
    setImages([]);
    setQuery(newQuery);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (imageURL) => {
    setShowModal(true);
    setModalImageURL(imageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImageURL('');
  };

useEffect(() => {
  const fetchImagesData = async () => {
    setIsLoading(true);

    try {
      const fetchedImages = await fetchImages(query, page);
      setImages((prevImages) => [...prevImages, ...fetchedImages]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setIsLoading(false);
    }
  };

  if (query && page > 0) {
    fetchImagesData();
  }
}, [query, page]);

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Spinner />}
      {images.length > 0 && !isLoading && <Button onClick={handleLoadMore} />}
      {showModal && <Modal imageURL={modalImageURL} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
