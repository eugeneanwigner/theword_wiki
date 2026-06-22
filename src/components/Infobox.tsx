import type { ReactNode } from 'react'

export default function Infobox({
  title,
  rows,
}: {
  title: string
  rows: { label: string; value: ReactNode }[]
}) {
  return (
    <aside className="float-right ml-4 mb-4 w-full max-w-[260px] border border-wiki-border bg-wiki-bg text-sm sm:w-64">
      <div className="wiki-heading bg-wiki-infobox px-2 py-1.5 text-center font-bold text-wiki-text">
        {title}
      </div>
      <table className="w-full">
        <tbody>
          {rows.map(({ label, value }) => (
            <tr key={label} className="border-t border-wiki-border align-top">
              <th className="w-1/3 px-2 py-1.5 text-left font-semibold text-wiki-muted">
                {label}
              </th>
              <td className="px-2 py-1.5">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  )
}
