export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <title>Administrador</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}