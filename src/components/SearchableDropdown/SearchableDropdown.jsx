import React, { useState } from "react";
import styles from "./SearchableDropdown.module.scss"; // Importar el archivo de estilos

const SearchableDropdown = ({
  placeholder = "Search...",
  data = [],
  searchField = "name",
  onSelect,
}) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value) {
      const filtered = data.filter((item) =>
        item[searchField].toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
      setShowDropdown(true);
    } else {
      setFilteredData([]);
      setShowDropdown(false);
    }
  };

  const handleSelect = (item) => {
    setQuery(item[searchField]);
    setShowDropdown(false);
    if (onSelect) onSelect(item);
  };

  return (
    <div className={styles["searchable-dropdown"]}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={styles["search-input"]}
      />
      {showDropdown && (
        <ul className={styles["dropdown-list"]}>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item)}
                className={styles["dropdown-item"]}
              >
                {item[searchField]}
              </li>
            ))
          ) : (
            <li className={styles["no-match"]}>No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
