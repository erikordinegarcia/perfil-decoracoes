import './globals.css';

export const metadata = {
  title: 'Clínica Belle Âme | Estética Facial Premium',
  description: 'Harmonização facial premium com abordagem personalizada e resultados elegantes.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
