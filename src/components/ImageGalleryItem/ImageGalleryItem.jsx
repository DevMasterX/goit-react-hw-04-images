import React, { useState } from 'react';

import Modal from '../Modal/Modal';
import { Item, Img } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevModal => !prevModal);
  };

  return (
    <>
      <Item>
        <Img src={image.webformatURL} alt={image.tags} onClick={toggleModal} />
        {showModal && (
          <Modal
            largeImageURL={image.largeImageURL}
            tags={image.tags}
            onClose={toggleModal}
          />
        )}
      </Item>
    </>
  );
};

export default ImageGalleryItem;

// class ImageGalleryItem extends Component {
//   state = {
//     showModal: false,
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   render() {
//     const { showModal } = this.state;
//     const { image } = this.props;
//     return (
//       <>
//         <Item>
//           <Img
//             src={image.webformatURL}
//             alt={image.tags}
//             onClick={this.toggleModal}
//           />
//           {showModal && (
//             <Modal
//               largeImageURL={image.largeImageURL}
//               tags={image.tags}
//               onClose={this.toggleModal}
//             />
//           )}
//         </Item>
//       </>
//     );
//   }
// }

// ImageGalleryItem.propTypes = {
//   image: propTypes.shape({
//     webformatURL: propTypes.string.isRequired,
//     tags: propTypes.string.isRequired,
//     largeImageURL: propTypes.string.isRequired,
//   }).isRequired,
// };

// export default ImageGalleryItem;
