import Image from "next/image";
import { Container } from "@/components/home/Container";

import userOneImg from "@/public/img/user1.jpg";
import userTwoImg from "@/public/img/user2.jpg";
import userThreeImg from "@/public/img/user3.jpg";

export const Testimonials = () => {
  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3 mt-6 mb-10">
        <div className="lg:col-span-2 xl:col-auto">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal ">
              Antes, sentia-me sempre perdido nas minhas despesas mensais, mas
              agora consigo ver tudo de forma <Mark>clara e organizada</Mark>.
            </p>

            <Avatar
              image={userOneImg}
              name="Ana Maria"
              title="Diretora de contabilidade da Poças Vinhos"
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal ">
              Adoro a <Mark>simplicidade e a interface intuitiva</Mark> do
              Ecomsy. É fácil de usar e tem todas as funcionalidades que preciso
              para gerir as minhas finanças pessoais.
            </p>

            <Avatar
              image={userTwoImg}
              name="Miguel Fernandes"
              title="Co-fundador do Plaid Inc."
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal ">
              Antes de aderir gastava mais do que devia e não conseguia poupar.
              Agora, com os relatórios e alertas personalizados, consigo
              <Mark>manter-me no caminho certo.</Mark>
            </p>

            <Avatar
              image={userThreeImg}
              name="Diogo Araújo"
              title="Cliente desde 2021"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

interface AvatarProps {
  image: any;
  name: string;
  title: string;
}

function Avatar(props: Readonly<AvatarProps>) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <Image
          src={props.image}
          width="40"
          height="40"
          alt="Avatar"
          placeholder="blur"
        />
      </div>
      <div>
        <div className="text-lg font-medium">{props.name}</div>
        <div className="text-gray-600 dark:text-gray-400">{props.title}</div>
      </div>
    </div>
  );
}

function Mark(props: { readonly children: React.ReactNode }) {
  return (
    <>
      {" "}
      <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
        {props.children}
      </mark>{" "}
    </>
  );
}
