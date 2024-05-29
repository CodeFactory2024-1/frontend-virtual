"use client";
import ButtonSession from 'components/ui/ButtonSession';
import Link from 'next/link';
import React from 'react'
import FlightSearch from './components/FlightSearch';
import Footer from '../components/ui/Footer'
import Navbar from '../components/ui/Navbar';



export default function page() {
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar>
        <Link href="/">Gestión de Roles</Link>
        <Link href="/">Gestión de Vuelos</Link>
        <ButtonSession path="/auth/login" content="Iniciar Sesión" />
                  
            </Navbar>
            <div className="mb-10">
            <FlightSearch />
            </div>
      

      <div className="footerr">
      <Footer>
          <span>Copyright © Singapur Airlines 2024</span>
      </Footer>
      </div>
      

    </div>


  )
}
