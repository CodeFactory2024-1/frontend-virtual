import React, { useState } from "react";

/**
 * Componente para mostrar una lista de vuelos y permitir la selección de uno.
 * @param {Object[]} flights - Lista de vuelos a mostrar.
 * @param {Function} handleFlightSelection - Función para manejar la selección de vuelo.
 * @returns {JSX.Element} Componente de React que muestra la lista de vuelos.
 */
export default function FlightListData({ flights, handleFlightSelection }) {
  const [selectedFlight, setSelectedFlight] = useState(null);

  /**
   * Maneja la selección de un vuelo.
   * @param {Object} flight - Vuelo seleccionado.
   */
  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    handleFlightSelection(flight);
  };

  return (
    <div className="m-1 p-2 rounded ">
      {flights.map((flight, index) => (
        <div
          key={index}
          className={`m-5 border-b-2 border-neutral-400 ${
            selectedFlight === flight ? " text-black" : "bg-white"
          }`}
        >
          <div className="flex justify-between p-4">
            <div className="mx-2"><div className="text-neutral-600 font-bold">Fecha Salida</div>{flight.fechaSalida}</div>
            <div className="mx-2"><div className="text-neutral-600 font-bold">Origen</div>{flight.origen.id}</div>
            <div className="mx-2">
              <div className="text-neutral-600 font-bold">Hora Salida</div>
              {flight.horaSalida}
            </div>
            <div className="mx-2"><div className="text-neutral-600 font-bold">Fecha Salida</div>{flight.fechaLlegada}</div>
            <div className="mx-2"><div className="text-neutral-600 font-bold">Destino</div>{flight.destino.id}</div>
            <div className="mx-5"><div className="text-neutral-600 font-bold">Precio</div>COP {flight.precio}</div>
          </div>

          <div className="flex justify-end m-2">
            <button
              className={`btn-select m-2 bg-blue-500 text-gray-100 ${
                selectedFlight === flight
                  ? "btn-selected bg-white border-2 border-blue-500 text-blue-500"
                  : ""
              }`}
              onClick={() => handleSelectFlight(flight)}
            >
              {selectedFlight === flight ? "Seleccionado" : "Seleccionar"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

