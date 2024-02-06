import { CreateNoteSchema, createNoteSchema } from "@/lib/validation/note"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Dialog,DialogContent,DialogTitle } from "@radix-ui/react-dialog"
import { DialogFooter, DialogHeader } from "./ui/dialog"
import { Form, FormField, FormLabel,FormItem,FormControl } from "./ui/form"
import { Textarea } from "./ui/textarea"
import LoadingButton from "./ui/loadin-button"
import { useRouter } from "next/navigation"
import { Note } from "@prisma/client"
import { useState } from "react"

interface AddEditNoteDialogueProps{
    open:boolean,
    setOpen:(open:boolean)=> void
    notetoEdit?:Note
}

export default function AddEditNoteDialogue({
    open,
    setOpen,
    notetoEdit
}:AddEditNoteDialogueProps){
    const [deleteInProgress,setdeleteInProgess]=useState(false)
    const router =useRouter()
    const form =useForm<CreateNoteSchema>({
        resolver:zodResolver(createNoteSchema),
        defaultValues:{
            title:notetoEdit?.title || " ",
            content:notetoEdit?.content ||" "
        }
    })

    async function onSubmit(input:CreateNoteSchema){
        try {

            if(notetoEdit){
                  const response =await fetch("/api/notes",{
                    method:"PUT",
                    body:JSON.stringify({
                        id:notetoEdit.id,
                        ...input
                    })
                  })
                  if(!response.ok) throw Error("Status code" + response.status)
                
            }else{
                const response =await fetch("/api/notes",{
                    method:"POST",
                    body:JSON.stringify(input),
                })
                if(!response.ok) throw Error("Status code" + response.status)
                form.reset()

            }
           
        router.refresh()
        setOpen(false)
            
        } catch (error) {
            console.error(error)
            alert("something went wrong. Please try again")
            
        }
    }


    async function deleteNote(){
        if(!notetoEdit)return
        setdeleteInProgess(true)
        try{
          const response =await fetch("/api/notes",{
            method:"Delete",
            body:JSON.stringify({
                id:notetoEdit.id
            })
          })
          if(!response.ok) throw Error("Status code" + response.status)
          router.refresh()
          setOpen(false)     
        }catch(error){
            console.error(error)
            alert("Something went wrong. Please try again")
        } finally{
            setdeleteInProgess(false)
    }

    }
    return(
        // <div className="items-center justify-center">
        // <Dialog open={open} onOpenChange={setOpen}>
        //     <DialogContent>
        //         <div className="bg-white p-8 rounded shadow-md w-full max-w-md border border-black items-center justify-center ">
        //         <DialogHeader>
        //             <DialogTitle>{notetoEdit ? "Edit Note" :"Add Note"}</DialogTitle>
        //         </DialogHeader>




        //         <Form {...form}>

        //             <div className="bg-white p-8  w-full max-w-md   items-center justify-center">
        //             <form onSubmit={form.handleSubmit(onSubmit)} >
        //                 <FormField 
        //                 control={form.control}
        //                 name="title"
        //                 render={({field}) =>(
        //                     <FormItem>
        //                         <FormLabel className="font-extrabold">Note Title</FormLabel>
        //                         <FormControl>
        //                             <input placeholder="Note title" {...field}/>
        //                         </FormControl>
        //                     </FormItem>
        //                 )}
        //                 />
        //                     <FormField
        //                 control={form.control}
        //                 name="content"
        //                 render={({field}) =>(
        //                     <FormItem>
        //                         <FormLabel className="font-extrabold">Note Content</FormLabel>
        //                         <FormControl>
        //                             <Textarea placeholder="Note Content" {...field}/>
        //                         </FormControl>
        //                     </FormItem>
        //                 )}
        //                 />
        //                 <DialogFooter className="gap-1 sm:gap-0">
        //                     {notetoEdit && (<LoadingButton 
        //                     variant="destructive"
        //                     loading={deleteInProgress}
        //                     disabled={form.formState.isSubmitting}
        //                     onClick={deleteNote}
        //                     type="button">
        //                         Delete note
        //                     </LoadingButton>)}
        //                     <LoadingButton type="submit" loading={form.formState.isSubmitting}>
        //                         Submit
        //                     </LoadingButton>
        //                 </DialogFooter>
        //             </form>
        //             </div>
        //         </Form>

        //         </div>

        //     </DialogContent>
        // </Dialog>

        <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
      <div className="bg-white p-8 rounded shadow-md {isMobile ? 'max-w-screen-sm' : 'max-w-md'}border border-black  items-center justify-center ">
      <DialogHeader>
            <DialogTitle>{notetoEdit ? 'Edit Note' : 'Add Note'}</DialogTitle>
          </DialogHeader>
        

          <Form {...form}>
            <div className="bg-white p-8 w-full max-w-md items-center justify-center">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Your form fields go here */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-extrabold">Note Title</FormLabel>
                      <FormControl>
                        <input placeholder="Note title" {...field}/>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-extrabold">Note Content</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Note Content" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <DialogFooter className="gap-1 sm:gap-0">
                  {notetoEdit && (
                    <LoadingButton
                      variant="destructive"
                      loading={deleteInProgress}
                      disabled={form.formState.isSubmitting}
                      onClick={deleteNote}
                      type="button"
                    >
                      Delete note
                    </LoadingButton>
                  )}
                  <LoadingButton type="submit" loading={form.formState.isSubmitting} className="space-y-4">
                    Submit
                  </LoadingButton>
                </DialogFooter>
              </form>
            </div>
          </Form>
        </div>
    
      </DialogContent>
    </Dialog>
        
    )
}