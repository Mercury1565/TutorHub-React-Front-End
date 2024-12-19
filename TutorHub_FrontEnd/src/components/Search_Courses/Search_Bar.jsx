import { useState } from 'react';

import '../../styles/Search_Courses/Search_Bar.css';
import searchIcon from '../../assets/searchIcon.png';

function Search_Bar({ setSearchTitle }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    setSearchTitle(inputValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search For Tutorial..."
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <div className="profile">
        <img
          className="search-icon"
          src={searchIcon}
          alt="searchIcon"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}

export default Search_Bar;
