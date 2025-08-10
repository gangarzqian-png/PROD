"use client";
import { useMemo, useState } from "react";

const CATS = ["客演募集", "LIVE出演募集", "バトル募集", "サイファー募集"] as const;

const items = Array.from({ length: 20 }).map((_, i) => ({
  id: `recruit-${i + 1}`,
  title: `${CATS[i % CATS.length]} #${i + 1}`,
  category: CATS[i % CATS.length],
  by: `@user${(i % 8) + 1}`,
}));

export default function RecruitsPage() {
  const [active, setActive] = useState<null | (typeof CATS)[number]>(null);

  const list = useMemo(() => (active ? items.filter((x) => x.category === active) : items), [active]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActive(null)} className={`px-3 py-1.5 rounded-md border ${active === null ? "bg-white/10" : "bg-transparent"}`}>すべて</button>
        {CATS.map((c) => (
          <button key={c} onClick={() => setActive(c)} className={`px-3 py-1.5 rounded-md border ${active === c ? "bg-white/10" : "bg-transparent"}`}>{c}</button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {list.map((r) => (
          <a key={r.id} href={`/recruits/${r.id}`} className="card p-4 block hover:bg-white/5 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{r.title}</p>
                <p className="text-xs text-white/60 mt-1">{r.category} ・ {r.by}</p>
              </div>
              <span className="text-xs text-white/50">応募</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}