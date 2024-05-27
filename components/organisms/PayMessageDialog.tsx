"use client"
import React from "react"

interface ModalProps extends React.ButtonHTMLAttributes<HTMLAnchorElement> {
  wasPayed: boolean
  isOpen: boolean
  onClose: () => void
  eyHola: () => void
}

function Successful({ wasPayed, isOpen, onClose, eyHola, ...props }: ModalProps) {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div
        style={{
          background: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="flex flex-col items-center rounded-lg bg-white px-16 py-8 shadow-md" style={{ width: "520px" }}>
          <img src="./cancel.png" alt="Rechazado" className="w-14" />

          <h2 className="bg-custom-blue mb-8 mt-4 text-left text-lg text-gray-600">EL PAGO FUE RECHAZADO</h2>

          <button
            onClick={onClose}
            className="focus:shadow-outline rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            style={{ backgroundColor: "#2196F3" }}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}

function Failed({ wasPayed, isOpen, onClose, eyHola, ...props }: ModalProps) {
  function name() {
    onClose()
    eyHola()
  }

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div
        style={{
          background: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="flex flex-col items-center rounded-lg bg-white px-16 py-10 shadow-md"
          style={{ width: "520px" }}
        >
          <img src="./yes.png" alt="Aceptado" className="w-14" />

          <h2 className="bg-custom-blue mb-8 mt-4 text-left text-lg text-gray-600">EL PAGO FUE REALIZADO CON EXITO!</h2>

          <button
            onClick={name}
            className="focus:shadow-outline rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            style={{ backgroundColor: "#2196F3" }}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}

export function MessageDialog({ wasPayed, isOpen, onClose, eyHola, ...props }: ModalProps) {
  if (!isOpen) return null

  if (wasPayed) {
    return <Successful wasPayed={wasPayed} isOpen={isOpen} onClose={onClose} eyHola={eyHola} />
  } else {
    return <Failed wasPayed={wasPayed} isOpen={isOpen} onClose={onClose} eyHola={eyHola} />
  }
}
