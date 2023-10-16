import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

import {
  SearchForm,
  SearchInput,
  SearchButton,
  SearchSpan,
} from './Searchbar.styled';

const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = event => setInputValue(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    const searchQuery = inputValue.trim();
    onSubmit(searchQuery);
    event.target.reset();
  };
  return (
    <header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton>
          <BsSearch />
          <SearchSpan>Search</SearchSpan>
        </SearchButton>
        <SearchInput
          name="searchName"
          type="text"
          id="search"
          value={inputValue}
          onChange={handleChange}
        />
      </SearchForm>
    </header>
  );
};

export default SearchBar;

// class SearchBar extends Component {
//   state = {
//     searchName: '',
//     inputValue: '',
//   };

//   handleChange = event => {
//     this.setState({ inputValue: event.target.value });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     const searchQuery = event.target.elements.searchName.value.trim();
//     this.props.onSubmit(searchQuery);
//     event.target.reset();
//   };

//   render() {
//     return (
//       <header>
//         <SearchForm onSubmit={this.handleSubmit}>
//           <SearchButton>
//             <BsSearch />
//             <SearchSpan>Search</SearchSpan>
//           </SearchButton>
//           <SearchInput
//             name="searchName"
//             type="text"
//             id="search"
//             value={this.state.inputValue}
//             onChange={this.handleChange}
//           />
//         </SearchForm>
//       </header>
//     );
//   }
// }

// SearchBar.propTypes = {
//   onSubmit: propTypes.func.isRequired,
// };

// export default SearchBar;
