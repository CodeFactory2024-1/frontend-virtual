import axios from "axios"

export async function fetchPayments(reservationId, cardNumber, cardCvc, cardHolderName) {
  return axios
    .post("https://codefact.fly.dev/api/payments", {
      reservationId,
      cardNumber,
      cardCvc,
      cardHolderName,
    })
    .catch((e) => {
      console.error(e.message)
    })
    .then((res) => res?.data)
}
