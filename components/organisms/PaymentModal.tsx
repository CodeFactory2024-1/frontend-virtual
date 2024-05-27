"use client"
import { Autocomplete } from "@mui/material"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Axios from "axios"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import React, { useState } from "react"

function ParteA({ paymentOption, payed, isOpen, onClose, openModal2, router, ...props }: ModalProps) {
  const [cardHolderName, setCardHolderName] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [identificationNumber, setIdentificationNumber] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const [cardType, setCardType] = useState("Seleccionar")
  const [cardNumber, setCardNumber] = useState("")
  const [cvv, setCvv] = useState("")
  const [installments, setInstallments] = useState("Seleccionar")
  const [identificationType, setIdentificationType] = useState("")
  const [agree, setAgree] = useState("")

  const [bankEntity, setBankEntity] = useState("")
  const [personType, setPersonType] = useState("")
  const [socialReason, setSocialReason] = useState("")
  const [email, setEmail] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const [creditCardData, setCreditCardData] = useState({
    cardHolderName: "",
    cardType: "",
    cardNumber: "",
    cvv: "",
    installments: "",
    expiryMonth: "",
    expiryYear: "",
    identificationType: "",
    identificationNumber: "",
    agree: false,
  })

  const [errors, setErrors] = useState({
    cardHolderName: "",
    cardType: "",
    cardNumber: "",
    cvv: "",
    installments: "",
    expiryMonth: "",
    expiryYear: "",
    identificationType: "",
    identificationNumber: "",
    agree: true,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    fetchData(
      987, // reservationId
      creditCardData.cardNumber,
      creditCardData.cvv,
      creditCardData.cardHolderName
    )
  }

  const handleCardHolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.value
    setCardHolderName(inputName.slice(0, 40)) // Limitar a 40 caracteres
    setCreditCardData((prevState) => ({ ...prevState, cardHolderName: inputName }))
    setErrors((prevState) => ({ ...prevState, cardNumber: "" }))
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputCardNumber = e.target.value
    setCardNumber(inputCardNumber)
    setCreditCardData((prevState) => ({ ...prevState, cardNumber: inputCardNumber }))
    setErrors((prevState) => ({ ...prevState, cardNumber: "" }))

    // Expresión regular para validar que sean solo caracteres numéricos y máximo 16
    const regex = /^[0-9]*$/

    if (inputCardNumber.length > 16 || !regex.test(inputCardNumber)) {
      let message = "El número de tarjeta debe contener solo números y máximo 16 dígitos."
      setErrors((prevState) => ({ ...prevState, cardNumber: message }))
    }
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputCvv = e.target.value
    setCvv(inputCvv)
    setCreditCardData((prevState) => ({ ...prevState, cvv: inputCvv }))
    setErrors((prevState) => ({ ...prevState, cvv: "" }))

    // Expresión regular para validar que sean como máximo 3 dígitos numéricos
    const regex = /^\d{0,3}$/

    if (!regex.test(inputCvv)) {
      let message = "Máximo 3 dígitos numéricos."
      setErrors((prevState) => ({ ...prevState, cvv: message }))
    }
  }

  const handleExpiryMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputMonth = e.target.value
    const numericValue = inputMonth.replace(/[^0-9]/g, "")
    setCreditCardData((prevState) => ({ ...prevState, expiryMonth: numericValue }))
    setExpiryMonth(numericValue)
  }

  const handleExpiryYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputYear = e.target.value

    const numericValue = inputYear.replace(/[^0-9]/g, "")
    console.log("numericValue", numericValue)
    setCreditCardData((prevState) => ({ ...prevState, expiryYear: numericValue }))
    setExpiryYear(numericValue)
  }

  const handleIdentificationNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    // Utiliza una expresión regular para comprobar si el valor ingresado son solo números
    if (/^\d*$/.test(inputValue)) {
      setIdentificationNumber(inputValue)
      setCreditCardData((prevState) => ({ ...prevState, identificationNumber: inputValue }))
      setErrors((prevState) => ({ ...prevState, identificationNumber: "" }))
    } else {
      // Si el valor no es un número, muestra un mensaje de error
      let message = "El número de identificación solo debe contener números"
      setErrors((prevState) => ({ ...prevState, identificationNumber: message }))
    }
  }

  const fetchData = async (reservationId: Number, cardNumber: String, cardCvc: String, cardHolderName: String) => {
    var pagado = false

    try {
      const { data } = await Axios.post("https://codefact.fly.dev/api/payments", {
        reservationId,
        cardNumber,
        cardCvc,
        cardHolderName,
      })

      pagado = true
    } catch (error: any) {
      setIsLoading(false)

      if (error?.response?.status == 404) {
        setErrorMessage(
          "La tarjeta de crédito ingresada no es válida. Por favor, revise los detalles e inténtelo de nuevo."
        )
        return
      }

      pagado = false
    }

    payed(pagado)
    onClose()
    openModal2()
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
        <div className="rounded-lg bg-white px-12 py-4 shadow-md" style={{ width: "940px" }}>
          <h2 className="bg-custom-blue mb-6 text-left text-2xl font-bold" style={{ color: "#2196F3" }}>
            Tarjeta de débito
          </h2>
          <h2 className="mb-4 text-sm text-gray-600">
            Por favor diligencie todos los campos <span className="text-red-500">*</span>
          </h2>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Name */}
              <Grid item xs={12}>
                <TextField
                  id="cardHolderName"
                  type="text"
                  value={cardHolderName}
                  onChange={handleCardHolderNameChange}
                  inputProps={{ maxLength: 40 }}
                  fullWidth
                  variant="outlined"
                  required
                  label="Nombre del propietario de la tarjeta"
                  error={errors.cardHolderName !== ""}
                  helperText={errors.cardHolderName}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Nro tarjeta */}
              <Grid item xs={12} sm={7}>
                <TextField
                  id="cardNumber"
                  label="Número de la tarjeta"
                  variant="outlined"
                  fullWidth
                  type="number"
                  onChange={handleCardNumberChange}
                  required
                  error={errors.cardNumber !== ""}
                  helperText={errors.cardNumber}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Nro cvc */}
              <Grid item xs={12} sm={5}>
                <TextField
                  id="cvvInput"
                  label="Código CCV"
                  variant="outlined"
                  fullWidth
                  type="number"
                  onChange={handleCvvChange}
                  required
                  error={errors.cvv !== ""}
                  helperText={errors.cvv}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Fecha vencimiento */}
              <Grid item xs={12} sm={4}>
                <label className="relative -top-2 flex text-xs text-gray-600">Fecha de vencimiento *</label>
                <div className="flex gap-4">
                  <TextField
                    id="expiryMonth"
                    label="MM"
                    variant="outlined"
                    value={expiryMonth || ""}
                    inputProps={{ maxLength: 2, style: { padding: 8 } }}
                    onChange={handleExpiryMonthChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    id="expiryYear"
                    label="YYYY"
                    variant="outlined"
                    value={expiryYear || ""}
                    inputProps={{ maxLength: 4, style: { padding: 8 } }}
                    onChange={handleExpiryYearChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </Grid>

              {/* Tipo documento */}
              <Grid item xs={12} sm={2}>
                <Autocomplete
                  disablePortal
                  id="identificationType"
                  options={["C.C.", "N.I.T.", "C.E"]}
                  onInputChange={(event, newInputValue) => {
                    setIdentificationType(newInputValue)
                  }}
                  // sx={{ width: 940 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tipo de identificación"
                      id="identificationType"
                      onChange={(e) => setIdentificationType(e.target.value)}
                      fullWidth
                      variant="outlined"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Num documento */}
              <Grid item xs={12} sm={6}>
                <TextField
                  id="identificationNumber"
                  type="text"
                  value={identificationNumber}
                  onChange={handleIdentificationNumberChange}
                  fullWidth
                  variant="outlined"
                  required
                  label="Número de identificación"
                  error={errors.identificationNumber !== ""}
                  helperText={errors.identificationNumber}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            <div className="mb-4 mt-3 flex items-center">
              <input
                type="checkbox"
                id="acceptTerms"
                className="bg-grey-700 h-4 w-4 cursor-pointer rounded text-red-500 accent-sky-700"
                required
              />

              <label htmlFor="acceptTerms" className="ml-2 text-gray-700">
                Acepto y conozco las políticas de tratamiento de datos personales
              </label>
            </div>

            <div className="mb-4 flex items-center text-sm text-gray-600">
              <svg className="mr-2 h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Una vez el pago se efectúe será notificado mediante el correo electrónico registrado
            </div>

            <div className="mt-12 flex justify-center">
              <button
                onClick={onClose}
                type="button"
                className="mr-4 rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
              >
                Atrás
              </button>
              <button
                className="focus:shadow-outline rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                style={{ backgroundColor: "#2196F3" }}
              >
                Finalizar pago
              </button>
            </div>

            {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  )
}

