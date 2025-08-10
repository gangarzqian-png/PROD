"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

const BAD_WORDS = ["死ね", "殺す", "差別", "暴力"];

function sanitize(input: string) {
  let v = input.slice(0, 200);
  for (const w of BAD_WORDS) {
    v = v.replaceAll(w, "※");
  }
  return v;
}

export default function CrewChatPage() {
  const params = useParams<{ id: string }>();
  const [messages, setMessages] = useState<{ id: string; user: string; text: string }[]>([]);
  const [draft, setDraft] = useState("");

  const send = () => {
    const text = sanitize(draft.trim());
    if (!text) return;
    setMessages([...messages, { id: `${Date.now()}`, user: "@me", text }]);
    setDraft("");
  };

  const highlighted = (t: string) => {
    const parts = t.split(/(@[A-Za-z0-9_]+)/g);
    return parts.map((p, i) =>
      p.startsWith("@") ? (
        <span key={i} className="text-accent-orange">{p}</span>
      ) : (
        <span key={i}>{p}</span>
      )
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
      <div className="card p-4 min-h-[50vh] flex flex-col">
        <h2 className="text-gradient font-semibold mb-3">クルーチャット: {params.id}</h2>
        <div className="flex-1 space-y-2 overflow-y-auto pr-1">
          {messages.length === 0 && (
            <p className="text-white/60 text-sm">まだメッセージはありません。はじめての一言をどうぞ。</p>
          )}
          {messages.map((m) => (
            <div key={m.id} className="bg-white/5 rounded-md p-2">
              <div className="text-xs text-white/60">{m.user}</div>
              <div className="mt-1 break-words">{highlighted(m.text)}</div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <textarea value={draft} onChange={(e) => setDraft(e.target.value.slice(0, 200))} className="input w-full h-24 p-3 resize-none" placeholder="メッセージ (200文字)"></textarea>
          <div className="flex items-center justify-between mt-2 text-xs text-white/60">
            <div>{draft.length}/200 不適切な表現は自動的にマスクされます</div>
            <button onClick={send} className="btn px-3 py-1.5 text-sm">送信</button>
          </div>
        </div>
      </div>

      <aside className="space-y-3">
        <div className="card p-4">
          <p className="text-sm text-white/80">生配信: グループのみ発言可、全ユーザー視聴可。挙手/オファーで参加可能。少しエコーの演出。</p>
          <div className="mt-2 flex gap-2">
            <button className="btn px-3 py-1.5 text-sm">生配信を開始</button>
            <button className="btn px-3 py-1.5 text-sm">招待</button>
          </div>
        </div>
        <div className="card p-4 text-sm text-white/70">
          <p>管理パネル(デモ): 設定変更/説明変更/参加者追放、副管理人の投票で管理人の交代など。</p>
        </div>
      </aside>
    </div>
  );
}