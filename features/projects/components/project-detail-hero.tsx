type ProjectDetailHeroProps = {
  title: string;
};

export function ProjectDetailHero({ title }: ProjectDetailHeroProps) {
  return (
    <section className="container-main pt-16 md:pt-20">
      <div className="border-b border-border pb-8">
        <h1 className="text-2xl font-medium text-muted-foreground md:text-4xl">
          {title}
        </h1>
      </div>
    </section>
  );
}