import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Searchbar from 'components/Searchbar';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import ApiPixabay from './utils/';
const api = new ApiPixabay();

class App extends Component {
  state = {
    items: [],
    isLoading: false,
  };

  getItems = async inputValue => {
    try {
      this.setState({ isLoading: true });
      const { hits } = await api.fetchImages(inputValue);
      if (hits.length === 0) {
        toast.info(`No results were found for your search :( Please enter another query`);
        this.setState({ items: [], isLoading: false });
        return;
      }
      this.setState({ items: [...hits], isLoading: false });
    } catch (error) {
      toast.error(`Ouch! Something went wrong :( Reload the page and try again!`);
      this.setState({isLoading: false });
    }
  };

  render() {
    const { items, isLoading } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.getItems} />
        {isLoading
          ? <Loader />
          : <ImageGallery items={items} />
        }
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
      </>
    )
  };
};

export default App;


