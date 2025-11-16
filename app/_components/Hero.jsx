import React from 'react'

function Hero() {
  return (
    <div>

        <section className="bg-[#DAD7CD] lg:grid lg:h-screen lg:place-content-center">
        <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:h-screen lg:items-center">
            <div className="mx-auto max-w-prose text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                Create your forms in
                <strong className="text-primary"> seconds </strong>
                with
                <strong className="text-primary"> FormIQ </strong>
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, nisi. Natus,
                provident accusamus impedit minima harum corporis iusto.
            </p>

            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
                <a
                href="#"
                className="inline-block rounded border border-primary bg-primary px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-primary"
                >
                + Create Form
                </a>

                <a
                href="#"
                className="inline-block rounded border border-[#A3B18A] px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-[#A3B18A] hover:text-gray-900"
                >
                Learn More
                </a>
            </div>
            </div>
        </div>
        </section>
    </div>
  )
}

export default Hero
