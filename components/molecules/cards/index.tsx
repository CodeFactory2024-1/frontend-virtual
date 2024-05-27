import Badge from "components/atoms/badge"
import { CardTitle, CardTitle2, Paragraph } from "components/atoms/text"

export function Card({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="max-w-96 sm:max-w-64 flex flex-col items-center justify-center p-2 sm:items-start">
      <div className="my-5">
        <Badge icon={icon} />
      </div>
      <div className="mb-3">
        <CardTitle title={title} />
      </div>
      <div>
        <Paragraph text={text} />
      </div>
    </div>
  )
}

export function ResumenVuelo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 rounded-lg bg-white p-6">
      <div className="mb-3">
        <CardTitle2 title={title} />
      </div>
      <div>{children}</div>
    </div>
  )
}
