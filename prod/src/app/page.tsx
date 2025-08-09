"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, Users, UserCircle2, Layers3 } from "lucide-react";

const latestRecruitMock = Array.from({ length: 10 }).map((_, i) => ({
  id: `recruit-${i + 1}`,
  title: `最新の募集 #${i + 1}`,
  category: ["客演募集", "LIVE出演募集", "バトル募集", "サイファー募集"][i % 4],
  by: `@user${i + 1}`,
}));

const recommendedCrewsMock = Array.from({ length: 10 }).map((_, i) => ({
  id: `crew-${i + 1}`,
  name: `クルーグループ ${i + 1}`,
  category: ["音源", "バトル", "ビートメイカー", "ラッパー", "語り", "遊び"][i % 6],
  members: 10 + i * 3,
}));

const recommendedAccountsMock = Array.from({ length: 10 }).map((_, i) => ({
  id: `account-${i + 1}`,
  name: `ユーザー ${i + 1}`,
  role: [
    "ビートメイカー",
    "DJ",
    "ラッパー",
    "ジャケット作成",
    "MV撮影【カメラマン】",
    "MV撮影【動画編集】",
    "レコーディング",
    "レコーディング【スタジオ】",
    "コーチング",
    "相談",
  ][i % 10],
}));

export default function Home() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) {
      return {
        latest: latestRecruitMock,
        crews: recommendedCrewsMock,
        accounts: recommendedAccountsMock,
      };
    }
    const f = (t: string) => t.toLowerCase().includes(q.toLowerCase());
    return {
      latest: latestRecruitMock.filter(
        (r) => f(r.title) || f(r.category) || f(r.by)
      ),
      crews: recommendedCrewsMock.filter(
        (c) => f(c.name) || f(c.category)
      ),
      accounts: recommendedAccountsMock.filter(
        (a) => f(a.name) || f(a.role)
      ),
    };
  }, [query]);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="relative h-8 w-24 sm:h-10 sm:w-28">
          <Image src="/prod-logo.png" alt="Prod" fill className="object-contain" />
        </div>
        <div className="ml-auto w-full sm:w-2/3 md:w-1/2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="検索: 募集/クルー/アカウント"
            className="input w-full py-2.5 pl-10 pr-3 text-sm"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Section title="最新の募集要項" icon={<Layers3 className="h-4 w-4" />}>
          {filtered.latest.map((r) => (
            <Link
              key={r.id}
              href={`/recruits/${r.id}`}
              className="card p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div>
                <p className="font-medium">{r.title}</p>
                <p className="text-xs text-white/60 mt-1">{r.category} ・ {r.by}</p>
              </div>
              <span className="text-xs text-white/50">詳細</span>
            </Link>
          ))}
        </Section>

        <Section title="おすすめのクルーグループ" icon={<Users className="h-4 w-4" />}>
          {filtered.crews.map((c) => (
            <Link
              key={c.id}
              href={`/crews/${c.id}`}
              className="card p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-xs text-white/60 mt-1">{c.category} ・ {c.members}人</p>
              </div>
              <span className="text-xs text-white/50">詳細</span>
            </Link>
          ))}
        </Section>

        <Section title="おすすめのアカウント" icon={<UserCircle2 className="h-4 w-4" />}>
          {filtered.accounts.map((a) => (
            <Link
              key={a.id}
              href={`/users/${a.id}`}
              className="card p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div>
                <p className="font-medium">{a.name}</p>
                <p className="text-xs text-white/60 mt-1">{a.role}</p>
              </div>
              <span className="text-xs text-white/50">詳細</span>
            </Link>
          ))}
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-gradient font-semibold">{title}</span>
        <span className="text-white/70">{icon}</span>
      </div>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
