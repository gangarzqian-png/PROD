"use client";
import { useState } from "react";
import { Youtube, Instagram, Music2, Radio, MessageSquareText } from "lucide-react";

const ROLES = [
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
] as const;

const RECRUIT_CATS = ["客演募集", "LIVE出演募集", "バトル募集", "サイファー募集"] as const;

export default function MeetPage() {
  const [tab, setTab] = useState<"role" | "recruit">("role");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setTab("role")} className={`px-3 py-1.5 rounded-md border ${tab === "role" ? "bg-white/10" : "bg-transparent"}`}>役職</button>
        <button onClick={() => setTab("recruit")} className={`px-3 py-1.5 rounded-md border ${tab === "recruit" ? "bg-white/10" : "bg-transparent"}`}>募集</button>
      </div>

      {tab === "role" ? (
        <div className="grid md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-0 overflow-hidden">
              <div className="aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">ユーザー {i + 1}</p>
                    <p className="text-xs text-white/60">{ROLES[i % ROLES.length]}</p>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <a href="#" aria-label="SoundCloud"><Music2 className="h-5 w-5" /></a>
                    <a href="#" aria-label="X"><Radio className="h-5 w-5" /></a>
                    <a href="#" aria-label="BandLab"><MessageSquareText className="h-5 w-5" /></a>
                    <a href="#" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
                    <a href="#" aria-label="YouTube"><Youtube className="h-5 w-5" /></a>
                  </div>
                </div>
                <p className="text-sm text-white/80">自己紹介テキスト。活動内容やコラボの希望など。</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {RECRUIT_CATS.map((c) => (
              <span key={c} className="px-2 py-1 rounded-md bg-white/5 text-xs">{c}</span>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card p-4">
                <p className="font-semibold">{RECRUIT_CATS[i % RECRUIT_CATS.length]} #{i + 1}</p>
                <p className="text-sm text-white/70 mt-1">クルー・グループチャットの宣伝も可能。</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}