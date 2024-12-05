import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <Image
          src="./wavyNode.svg "
          alt="Wavy Node Logo"
          width={40}
          height={40}
          className="dark:invert"
        />
        <span className="text-xl font-medium">Wavy Node</span>
      </div>
      <Link
        href="#"
        className="text-sm text-muted-foreground hover:text-primary"
      >
        wavynode.eth
      </Link>
    </header>
  );
}
