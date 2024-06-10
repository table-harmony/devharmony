import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <div className="container flex flex-col items-center space-y-10 pb-24 pt-12 md:py-20 lg:px-20">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-balance text-center text-4xl font-bold md:text-5xl lg:text-6xl">
          {siteConfig.description}
        </h1>
      </div>
    </div>
  );
}
