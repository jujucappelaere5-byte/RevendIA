export const metadata = {
  title: "RevendIA",
  description: "Vends tes objets plus vite et plus cher, sans écrire une seule annonce.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#F5F8FA", color: "#0B1F3A" }}>
        {children}
      </body>
    </html>
  );
}
