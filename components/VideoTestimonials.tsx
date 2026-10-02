"use client";

import { useEffect, useRef, useState } from "react";
import { videos, type VideoTestimonial } from "@/data/videos";
import { lockScroll } from "./SmoothScroll";

/* Video testimonials. Motion is asked for, never assumed:
   - mouse: rest on a card ~450ms and a muted preview plays (MP4 only)
   - click / tap / Enter: the video opens in a player with sound
   Nothing loads from YouTube until a video is opened. */
export function VideoTestimonials() {
  const [open, setOpen] = useState<VideoTestimonial | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    lockScroll(!!open);
  }, [open]);

  if (!videos.length) return null;

  return (
    <section className="section videos" aria-labelledby="videos-title" data-depth="x">
      <div className="wrap">
        <div className="split-head">
          <div style={{ display: "grid", gap: 16 }}>
            <p className="eyebrow">Video testimonials</p>
            <h2 id="videos-title" className="h2">In their <em>words.</em></h2>
          </div>
          <p className="lead">What planners, brands and couples say after the mic goes down.</p>
        </div>
        <ul className="videos__grid">
          {videos.map((v, i) => (
            <li key={i}>
              <VideoCard video={v} onOpen={() => setOpen(v)} />
            </li>
          ))}
        </ul>
      </div>

      <dialog ref={dialog} className="player" onClose={() => setOpen(null)} aria-label={open ? `${open.name} video` : "Video"}>
        {open && (
          <div className="player__inner">
            <button type="button" className="player__close" onClick={() => setOpen(null)} aria-label="Close video">
              <span aria-hidden="true">×</span>
            </button>
            {open.youtube ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${open.youtube}?autoplay=1&rel=0&modestbranding=1`}
                title={`${open.name} — video testimonial`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : open.file ? (
              <video src={open.file} poster={`${open.poster}-1600.webp`} controls autoPlay playsInline />
            ) : (
              <div className="player__empty">
                <p className="h4">This is a sample slot.</p>
                <p>Add a YouTube id or an MP4 for this card in <code>data/videos.ts</code> and it will play here.</p>
              </div>
            )}
          </div>
        )}
      </dialog>
    </section>
  );
}

function VideoCard({ video, onOpen }: { video: VideoTestimonial; onOpen: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const timer = useRef<number>(0);

  function start(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !video.file) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = window.setTimeout(() => ref.current?.play().catch(() => {}), 450);
  }
  function stop(e: React.PointerEvent) {
    if (e.pointerType === "touch") return;
    clearTimeout(timer.current);
    const v = ref.current;
    if (v) { v.pause(); v.currentTime = 0; }
  }

  return (
    <button type="button" className="vcard" onClick={onOpen} onPointerEnter={start} onPointerLeave={stop}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${video.poster}-800.webp`} alt="" loading="lazy" decoding="async" />
      {video.file && <video ref={ref} src={video.file} muted loop playsInline preload="none" aria-hidden="true" />}
      <span className="vcard__shade" aria-hidden="true" />
      {video.sample && <span className="vcard__sample">Sample</span>}
      <span className="vcard__play" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" /></svg>
      </span>
      <span className="vcard__text">
        {video.quote && <span className="vcard__quote">&ldquo;{video.quote}&rdquo;</span>}
        <span className="vcard__name">{video.name}</span>
        {video.role && <span className="vcard__role">{video.role}</span>}
      </span>
      <span className="visually-hidden">Play video</span>
    </button>
  );
}
