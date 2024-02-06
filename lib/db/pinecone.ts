import {Pinecone} from "@pinecone-database/pinecone"
const apiKey =process.env.PINECONE_API_KEY

if(!apiKey){
    throw Error("PINECONE_API_KEI is not set")
}

const pinecone =new Pinecone({
    environment:"gcp-starter",
    apiKey:"03120cc0-2f5f-4017-93b4-a14640738416"
} as any)

export const notesIndex = pinecone.Index("chatbot")
   
