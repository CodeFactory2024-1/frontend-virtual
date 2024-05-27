import { Metadata } from "next"
//import Badge from "components/atoms/badge";
//import {Buttom, Menu} from "components/atoms/buttoms";
import { Button } from "components/Button/Button"
//import {Card} from "components/molecules/cards";
import { LP_GRID_ITEMS } from "lp-items"

/**export function Home() {
  return (
    <div className="bg-white h-screen flex justify-center items-center">
      <Menu />
      <Buttom />
      <Buttom />
      <Buttom />
      <Buttom />
      
      <Card icon= "M8.5 11.5H10v-6H7V7h1.5zm3.5 0h4.5V8h-3V7h3V5.5H12V9h3v1h-3zm-6 7h1.5V14h1v3H10v-3h1v4.5h1.5v-6H6zm7.5 0H15V17h3v-4.5h-4.5zm1.5-3V14h1.5v1.5zM3 21V3h18v18z"
        title="Online Banking"
        text="Our modern web and mobile applications allow you to keep track of your finances wherever you are in the world."/>
        
        <Card icon= "M8.5 11.5H10v-6H7V7h1.5zm4.75 0H15l1.45-4.7V5.5H12V7h2.6zM6 18.5h1.5V14h1v3H10v-3h1v4.5h1.5v-6H6zm7.5 0H15V17h3v-4.5h-4.5zm1.5-3V14h1.5v1.5zM3 21V3h18v18z"
        title="Simple Budgeting"
        text="See exactly where your money goes each month. Receive notifications when you’re close to your hitting limits."/>
        
    </div>
  );
}**/

export const metadata: Metadata = {
  title: "Next.js Enterprise Boilerplate",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://next-enterprise.vercel.app/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png",
      },
    ],
  },
}

export default function Web() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
              Next.js Enterprise Boilerplate
            </h1>
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              Jumpstart your enterprise project with our feature-packed, high-performance Next.js boilerplate!
              Experience rapid UI development, AI-powered code reviews, and an extensive suite of tools for a smooth and
              enjoyable development process.
            </p>
            <Button href="https://github.com/Blazity/next-enterprise" className="mr-3">
              Get started
            </Button>
            <Button
              href="https://vercel.com/new/git/external?repository-url=https://github.com/Blazity/next-enterprise"
              intent="secondary"
            >
              Deploy Now
            </Button>
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
          <div className="justify-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
            {LP_GRID_ITEMS.map((singleItem) => (
              <div key={singleItem.title} className="flex flex-col items-center justify-center text-center">
                <div className="lg:size-12 mb-4 flex items-center justify-center rounded-full bg-primary-100 p-1.5 text-blue-700 dark:bg-primary-900">
                  {singleItem.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">{singleItem.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{singleItem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
