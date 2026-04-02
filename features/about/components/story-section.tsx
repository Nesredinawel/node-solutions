import { storyItems } from "../data/about.data";
import { StoryCard } from "./story-card";

export function StorySection() {
  return (
    <section className="container-main pb-14 md:pb-20">
      <div className="border border-border">
        <div className="border-b border-border px-6 py-10 md:px-8 md:py-12">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Our Story
          </h2>
        </div>

        <div className="grid md:grid-cols-2">
          {storyItems.map((item, index) => (
            <div
              key={item.number}
              className={`
                ${index % 2 === 0 ? "md:border-r md:border-border" : ""}
                ${index < storyItems.length - 2 ? "border-b border-border" : ""}
              `}
            >
              <StoryCard
                number={item.number}
                title={item.title}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}