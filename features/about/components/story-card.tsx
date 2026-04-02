type StoryCardProps = {
  number: string;
  title: string;
  description: string;
};

export function StoryCard({
  number,
  title,
  description,
}: StoryCardProps) {
  return (
    <article className="border border-border bg-[var(--background-soft)] p-6 shadow-card transition duration-300 hover:border-primary/40 md:p-8">
      <div className="flex items-end gap-4 border-b border-border pb-6">
        <span className="text-6xl font-semibold leading-none text-primary/90 md:text-7xl">
          {number}
        </span>
        <h3 className="pb-1 text-2xl font-medium text-primary">{title}</h3>
      </div>

      <p className="mt-6 text-sm leading-8 text-muted-foreground md:text-base">
        {description}
      </p>
    </article>
  );
}