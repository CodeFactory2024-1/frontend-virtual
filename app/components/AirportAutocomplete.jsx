import React, { useEffect, useRef, useState } from "react";

/**
 * Componente de autocompletado para aeropuertos.
 * 
 * @param {string} value - El valor actual del campo de entrada.
 * @param {function} onChange - Función de devolución de llamada que se llama cuando cambia el valor del campo de entrada.
 * @param {Array} airports - La lista de aeropuertos disponibles para autocompletar.
 * @returns {JSX.Element} Componente de autocompletado para aeropuertos.
 */
function AirportAutocomplete({ value, onChange, airports }) {
  const [suggestions, setSuggestions] = useState([]); // Estado para almacenar sugerencias de aeropuertos.
  const wrapperRef = useRef(null); // Referencia al contenedor del componente.

  // Efecto para agregar y quitar el listener de clic fuera del componente.
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Manejador de eventos para cerrar las sugerencias cuando se hace clic fuera del componente.
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  // Manejador de eventos para cambiar el valor del campo de entrada y filtrar las sugerencias.
  const handleChange = (event) => {
    const inputValue = event.target.value;
    const filteredSuggestions = airports.filter(
      (airport) =>
        airport.nombre.toLowerCase().includes(inputValue.toLowerCase()) ||
        airport.id.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    onChange(inputValue);
  };

  // Manejador de eventos para seleccionar un aeropuerto de la lista de sugerencias.
  const handleSelect = (airportName) => {
    onChange(airportName);
    setSuggestions([]);
  };

  return (
    <div ref={wrapperRef} className="border-2 border-gray-400 rounded">
      <div className="flex">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="rounded-md px-4 py-2 w-full h-10"
        />
      </div>

      {/* Renderizar las sugerencias si hay alguna */}
      {suggestions.length > 0 && (
        <ul className="rounded-xl absolute bg-white">
          {suggestions.map((airport, index) => (
            <li
              className="p-2 hover:bg-gray-300"
              key={index}
              onClick={() =>
                handleSelect(airport.nombre + " - " + airport.id)
              }
            >
              {airport.nombre} - {airport.id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AirportAutocomplete;
