'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import AddEditNoteDialogue from '@/components/AddEditNoteDialog'
import { ThemeToggleButton } from '@/components/ThemeToggleButton'
import AichatButton from '@/components/AiChatButton'
export function NavBar() {

    const[showAddEditNoteDialog,setShowAddEditNoteDialog] =useState(false)
  return (

    <>
    <div className='p-4 shadow'>
      <div className='max-w-7xl m-auto flex flex-wrap gap-3 itemms-center justify-between'>
       <Link href="/notes" className='flex items-center gap-1'>
        <Image
         src="https://tse4.mm.bing.net/th?id=OIP.FPKzzZ-WXvcYoVGVJza76AHaEK&pid=Api&P=0&h=220"
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
        <ThemeToggleButton/>
        <Button onClick={()=>setShowAddEditNoteDialog(true)}>
            <Plus size={20} className='mr-2'/>
            Add Note
        </Button>
        <AichatButton/>
       </div>
      </div>
    </div>

    <AddEditNoteDialogue open={showAddEditNoteDialog} setOpen={setShowAddEditNoteDialog}/>
    </>
  )
}
