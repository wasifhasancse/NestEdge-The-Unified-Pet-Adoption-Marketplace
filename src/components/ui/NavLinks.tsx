import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinksProps {
  children: React.ReactNode;
  href: string;
}

const NavLinks: React.FC<NavLinksProps> = ({ children, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="block">
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<{ isActive?: boolean }>, { isActive })
        : children}
    </Link>
  );
};

export default NavLinks;
