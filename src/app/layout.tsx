import type { ReactNode } from "react";
import "./globals.css";
import Link from "next/link";
import QueryProvider from "@/components/QueryProvider";
import Guard from "@/components/Guard";
import { LocalOrdersProvider } from '@/context/LocalOrdersContext'; 

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <QueryProvider>
          <LocalOrdersProvider>

          <header className="border-b border-gray-200 dark:border-gray-800">
            <div className="container py-4 flex items-center gap-6">
              <Link href="/" className="font-semibold text-lg">
                Visionyze
              </Link>
              <nav className="flex gap-4 text-sm">
                <Link href="/products">Produits</Link>
                <Link href="/orders">Orders</Link>
                <Link href="/metrics">Métriques</Link>
                <Link href="/cart">cart
                <span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 mx-1 text-xs font-medium text-red-400 inset-ring inset-ring-red-400/20">New</span>

                </Link>

              </nav>
              <div className="ml-auto text-xs opacity-70">DummyJSON</div>
            </div>
          </header>
          <main className="container py-6">
            <Guard>{children}</Guard>
          </main>
          </LocalOrdersProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
