import '@/app/globals.css';
// Removed Header and Navbar imports

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 container mx-auto">
        {/* Removed Header and Navbar from here */}
        <main className="w-full mx-auto mt-6">
          {children}
        </main>
      </body>
    </html>
  );
}