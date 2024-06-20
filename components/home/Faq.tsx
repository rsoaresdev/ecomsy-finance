"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

import { Container } from "@/components/home/Container";

export const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {data.map((item, _index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
};

const data = [
  {
    question:
      "Como o Ecomsy pode ajudar-me a gerir as minhas finanças pessoais?",
    answer:
      "O Ecomsy oferece uma interface intuitiva onde pode categorizar despesas, monitorizar receitas, definir orçamentos e acompanhar o progresso das suas metas financeiras. Tudo é feito para simplificar a gestão do seu dinheiro e ajudar-lhe a tomar decisões financeiras informadas.",
  },
  {
    question: "O Ecomsy é seguro?",
    answer:
      "Sim, a segurança dos seus dados é a nossa prioridade. Utilizamos encriptação de ponta a ponta para garantir que todas as suas informações financeiras estão protegidas. Além disso, seguimos as melhores práticas de segurança da indústria para manter os seus dados seguros.",
  },
  {
    question: "O Ecomsy é gratuito?",
    answer:
      "Apesar de existir uma versão gratuita com funcionalidades básicas, também disponibilizamos uma versão premium com funcionalidades adicionais, como gráficos avançados, conexão com conta bancária e importação por CSV.",
  },
  {
    question: "Posso sincronizar o Ecomsy com a minha conta bancária? ",
    answer:
      "Sim, o Ecomsy permite sincronizar com várias contas bancárias, o que facilita a importação automática de transações e a monitorização em tempo real do seu saldo e movimentações financeiras.",
  },
];
