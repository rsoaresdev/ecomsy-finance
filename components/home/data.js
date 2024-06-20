import benefitOneImg from "@/public/hero-1.png";
import benefitTwoImg from "@/public/hero-2.png";

import {
  AreaChart,
  ArrowUpRight,
  BookCheck,
  FileLineChart,
  Landmark,
  Newspaper,
  ShieldCheck,
} from "lucide-react";

const benefitOne = {
  image: benefitOneImg,
  bullets: [
    {
      title: "Registo de transações",
      desc: "Crie transações financeiras manualmente de forma simples!",
      icon: <Newspaper />,
    },
    {
      title: "Importação de transações por CSV",
      desc: "Pode importar as suas transações através de um CSV exportado pela sua instituição financeira.",
      icon: <FileLineChart />,
    },
    {
      title: "Conexão direta com a conta bancária",
      desc: "Conecte a sua conta bancária ao Ecomsy para poder visualizar as suas transações em tempo real.",
      icon: <Landmark />,
    },
  ],
};

const benefitTwo = {
  image: benefitTwoImg,
  bullets: [
    {
      title: "Categorize as suas compras",
      desc: "Categorize e organize as suas transações como quiser.",
      icon: <BookCheck />,
    },
    {
      title: "Visualização gráfica",
      desc: "Pode visualizar as suas transações e despesas através dos vários gráficos.",
      icon: <AreaChart />,
    },
    {
      title: "Construido com segurança",
      desc: "Toda a plataforma foi desenvolvida visando a segurança dos utilizadores.",
      icon: <ShieldCheck />,
    },
    {
      title: "E muito mais...",
      desc: "Além de todas estas funcionalidades, continuamos a fornecer atualizações de forma a melhorar cada vez mais os nossos serviços.",
      icon: <ArrowUpRight />,
    },
  ],
};

export { benefitOne, benefitTwo };
