import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | MSM Painting Studio",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-admin="true" className="relative min-h-screen bg-[#040410]">
      {children}
    </div>
  );
}
