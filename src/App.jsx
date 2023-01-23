import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import getImages from './utils/';
import LoadMore from 'components/Button/Button';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Searchbar from 'components/Searchbar';

class App extends Component {
  state = {
    items: [],
    isLoading: false,
    inputValue: '',
    page: 1,
    // totalPages: 0,
    totalHits: 0,
  };

  handleSubmit = (inputValue) => {
    this.setState({
      inputValue: inputValue,
      items: [],
      page: 1,
    });
  };

  async componentDidUpdate (_, prevState) {
    if (prevState.inputValue !== this.state.inputValue || prevState.page !== this.state.page) {
      try {
        this.setState({ isLoading: true });
        const { hits, totalHits  } = await getImages(this.state.inputValue, this.state.page);
        if (hits.length === 0) {
          toast.info(`No results were found for your search :( Please enter another query`);
          this.setState({ items: [], isLoading: false });
          return;
        };
        this.setState(prevState => ({
          items: [...prevState.items, ...hits],
          isLoading: false,
          // page: this.state.page,
          totalHits: totalHits,
        }));
        console.log(this.state);
      }
      catch (error) {
        toast.error(`Ouch! Something went wrong :( Reload the page and try again!`);
        this.setState({ isLoading: false });
      };
    };
  };

  // getItems = async (inputValue, page, prevInputValue, prevPage) => {
  //   try {
  //     this.setState({ isLoading: true });
  //     // const { page, inputValue } = this.state;
  //     const { hits, totalHits  } = await getImages(inputValue, page);
  //     if (hits.length === 0) {
  //       toast.info(`No results were found for your search :( Please enter another query`);
  //       this.setState({ items: [], isLoading: false });
  //       return;
  //     };
  //     // const totalPages = Math.ceil(totalHits / hits.length);

  //     if (inputValue !== prevInputValue) {
  //       this.setState({
  //       items: [ ...hits],
  //       isLoading: false,
  //       // totalPages: totalPages,
  //       totalHits: totalHits,
  //     })
  //     };

  //     if (page !== prevPage) {
  //       this.setState(prevState => ({
  //         items: [...prevState.items, ...hits],
  //         isLoading: false,
  //         // totalPages: totalPages,
  //         totalHits: totalHits,
  //       }));
  //     };

  //     // console.log(prevStateItems);
  //     console.log(this.state);
  //   } catch (error) {
  //     toast.error(`Ouch! Something went wrong :( Reload the page and try again!`);
  //     this.setState({ isLoading: false });
  //   };
  // };

  LoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { items, isLoading, totalHits } = this.state;
    return (
      <>
        <Searchbar
          onSubmit={this.handleSubmit}
        />
        {isLoading
          ? <Loader />
          : <ImageGallery items={items} />
        }
        {items.length && items.length < totalHits
          ? <LoadMore onClick={this.LoadMore}>Load more</LoadMore>
          : null
          // && toast.warn(`We're sorry, but you've reached the end of search results`)
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


