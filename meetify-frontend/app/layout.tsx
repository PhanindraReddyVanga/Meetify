import "./globals.css";

export const metadata = {
  title: "Meetify",
  description: "Meetify scheduling app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
