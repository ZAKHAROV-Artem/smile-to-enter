"use client";
import { useState } from "react";
import Image from "next/image";
import { SmileToEnter } from "@/components/smile-to-enter";
import { ReadAboutIt } from "../components/read-about-it";

export default function Home() {
  const [read, setRead] = useState<boolean>(false);

  return (
    <main className="relative flex h-screen w-full items-center justify-center p-2 sm:p-10">
      <Image
        className="absolute left-0 top-0 z-10"
        src="/imgs/ribbon-1.png"
        alt="Ribbon"
        width={500}
        height={200}
        quality={100}
      />
      <Image
        className="absolute right-0 top-0 z-10"
        src="/imgs/ribbon-2.png"
        alt="Ribbon"
        width={500}
        height={200}
        quality={100}
      />
      {read ? <SmileToEnter /> : <ReadAboutIt setRead={setRead} />}
    </main>
  );
}
