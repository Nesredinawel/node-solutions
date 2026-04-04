import { Header } from "@/shared/components/layout/header";
import { Footer } from "@/shared/components/layout/footer";
import { BackgroundPattern } from "@/shared/components/common/background-pattern";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Global Background Pattern */}
      <BackgroundPattern variant="grid" className="fixed inset-0 z-0 opacity-70" />

      {/* Optional soft overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.02),transparent_35%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.015),transparent_35%)]" />

      {/* Main content */}
      <div className="relative z-10">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}