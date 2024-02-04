import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

type Props = {}

export default function Layout({}: Props) {
  return (
   <main className="p-3 max-w-[50rem] mx-auto my-0 ">
    <Toaster/>
    <Header/>
    <Outlet/>
   </main>
  )
}