function ParteB({ paymentOption, payed, isOpen, onClose, openModal2, router, ...props }: ModalProps) {
  const [cardHolderName, setCardHolderName] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [identificationNumber, setIdentificationNumber] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const [cardType, setCardType] = useState("Seleccionar")
  const [cardNumber, setCardNumber] = useState("")
  const [cvv, setCvv] = useState("")
  const [installments, setInstallments] = useState("Seleccionar")
  const [identificationType, setIdentificationType] = useState("")
  const [agree, setAgree] = useState("")

  const [bankEntity, setBankEntity] = useState("")
  const [personType, setPersonType] = useState("")
  const [socialReason, setSocialReason] = useState("")
  const [email, setEmail] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const [creditCardData, setCreditCardData] = useState({
    cardHolderName: "",
    cardType: "",
    cardNumber: "",
    cvv: "",
    installments: "",
    expiryMonth: "",
    expiryYear: "",
    identificationType: "",
    identificationNumber: "",
    agree: false,
  })

  const [errors, setErrors] = useState({
    cardHolderName: "",
    cardType: "",
    cardNumber: "",
    cvv: "",
    installments: "",
    expiryMonth: "",
    expiryYear: "",
    identificationType: "",
    identificationNumber: "",
    agree: true,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    fetchData(
      987, // reservationId
      creditCardData.cardNumber,
      creditCardData.cvv,
      creditCardData.cardHolderName
    )
  }

  const handleCardHolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.value
    setCardHolderName(inputName.slice(0, 40)) // Limitar a 40 caracteres
    setCreditCardData((prevState) => ({ ...prevState, cardHolderName: inputName }))
    setErrors((prevState) => ({ ...prevState, cardNumber: "" }))
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputCardNumber = e.target.value
    setCardNumber(inputCardNumber)
    setCreditCardData((prevState) => ({ ...prevState, cardNumber: inputCardNumber }))
    setErrors((prevState) => ({ ...prevState, cardNumber: "" }))

    // Expresión regular para validar que sean solo caracteres numéricos y máximo 16
    const regex = /^[0-9]*$/

    if (inputCardNumber.length > 16 || !regex.test(inputCardNumber)) {
      let message = "El número de tarjeta debe contener solo números y máximo 16 dígitos."
      setErrors((prevState) => ({ ...prevState, cardNumber: message }))
    }
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputCvv = e.target.value
    setCvv(inputCvv)
    setCreditCardData((prevState) => ({ ...prevState, cvv: inputCvv }))
    setErrors((prevState) => ({ ...prevState, cvv: "" }))

    // Expresión regular para validar que sean como máximo 3 dígitos numéricos
    const regex = /^\d{0,3}$/

    if (!regex.test(inputCvv)) {
      let message = "Máximo 3 dígitos numéricos."
      setErrors((prevState) => ({ ...prevState, cvv: message }))
    }
  }

  const handleExpiryMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputMonth = e.target.value
    const numericValue = inputMonth.replace(/[^0-9]/g, "")
    setCreditCardData((prevState) => ({ ...prevState, expiryMonth: numericValue }))
    setExpiryMonth(numericValue)
  }

  const handleExpiryYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputYear = e.target.value

    const numericValue = inputYear.replace(/[^0-9]/g, "")
    console.log("numericValue", numericValue)
    setCreditCardData((prevState) => ({ ...prevState, expiryYear: numericValue }))
    setExpiryYear(numericValue)
  }

  const handleIdentificationNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    // Utiliza una expresión regular para comprobar si el valor ingresado son solo números
    if (/^\d*$/.test(inputValue)) {
      setIdentificationNumber(inputValue)
      setCreditCardData((prevState) => ({ ...prevState, identificationNumber: inputValue }))
      setErrors((prevState) => ({ ...prevState, identificationNumber: "" }))
    } else {
      // Si el valor no es un número, muestra un mensaje de error
      let message = "El número de identificación solo debe contener números"
      setErrors((prevState) => ({ ...prevState, identificationNumber: message }))
    }
  }

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let actual = creditCardData.agree
    setCreditCardData((prevState) => ({ ...prevState, agree: !actual }))
  }

  const fetchData = async (reservationId: Number, cardNumber: String, cardCvc: String, cardHolderName: String) => {
    var pagado = false

    try {
      const { data } = await Axios.post("https://codefact.fly.dev/api/payments", {
        reservationId,
        cardNumber,
        cardCvc,
        cardHolderName,
      })

      pagado = true
    } catch (error: any) {
      setIsLoading(false)

      if (error?.response?.status == 404) {
        setErrorMessage(
          "La tarjeta de crédito ingresada no es válida. Por favor, revise los detalles e inténtelo de nuevo."
        )
        return
      }

      pagado = false
    }

    payed(pagado)
    onClose()
    openModal2()
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
        <div className="rounded-lg bg-white px-12 py-4 shadow-md" style={{ width: "940px" }}>
          <h2 className="bg-custom-blue mb-6 text-left text-2xl font-bold" style={{ color: "#2196F3" }}>
            Tarjeta de crédito
          </h2>
          <h2 className="mb-4 text-sm text-gray-600">
            Por favor diligencie todos los campos <span className="text-red-500">*</span>
          </h2>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Name credit owner */}
              <Grid item xs={12}>
                <TextField
                  id="cardHolderName"
                  type="text"
                  value={creditCardData.cardHolderName}
                  onChange={handleCardHolderNameChange}
                  inputProps={{ maxLength: 40 }}
                  fullWidth
                  variant="outlined"
                  required
                  label="Nombre del propietario de la tarjeta"
                  // error={errorMessage !== ""}
                  // helperText={errorMessage}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Credit card type */}
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  disablePortal
                  id="cardType"
                  options={["Visa", "Mastercard", "American Express"]}
                  // value={creditCardData.cardType}
                  onInputChange={(event, newInputValue) => {
                    setCardType(newInputValue)
                  }}
                  // sx={{ width: 940 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tipo de tarjeta"
                      fullWidth
                      variant="outlined"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Nro tarjeta */}
              <Grid item xs={12} sm={5}>
                <TextField
                  id="cardNumber"
                  label="Número de la tarjeta"
                  variant="outlined"
                  value={creditCardData.cardNumber}
                  fullWidth
                  type="number"
                  onChange={handleCardNumberChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Nro cvc */}
              <Grid item xs={12} sm={2}>
                <TextField
                  id="cvvInput"
                  label="Código CCV"
                  variant="outlined"
                  value={creditCardData.cvv}
                  fullWidth
                  type="number"
                  onChange={handleCvvChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Nro cuotas */}
              <Grid item xs={12} sm={2}>
                <Autocomplete
                  disablePortal
                  id="installments"
                  options={Array.from({ length: 24 }, (v, i) => (i + 1).toString())}
                  // value={creditCardData.installments}
                  onInputChange={(event, newInputValue) => {
                    setIdentificationType(newInputValue)
                  }}
                  // sx={{ width: 940 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Número de cuotas"
                      fullWidth
                      variant="outlined"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Fecha vencimiento */}
              <Grid item xs={12} sm={4}>
                <label className="relative -top-2 flex text-xs text-gray-600">Fecha de vencimiento *</label>
                <div className="flex gap-4">
                  <TextField
                    id="expiryMonth"
                    label="MM"
                    variant="outlined"
                    value={creditCardData.expiryMonth}
                    inputProps={{ maxLength: 2, style: { padding: 8 } }}
                    onChange={handleExpiryMonthChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    id="expiryYear"
                    label="YYYY"
                    variant="outlined"
                    value={creditCardData.expiryYear}
                    inputProps={{ maxLength: 4, style: { padding: 8 } }}
                    onChange={handleExpiryYearChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </Grid>

              {/* Tipo documento */}
              <Grid item xs={12} sm={2}>
                <Autocomplete
                  disablePortal
                  id="identificationType"
                  options={["C.C.", "N.I.T.", "C.E"]}
                  // value={creditCardData.identificationType}
                  onInputChange={(event, newInputValue) => {
                    setIdentificationType(newInputValue)
                  }}
                  // sx={{ width: 940 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tipo de identificación"
                      id="identificationType"
                      onChange={(e) => setIdentificationType(e.target.value)}
                      fullWidth
                      variant="outlined"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Num documento */}
              <Grid item xs={12} sm={6}>
                <TextField
                  id="identificationNumber"
                  type="text"
                  value={creditCardData.identificationNumber}
                  onChange={handleIdentificationNumberChange}
                  fullWidth
                  variant="outlined"
                  required
                  label="Número de identificación"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            <div className="mb-4 mt-3 flex items-center">
              <input
                type="checkbox"
                onChange={handleCheckChange}
                id="acceptTerms"
                checked={creditCardData.agree}
                className="bg-grey-700 h-4 w-4 cursor-pointer rounded text-red-500 accent-sky-700"
                required
              />

              <label htmlFor="acceptTerms" className="ml-2 text-gray-700">
                Acepto y conozco las políticas de tratamiento de datos personales
              </label>
            </div>

            <div className="mb-4 flex items-center text-sm text-gray-600">
              <svg className="mr-2 h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Una vez el pago se efectúe será notificado mediante el correo electrónico registrado
            </div>

            <div className="fle mt-6 flex flex-col items-center justify-center">
              {!isLoading && errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}
              {isLoading && <div className="mb-4">Cargando...</div>}

              <div>
                <button
                  onClick={onClose}
                  type="button"
                  className="mr-4 rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  className="focus:shadow-outline rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                  style={{ backgroundColor: "#2196F3" }}
                >
                  Finalizar pago
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function ParteC({ paymentOption, payed, isOpen, onClose, openModal2, router, ...props }: ModalProps) {
  const [cardHolderName, setCardHolderName] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [identificationNumber, setIdentificationNumber] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const [cardType, setCardType] = useState("Seleccionar")
  const [cardNumber, setCardNumber] = useState("")
  const [cvv, setCvv] = useState("")
  const [installments, setInstallments] = useState("Seleccionar")
  const [identificationType, setIdentificationType] = useState("")
  const [agree, setAgree] = useState("")

  const [bankEntity, setBankEntity] = useState("")
  const [personType, setPersonType] = useState("")
  const [socialReason, setSocialReason] = useState("")
  const [email, setEmail] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const [creditCardData, setCreditCardData] = useState({
    cardHolderName: "",
    cardType: "",
    cardNumber: "",
    cvv: "",
    installments: "",
    expiryMonth: "",
    expiryYear: "",
    identificationType: "",
    identificationNumber: "",
    agree: false,
  })

  const [errors, setErrors] = useState({
    cardHolderName: "",
    cardType: "",
    cardNumber: "",
    cvv: "",
    installments: "",
    expiryMonth: "",
    expiryYear: "",
    identificationType: "",
    identificationNumber: "",
    agree: true,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    fetchData(
      987, // reservationId
      creditCardData.cardNumber,
      creditCardData.cvv,
      creditCardData.cardHolderName
    )
  }

  const handleCardHolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.value
    setCardHolderName(inputName.slice(0, 40)) // Limitar a 40 caracteres
    setCreditCardData((prevState) => ({ ...prevState, cardHolderName: inputName }))
    setErrors((prevState) => ({ ...prevState, cardNumber: "" }))
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputCardNumber = e.target.value
    setCardNumber(inputCardNumber)
    setCreditCardData((prevState) => ({ ...prevState, cardNumber: inputCardNumber }))
    setErrors((prevState) => ({ ...prevState, cardNumber: "" }))

    // Expresión regular para validar que sean solo caracteres numéricos y máximo 16
    const regex = /^[0-9]*$/

    if (inputCardNumber.length > 16 || !regex.test(inputCardNumber)) {
      let message = "El número de tarjeta debe contener solo números y máximo 16 dígitos."
      setErrors((prevState) => ({ ...prevState, cardNumber: message }))
    }
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputCvv = e.target.value
    setCvv(inputCvv)
    setCreditCardData((prevState) => ({ ...prevState, cvv: inputCvv }))
    setErrors((prevState) => ({ ...prevState, cvv: "" }))

    // Expresión regular para validar que sean como máximo 3 dígitos numéricos
    const regex = /^\d{0,3}$/

    if (!regex.test(inputCvv)) {
      let message = "Máximo 3 dígitos numéricos."
      setErrors((prevState) => ({ ...prevState, cvv: message }))
    }
  }

  const handleExpiryMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputMonth = e.target.value
    const numericValue = inputMonth.replace(/[^0-9]/g, "")
    setCreditCardData((prevState) => ({ ...prevState, expiryMonth: numericValue }))
    setExpiryMonth(numericValue)
  }

  const handleExpiryYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputYear = e.target.value

    const numericValue = inputYear.replace(/[^0-9]/g, "")
    console.log("numericValue", numericValue)
    setCreditCardData((prevState) => ({ ...prevState, expiryYear: numericValue }))
    setExpiryYear(numericValue)
  }

  const handleIdentificationNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    // Utiliza una expresión regular para comprobar si el valor ingresado son solo números
    if (/^\d*$/.test(inputValue)) {
      setIdentificationNumber(inputValue)
      setCreditCardData((prevState) => ({ ...prevState, identificationNumber: inputValue }))
      setErrors((prevState) => ({ ...prevState, identificationNumber: "" }))
    } else {
      // Si el valor no es un número, muestra un mensaje de error
      let message = "El número de identificación solo debe contener números"
      setErrors((prevState) => ({ ...prevState, identificationNumber: message }))
    }
  }

  const handleSocialReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setSocialReason(inputValue)
    setErrors((prevState) => ({ ...prevState, cardNumber: "" }))
    // Add validation for social reason if needed
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setEmail(inputValue)
    setErrors((prevState) => ({ ...prevState, cardNumber: "" }))
    // Add validation for email if needed
  }

  const fetchData = async (reservationId: Number, cardNumber: String, cardCvc: String, cardHolderName: String) => {
    var pagado = false

    try {
      const { data } = await Axios.post("https://codefact.fly.dev/api/payments", {
        reservationId,
        cardNumber,
        cardCvc,
        cardHolderName,
      })

      pagado = true
    } catch (error: any) {
      setIsLoading(false)

      if (error?.response?.status == 404) {
        setErrorMessage(
          "La tarjeta de crédito ingresada no es válida. Por favor, revise los detalles e inténtelo de nuevo."
        )
        return
      }

      pagado = false
    }

    payed(pagado)
    onClose()
    openModal2()
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
        <div className="rounded-lg bg-white px-12 py-4 shadow-md" style={{ width: "940px" }}>
          <h2 className="bg-custom-blue mb-6 text-left text-2xl font-bold" style={{ color: "#2196F3" }}>
            PSE
          </h2>
          <h2 className="mb-4 text-sm text-gray-600">
            Por favor seleccione el banco desde el cual desea realizar el pago
          </h2>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="bankEntity"
                  options={["Bancolombia", "BBVA", "Davivienda"]}
                  onInputChange={(event, newInputValue) => {
                    setBankEntity(newInputValue)
                  }}
                  // sx={{ width: 940 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Entidad bancaria"
                      fullWidth
                      variant="outlined"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disablePortal
                  id="bankEntity"
                  options={["Natural", "Jurídica"]}
                  onInputChange={(event, newInputValue) => {
                    setPersonType(newInputValue)
                  }}
                  // sx={{ width: 940 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tipo de persona"
                      id="personType"
                      onChange={(e) => setPersonType(e.target.value)}
                      fullWidth
                      variant="outlined"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disablePortal
                  id="bankEntity"
                  options={["C.C.", "N.I.T.", "C.E"]}
                  onInputChange={(event, newInputValue) => {
                    setIdentificationType(newInputValue)
                  }}
                  // sx={{ width: 940 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tipo de identificación"
                      id="identificationType"
                      onChange={(e) => setIdentificationType(e.target.value)}
                      fullWidth
                      variant="outlined"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  id="identificationNumber"
                  type="text"
                  value={identificationNumber}
                  onChange={handleIdentificationNumberChange}
                  fullWidth
                  variant="outlined"
                  required
                  label="Número de identificación"
                  error={errorMessage !== ""}
                  helperText={errorMessage}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="socialReason"
                  type="text"
                  onChange={handleSocialReasonChange}
                  fullWidth
                  variant="outlined"
                  required
                  label="Nombre o razón social"
                  error={errorMessage !== ""}
                  helperText={errorMessage}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="email"
                  type="email"
                  onChange={handleEmailChange}
                  fullWidth
                  variant="outlined"
                  required
                  label="Correo electrónico"
                  error={errorMessage !== ""}
                  helperText={errorMessage}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            <div className="mb-4 mt-3 flex items-center">
              <input
                type="checkbox"
                id="acceptTerms"
                className="bg-grey-700 h-4 w-4 cursor-pointer rounded text-red-500 accent-sky-700"
                required
              />

              <label htmlFor="acceptTerms" className="ml-2 text-gray-700">
                Acepto y conozco las políticas de tratamiento de datos personales
              </label>
            </div>

            <div className="mb-4 flex items-center text-sm text-gray-600">
              <svg className="mr-2 h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Una vez el pago se efectúe será notificado mediante el correo electrónico registrado
            </div>

            <div className="mt-12 flex justify-center">
              <button
                onClick={onClose}
                type="button"
                className="mr-4 rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
              >
                Atrás
              </button>
              <button
                onClick={() => router.push("/pse")}
                type="button"
                className="focus:shadow-outline rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                style={{ backgroundColor: "#2196F3" }}
              >
                Finalizar pago
              </button>
            </div>

            {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  )
}

