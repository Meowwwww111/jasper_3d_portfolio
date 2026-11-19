import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, CSSProperties } from "react";

type ProjectVideoProps = {
  src: string;
  poster: string;
  title: string;
  reducedMotion: boolean;
};

const speeds = [1, 1.5, 2];

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "0:00";
  const seconds = Math.floor(value);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export default function ProjectVideo({ src, poster, title, reducedMotion }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(6);
  const [speedIndex, setSpeedIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) {
      video.pause();
      setPlaying(false);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        video.pause();
        return;
      }
      if (!pausedByUser.current) void video.play().catch(() => setPlaying(false));
    }, { threshold: 0.28 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByUser.current = false;
      void video.play().catch(() => setPlaying(false));
    } else {
      pausedByUser.current = true;
      video.pause();
    }
  };

  const changeSpeed = () => {
    const nextIndex = (speedIndex + 1) % speeds.length;
    setSpeedIndex(nextIndex);
    if (videoRef.current) videoRef.current.playbackRate = speeds[nextIndex];
  };

  const seek = (event: ChangeEvent<HTMLInputElement>) => {
    const nextTime = Number(event.target.value);
    if (videoRef.current) videoRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return <figure className="motion-media">
    <div className="motion-stage">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 6)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
      />
      <span className="motion-label">CONCEPT MOTION · {title}</span>
      <span className="motion-rec" aria-hidden="true"><i /> LIVE VISUAL</span>
    </div>
    <div className="video-controls" aria-label={`${title} motion preview controls`}>
      <button type="button" className="play-toggle" onClick={togglePlayback} aria-label={`${playing ? "Pause" : "Play"} ${title} preview`}>
        <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
      </button>
      <input
        type="range"
        min={0}
        max={duration || 6}
        step={0.01}
        value={Math.min(currentTime, duration || 6)}
        style={{ "--video-progress": `${duration ? (currentTime / duration) * 100 : 0}%` } as CSSProperties}
        onChange={seek}
        aria-label={`${title} preview position`}
      />
      <span className="video-time" aria-live="off">{formatTime(currentTime)} / {formatTime(duration)}</span>
      <button type="button" className="speed-toggle" onClick={changeSpeed} aria-label={`${title} playback speed, ${speeds[speedIndex]} times`}>
        {speeds[speedIndex]}×
      </button>
    </div>
    <figcaption className="motion-caption">Original animated illustration · not recorded project footage</figcaption>
  </figure>;
}
