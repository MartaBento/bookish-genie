import Wizard from "@/components/wizard/wizard";

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Discover your next literary adventure with BookishGenie,
          <br className="hidden sm:inline" />
          your trusted AI companion in the world of books. 📚
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Overwhelmed by the amount of books out there? Me too. Simply share
          your reading preferences, and let BookishGenie ✨ do its magic,
          recommending captivating books tailored to your taste. Start here! 👇🏻
        </p>
      </div>
      <div>
        <Wizard />
      </div>
    </section>
  );
}
