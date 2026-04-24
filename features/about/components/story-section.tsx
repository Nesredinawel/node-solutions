"use client";

import { storyItems } from "../data/about.data";
import { StoryCard } from "./story-card";
import { useEffect, useState } from "react";
import { getStories } from "@/app/api/strapi/api";

export function StorySection() {
  const [stories, setStories] = useState<any[]>(storyItems);

  useEffect(() => {
    getStories().then((res) => {
      console.log("stories data:", res);
      if (Array.isArray(res) && res.length > 0) {
        setStories(res);
      }
    });
  }, []);

  return (
    <section className="container-main pb-14 md:pb-20">
      <div className="border border-border">
        <div className="border-b border-border px-6 py-10 md:px-8 md:py-12">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Our Story
          </h2>
        </div>

        <div className="grid md:grid-cols-2">
          {stories.map((item, index) => (
            <div
              key={item.id || index}
              className={`
                ${index % 2 === 0 ? "md:border-r md:border-border" : ""}
                ${index < stories.length - 2 ? "border-b border-border" : ""}
              `}
            >
              <StoryCard
                number={String(index + 1).padStart(2, "0")}
                title={item.title}
                description={item.description || item.content}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}