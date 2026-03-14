export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <title>Keystatic Admin</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
