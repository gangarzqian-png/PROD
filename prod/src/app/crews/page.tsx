"use client";
import { useState } from "react";
import { PlusCircle } from "lucide-react";

const CATEGORIES = ["音源", "バトル", "ビートメイカー", "ラッパー", "語り", "遊び"] as const;

type Category = (typeof CATEGORIES)[number];

export default function CrewsPage() {
  const [crews, setCrews] = useState(
    Array.from({ length: 6 }).map((_, i) => ({
      id: `crew-${i + 1}`,
      name: `クルー ${i + 1}`,
      category: CATEGORIES[i % CATEGORIES.length] as Category,
      members: 5 + i * 2,
      description: "音楽好きが集まる場所",
    }))
  );
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("音源");
  const [description, setDescription] = useState("");

  const create = () => {
    const n = name.trim();
    if (!n) return;
    setCrews([{ id: `crew-${Date.now()}`, name: n, category, members: 1, description }, ...crews]);
    setName("");
    setDescription("");
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Category;
    setCategory(value);
  };

  return (
    <div className="space-y-6">
      <div className="card p-4 space-y-3">
        <h2 className="text-gradient font-semibold">クルーの作成</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <input className="input p-2" placeholder="クルー名" value={name} onChange={(e) => setName(e.target.value)} />
          <select className="input p-2" value={category} onChange={handleCategory}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <button onClick={create} className="btn px-3 py-2 flex items-center justify-center gap-2"><PlusCircle className="h-4 w-4" />作成</button>
        </div>
        <textarea className="input p-2 h-20" placeholder="グループ説明" value={description} onChange={(e) => setDescription(e.target.value)} />
        <p className="text-xs text-white/60">作成者は管理人です。副管理人の指定/設定変更/追放などの管理が可能です。</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {crews.map((c) => (
          <a key={c.id} href={`/crews/${c.id}`} className="card p-4 block hover:bg-white/5 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-xs text-white/60 mt-1">{c.category} ・ {c.members}人</p>
              </div>
              <span className="text-xs text-white/50">チャットへ</span>
            </div>
            <p className="text-sm text-white/80 mt-2 line-clamp-2">{c.description}</p>
          </a>
        ))}
      </div>

      <div className="card p-4 text-sm text-white/75 space-y-2">
        <p>管理者と副管理者の権限:</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>管理人: 設定/説明変更、参加者の追放</li>
          <li>副管理人: 管理人呼び出し通知、参加者の返信停止コマンド (管理人/副管理人の追放は不可)</li>
          <li>副管理人の過半数(2名以上の同意)で管理人を追放可能。未投票は無効。</li>
        </ul>
      </div>
    </div>
  );
}