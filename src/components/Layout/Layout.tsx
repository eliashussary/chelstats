import Head from "next/head";
import { Navbar } from "./Navbar";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>CHEL STATS</title>
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
