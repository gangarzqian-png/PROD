"use client";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ja";
import { Flag, Heart, MessageSquare, Share2 } from "lucide-react";

dayjs.extend(relativeTime);
dayjs.locale("ja");

type Post = {
  id: string;
  user: string;
  content: string;
  createdAt: string;
};

const initialPosts: Post[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `post-${i + 1}`,
  user: `@user${(i % 5) + 1}`,
  content: `サンプル投稿 ${i + 1} — これはタイムラインのデモです。#prod`,
  createdAt: dayjs().subtract(i * 7 + 2, "minute").toISOString(),
}));

export default function TimelinePage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [draft, setDraft] = useState("");

  const sorted = useMemo(
    () => posts.slice().sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()),
    [posts]
  );

  const submit = () => {
    const v = draft.trim();
    if (!v) return;
    setPosts([{ id: `post-${Date.now()}`, user: "@me", content: v, createdAt: new Date().toISOString() }, ...posts]);
    setDraft("");
  };

  const reply = (p: Post) => {
    const v = prompt("返信内容 (最新投稿として追加)")?.slice(0, 200) || "";
    if (!v) return;
    setPosts([{ id: `post-${Date.now()}`, user: "@me", content: `返信→ ${p.user}: ${v}`, createdAt: new Date().toISOString() }, ...posts]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
      <div className="space-y-3">
        <div className="card p-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value.slice(0, 200))}
            placeholder="いまどうしてる？ (200文字まで)"
            className="input w-full h-24 p-3 resize-none"
          />
          <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-white/50">{draft.length}/200</div>
            <button onClick={submit} className="btn px-3 py-1.5 text-sm">投稿</button>
          </div>
        </div>

        {sorted.map((p) => (
          <article key={p.id} className="card p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span className="font-mono">{p.user}</span>
              <time>{dayjs(p.createdAt).fromNow()}</time>
            </div>
            <p className="whitespace-pre-wrap break-words">{p.content}</p>
            <div className="flex items-center gap-4 pt-1">
              <button className="flex items-center gap-1 text-white/70 hover:text-white"><Heart className="h-4 w-4" />いいね</button>
              <button onClick={() => reply(p)} className="flex items-center gap-1 text-white/70 hover:text-white"><MessageSquare className="h-4 w-4" />返信</button>
              <button className="flex items-center gap-1 text-white/70 hover:text-white"><Flag className="h-4 w-4" />報告</button>
              <button className="ml-auto flex items-center gap-1 text-white/70 hover:text-white"><Share2 className="h-4 w-4" />共有</button>
            </div>
          </article>
        ))}
      </div>

      <aside className="space-y-3">
        <div className="card p-4">
          <p className="text-sm/6 text-white/80">クルー生配信・募集要項を共有して投稿できます。</p>
          <div className="mt-2 flex gap-2">
            <button className="btn px-3 py-1.5 text-sm">生配信を共有</button>
            <button className="btn px-3 py-1.5 text-sm">募集を共有</button>
          </div>
        </div>
      </aside>
    </div>
  );
}