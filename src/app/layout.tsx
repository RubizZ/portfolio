// Root layout — html/body are handled by app/[lang]/layout.tsx
// This wrapper is required by the App Router file convention.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as React.ReactElement;
}
