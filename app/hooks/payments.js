import { useState } from "react"
import { fetchPayments } from "../api/pagos/api"

export function useFetchPayments(reservationId, cardNumber, cardCvc, cardHolderName) {
  const [res, setRes] = useState({ data: null, error: null, isLoading: false })

  const callAPI = () => {
    setRes((prevState) => ({ ...prevState, isLoading: true }))

    fetchPayments(reservationId, cardNumber, cardCvc, cardHolderName)
      .then((res) => {
        setRes({ data: res.data, isLoading: false, error: null })
      })

      .catch((error) => {
        setRes({ data: null, isLoading: false, error })
      })
  }

  return [res, callAPI]
}
