// import axios from "axios";

const reservations = [
  {
    id: "R12345",
    flight: { idflight: "FL123", amount: 150.0 },
  },
  {
    id: "R67890",
    flight: { idflight: "FL456", amount: 300.0 },
  },
]

function findReservation(reservation: any, index: Number, id: String) {
  if (reservation.id === id) console.log(index)
  return reservation.id === id
}

export async function GET() {
  // reservations.find((reservation, index) => findReservation(reservation, index, id))
  return Response.json({ status: "Bienvenido a la API de Pagos" })
}
