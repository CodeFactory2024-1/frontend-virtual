export function Text({ title }: { title: string }) {
  return <h1 className="text-secondary text-center text-4xl font-light">{title}</h1>
}

export function SubTitle({ title }: { title: string }) {
  return <h2 className="text-secondary text-center text-2xl font-light">{title}</h2>
}

export function CardTitle({ title }: { title: string }) {
  return <h3 className="text-secondary text-center text-xl font-light">{title}</h3>
}

export function CardTitle2({ title }: { title: string }) {
  return (
    <h3 className="mb-2 text-lg font-bold" style={{ color: "#2196F3" }}>
      {title}
    </h3>
  )
}

export function SmallTitle({ title }: { title: string }) {
  return <h4 className="text-secondary text-center text-xs font-light">{title}</h4>
}

export function Paragraph({ text }: { text: string }) {
  return <p className="text-tertiary text-center font-light sm:text-justify">{text}</p>
}
