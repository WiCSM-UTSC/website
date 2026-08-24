import type { Route } from "./+types/about-us";
import { ExecCard } from "../components/exec-card";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { createSupabaseServerClient } from "../utils/supabase.server";

interface Executive {
  bio: string | null;
  id: number | string;
  image_url: string | null;
  name: string;
  order_index: number | null;
  role: string;
}

interface ExecResponse {
  execs: Executive[];
  success: boolean;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us | WiCSM UTSC" },
    {
      name: "description",
      content: "Learn more about WiCSM and its executive team.",
    },
  ];
}

export async function loader() {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.functions.invoke<ExecResponse>(
      "exec",
      {
        method: "GET",
      },
    );

    if (error) {
      console.error("Unable to load the executive team:", error.message);
      return { executives: [] as Executive[] };
    }

    const executives = [...(data?.execs ?? [])].sort(
      (first, second) =>
        (first.order_index ?? Number.MAX_SAFE_INTEGER) -
        (second.order_index ?? Number.MAX_SAFE_INTEGER),
    );

    return { executives };
  } catch (error) {
    console.error("Unable to configure Supabase:", error);
    return { executives: [] as Executive[] };
  }
}

export default function AboutUs({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <main className="min-h-589.75 bg-[linear-gradient(180deg,#f7f3fb_15.385%,#b1b0f2_48.558%,#f9f6ff_83.173%,#fff_100%)] px-[clamp(16px,8vw,108px)] pt-[clamp(20px,5vw,44px)] pb-32 text-[#513c97]">
        <Navbar />
        <div className="mx-auto max-w-248.25">
          <section
            className="pt-18 text-center"
            aria-labelledby="about-wicsm-heading"
          >
            <h1
              className="m-0 text-6xl font-bold leading-9 tracking-[-0.96px]"
              id="about-wicsm-heading"
            >
              About WiCSM
            </h1>
            <h2 className="mt-10 mb-0 text-5xl font-bold leading-9 tracking-[-0.72px]">
              wicsm is so awesome
            </h2>
            <p className="mt-8 mb-0 text-[32px] font-medium text-[#815dbb]">
              everyone should join wicsm this is what we’ve done so far
            </p>
          </section>
          <section
            className="pt-134 text-center"
            aria-labelledby="executive-team-heading"
          >
            <h2
              className="m-0 text-6xl font-bold leading-9 tracking-[-0.96px]"
              id="executive-team-heading"
            >
              Executive Team
            </h2>
            <p className="mt-5 mb-0 text-[32px] font-bold leading-9 tracking-[-0.48px]">
              Meet the amazing people @ WiCSM!
            </p>
            <h3 className="mt-15 mb-10 text-[32px] font-black leading-7.5 tracking-[-0.48px]">
              PRESIDENTS / MARKETING / OPERATIONS ETC..
            </h3>
            <div className="grid grid-cols-3 justify-items-center gap-24 max-[1100px]:grid-cols-2 max-[720px]:grid-cols-1">
              {loaderData.executives.map((executive) => (
                <ExecCard
                  imageUrl={executive.image_url}
                  intro={executive.bio ?? "More details coming soon."}
                  key={executive.id}
                  name={executive.name}
                  position={executive.role}
                />
              ))}
            </div>
            {loaderData.executives.length === 0 && (
              <p className="mt-12 text-lg font-semibold">
                Executive team details are coming soon.
              </p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
