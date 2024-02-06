'use client'
import React from "react";
import { Note as Notemodel } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import AddEditNoteDialogue from "./AddEditNoteDialog";

interface NoteProps {
  note: Notemodel;
}

export default function Note({ note }: NoteProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const wasUpdated = note.updatedAt > note.createdAt;

  // Use toLocaleDateString() instead of toDataString()
  const createdUpdatedAtTimestamp = (wasUpdated ? note.updatedAt : note.createdAt).toLocaleDateString();

  return (
    <>
      <Card
        className="cursor-pointer transition-shadow hover:shadow-lg"
        onClick={() => setShowEditDialog(true)}
      >
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          <CardDescription>
            {createdUpdatedAtTimestamp}
            {wasUpdated && "(updated)"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{note.content}</p>
        </CardContent>
      </Card>
      <AddEditNoteDialogue open={showEditDialog} setOpen={setShowEditDialog} notetoEdit={note} />
    </>
  );
}

// import { Note as Notemodel } from "@prisma/client"
// import {Card,CardContent,CardDescription,CardHeader,CardTitle} from "./ui/card"
// import { useState } from "react"
// import AddEditNoteDialogue from "./AddEditNoteDialog"
// interface NoteProps {
//     note:Notemodel
// }
// export default function Note({note}:NoteProps){
//     const [showEditDialog,setShowEditDialog]=useState(false)
//     const wasUpdated =note.updatedAt > note.createdAt
    
//     const createdUpdatedAtTimestamp =(
//         wasUpdated ? note.updatedAt :note.createdAt).toDataString()

//         return(
//             <>
           
//             <Card className="cursor-pointer transition-shadow hover:shadow-lg"
//             onClick={()=>setShowEditDialog}>
//                 <CardHeader>
//                 <CardTitle>{note.title}</CardTitle>
//                 <CardDescription>
//                     {createdUpdatedAtTimestamp}
//                     {wasUpdated && "(updated)"}
//                 </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <p className="whitespace-pre-line">
//                         {note.content}
//                     </p>
//                 </CardContent>
//             </Card>
//             <AddEditNoteDialogue
//             open={showEditDialog}
//             setOpen={setShowEditDialog}
//             notetoEdit={note}
//             />
//             </>
//         )
// }




