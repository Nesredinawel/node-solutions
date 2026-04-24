"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/shared/components/common/logo";
import { NAV_LINKS } from "@/shared/constants/nav-links";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { getFooter } from "@/app/api/strapi/api";

export function Footer() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getFooter().then((res) => {
      console.log("footer data:", res);
      setData(res);
    });
  }, []);

  return (
    <footer className="border-t border-border bg-[var(--background-soft)]">
      <div className="container-main py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Logo />

          <nav className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            {NAV_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-muted-foreground">
            <Link 
              href={data?.facebook || "#"} 
              className="hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook size={18} />
            </Link>
            <Link 
              href={data?.twitter || "#"} 
              className="hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={18} />
            </Link>
            <Link 
              href={data?.linkedin || "#"} 
              className="hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={18} />
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1 md:flex-row md:gap-6">
            <span>{data?.email || "hello@nodesolution.com"}</span>
            <span>{data?.phone || "+1 555 123 2323"}</span>
            <span>{data?.address || "New York, USA"}</span>
          </div>
          <p>© {new Date().getFullYear()} nod solution. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}