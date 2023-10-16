import { useEffect, useState } from 'react';
import * as API from '../../services/PixabayApi';
import SearchBar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import ScrollButton from 'components/ScrollTop/ScrollTop';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (searchName === '') {
      return;
    }

    async function addImages() {
      try {
        setIsLoading(true);

        const { images, totalImages } = await API.getImages(
          searchName,
          currentPage
        );

        if (images.length === 0) {
          return toast.info('Sorry image not found...', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        setImages(prevImages => [...prevImages, ...images]);
        setTotalImages(totalImages);
      } catch (error) {
        toast.error('Something went wrong!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setIsLoading(false);
      }
    }
    addImages();
  }, [searchName, currentPage]);

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleSubmit = query => {
    if (searchName === query) {
      return toast.warning('Please enter another request 😒', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setSearchName(query);
    setImages([]);
    setCurrentPage(1);
    setTotalImages(0);
  };

  return (
    <div>
      <ToastContainer transition={Slide} />
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        <p
          style={{
            padding: 100,
            textAlign: 'center',
            fontSize: 30,
          }}
        >
          Image gallery is empty... 📷
        </p>
      )}
      {isLoading && <Loader />}
      {totalImages !== images.length && !isLoading && (
        <Button onClick={loadMore} />
      )}
      <ScrollButton />
    </div>
  );
};

export default App;

// class App extends Component {
//   state = {
//     searchName: '',
//     images: [],
//     currentPage: 1,
//     error: null,
//     isLoading: false,
//     totalPages: 0,
//     visible: false,
//   };

//   componentDidUpdate(_, prevState) {
//     if (
//       prevState.searchName !== this.state.searchName ||
//       prevState.currentPage !== this.state.currentPage
//     ) {
//       this.addImages();
//     }
//   }

//   loadMore = () => {
//     this.setState(prevState => ({
//       currentPage: prevState.currentPage + 1,
//     }));
//   };

//   handleSubmit = query => {
//     const { searchName } = this.state;
//     if (searchName === query) {
//       return toast.warning('Please enter another request 😒', {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     }
//     this.setState({
//       searchName: query,
//       images: [],
//       currentPage: 1,
//       totalPages: 0,
//     });
//   };

//   addImages = async () => {
//     const { searchName, currentPage } = this.state;
//     try {
//       this.setState({ isLoading: true });

//       const data = await API.getImages(searchName, currentPage);

//       if (data.hits.length === 0) {
//         return toast.info('Sorry image not found...', {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//       }

//       const normalizedImages = API.normalizedImages(data.hits);

//       this.setState(state => ({
//         images: [...state.images, ...normalizedImages],
//         isLoading: false,
//         error: '',
//         totalPages: Math.ceil(data.totalHits / 12),
//       }));
//     } catch (error) {
//       this.setState({ error: 'Something went wrong!' });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   render() {
//     const { images, isLoading, currentPage, totalPages } = this.state;

//     return (
//       <div>
//         <ToastContainer transition={Slide} />
//         <SearchBar onSubmit={this.handleSubmit} />
//         {images.length > 0 ? (
//           <ImageGallery images={images} />
//         ) : (
//           <p
//             style={{
//               padding: 100,
//               textAlign: 'center',
//               fontSize: 30,
//             }}
//           >
//             Image gallery is empty... 📷
//           </p>
//         )}
//         {isLoading && <Loader />}
//         {images.length > 0 && totalPages !== currentPage && !isLoading && (
//           <Button onClick={this.loadMore} />
//         )}
//         <ScrollButton />
//       </div>
//     );
//   }
// }

// export default App;
