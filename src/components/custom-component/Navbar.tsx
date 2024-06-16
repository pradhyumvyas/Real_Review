"use client"

import { Link } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import React from 'react'
import {User} from 'next-auth';
import { Button } from '../ui/button';

const Navbar = () => {

   const {data:session} = useSession();
   const user = session?.user as User;


  return (
    <nav className='p-4 shadow-md'>
      <div >
         <a href = '#'>Real Review</a>
         {
            session ? (
               <>
               <span>Welcom, {user?.username || user?.email}</span>
               <Button onClick={()=>signOut()}>Logout</Button>
               </>
            ):(
               <Link href = '/sign-in'>
                  <Button>Sign In</Button>
               </Link>
            )
         }
      </div>
    </nav>
  )
}

export default Navbar