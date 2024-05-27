"use client"
import "styles/tailwind.css"
import Image from "next/image"
import { useState } from "react"

export default function Home() {
  const fecha = new Date()

  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleConfirm = () => {
    setIsConfirmed(true)
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Image src="/banco.png" style={styles.headerImage} alt="Banco Header" />
      </div>
      <div style={styles.content}>
        <div style={styles.cardSection}>
          <div style={styles.accountInfo}>
            <Image src="/tarjeta.png" alt="Account Card" style={styles.accountImage} />
            <div style={styles.accountText}>
              <div style={styles.accountLabel}>Número de cuenta ahorro/corriente</div>
              <div style={styles.accountNumber}>******2676</div>
            </div>
          </div>
          <button style={styles.confirmButton} onClick={handleConfirm}>
            CONFIRMAR PAGO
          </button>
        </div>
        {isConfirmed && (
          <div style={styles.transactionInfo}>
            <div style={styles.transactionItem}>
              <span style={styles.transactionLabel}>Valor pagado:</span>
              <span style={styles.transactionValue}>$2.000.000</span>
            </div>
            <div style={styles.transactionItem}>
              <span style={styles.transactionLabel}>Detalle de la compra:</span>
              <span style={styles.transactionValue}>Tiquetes Singapur Airline</span>
            </div>
            <div style={styles.transactionItem}>
              <span style={styles.transactionLabel}>Fecha de la transacción:</span>
              <span style={styles.transactionValue}>{fecha.toLocaleDateString()}</span>
            </div>
            <div style={styles.transactionItem}>
              <span style={styles.transactionLabel}>Estado de la transacción:</span>
              <span style={styles.transactionValue}>Aprobado</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center" as "center",
    height: "100vh",
    padding: "20px",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: "20px",
  },
  headerImage: {
    width: "1500px",
  },
  content: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "flex-start" as "flex-start",
    backgroundColor: "#ffffff",
  },
  cardSection: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center" as "center",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    marginRight: "20px",
    position: "sticky" as "sticky",
    top: "20px",
  },
  accountInfo: {
    display: "flex",
    alignItems: "center" as "center",
    marginBottom: "20px",
  },
  accountImage: {
    width: "100px",
    marginRight: "40px",
  },
  accountText: {
    fontSize: "16px",
    color: "#0072bc",
  },
  accountLabel: {
    marginBottom: "5px",
    color: "#2196F3",
    fontWeight: "bold" as "bold",
  },
  accountNumber: {
    color: "black",
  },
  confirmButton: {
    backgroundColor: "#2196F3",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold" as "bold",
  },
  transactionInfo: {
    backgroundColor: "#f8f8f8",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    minWidth: "250px",
  },
  transactionItem: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "flex-start" as "flex-start",
    marginBottom: "10px",
  },
  transactionLabel: {
    color: "#2196F3",
    fontWeight: "bold" as "bold",
  },
  transactionValue: {
    color: "#333333",
  },
}
