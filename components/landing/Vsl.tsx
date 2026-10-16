"use client";

import { useRef, useState } from "react";
import type { NicheVideo } from "@/lib/niches";
import { trackLanding } from "@/lib/analytics";
import { IconPlay, IconPlus } from "@/components/ui/icons";

type VslProps = {
  page: string;
  title: string;
  video?: NicheVideo;
  transcript: string[];
};

const MILESTONES = [25, 50, 75];

/**
 * Niche VSL. Never autoplays: a poster with a play button loads the video only
 * when the visitor asks for it (privacy-friendly and keeps the page light).
 * YouTube uses the youtube-nocookie domain; files use native controls with
 * WebVTT captions. A full transcript is always available below the player,
 * and doubles as the fallback when no video is set or it fails to load.
 */
export function Vsl({ page, title, video, transcript }: VslProps) {
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const reached = useRef(new Set<number>());

  function start() {
    setActive(true);
    trackLanding("video_play", page, { provider: video?.provider ?? "none" });
  }

  function onTimeUpdate(e: React.SyntheticEvent<HTMLVideoElement>) {
    const el = e.currentTarget;
    if (!el.duration) return;
    const pct = (el.currentTime / el.duration) * 100;
    for (const m of MILESTONES) {
      if (pct >= m && !reached.current.has(m)) {
        reached.current.add(m);
        trackLanding("video_progress", page, { percent: m });
      }
    }
  }

  const unavailable = !video || failed;

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-ink-border bg-ink shadow-[0_30px_80px_-40px_rgba(15,15,15,0.6)]">
        {unavailable ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <span
              aria-hidden
              className="flex h-14 w-14 items-center justify-center rounded-full border border-on-ink/25 text-on-ink/60"
            >
              <IconPlay className="ml-0.5 h-5 w-5" />
            </span>
            <p className="font-display text-xl text-on-ink sm:text-2xl">
              {failed ? "The video couldn’t be loaded." : "Video coming soon."}
            </p>
            <p className="max-w-sm text-sm leading-6 text-on-ink-muted">
              The full message is available in the transcript below.
            </p>
          </div>
        ) : active && video.provider === "youtube" ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&cc_load_policy=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : active && video.provider === "file" ? (
          <video
            className="absolute inset-0 h-full w-full bg-ink"
            src={video.src}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            preload="metadata"
            onTimeUpdate={onTimeUpdate}
            onEnded={() => trackLanding("video_complete", page)}
            onError={() => setFailed(true)}
          >
            {video.captions && (
              <track
                kind="captions"
                src={video.captions}
                srcLang="en"
                label="English"
                default
              />
            )}
          </video>
        ) : (
          <button
            type="button"
            onClick={start}
            className="group absolute inset-0 flex items-center justify-center focus-visible:outline-none"
            aria-label={`Play video: ${title}`}
          >
            {video.poster && (
              // eslint-disable-next-line @next/next/no-img-element -- poster may be any approved host
              <img
                src={video.poster}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-80"
              />
            )}
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink shadow-lg transition-transform duration-300 group-hover:scale-105 group-focus-visible:ring-4 group-focus-visible:ring-gold/50">
              <IconPlay className="ml-1 h-6 w-6" />
            </span>
          </button>
        )}
      </div>

      <details
        className="group mt-4 rounded-2xl border border-border bg-surface"
        onToggle={(e) => {
          if ((e.currentTarget as HTMLDetailsElement).open) {
            trackLanding("transcript_open", page);
          }
        }}
      >
        <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl px-5 py-4 text-sm font-medium text-foreground">
          Read the transcript
          <IconPlus className="h-4 w-4 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45" />
        </summary>
        <div className="space-y-4 border-t border-border px-5 py-5 text-sm leading-7 text-muted">
          {transcript.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </details>
    </div>
  );
}
