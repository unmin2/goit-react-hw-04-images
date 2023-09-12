import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './LoadMoreButton/LoadMoreButton';
import Spinner from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImages } from './api'; // Функція для запиту до Pixabay API
import './styles.css'
class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    modalImageURL: '',
  };

  // Додайте решту логіки тут...
  fetchImages = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    try {
       const images = await fetchImages(query, page);

      this.setState((prevState) => ({
        images: [...prevState.images, ...images],
        isLoading: false,
      }));
      } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ isLoading: false });
    }
  };
  handleSubmit = (query) => {
    this.setState({ images: [], query, page: 1 });
  };
    handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }), () => {
      // Після оновлення сторінки завантажте нові зображення
      this.fetchImages();
    });
  };
  handleImageClick = (imageURL) => {
    this.setState({ showModal: true, modalImageURL: imageURL });
  };
 handleCloseModal = () => {
    this.setState({ showModal: false, modalImageURL: '' });
  };

  componentDidUpdate(prevProps, prevState) {
        if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.fetchImages();
    }
  }

  render() {
    const { images, isLoading, showModal, modalImageURL } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Spinner />}
        {images.length > 0 && !isLoading && <Button onClick={this.handleLoadMore} />}
        {showModal && <Modal imageURL={modalImageURL} onClose={this.handleCloseModal} />}
      </div>
    );
  }
}

export default App;
