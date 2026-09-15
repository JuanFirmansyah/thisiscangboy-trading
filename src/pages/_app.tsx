// src/pages/_app.tsx
import { AppProps } from 'next/app'; // Import AppProps
import '../pages/globals.css'; // Pastikan path ini benar

function MyApp({ Component, pageProps }: AppProps) { // Gunakan AppProps di sini
  return <Component {...pageProps} />;
}

export default MyApp;