import { benefitOne, benefitTwo } from "@/components/home/data";
import { Hero } from "@/components/home/Hero";
import { Navbar } from "@/components/home/Navbar";
import { Container } from "@/components/home/Container";
import { Benefits } from "@/components/home/Benefits";
import { Faq } from "@/components/home/Faq";
import { SectionTitle } from "@/components/home/SectionTitle";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute -z-40 inset-0 w-full h-screen bg-gradient-to-b from-blue-200 to-white"></div>
      <Container>
        <Navbar />
        <Hero />

        <SectionTitle preTitle="Vantagens do Ecomsy" title="Porquê o Ecomsy?">
          Ecomsy é uma plataforma de código-aberto com objetivo de descomplicar
          a gestão do dinheiro pela sua gestão prática, simples e automatizada.
        </SectionTitle>

        <Benefits data={benefitOne} />
        <Benefits imgPos="right" data={benefitTwo} />

        <SectionTitle
          preTitle="Testemunhos"
          title="O que os nossos clientes disseram"
        ></SectionTitle>

        <Testimonials />

        <SectionTitle preTitle="FAQ" title="Perguntas Frequentes">
          É normal ter dúvidas - estamos aqui para ajudar!
        </SectionTitle>

        <Faq />
      </Container>
    </div>
  );
}
