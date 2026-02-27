"use client";

export default function Hero() {
  return (
    <div className="relative justify-center items-center">
      <section className="max-w-(--breakpoint-xl) mx-auto px-4 py-10 gap-12 md:px-8 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center max-w-4xl mx-auto text-center"
        >
          <span className="w-fit h-full text-sm bg-card px-2 py-1 border border-border rounded-full">
            Welcome to eChama!
          </span>
          <h1 className="text-4xl font-medium tracking-tighter mx-auto md:text-6xl text-pretty bg-linear-to-b from-sky-800 dark:from-sky-100 to-foreground dark:to-foreground bg-clip-text text-transparent">
            Join the  digital sacco management platform. Go paperless
          </h1>
          <p className="max-w-2xl text-lg mx-auto text-muted-foreground text-balance">
            Onboard your chama or join one.
          </p>
        </div>
      </section>
      <div
        className="w-full h-full absolute -top-32 flex justify-end items-center pointer-events-none "
      >
        <div className="w-3/4 flex justify-center items-center">
          <div className="w-12 h-[600px] bg-light blur-[70px] rounded-3xl max-sm:rotate-15 sm:rotate-35 will-change-transform"></div>
        </div>
      </div>
    </div>
  );
}
