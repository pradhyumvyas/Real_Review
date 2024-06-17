"use client"

import Link  from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import React from 'react'
import {User} from 'next-auth';
import { Button } from '../ui/button';

const Navbar = () => {

   const {data:session} = useSession();
   const user = session?.user as User;


  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
         <a href = '/' className="text-xl font-bold mb-4 md:mb-0">Real Review</a>
         {
            session ? (
               <>
               <span>Welcom, {user?.username || user?.email}</span>
               <Button className="w-full md:w-auto bg-slate-100 text-black" variant='outline' onClick={()=>signOut()}>Logout</Button>
               </>
            ):(
               <Link href = '/sign-in'>
                  <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Sign In</Button>
               </Link>
            )
         }
      </div>
    </nav>
  )
}

export default Navbar