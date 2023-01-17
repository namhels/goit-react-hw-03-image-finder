import axios from 'axios';

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '25272385-d3b781fb1902e693cd197cf56';

export default class ApiPixabay {
  constructor() {
    this.page = 1;
  }

  async fetchImages(inputValue) {
    const queryParams = new URLSearchParams({
      key: API_KEY,
      q: inputValue,
      image_type: 'photo',
      orientation: 'horizontal',
      page: this.page,
      per_page: 12,
    });
    const { data } = await axios.get(`?${queryParams}`);
    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
