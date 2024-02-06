'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import AddNoteDialogue from './AddEditNoteDialog'
import AichatButton from './AiChatButton'

function NavBar() {

    const[showAddEditNoteDialog,setShowAddEditNoteDialog] =useState(false)
  return (

    <>
    <div className='p-4 shadow'>
      <div className='max-w-7xl m-auto flex flex-wrap gap-3 itemms-center justify-between'>
       <Link href="/notes" className='flex items-center gap-1'>
        <Image src=""
        alt=""
        width={40}
        height={40}
        />
        <span className='font-bold'>ChatNote</span>
       </Link>
       <div className='flex items-center gap-2'>
        <UserButton
        afterSignOutUrl='/'
        appearance={{
            elements:{avatarBox:{width:"2.5rem",height:"2.5rem"}}
        }}/>

        <Button onClick={()=>setShowAddEditNoteDialog(true)}>
            <Plus size={20} className='mr-2'/>
            Add Note
        </Button>
        <AichatButton/>
       </div>
      </div>
    </div>

    <AddNoteDialogue open={showAddEditNoteDialog} setOpen={setShowAddEditNoteDialog}/>
    </>
  )
}

export default NavBar
