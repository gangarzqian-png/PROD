"use client";
import Link from "next/link";
import { useState } from "react";

export default function MePage() {
  const [name, setName] = useState("Prod ユーザー");
  const [bio, setBio] = useState("音楽を愛しています。");
  const [notify, setNotify] = useState(true);

  const crews = [
    { id: "crew-1", name: "管理クルー", role: "管理人" },
    { id: "crew-2", name: "イベント運営", role: "副管理人" },
    { id: "crew-3", name: "友達クルー", role: "メンバー" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
      <div className="space-y-4">
        <div className="card p-4 space-y-3">
          <h2 className="text-gradient font-semibold">プロフィール</h2>
          <input className="input p-2" value={name} onChange={(e) => setName(e.target.value)} />
          <textarea className="input p-2 h-24" value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <div className="card p-4 space-y-2">
          <h3 className="font-semibold">参加しているクルー</h3>
          {crews.map((c) => (
            <Link key={c.id} href={`/crews/${c.id}`} className={`block p-2 rounded-md ${c.role === "管理人" ? "bg-purple-500/10" : c.role === "副管理人" ? "bg-orange-500/10" : "bg-white/5"}`}>
              <div className="flex items-center justify-between">
                <span>{c.name}</span>
                <span className="text-xs text-white/70">{c.role}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <aside className="space-y-4">
        <div className="card p-4 space-y-2">
          <h3 className="font-semibold">通知/お知らせ</h3>
          <div className="text-sm text-white/80">@メッセージ、@DM はここに表示</div>
        </div>
        <div className="card p-4 space-y-3">
          <h3 className="font-semibold">設定</h3>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} /> 通知を有効にする
          </label>
          <button className="btn px-3 py-1.5 text-sm">ログアウト</button>
          <div className="pt-2 text-sm text-white/70">
            <Link href="/legal/terms" className="hover:underline">利用規約</Link> ・ <Link href="/legal/privacy" className="hover:underline">プライバシーポリシー</Link>
          </div>
        </div>
      </aside>
    </div>
  );
}