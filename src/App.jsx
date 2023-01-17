import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';
import React, { Component } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';
// import Box from 'components/Box';

import ApiPixabay from './utils/';

const api = new ApiPixabay();

class App extends Component {
  state = {
    items: [],
  };

  // componentDidUpdate(_, prevState) {
  //   const { items } = this.state
  //   if (prevState.items !== items) {

  //   }
  // }

  getItems = async inputValue => {
    try {
      const items = await api.fetchImages(inputValue);
      this.setState({ items: [...items.hits] });
    } catch (error) {
      // this.setState({ error: true, isLoading: false });
      console.log(error);
    }
  };

  render() {
    const { items } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.getItems} />
        <ImageGallery items={items}/>
      </>
    )
  };
};

export default App;


