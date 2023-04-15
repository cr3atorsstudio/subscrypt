import Head from "next/head";
import MyPage from "@/components/MyPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>My page | SubsCrypt</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyPage />
    </>
  );
}
