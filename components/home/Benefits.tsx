import { cloneElement } from "react";
import Image from "next/image";

import { Container } from "@/components/home/Container";

interface BenefitsProps {
  imgPos?: "left" | "right";
  data: {
    imgPos?: "left" | "right";
    image: any;
    bullets: {
      title: string;
      desc: string;
      icon: React.ReactNode;
    }[];
  };
}
export const Benefits = (props: Readonly<BenefitsProps>) => {
  const { data } = props;
  return (
    <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap ">
      <div
        className={`flex items-center justify-center w-full lg:w-1/2 ${
          props.imgPos === "right" ? "lg:order-1" : ""
        }`}
      >
        <div>
          <Image
            src={data.image}
            width={1424}
            height={656}
            alt="Imagem landing page"
            className={"object-cover"}
          />
        </div>
      </div>

      <div
        className={`flex flex-wrap items-center w-full lg:w-1/2 ${
          data.imgPos === "right" ? "lg:justify-end" : ""
        }`}
      >
        <div className="items-center align-middle">
          {data.bullets.map((item, index) => (
            <Benefit key={index} title={item.title} icon={item.icon}>
              {item.desc}
            </Benefit>
          ))}
        </div>
      </div>
    </Container>
  );
};

function Benefit(props: any) {
  return (
    <div className="flex items-start mt-6 space-x-3">
      <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 ">
        {cloneElement(props.icon, {
          className: "w-7 h-7 text-indigo-50",
        })}
      </div>
      <div>
        <span className="text-xl font-medium text-gray-800 dark:text-gray-200">
          {props.title}
        </span>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          {props.children}
        </p>
      </div>
    </div>
  );
}
