import { assets } from "@/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface Hero {
  title: string;
  description: string;
  buttonsData: { url: string; name: string }[];
}

export const Hero: React.FC<Hero> = ({ title, description, buttonsData }) => {
  const [button1, button2] = buttonsData;

  return (
    <section className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div className="mr-auto place-self-center lg:col-span-7">
        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
          {title}
        </h1>
        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          {description}
        </p>
        <div className="md:text-left text-center">
          <Link href={button1.url}>
            <Button className="me-2" variant={"ghost"}>
              {button1.name}
            </Button>
          </Link>
          <Link href={button2.url}>
            <Button>{button2.name}</Button>
          </Link>
        </div>
      </div>
      <div className=" lg:mt-0 lg:col-span-5 lg:flex">
        <Image
          className="mx-auto object-contain"
          src={assets.main.hero}
          alt={"Hero image"}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};
