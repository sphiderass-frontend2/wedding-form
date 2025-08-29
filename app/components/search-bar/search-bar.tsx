import { CiSearch } from "react-icons/ci";
import "./search-bar.scss";

interface SearchBarProps {
  inputValue: string;
  onInputChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ inputValue, onInputChange }) => {
  return (
    <div className="search-input">
      <div className="search-input-container">
        <CiSearch size={24} />
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
