"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { ResumenVuelo } from "components/molecules/cards"
import { TableRow, TableRowBold } from "components/molecules/tables"
import { Modal } from "components/organisms/PaymentModal"
import { MessageDialog } from "components/organisms/PayMessageDialog"

export default function Web() {
  const router = useRouter()

  const [selectedPaymentOption, setSelectedPaymentOption] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const ticketPrice = 50000
  const taxes = 36966
  const baggagePrice = 20000
  const seatPrice = 5000

  const totalTicketsAndTaxes = ticketPrice + taxes
  const totalAdditionalCharges = baggagePrice + seatPrice
  const totalToPay = totalTicketsAndTaxes + totalAdditionalCharges

  const [isModalOpen, setModalOpen] = useState(false)
  const [isModal2Open, setModal2Open] = useState(false)
  const [wasReservationPayed, setWasReservationPayed] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const openModal2 = () => setModal2Open(true)
  const closeModal2 = () => setModal2Open(false)

  const payed = (value: boolean) => setWasReservationPayed(value)

  const [hola, setHola] = useState(false)
  const eyHola = () => {
    setHola(true)
    setSelectedPaymentOption("")
  }

  const handleStartPayment = () => {
    if (!selectedPaymentOption) {
      setErrorMessage("Debes seleccionar un método de pago.")
      setTimeout(() => {
        setErrorMessage("")
      }, 3000)
      return
    }
    openModal()
  }

  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <Image src="./HomeReservas.png" alt="Home" style={{ width: "75%", height: "100%" }} />
      <div className="mx-auto mb-2 w-full max-w-md p-4">
        {/* VUELO COSTO */}
        <ResumenVuelo title="Vuelos">
          <TableRow text1="Tiquetes" text2="$0" />
          <TableRow text1="Inpuestos" text2="$0" />
          <TableRowBold text1="Total" text2={!hola ? totalToPay.toLocaleString() : "$0"} />
        </ResumenVuelo>

        {/* Métodos de pago */}
        <div className="mb-6 rounded-lg bg-white p-6">
          <h3 className="mb-2 text-lg font-bold" style={{ color: "#2196F3" }}>
            Medios de pago
          </h3>
          <div className="mb-2">
            {/* Tarjeta débito */}
            <div className="flex items-center">
              <input
                type="radio"
                id="tarjetaDebito"
                name="pago"
                value="tarjetaDebito"
                checked={selectedPaymentOption === "tarjetaDebito"}
                onChange={() => setSelectedPaymentOption("tarjetaDebito")}
                className="bg-grey-700 h-4 w-4 cursor-pointer rounded text-red-500 accent-sky-700"
              />
              <label htmlFor="tarjetaDebito" className="ml-2 text-base text-black">
                Tarjeta débito
              </label>
            </div>

            {/* Tarjeta crédito */}
            <div className="flex items-center">
              <input
                type="radio"
                id="tarjetaCredito"
                name="pago"
                value="tarjetaCredito"
                checked={selectedPaymentOption === "tarjetaCredito"}
                onChange={() => setSelectedPaymentOption("tarjetaCredito")}
                className="bg-grey-700 h-4 w-4 cursor-pointer rounded text-red-500 accent-sky-700"
              />
              <label htmlFor="tarjetaCredito" className="ml-2 text-base text-black">
                Tarjeta crédito
              </label>
            </div>

            {/* PSE */}
            <div className="flex items-center">
              <input
                type="radio"
                id="pse"
                name="pago"
                value="pse"
                checked={selectedPaymentOption === "pse"}
                onChange={() => setSelectedPaymentOption("pse")}
                className="bg-grey-700 h-4 w-4 cursor-pointer rounded text-red-500 accent-sky-700"
              />
              <label htmlFor="pse" className="ml-2 text-base text-black">
                PSE
              </label>
            </div>
          </div>

          {errorMessage && <div className="mt-4 rounded-md bg-red-100 p-2 text-red-600">{errorMessage}</div>}
        </div>

        {/* Bóton de pagasr */}
        <div className="flex justify-center">
          {hola ? (
            <button
              onClick={handleStartPayment}
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-600"
              style={{ backgroundColor: "#2196F3" }}
              disabled
            >
              Iniciar Pago
            </button>
          ) : (
            <button
              onClick={handleStartPayment}
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-600"
              style={{ backgroundColor: "#2196F3" }}
            >
              Iniciar Pago
            </button>
          )}

          <Modal
            paymentOption={selectedPaymentOption}
            payed={payed}
            isOpen={isModalOpen}
            onClose={closeModal}
            openModal2={openModal2}
            router={router}
          />
          <MessageDialog wasPayed={wasReservationPayed} isOpen={isModal2Open} onClose={closeModal2} eyHola={eyHola} />
        </div>
      </div>
    </div>
  )
}
