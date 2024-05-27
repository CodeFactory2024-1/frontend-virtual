"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import styled from "styled-components"
import "styles/tailwind.css"

const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: sans-serif;
`

const Encabezado = styled.header`
  display: flex;
  justify-content: left; /* Alinear a la izquierda */
  margin-bottom: 2rem;
`

const Titulo = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`

const ContenedorTipoUsuario = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`

const IconoTipoUsuario = styled.img`
  width: 400px;
  height: 150px;
  margin-right: 1rem;
`

const OpcionesRegistro = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const OpcionRegistro = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`

const IconoRegistro = styled.img`
  width: 48px; /* Doble del tamaño original de 24px */
  height: 48px; /* Doble del tamaño original de 24px */
  margin-right: 0.5rem;
`

const TextoRegistro = styled.span`
  font-size: 1rem;
`

const InputCorreo = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  margin-bottom: 1rem;
`

const BotonAccion = styled.button`
  padding: 0.5rem 1rem;
  background-color: #fff; /* Cambia el color de fondo a blanco */
  color: #0056b3; /* Cambia el color del texto a azul */
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin: 0.5rem; /* Añade margen en los cuatro lados */
  transition: box-shadow 0.3s ease; /* Agrega transición para un efecto suave */
  &:hover {
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Agrega sombra al pasar el cursor */
  }
`

const ContenedorBotonesAccion = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 900px; /* ajusta el ancho máximo según tus necesidades */
  margin-top: 1rem; /* añade un espacio entre los botones y otros elementos */
`

const PaginaPrincipal = () => {
  const [correo, setCorreo] = useState("")
  const router = useRouter()

  const manejarCambioCorreo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorreo(e.target.value)
  }

  const volver = () => {
    router.push("/pagos") // Cambia "/pse" por la ruta de tu página destino
  }

  const irAlBanco = () => {
    router.push("/banco") // Cambia "/pse" por la ruta de tu página destino
  }

  return (
    <Contenedor>
      <Encabezado>
        <Image src="/Header2.png" alt="Encabezado" />
      </Encabezado>
      <Titulo>PSE - Pagos Seguros en Línea / Persona Natural</Titulo>
      <ContenedorTipoUsuario>
        <IconoTipoUsuario src="/tipopersona.png" />
      </ContenedorTipoUsuario>
      <OpcionesRegistro>
        <OpcionRegistro>
          <IconoRegistro src="/chulito.png" alt="Chulito" />
          <TextoRegistro>Soy un usuario registrado</TextoRegistro>
        </OpcionRegistro>
        <OpcionRegistro>
          <IconoRegistro src="/registro.png" alt="Registro" />
          <TextoRegistro>Quiero registrarme ahora</TextoRegistro>
        </OpcionRegistro>
      </OpcionesRegistro>
      <InputCorreo type="email" placeholder="E-mail registrado en PSE" value={correo} onChange={manejarCambioCorreo} />
      <ContenedorBotonesAccion>
        <BotonAccion onClick={volver}>Regresar al comercio</BotonAccion>
        <BotonAccion onClick={irAlBanco}>Ir al Banco</BotonAccion>
      </ContenedorBotonesAccion>
    </Contenedor>
  )
}

export default PaginaPrincipal
