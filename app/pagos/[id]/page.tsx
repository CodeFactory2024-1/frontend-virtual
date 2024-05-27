"use client"

import { useParams } from "next/navigation"

export default function Web() {
  const params = useParams<{ id: string }>()
  const { id } = params

  return (
    <>
      <div>Hola, no tienes pendiente el pago de una reserva con id: {id}</div>
    </>
  )
}
