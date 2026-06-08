import type { Metadata } from "next";
import "./globals.css";
import "@khriztianmoreno/speaker-kit/styles.css";

export const metadata: Metadata = {
  title: "Workshop MCP Chrome Devtools",
  description:
    "A live-coding workshop on AI agent orchestration, Chrome DevTools MCP, and rapid prototyping under pressure.",
  metadataBase: new URL("http://localhost:3000"),
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="font-sans">
        <div className="grid-pattern mask-bottom pointer-events-none fixed inset-x-0 top-0 -z-10 h-[640px] opacity-50" />
        {children}
      </body>
    </html>
  );
}
