import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Cases } from "@/components/Cases";
import { Process } from "@/components/Process";
import { Stack } from "@/components/Stack";
import { FAQ } from "@/components/FAQ";
import { Guarantees } from "@/components/Guarantees";
import { ContactBlock } from "@/components/ContactBlock";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Cases />
      <Guarantees />
      <Process />
      <Stack />
      <FAQ />
      <ContactBlock />
    </>
  );
}
