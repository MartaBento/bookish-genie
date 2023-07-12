function SiteFooter() {
  return (
    <div className="text-center text-xs text-gray-400">
      <p>
        Made by{" "}
        <a
          href="https://www.linkedin.com/in/marta-bento"
          target="_blank"
          rel="noopener noreferrer"
          className="tw-animate-pulse"
        >
          Marta
        </a>
        . Created in 2023.
      </p>
      <p className="mx-12 my-4">
        Disclaimer: BookishGenie is an AI-powered book recommendation system
        generated using OpenAI&apos;s GPT-3.5 language model. The
        recommendations provided are based on available data up until 2021 and
        should be used only as suggestions. Please note that any data or input
        you provide may be processed and stored by OpenAI. All images are AI
        generated.
      </p>
    </div>
  );
}

export default SiteFooter;
