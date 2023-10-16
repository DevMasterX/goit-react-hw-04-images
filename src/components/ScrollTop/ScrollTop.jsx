import React, { useEffect, useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import { Button } from './ScrollTop.styled';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  // Функция для прокрутки страницы вверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Эффект, который добавляет слушатель события скролла при монтировании и убирает его при размонтировании
  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisible);

    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return (
    <div>
      <Button
        onClick={scrollToTop}
        style={{ display: visible ? 'inline' : 'none' }}
      >
        <FaArrowCircleUp />
      </Button>
    </div>
  );
};

export default ScrollButton;

// class ScrollButton extends Component {
//   state = {
//     visible: false,
//   };

//   componentDidMount() {
//     window.addEventListener('scroll', this.toggleVisible);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('scroll', this.toggleVisible);
//   }

//   toggleVisible = () => {
//     const scrolled = document.documentElement.scrollTop;
//     if (scrolled > 300) {
//       this.setState({ visible: true });
//     } else if (scrolled <= 300) {
//       this.setState({ visible: false });
//     }
//   };

//   scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   render() {
//     return (
//       <Button>
//         <FaArrowCircleUp
//           onClick={this.scrollToTop}
//           style={{ display: this.state.visible ? 'inline' : 'none' }}
//         />
//       </Button>
//     );
//   }
// }

// export default ScrollButton;
