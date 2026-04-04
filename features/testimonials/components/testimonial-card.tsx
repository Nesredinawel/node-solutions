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
    <div className="flex h-full flex-col">
      <div className="relative flex min-h-[250px] flex-1 flex-col overflow-visible rounded-[20px] border border-white/7 bg-[#171717] shadow-[0_14px_30px_rgba(0,0,0,0.26)] sm:min-h-[270px] sm:rounded-[22px] md:min-h-[300px] md:rounded-[24px]">
        <div className="absolute inset-0 rounded-[20px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.025),transparent_32%)] sm:rounded-[22px] md:rounded-[24px]" />

        <div className="relative flex h-full flex-col px-4 pb-5 pt-5 sm:px-5 sm:pb-6 sm:pt-6 md:px-6 md:pb-7 md:pt-7">
          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-xl border border-white/7 bg-white/[0.02] text-white sm:h-[42px] sm:w-[42px] md:h-[46px] md:w-[46px] md:rounded-2xl">
            <Twitter size={15} fill="currentColor" className="sm:size-[16px] md:size-[17px]" />
          </div>

          <div className="mt-5 flex-1">
            <p className="max-w-[96%] text-[11px] font-normal leading-[1.75] tracking-[-0.003em] text-white/90 sm:text-[12px] md:text-[13px] lg:text-[14px]">
              {quote}
            </p>
          </div>

          <div className="mt-5 h-px w-full bg-white/8" />
        </div>

        <div className="absolute -bottom-[10px] left-5 h-5 w-5 rotate-45 border-b border-r border-white/7 bg-[#171717] sm:-bottom-[11px] sm:left-6 sm:h-5 sm:w-5 md:-bottom-[12px] md:h-6 md:w-6" />
      </div>

      <div className="mt-6 flex min-h-[60px] items-center gap-3 pl-1 sm:mt-7 sm:min-h-[64px] md:gap-4">
        <div
          className="h-[40px] w-[40px] shrink-0 rounded-full bg-cover bg-center ring-1 ring-white/10 sm:h-[44px] sm:w-[44px] md:h-[50px] md:w-[50px]"
          style={{ backgroundImage: `url('${avatar}')` }}
        />

        <div className="min-w-0">
          <h4 className="truncate text-[13px] font-medium text-white sm:text-[14px] md:text-[15px]">
            {name}
          </h4>
          <p className="mt-0.5 truncate text-[10px] text-white/40 sm:text-[11px] md:text-[12px]">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}