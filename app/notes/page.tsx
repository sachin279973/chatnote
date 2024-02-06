// import React from 'react'
// import { Metadata } from 'next'
// import { auth } from '@clerk/nextjs'
// import prisma from '@/lib/db/prisma'
// import Note from '@/components/Note'



// export const metadata :Metadata ={
//     title:"ChatNotes -Notes",
// }

// async function page() {
  

//     const{userId} =auth()

//     if(!userId)throw Error("userId undefined")
//     // const allNotes:any[] =await prisma.note.findMany({where:{userId}})
//     const allNotes: any[] = await prisma.note.findMany({
//       where: { userId },
//     });
    
  
  
  
//     return (
//     <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
//       {allNotes.map((note)=>(
//         <Note note={note} key={note.id}/>
//       ))}

//       {allNotes.length === 0 && (
//         <div className='col-span-full text-center'>
//           {"you don't have any notes yet .Why don't you create one ?"}
//         </div>
//       )}
//     </div>
//   )
// }

// export default page


import React from 'react';
import { Metadata } from 'next';
import { auth } from '@clerk/nextjs';
import prisma from '@/lib/db/prisma';
import Note from '@/components/Note';

export const metadata: Metadata = {
  title: "ChatNotes - Notes",
};

async function page() {
  try {
    const { userId } = auth();

    if (!userId) throw new Error("userId undefined");

    const allNotes: any[] = await prisma.note.findMany({
      where: { userId },
    });

    return (
      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {allNotes.map((note) => (
          <Note note={note} key={note.id} />
        ))}

        {allNotes.length === 0 && (
          <div className='col-span-full text-center'>
            {"you don't have any notes yet. Why don't you create one?"}
          </div>
        )}
      </div>
    );
  } catch (error: any) {
    console.error("Error fetching notes:", error.message);
    // Handle the error or log additional details for troubleshooting
    throw error; // Re-throw the error to propagate it to the next error boundary
  }
}

export default page;

