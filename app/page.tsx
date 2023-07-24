import Head from "next/head";

import Wizard from "@/components/wizard/wizard";

export default function IndexPage() {
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="bE7jzA9Gqg2XRKYgFu4PVZXJU27BnH0YYzJdB3LLRps"
        />
      </Head>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Discover your next literary adventure with BookishGenie, your
            trusted AI companion in the world of books.{" "}
            <span role="img" aria-label="Book">
              📚
            </span>
          </h2>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Overwhelmed by the amount of books out there? Me too. Simply share
            your reading preferences, and let BookishGenie do its magic,
            recommending captivating books tailored to your taste.
          </p>
        </div>
        <Wizard />
      </section>
    </>
  );
}
