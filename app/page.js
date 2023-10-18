"use client"
import Image from 'next/image'
// import { getServerSession } from "next-auth/next"
// import { authOptions } from './api/auth/[...nextauth]/route'
import { useSession } from 'next-auth/react'
export default  function Home(){
  const {data}=useSession()
  
  return (
   <main>
{JSON.stringify(data)}
   </main>
  )
}
