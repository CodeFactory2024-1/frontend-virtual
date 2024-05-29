/**
 * Función para buscar vuelos disponibles según los criterios proporcionados.
 * @param {Array} allFlights - Lista de todos los vuelos disponibles.
 * @param {string} origin - Aeropuerto de origen.
 * @param {string} destination - Aeropuerto de destino.
 * @param {string} departureDate - Fecha de salida en formato YYYY-MM-DD.
 * @param {string} returnDate - Fecha de regreso en formato YYYY-MM-DD.
 * @returns {Object} Un objeto que contiene dos arrays:
 *  - validFlightsOneWay: Lista de vuelos válidos para el viaje de ida.
 *  - validFlightsRoundWay: Lista de vuelos válidos para el viaje de vuelta.
 */
export function searchFlights(
    allFlights,
    origin,
    destination,
    departureDate,
    returnDate
  ) {
     // Validar que todos los parámetros necesarios están presentes
  if (!origin || !destination || !departureDate) {
    return { validFlightsOneWay: [], validFlightsRoundWay: [] };
  }
    // Filtrar los vuelos válidos para el viaje de ida
    const validFlightsOneWay = allFlights.filter(
      (flight) =>
        flight.origen.id === origin.split(" - ")[2] &&
        flight.destino.id === destination.split(" - ")[2] &&
        new Date(departureDate) <= new Date(flight.fechaSalida)
    );
  
    // Filtrar los vuelos válidos para el viaje de vuelta
    const validFlightsRoundWay = allFlights.filter(
      (flight) =>
        flight.origen.id === destination.split(" - ")[2] &&
        flight.destino.id === origin.split(" - ")[2] &&
        new Date(returnDate) <= new Date(flight.fechaSalida)
    );
    
  
    return { validFlightsOneWay, validFlightsRoundWay };
  }