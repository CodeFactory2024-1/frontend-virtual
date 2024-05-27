export function CreditCard({ title }: { title: string }) {
  return <h1 className="text-secondary text-center text-4xl font-light">{title}</h1>
}

export function DebitCard({ title }: { title: string }) {
  return <h2 className="text-secondary text-center text-2xl font-light">{title}</h2>
}

export function Pse({ title }: { title: string }) {
  return <h3 className="text-secondary text-center text-xl font-light">{title}</h3>
}
