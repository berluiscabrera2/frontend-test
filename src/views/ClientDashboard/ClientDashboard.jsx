import React from 'react'
import ClientHeader from '../../components/ClientHeader/ClientHeader'
import ClientTable from '../../components/ClientTable/ClientTable'
import './ClientDashboard.scss'

const ClientDashboard = () => {
  return (
    <>
        <ClientHeader />
        <ClientTable />
    </>
  )
}

export default ClientDashboard