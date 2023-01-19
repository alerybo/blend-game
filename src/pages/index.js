import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";



import Timer from "@/components/timer/Timer";
import Game from "@/components/game/Game";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>blend</title>
        <meta name="blend" content="color match game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section className={styles.section}>
          <header className={styles.header}>
            <h1 className={styles.title}>Blend.</h1>
          </header>
          <div className={styles.container}>
            <Game />
          </div>
        </section>
      </main>
    </>
  );
}
