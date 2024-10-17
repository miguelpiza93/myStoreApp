import React, { useState } from "react";

const SearchableDropdown = ({
  placeholder = "Search...", // Placeholder configurable
  data = [],                 // Conjunto de datos
  searchField = "name",       // Campo de búsqueda configurable
  onSelect,                   // Callback de selección
}) => {
  const [query, setQuery] = useState("");  // Estado del campo de búsqueda
  const [filteredData, setFilteredData] = useState([]); // Resultados filtrados
  const [showDropdown, setShowDropdown] = useState(false); // Controlar si el dropdown está visible

  // Función para manejar los cambios en el input de búsqueda
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value) {
      // Filtrar los datos según el campo de búsqueda configurado
      const filtered = data.filter((item) => 
        item[searchField].toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
      setShowDropdown(true); // Mostrar dropdown si hay resultados
    } else {
      setFilteredData([]);
      setShowDropdown(false); // Ocultar dropdown si el input está vacío
    }
  };

  // Función para manejar la selección de un elemento
  const handleSelect = (item) => {
    setQuery(item[searchField]); // Actualizar el campo de búsqueda con el elemento seleccionado
    setShowDropdown(false); // Ocultar el dropdown
    if (onSelect) onSelect(item); // Llamar al callback de selección
  };

  return (
    <div className="searchable-dropdown">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="search-input"
      />
      {showDropdown && (
        <ul className="dropdown-list">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item)}
                className="dropdown-item"
              >
                {item[searchField]}
              </li>
            ))
          ) : (
            <li className="dropdown-item no-match">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
