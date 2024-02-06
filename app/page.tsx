import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";


export default function Home() { 
  const { userId} =auth()

  if (userId) redirect("/notes")

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex items-center ggap-4">
      <Image src="https://tse4.mm.bing.net/th?id=OIP.FPKzzZ-WXvcYoVGVJza76AHaEK&pid=Api&P=0&h=220"
        alt="CHAT APP"
        width={100}
        height={100}
        />
        <span className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          ChatNote
          </span>

      </div>

      <p className=" max-w-prose text-centre">An intelligent note-taking app with AI integration, built with OpenAI,
        pinecone, Next.js, Shadcn UI, Clerk, and more.
      </p>

     <Button size="lg" asChild>
      <Link href="/notes">Open</Link>
     </Button>

    </main>
  );
}



