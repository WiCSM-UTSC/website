import Image from "next/image";

export default function MainSection() {
  const photos = ["/photo1.png", "/photo2.png", "/photo3.png"];

  return (
    <section className="w-full bg-white dark:bg-zinc-900 py-20 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10">

        {/* Left Text Section */}
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h1 className="text-5xl font-bold text-purple-700 dark:text-purple-400">
            WiCSM
          </h1>

          <p className="text-xl text-zinc-700 dark:text-zinc-300">
            UTSC
          </p>

          <p className="max-w-md text-zinc-600 dark:text-zinc-400">
            Motto, saying Motto, saying Motto, saying Motto, saying
          </p>
        </div>

        {/* Image Section */}
        <div className="relative w-72 h-72">
          <Image
            src={photos[0]}
            alt="WiCSM images"
            fill
            className="object-contain"
          />
        </div>

      </div>
    </section>
  );
}
