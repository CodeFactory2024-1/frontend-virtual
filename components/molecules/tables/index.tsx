export function Tabla() {
  return (
    <tr>
      <td>Hola, soy tu primera celda.</td>
      <td>Soy tu segunda celda.</td>
      <td>Soy tu tercera celda.</td>
      <td>Soy tu cuarta celda.</td>
    </tr>
  )
}

export function TableRow({ text1, text2 }: { text1: string; text2: string }) {
  return (
    <div className="mb-2 flex justify-between">
      <p className="text-base text-black">{text1}</p>
      <p className="text-base text-black">{text2}</p>
    </div>
  )
}

export function TableRowBold({ text1, text2 }: { text1: string; text2: string }) {
  return (
    <div className="mb-2 flex justify-between">
      <p className="text-base font-bold" style={{ color: "#2196F3" }}>
        {text1}
      </p>
      <p className="text-base font-bold text-black">{text2}</p>
    </div>
  )
}