interface ModalProps extends React.ButtonHTMLAttributes<HTMLAnchorElement> {
  paymentOption: String
  isOpen: boolean
  payed: (pagado: boolean) => void
  onClose: () => void
  openModal2: () => void
  router: AppRouterInstance
}

export function Modal({ paymentOption, payed, isOpen, onClose, openModal2, router, ...props }: ModalProps) {
  if (!isOpen) return null

  // const [cardHolderName, setCardHolderName] = useState("");
  // const [expiryMonth, setExpiryMonth] = useState("");
  // const [identificationNumber, setIdentificationNumber] = useState("");
  // const [expiryYear, setExpiryYear] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  // const [cardType, setCardType] = useState("Seleccionar");
  // const [cardNumber, setCardNumber] = useState("");
  // const [cvv, setCvv] = useState("");
  // const [installments, setInstallments] = useState("Seleccionar");
  // const [identificationType, setIdentificationType] = useState("");
  // const [agree, setAgree] = useState("");

  // const [bankEntity, setBankEntity] = useState("");
  // const [personType, setPersonType] = useState("");
  // const [socialReason, setSocialReason] = useState("");
  // const [email, setEmail] = useState("");

  // const [isLoading, setIsLoading] = useState(false);

  // const [creditCardData, setCreditCardData] = useState({
  //   cardHolderName: "",
  //   cardType: "",
  //   cardNumber: "",
  //   cvv: "",
  //   installments: "",
  //   expiryMonth: "",
  //   expiryYear: "",
  //   identificationType: "",
  //   identificationNumber: "",
  //   agree: false
  // });

  // const [errors, setErrors] = useState({
  //   cardHolderName: "",
  //   cardType: "",
  //   cardNumber: "",
  //   cvv: "",
  //   installments: "",
  //   expiryMonth: "",
  //   expiryYear: "",
  //   identificationType: "",
  //   identificationNumber: "",
  //   agree: true
  // });

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   setIsLoading(true)

  //   fetchData(
  //     987, // reservationId
  //     creditCardData.cardNumber,
  //     creditCardData.cvv,
  //     creditCardData.cardHolderName,
  //   );

  // };

  // // const handleCardHolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // //   const inputName = e.target.value;
  // //   setCardHolderName(inputName.slice(0, 40)); // Limitar a 40 caracteres
  // //   setCreditCardData(prevState => ({ ...prevState, cardHolderName: inputName }));
  // //   setErrors(prevState => ({ ...prevState, cardNumber: "" }));
  // // };

  // // const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // //   const inputCardNumber = e.target.value;
  // //   setCardNumber(inputCardNumber);
  // //   setCreditCardData(prevState => ({ ...prevState, cardNumber: inputCardNumber }));
  // //   setErrors(prevState => ({ ...prevState, cardNumber: "" }));

  // //   // Expresión regular para validar que sean solo caracteres numéricos y máximo 16
  // //   const regex = /^[0-9]*$/;

  // //   if (inputCardNumber.length > 16 || !regex.test(inputCardNumber)) {
  // //     let message = "El número de tarjeta debe contener solo números y máximo 16 dígitos."
  // //     setErrors(prevState => ({ ...prevState, cardNumber: message }));
  // //   }
  // // };

  // // const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // //   const inputCvv = e.target.value;
  // //   setCvv(inputCvv);
  // //   setCreditCardData(prevState => ({ ...prevState, cvv: inputCvv }));
  // //   setErrors(prevState => ({ ...prevState, cvv: "" }));

  // //   // Expresión regular para validar que sean como máximo 3 dígitos numéricos
  // //   const regex = /^\d{0,3}$/;

  // //   if (!regex.test(inputCvv)) {
  // //     let message = "Máximo 3 dígitos numéricos."
  // //     setErrors(prevState => ({ ...prevState, cvv: message }));
  // //   }
  // // };

  // // const handleExpiryMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // //   const inputMonth = e.target.value;
  // //   const numericValue = inputMonth.replace(/[^0-9]/g, "");
  // //   setCreditCardData(prevState => ({ ...prevState, expiryMonth: numericValue }));
  // //   setExpiryMonth(numericValue);
  // // };

  // // const handleExpiryYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // //   const inputYear = e.target.value;

  // //   const numericValue = inputYear.replace(/[^0-9]/g, "");
  // //   console.log("numericValue", numericValue);
  // //   setCreditCardData(prevState => ({ ...prevState, expiryYear: numericValue }));
  // //   setExpiryYear(numericValue);
  // // };

  // // const handleIdentificationTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  // //   setIdentificationType(e.target.value);
  // // };

  // // const handleIdentificationNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  // //   const inputValue = e.target.value;
  // //   // Utiliza una expresión regular para comprobar si el valor ingresado son solo números
  // //   if (/^\d*$/.test(inputValue)) {
  // //     setIdentificationNumber(inputValue);
  // //     setCreditCardData(prevState => ({ ...prevState, identificationNumber: inputValue }));
  // //     setErrors(prevState => ({ ...prevState, identificationNumber: "" }));
  // //   }

  // //   else {
  // //     // Si el valor no es un número, muestra un mensaje de error
  // //     let message = "El número de identificación solo debe contener números";
  // //     setErrors(prevState => ({ ...prevState, identificationNumber: message }));
  // //   }
  // // };

  // // const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // //   e.preventDefault()
  // //   let actual = creditCardData.agree
  // //   setCreditCardData(prevState => ({ ...prevState, agree: !actual }));
  // // };

  // // const handleSocialReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // //   const inputValue = e.target.value;
  // //   setSocialReason(inputValue);
  // //   setErrors(prevState => ({ ...prevState, cardNumber: "" }));
  // //   // Add validation for social reason if needed
  // // };

  // // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // //   const inputValue = e.target.value;
  // //   setEmail(inputValue);
  // //   setErrors(prevState => ({ ...prevState, cardNumber: "" }));
  // //   // Add validation for email if needed
  // // };

  // const fetchData = async (reservationId: Number, cardNumber: String, cardCvc: String, cardHolderName: String) => {

  //   var pagado = false;

  //   try {
  //     const { data } = await Axios.post(
  //       "https://codefact.fly.dev/api/payments",
  //       {
  //         reservationId,
  //         cardNumber,
  //         cardCvc,
  //         cardHolderName
  //       }
  //     );

  //     pagado = true

  //   }

  //   catch (error: any) {

  //     setIsLoading(false)

  //     if (error?.response?.status == 404) {
  //       setErrorMessage("La tarjeta de crédito ingresada no es válida. Por favor, revise los detalles e inténtelo de nuevo.")
  //       return
  //     }

  //     pagado = false

  //   }

  //   payed(pagado)
  //   onClose()
  //   openModal2()
  // };

  switch (paymentOption) {
    case "tarjetaDebito":
      return (
        <ParteA
          paymentOption={paymentOption}
          payed={payed}
          isOpen={isOpen}
          onClose={onClose}
          openModal2={openModal2}
          router={router}
        />
      )

    // return (
    //   <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
    //     <div style={{ background: "white", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>

    //       <div className="rounded-lg bg-white shadow-md py-4 px-12" style={{ width: "940px" }}>

    //         <h2 className="mb-6 text-left text-2xl font-bold bg-custom-blue" style={{ color: "#2196F3" }}>Tarjeta de débito</h2>
    //         <h2 className="mb-4 text-sm text-gray-600">Por favor diligencie todos los campos <span className="text-red-500">*</span></h2>
    //         <form onSubmit={handleSubmit}>
    //           <Grid container spacing={2}>
    //             {/* Name */}
    //             <Grid item xs={12}>

    //               <TextField
    //                 id="cardHolderName"
    //                 type="text"
    //                 value={cardHolderName}
    //                 onChange={handleCardHolderNameChange}
    //                 inputProps={{ maxLength: 40 }}
    //                 fullWidth
    //                 variant="outlined"
    //                 required
    //                 label="Nombre del propietario de la tarjeta"
    //                 error={errors.cardHolderName !== ""}
    //                 helperText={errors.cardHolderName}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />

    //             </Grid>

    //             {/* Nro tarjeta */}
    //             <Grid item xs={12} sm={7}>

    //               <TextField
    //                 id="cardNumber"
    //                 label="Número de la tarjeta"
    //                 variant="outlined"

    //                 fullWidth
    //                 type="number"
    //                 onChange={handleCardNumberChange}
    //                 required
    //                 error={errors.cardNumber !== ""}
    //                 helperText={errors.cardNumber}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />

    //             </Grid>

    //             {/* Nro cvc */}
    //             <Grid item xs={12} sm={5}>

    //               <TextField
    //                 id="cvvInput"
    //                 label="Código CCV"
    //                 variant="outlined"

    //                 fullWidth
    //                 type="number"
    //                 onChange={handleCvvChange}
    //                 required
    //                 error={errors.cvv !== ""}
    //                 helperText={errors.cvv}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />

    //             </Grid>

    //             {/* Fecha vencimiento */}
    //             <Grid item xs={12} sm={4}>
    //               <label className="flex relative text-xs -top-2 text-gray-600">
    //                 Fecha de vencimiento *
    //               </label>
    //               <div className="flex gap-4">
    //                 <TextField
    //                   id="expiryMonth"
    //                   label="MM"
    //                   variant="outlined"
    //                   value={expiryMonth || ""}
    //                   inputProps={{ maxLength: 2, style: { padding: 8 } }}
    //                   onChange={handleExpiryMonthChange}
    //                   required
    //                   InputLabelProps={{
    //                     shrink: true,
    //                   }}
    //                 />
    //                 <TextField
    //                   id="expiryYear"
    //                   label="YYYY"
    //                   variant="outlined"
    //                   value={expiryYear || ""}
    //                   inputProps={{ maxLength: 4, style: { padding: 8 } }}
    //                   onChange={handleExpiryYearChange}
    //                   required
    //                   InputLabelProps={{
    //                     shrink: true,
    //                   }}
    //                 />
    //               </div>
    //             </Grid>

    //             {/* Tipo documento */}
    //             <Grid item xs={12} sm={2}>

    //               <Autocomplete
    //                 disablePortal
    //                 id="identificationType"
    //                 options={["C.C.", "N.I.T.", "C.E"]}
    //                 onInputChange={(event, newInputValue) => {
    //                   setIdentificationType(newInputValue);
    //                 }}
    //                 // sx={{ width: 940 }}
    //                 renderInput={(params) =>
    //                   <TextField
    //                     {...params}
    //                     label="Tipo de identificación"
    //                     id="identificationType"
    //                     onChange={(e) => setIdentificationType(e.target.value)}
    //                     fullWidth
    //                     variant="outlined"
    //                     required
    //                     InputLabelProps={{
    //                       shrink: true,
    //                     }}
    //                   />}
    //               />

    //             </Grid>

    //             {/* Num documento */}
    //             <Grid item xs={12} sm={6}>

    //               <TextField
    //                 id="identificationNumber"
    //                 type="text"
    //                 value={identificationNumber}
    //                 onChange={handleIdentificationNumberChange}
    //                 fullWidth
    //                 variant="outlined"
    //                 required
    //                 label="Número de identificación"
    //                 error={errors.identificationNumber !== ""}
    //                 helperText={errors.identificationNumber}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />

    //             </Grid>

    //           </Grid>

    //           <div className="mb-4 mt-3 flex items-center">

    //             <input
    //               type="checkbox"
    //               id="acceptTerms"
    //               className="h-4 w-4 accent-sky-700 bg-grey-700 text-red-500 rounded cursor-pointer"
    //               required
    //             />

    //             <label htmlFor="acceptTerms" className="ml-2 text-gray-700">
    //               Acepto y conozco las políticas de tratamiento de datos personales
    //             </label>
    //           </div>

    //           <div className="mb-4 flex items-center text-sm text-gray-600">
    //             <svg className="mr-2 h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    //             </svg>
    //             Una vez el pago se efectúe será notificado mediante el correo electrónico registrado
    //           </div>

    //           <div className="flex justify-center mt-12">

    //             <button
    //               onClick={onClose}
    //               type="button"
    //               className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 mr-4"
    //             >
    //               Atrás
    //             </button>
    //             <button

    //               className="focus:shadow-outline rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
    //               style={{ backgroundColor: "#2196F3" }}
    //             >
    //               Finalizar pago
    //             </button>
    //           </div>

    //           {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}

    //         </form>
    //       </div>

    //     </div>
    //   </div>
    // );

    case "tarjetaCredito":
      return (
        <ParteB
          paymentOption={paymentOption}
          payed={payed}
          isOpen={isOpen}
          onClose={onClose}
          openModal2={openModal2}
          router={router}
        />
      )

    // return (
    //   <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
    //     <div style={{ background: "white", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>

    //       <div className="rounded-lg bg-white shadow-md py-4 px-12" style={{ width: "940px" }}>

    //         <h2 className="mb-6 text-left text-2xl font-bold bg-custom-blue" style={{ color: "#2196F3" }}>Tarjeta de crédito</h2>
    //         <h2 className="mb-4 text-sm text-gray-600">Por favor diligencie todos los campos <span className="text-red-500">*</span></h2>

    //         <form onSubmit={handleSubmit}>
    //           <Grid container spacing={2}>
    //             {/* Name credit owner */}
    //             <Grid item xs={12}>

    //               <TextField
    //                 id="cardHolderName"
    //                 type="text"
    //                 value={creditCardData.cardHolderName}
    //                 onChange={handleCardHolderNameChange}
    //                 inputProps={{ maxLength: 40 }}
    //                 fullWidth
    //                 variant="outlined"
    //                 required
    //                 label="Nombre del propietario de la tarjeta"
    //                 // error={errorMessage !== ""}
    //                 // helperText={errorMessage}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />

    //             </Grid>

    //             {/* Credit card type */}
    //             <Grid item xs={12} sm={3}>

    //               <Autocomplete
    //                 disablePortal
    //                 id="cardType"
    //                 options={["Visa", "Mastercard", "American Express"]}
    //                 // value={creditCardData.cardType}
    //                 onInputChange={(event, newInputValue) => {
    //                   setCardType(newInputValue);
    //                 }}
    //                 // sx={{ width: 940 }}
    //                 renderInput={(params) =>
    //                   <TextField
    //                     {...params}
    //                     label="Tipo de tarjeta"
    //                     fullWidth
    //                     variant="outlined"
    //                     required
    //                     InputLabelProps={{
    //                       shrink: true,
    //                     }}
    //                   />}
    //               />

    //             </Grid>

    //             {/* Nro tarjeta */}
    //             <Grid item xs={12} sm={5}>

    //               <TextField
    //                 id="cardNumber"
    //                 label="Número de la tarjeta"
    //                 variant="outlined"
    //                 value={creditCardData.cardNumber}
    //                 fullWidth
    //                 type="number"
    //                 onChange={handleCardNumberChange}
    //                 required
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />

    //             </Grid>

    //             {/* Nro cvc */}
    //             <Grid item xs={12} sm={2}>

    //               <TextField
    //                 id="cvvInput"
    //                 label="Código CCV"
    //                 variant="outlined"
    //                 value={creditCardData.cvv}
    //                 fullWidth
    //                 type="number"
    //                 onChange={handleCvvChange}
    //                 required
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />

    //             </Grid>

    //             {/* Nro cuotas */}
    //             <Grid item xs={12} sm={2}>

    //               <Autocomplete
    //                 disablePortal
    //                 id="installments"
    //                 options={Array.from({ length: 24 }, (v, i) => (i + 1).toString())}
    //                 // value={creditCardData.installments}
    //                 onInputChange={(event, newInputValue) => {
    //                   setIdentificationType(newInputValue);
    //                 }}
    //                 // sx={{ width: 940 }}
    //                 renderInput={(params) =>
    //                   <TextField
    //                     {...params}
    //                     label="Número de cuotas"
    //                     fullWidth
    //                     variant="outlined"
    //                     required
    //                     InputLabelProps={{
    //                       shrink: true,
    //                     }}
    //                   />}
    //               />

    //             </Grid>

    //             {/* Fecha vencimiento */}
    //             <Grid item xs={12} sm={4}>
    //               <label className="flex relative text-xs -top-2 text-gray-600">
    //                 Fecha de vencimiento *
    //               </label>
    //               <div className="flex gap-4">
    //                 <TextField
    //                   id="expiryMonth"
    //                   label="MM"
    //                   variant="outlined"
    //                   value={creditCardData.expiryMonth}
    //                   inputProps={{ maxLength: 2, style: { padding: 8 } }}
    //                   onChange={handleExpiryMonthChange}
    //                   required
    //                   InputLabelProps={{
    //                     shrink: true,
    //                   }}
    //                 />
    //                 <TextField
    //                   id="expiryYear"
    //                   label="YYYY"
    //                   variant="outlined"
    //                   value={creditCardData.expiryYear}
    //                   inputProps={{ maxLength: 4, style: { padding: 8 } }}
    //                   onChange={handleExpiryYearChange}
    //                   required
    //                   InputLabelProps={{
    //                     shrink: true,
    //                   }}
    //                 />
    //               </div>
    //             </Grid>

    //             {/* Tipo documento */}
    //             <Grid item xs={12} sm={2}>

    //               <Autocomplete
    //                 disablePortal
    //                 id="identificationType"
    //                 options={["C.C.", "N.I.T.", "C.E"]}
    //                 // value={creditCardData.identificationType}
    //                 onInputChange={(event, newInputValue) => {
    //                   setIdentificationType(newInputValue);
    //                 }}
    //                 // sx={{ width: 940 }}
    //                 renderInput={(params) =>
    //                   <TextField
    //                     {...params}
    //                     label="Tipo de identificación"
    //                     id="identificationType"
    //                     onChange={(e) => setIdentificationType(e.target.value)}
    //                     fullWidth
    //                     variant="outlined"
    //                     required
    //                     InputLabelProps={{
    //                       shrink: true,
    //                     }}
    //                   />}
    //               />

    //             </Grid>

    //             {/* Num documento */}
    //             <Grid item xs={12} sm={6}>

    //               <TextField
    //                 id="identificationNumber"
    //                 type="text"
    //                 value={creditCardData.identificationNumber}
    //                 onChange={handleIdentificationNumberChange}
    //                 fullWidth
    //                 variant="outlined"
    //                 required
    //                 label="Número de identificación"
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />

    //             </Grid>

    //           </Grid>

    //           <div className="mb-4 mt-3 flex items-center">

    //             <input
    //               type="checkbox"
    //               onChange={handleCheckChange}
    //               id="acceptTerms"
    //               checked={creditCardData.agree}
    //               className="h-4 w-4 accent-sky-700 bg-grey-700 text-red-500 rounded cursor-pointer"
    //               required
    //             />

    //             <label htmlFor="acceptTerms" className="ml-2 text-gray-700">
    //               Acepto y conozco las políticas de tratamiento de datos personales
    //             </label>
    //           </div>

    //           <div className="mb-4 flex items-center text-sm text-gray-600">
    //             <svg className="mr-2 h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    //             </svg>
    //             Una vez el pago se efectúe será notificado mediante el correo electrónico registrado
    //           </div>

    //           <div className="flex justify-center items-center flex-col fle mt-6">

    //             {!isLoading && errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}
    //             {isLoading && <div className="mb-4">Cargando...</div>}

    //             <div>
    //               <button
    //                 onClick={onClose}
    //                 type="button"
    //                 className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 mr-4"
    //               >
    //                 Atrás
    //               </button>
    //               <button
    //                 type="submit"
    //                 className="focus:shadow-outline rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
    //                 style={{ backgroundColor: "#2196F3" }}
    //               >
    //                 Finalizar pago
    //               </button>
    //             </div>
    //           </div>

    //         </form>
    //       </div>

    //     </div>
    //   </div>
    // );

    case "pse":
      return (
        <ParteC
          paymentOption={paymentOption}
          payed={payed}
          isOpen={isOpen}
          onClose={onClose}
          openModal2={openModal2}
          router={router}
        />
      )

    // return (
    //   <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
    //     <div style={{ background: "white", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>

    //       <div className="rounded-lg bg-white shadow-md py-4 px-12" style={{ width: "940px" }}>

    //         <h2 className="mb-6 text-left text-2xl font-bold bg-custom-blue" style={{ color: "#2196F3" }}>PSE</h2>
    //         <h2 className="mb-4 text-sm text-gray-600">Por favor seleccione el banco desde el cual desea realizar el pago</h2>
    //         <form>
    //           <Grid container spacing={2}>
    //             <Grid item xs={12}>
    //               <Autocomplete
    //                 disablePortal
    //                 id="bankEntity"
    //                 options={["Bancolombia", "BBVA", "Davivienda"]}
    //                 onInputChange={(event, newInputValue) => {
    //                   setBankEntity(newInputValue);
    //                 }}
    //                 // sx={{ width: 940 }}
    //                 renderInput={(params) =>
    //                   <TextField
    //                     {...params}
    //                     label="Entidad bancaria"
    //                     fullWidth
    //                     variant="outlined"
    //                     required
    //                     InputLabelProps={{
    //                       shrink: true,
    //                     }}
    //                   />}
    //               />

    //             </Grid>

    //             <Grid item xs={12} sm={4}>
    //               <Autocomplete
    //                 disablePortal
    //                 id="bankEntity"
    //                 options={["Natural", "Jurídica"]}
    //                 onInputChange={(event, newInputValue) => {
    //                   setPersonType(newInputValue);
    //                 }}
    //                 // sx={{ width: 940 }}
    //                 renderInput={(params) =>
    //                   <TextField
    //                     {...params}
    //                     label="Tipo de persona"
    //                     id="personType"
    //                     onChange={(e) => setPersonType(e.target.value)}
    //                     fullWidth
    //                     variant="outlined"
    //                     required
    //                     InputLabelProps={{
    //                       shrink: true,
    //                     }}
    //                   />}
    //               />

    //             </Grid>

    //             <Grid item xs={12} sm={4}>
    //               <Autocomplete
    //                 disablePortal
    //                 id="bankEntity"
    //                 options={["C.C.", "N.I.T.", "C.E"]}
    //                 onInputChange={(event, newInputValue) => {
    //                   setIdentificationType(newInputValue);
    //                 }}
    //                 // sx={{ width: 940 }}
    //                 renderInput={(params) =>
    //                   <TextField
    //                     {...params}
    //                     label="Tipo de identificación"
    //                     id="identificationType"
    //                     onChange={(e) => setIdentificationType(e.target.value)}
    //                     fullWidth
    //                     variant="outlined"
    //                     required
    //                     InputLabelProps={{
    //                       shrink: true,
    //                     }}
    //                   />}
    //               />

    //             </Grid>

    //             <Grid item xs={12} sm={4}>
    //               <TextField
    //                 id="identificationNumber"
    //                 type="text"
    //                 value={identificationNumber}
    //                 onChange={handleIdentificationNumberChange}
    //                 fullWidth
    //                 variant="outlined"
    //                 required
    //                 label="Número de identificación"
    //                 error={errorMessage !== ""}
    //                 helperText={errorMessage}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />
    //             </Grid>

    //             <Grid item xs={12} sm={6}>
    //               <TextField
    //                 id="socialReason"
    //                 type="text"
    //                 onChange={handleSocialReasonChange}
    //                 fullWidth
    //                 variant="outlined"
    //                 required
    //                 label="Nombre o razón social"
    //                 error={errorMessage !== ""}
    //                 helperText={errorMessage}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />
    //             </Grid>

    //             <Grid item xs={12} sm={6}>
    //               <TextField
    //                 id="email"
    //                 type="email"
    //                 onChange={handleEmailChange}
    //                 fullWidth
    //                 variant="outlined"
    //                 required
    //                 label="Correo electrónico"
    //                 error={errorMessage !== ""}
    //                 helperText={errorMessage}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />
    //             </Grid>

    //           </Grid>

    //           <div className="mb-4 mt-3 flex items-center">

    //             <input
    //               type="checkbox"
    //               id="acceptTerms"
    //               className="h-4 w-4 accent-sky-700 bg-grey-700 text-red-500 rounded cursor-pointer"
    //               required
    //             />

    //             <label htmlFor="acceptTerms" className="ml-2 text-gray-700">
    //               Acepto y conozco las políticas de tratamiento de datos personales
    //             </label>
    //           </div>

    //           <div className="mb-4 flex items-center text-sm text-gray-600">
    //             <svg className="mr-2 h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    //             </svg>
    //             Una vez el pago se efectúe será notificado mediante el correo electrónico registrado
    //           </div>

    //           <div className="flex justify-center mt-12">

    //             <button
    //               onClick={onClose}
    //               type="button"
    //               className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 mr-4"
    //             >
    //               Atrás
    //             </button>
    //             <button
    //               onClick={() => router.push("/pse")}
    //               type="button"
    //               className="focus:shadow-outline rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
    //               style={{ backgroundColor: "#2196F3" }}
    //             >
    //               Finalizar pago
    //             </button>
    //           </div>

    //           {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}

    //         </form>
    //       </div>

    //     </div>
    //   </div>
    // );

    default:
      onClose()
      break
  }
}
