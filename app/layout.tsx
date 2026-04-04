import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/shared/providers/theme-provider";
import { BackgroundPattern } from "@/shared/components/common/background-pattern";

export const metadata: Metadata = {
  title: "Node Solution",
  description: "Building brands, spaces, and digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative min-h-screen  text-foreground">
        <ThemeProvider>
          {/* Root background pattern */}
          <BackgroundPattern
            variant="dots"
            className="z-0 opacity-70"
          />

          {/* Optional background enhancement */}
          <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.02),transparent_30%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.015),transparent_30%)]" />

          {/* App content */}
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}