import { Twitter } from "lucide-react";

type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export function TestimonialCard({
  quote,
  name,
  role,
  avatar,
}: TestimonialCardProps) {
  return (
    <div className="w-full">
      <div className="relative overflow-visible rounded-[24px] border border-white/7 bg-[#171717] shadow-[0_12px_30px_rgba(0,0,0,0.28)]">
        <div className="absolute inset-0 rounded-[24px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.025),transparent_32%)]" />

        <div className="relative px-6 pb-7 pt-7 sm:px-7 md:px-8">
          <div className="flex h-[46px] w-[46px] items-center justify-center rounded-2xl border border-white/7 bg-white/[0.02] text-white sm:h-[48px] sm:w-[48px]">
            <Twitter size={18} fill="currentColor" />
          </div>

          <p className="mt-7 max-w-[94%] text-[13px] font-medium leading-[1.65] tracking-[-0.01em] text-white sm:text-[14px] md:text-[15px]">
            {quote}
          </p>

          <div className="mt-7 h-px w-full bg-white/8" />
        </div>

        <div className="absolute -bottom-[13px] left-7 h-6 w-6 rotate-45 border-b border-r border-white/7 bg-[#171717] sm:h-7 sm:w-7" />
      </div>

      <div className="mt-8 flex items-center gap-3 pl-1 sm:gap-4">
        <div
          className="h-[50px] w-[50px] shrink-0 rounded-full bg-cover bg-center ring-1 ring-white/10 sm:h-[54px] sm:w-[54px]"
          style={{ backgroundImage: `url('${avatar}')` }}
        />

        <div className="min-w-0">
          <h4 className="truncate text-[15px] font-medium text-white sm:text-[16px]">
            {name}
          </h4>
          <p className="mt-1 truncate text-[11px] text-white/42 sm:text-[12px] md:text-[13px]">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}