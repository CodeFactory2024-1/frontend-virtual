// Modal.tsx
import React from 'react';

interface ModalProps {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  selectedOutboundFlight: { id: number; name: string; price: number } | null;
  selectedReturnFlight: { id: number; name: string; price: number } | null;
  onClose: () => void;
  onAccept: () => void;
}

const Modal: React.FC<ModalProps> = ({ origin, destination, departureDate, returnDate, adults, children, onClose, onAccept }) => {
  return (
    // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Vuelos Seleccionados:</h2>
        <p>Origen: {origin}</p>
        <p>Destino: {destination}</p>
        <p>Fecha de Salida: {departureDate}</p>
        {returnDate && <p>Fecha de regreso: {returnDate}</p>}
        <p>Adultos: {adults}</p>
        <p>Niños: {children}</p>
        <button
          onClick={onAccept}
          className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Confirmar vuelo
        </button>
        <button
          onClick={onClose}
          className="mt-4 ml-4 bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-400"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Modal;
