import React from "react";

const stats = [
  {
    value: "100%",
    label: "In-house & independent",
  },
  {
    value: "3",
    label: "Years crafting digital experiences",
  },
  {
    value: "2+",
    label: "Awards and Certifications from Instititions",
  },
];

const AboutInitiater = () => {
  return (
    <section className="w-full bg-[#efefe8] px-4 py-14 md:px-8 md:py-24 lg:px-12">
      <div className="mx-auto w-full max-w-[1760px]">
        <h2 className="max-w-7xl text-[clamp(2.75rem,8.8vw,9.2rem)] font-black leading-[0.9] tracking-[-0.02em] text-[#071f06]">
          Great work for
          <br />
          great people.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-8 xl:mt-20 xl:grid-cols-12 xl:gap-10">
          <div className="xl:col-span-5">
            <div className="max-w-[720px] space-y-7 text-2xl font-semibold leading-tight text-[#1b2e1d]">
              <p>
                We put people first, understanding that a well-crafted product
                significantly impacts the lives of those who use it. By
                empowering users, we&apos;re able to solve unique problems,
                accelerate progress and unlock potential for our clients.
              </p>
              <p>
                Our independent spirit drives our creative energy and approach
                to technology, allowing us to ensure quality and consistently
                deliver outstanding outcomes.
              </p>
            </div>
            {/* <div className="rounded-full bg-gray-950 text-emerald-500">
              About Us 
            </div> */}

            <div className="mt-9 rounded-[1.9rem] bg-[#efefe8] p-3 md:mt-12 md:p-4 xl:hidden">
              <img
                src="/team/team.png"
                alt="Team collaboration"
                className="h-[420px] w-full rounded-[1.6rem] object-cover object-center md:h-[560px]"
              />
            </div>

         <div className="mt-8 border-t border-[#d8d8ce] md:mt-80">
  {stats.map((item, idx) => (
    <div
      key={item.value}
      className={`grid grid-cols-[auto,1fr] gap-3 border-b border-[#d8d8ce] py-4 md:gap-6 md:py-6 ${
        idx === 0 ? "pt-5 md:pt-6" : ""
      }`}
    >
      <p className="min-w-12 text-4xl font-black leading-tight tracking-[0.01em] text-[#071f06]">
        {item.value}
        <p className="max-w-[20ch] text-[clamp(1.1rem,1.6vw,2rem)] font-semibold text-[#1b2e1d] leading-tight">
        {item.label}
      </p>
      </p>

      
    </div>
  ))}
</div>

          </div>

          <div className="hidden xl:col-span-7 xl:block">
            <div className="sticky top-10 overflow-hidden rounded-[2.1rem]">
              <img
                src="/team/team.png"
                alt="Team collaboration"
                className="h-[1080px] w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInitiater;