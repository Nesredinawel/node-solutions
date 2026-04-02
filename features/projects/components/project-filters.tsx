type ProjectFiltersProps = {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
};

export function ProjectFilters({
  categories,
  activeCategory,
  onChange,
}: ProjectFiltersProps) {
  return (
    <section className="border-x border-b border-border bg-[var(--background-soft)] px-4 py-5 md:px-6">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onChange(category)}
              className={`rounded-md border px-4 py-2 text-sm transition ${
                isActive
                  ? "border-primary bg-primary text-[var(--color-primary-foreground)]"
                  : "border-border bg-card text-foreground hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
}