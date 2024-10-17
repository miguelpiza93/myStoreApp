import { useNavigate } from "react-router-dom";
import SearchableDropdown from "../../SearchableDropdown";

const RegisterSale = () => {
    const navigate = useNavigate();

    const handleRegisterSale = () => {
        navigate("/sales");
    }

    const sampleData = [
        { id: 1, name: "Apple", description: "A tasty fruit" },
        { id: 2, name: "Banana", description: "A yellow fruit" },
        { id: 3, name: "Cherry", description: "A small red fruit" },
    ];

    const handleSelect = (item) => {
        console.log("Selected item:", item);
    };

    return (
        <div>
            <h1>Searchable Dropdown</h1>
            <SearchableDropdown
                placeholder="Search for a fruit..." // Configurar placeholder
                data={sampleData}                   // Datos que se pasan al componente
                searchField="name"                   // Campo de búsqueda
                onSelect={handleSelect}              // Callback de selección
            />
            <button onClick={handleRegisterSale} aria-labelledby="submit">
                Guardar
            </button>
        </div>

    );
};

export default RegisterSale;