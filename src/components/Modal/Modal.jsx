import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ largeImageURL, tags, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'visible';
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <img src={largeImageURL} alt={tags} width={800} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

export default Modal;

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//     document.body.style.overflow = 'hidden';
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//     document.body.style.overflow = 'visible';
//   }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { largeImageURL, tags } = this.props;

//     return createPortal(
//       <Overlay onClick={this.handleBackdropClick}>
//         <ModalWindow>
//           <img src={largeImageURL} alt={tags} />
//         </ModalWindow>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }

// Modal.propTypes = {
//   largeImageURL: propTypes.string.isRequired,
//   tags: propTypes.string.isRequired,
//   onClose: propTypes.func.isRequired,
// };

// export default Modal;
