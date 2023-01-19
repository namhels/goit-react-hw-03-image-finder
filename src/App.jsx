import LoadMore from 'components/Button/Button';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Searchbar from 'components/Searchbar';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import getImages from './utils/';

class App extends Component {
  state = {
    items: [],
    isLoading: false,
    inputValue: "",
    page: 1,
  };

  componentDidUpdate (_, prevState) {
    const { inputValue, page } = this.state;
    if (
        prevState.page !== page
    ) {
      this.getItems(inputValue, page);
    };
  };

  getItems = async (inputValue) => {
    this.setState({ inputValue: inputValue });
    try {
      this.setState({ isLoading: true });
    console.log(this.state );
      const { page, inputValue } = this.state;
      const { hits } = await getImages(inputValue, page);
      if (hits.length === 0) {
        toast.info(`No results were found for your search :( Please enter another query`);
        this.setState({ items: [], isLoading: false });
        return;
      };
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        // inputValue: inputValue,
        // page: page,
        isLoading: false,
      }));
      // this.setState({ inputValue: inputValue, page: 1, isLoading: false });
    } catch (error) {
      toast.error(`Ouch! Something went wrong :( Reload the page and try again!`);
      this.setState({ isLoading: false });
    }
  };

  LoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { items, isLoading } = this.state;
    return (
      <>
        <Searchbar
          onSubmit={this.getItems}
        />
        {isLoading
          ? <Loader />
          : <ImageGallery items={items} />
        }
        {items.length >= 12
          ? <LoadMore onClick={this.LoadMore}>Load more</LoadMore>
          : null
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


