"use client";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { shortifyDescriptions } from "@/utils/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Home = () => {
  const router = useRouter();
  async function handleFormSubmit(formData: FormData) {
    try {
      const data = {
        url: formData.get("url"),
      };

      console.log(data);

      if (data.url) {
        console.log("INside data");
        router.push("/auth");
      }
    } catch (_) {}
  }
  return (
    <main className="text-center">
      <h1 className="mt-12 text-2xl md:text-6xl tracking-tighter font-bold max-w-[70vw] mx-auto">
        The only url shorterner you will ever need! 👇
      </h1>

      <section className="w-[90vw] mx-auto md:w-[60vw]">
        <form
          action={handleFormSubmit}
          className="flex justify-between mt-8 gap-4 mx-auto items-center w-2/3"
        >
          <Input
            placeholder="Enter your long url.."
            className="rounded p-6 shadow-sm"
            type="url"
            required
            name="url"
          />
          <button className="btn btn-outline">Shorten</button>
        </form>
      </section>

      <div className="mt-12 w-[90vw] text-justify mx-auto p-3">
        {shortifyDescriptions.map((desc, index) => {
          return (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem value={desc.title}>
                <AccordionTrigger>{desc.title}</AccordionTrigger>
                <AccordionContent className="text-justify">
                  {desc.description}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>

      <footer className="text-center bottom-0 mt-12 pb-8 w-full h-fit p-4">
        made with <span className="text-red-700">❤</span> by{" "}
        <a
          className="cursor-pointer text-blue-600"
          href="mailto: ghimiresushank64@gmail.com"
        >
          sushank_ghimire
        </a>
      </footer>
    </main>
  );
};

export default Home;
