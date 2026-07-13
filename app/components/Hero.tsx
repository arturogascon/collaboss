import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";

type SongCardData = {
  title: string;
  artist: string;
  emoji: string;
  tag: string;
  gradientFrom: string;
  gradientTo: string;
  tagBg: string;
  tagText: string;
  avatarInitial: string;
  avatarColor: string;
};

const songs: SongCardData[] = [
  {
    title: "Don't Stop Believin'",
    artist: "Journey",
    emoji: "🎤",
    tag: "Rock",
    gradientFrom: "#FFA8A0",
    gradientTo: "#FF6B6B",
    tagBg: "#FF6B6B1F",
    tagText: "#E4483F",
    avatarInitial: "J",
    avatarColor: "#6C63FF",
  },
  {
    title: "Mr. Brightside",
    artist: "The Killers",
    emoji: "🕺",
    tag: "Rock",
    gradientFrom: "#FFDD8A",
    gradientTo: "#FFC94D",
    tagBg: "#FFC94D1F",
    tagText: "#B8860B",
    avatarInitial: "M",
    avatarColor: "#D9A02E",
  },
  {
    title: "Africa",
    artist: "Toto",
    emoji: "🎸",
    tag: "Classic",
    gradientFrom: "#8FEDE0",
    gradientTo: "#53D8C8",
    tagBg: "#53D8C81F",
    tagText: "#0E9488",
    avatarInitial: "T",
    avatarColor: "#53D8C8",
  },
];

const desktopSongs: SongCardData[] = [
  {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    emoji: "🎤",
    tag: "Rock",
    gradientFrom: "#FFA8A0",
    gradientTo: "#FF6B6B",
    tagBg: "#FF6B6B1F",
    tagText: "#E4483F",
    avatarInitial: "J",
    avatarColor: "#6C63FF",
  },
  {
    title: "Flowers",
    artist: "Miley Cyrus",
    emoji: "🎶",
    tag: "Pop",
    gradientFrom: "#FFA8A0",
    gradientTo: "#FF6B6B",
    tagBg: "#FF6B6B1F",
    tagText: "#E4483F",
    avatarInitial: "K",
    avatarColor: "#FF6B6B",
  },
  {
    title: "Despacito",
    artist: "Luis Fonsi ft. Daddy Yankee",
    emoji: "🎸",
    tag: "Pop",
    gradientFrom: "#8FEDE0",
    gradientTo: "#53D8C8",
    tagBg: "#53D8C81F",
    tagText: "#0E9488",
    avatarInitial: "T",
    avatarColor: "#53D8C8",
  },
  {
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    emoji: "🕺",
    tag: "Pop",
    gradientFrom: "#9D96FF",
    gradientTo: "#6C63FF",
    tagBg: "#6C63FF1F",
    tagText: "#6C63FF",
    avatarInitial: "M",
    avatarColor: "#D9A02E",
  },
];

const collaborators = [
  { initial: "A", color: "#FF6B6B" },
  { initial: "M", color: "#53D8C8" },
  { initial: "J", color: "#D9A02E" },
];

function Avatar({
  initial,
  color,
  className = "",
}: {
  initial: string;
  color: string;
  className?: string;
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full border-2 border-white font-heading font-bold text-white ${className}`}
      style={{ backgroundColor: color }}
    >
      {initial}
    </div>
  );
}

function AvatarStack({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex -space-x-2 md:-space-x-2.5">
        {collaborators.map((c) => (
          <Avatar
            key={c.initial}
            initial={c.initial}
            color={c.color}
            className="h-[26px] w-[26px] text-[11px] md:h-8 md:w-8 md:text-[13px] lg:h-[30px] lg:w-[30px]"
          />
        ))}
      </div>
      <FaCrown className="relative -ml-1 -translate-y-2 rotate-[-20deg] text-[14px] text-brand-gold md:-translate-y-2.5 md:text-[17px] lg:text-[16px]" />
    </div>
  );
}

function SongCard({
  song,
  className = "",
}: {
  song: SongCardData;
  className?: string;
}) {
  return (
    <div
      className={`flex shrink-0 flex-col gap-1.5 rounded-2xl border-2 border-brand-outline bg-white p-3.5 shadow-lg md:gap-2 md:rounded-[18px] md:p-4 lg:rounded-2xl lg:p-3.5 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-[10px] border-[1.5px] border-brand-outline text-base md:h-9 md:w-9 md:rounded-[11px]"
          style={{
            backgroundImage: `linear-gradient(135deg, ${song.gradientFrom}, ${song.gradientTo})`,
          }}
        >
          {song.emoji}
        </div>
        <span
          className="rounded-full px-2 py-0.5 font-body text-[10px] font-semibold md:px-2.5 md:py-1 md:text-[11px] lg:px-[9px] lg:py-[3px] lg:text-[10px]"
          style={{ backgroundColor: song.tagBg, color: song.tagText }}
        >
          {song.tag}
        </span>
      </div>
      <p className="font-heading text-[15px] font-bold leading-snug text-brand-ink md:text-base">
        {song.title}
      </p>
      <p className="font-body text-[11px] font-medium text-brand-ink-faint md:text-xs">
        {song.artist}
      </p>
      <Avatar
        initial={song.avatarInitial}
        color={song.avatarColor}
        className="h-[22px] w-[22px] text-[9px] md:h-6 md:w-6 md:text-[11px] lg:text-[10px]"
      />
    </div>
  );
}

function CTAButtons() {
  return (
    <div className="flex flex-wrap items-center gap-4 md:gap-5 lg:gap-6">
      <Link
        href="/signup"
        className="flex items-center gap-2 rounded-bl-[28px] rounded-br-[8px] rounded-tl-[8px] rounded-tr-[28px] border-2 border-brand-outline bg-gradient-to-br from-brand-purple to-brand-purple-dark px-7 py-4 font-heading text-base font-semibold text-white shadow-lg shadow-brand-purple/25"
      >
        Get Started
        <FiArrowRight size={18} />
      </Link>
      <Link
        href="#"
        className="flex items-center gap-1.5 font-heading text-base font-semibold text-brand-purple underline hidden"
      >
        See Example
        <FiPlay size={16} />
      </Link>
    </div>
  );
}

function BackdropCard() {
  return (
    <div className="flex w-[300px] flex-col rounded-[28px] border-[2.5px] border-brand-outline bg-white p-[18px] shadow-xl md:w-[600px] md:rounded-[32px] md:border-[3px] md:p-7 lg:w-full lg:max-w-[500px]">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold text-brand-ink md:text-2xl lg:text-[22px]">
          Karaoke Night 🎤
        </h3>
        <AvatarStack />
      </div>
      <div className="flex items-center justify-center py-3">
        <div className="relative h-[143px] w-[210px] md:h-[259px] md:w-[380px]">
          <Image
            src="/collaboss-logo.png"
            alt="Collaboss mascot"
            fill
            priority
            sizes="(min-width: 1024px) 500px, (min-width: 768px) 380px, 210px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="bg-brand-canvas">
      <div className="flex flex-col lg:mx-auto lg:max-w-[1440px] lg:flex-row lg:justify-between lg:gap-16 lg:px-[100px] lg:py-20">
        <div className="flex flex-col items-start gap-4 px-6 pb-2 pt-4 md:gap-6 md:px-14 md:pb-4 md:pt-8 lg:w-[460px] lg:shrink-0 lg:gap-8 lg:px-0 lg:py-0">
          <div className="flex flex-col gap-1 md:gap-1.5 lg:gap-2">
            <p className="font-heading text-[22px] font-semibold text-brand-ink-soft md:text-[32px] lg:text-[40px]">
              Plan anything
            </p>
            <p className="font-heading text-[58px] font-extrabold leading-none text-brand-ink md:text-[84px] lg:text-[80px]">
              together.
            </p>
          </div>

          <p className="font-body text-[15px] leading-relaxed text-brand-ink-soft md:w-[480px] md:text-[18px] lg:hidden">
            Create a dashboard in seconds, no account needed for anyone else to
            join in.
          </p>
          <p className="hidden font-body text-[17px] leading-relaxed text-brand-ink-soft lg:block lg:w-[420px]">
            Create a dashboard in seconds. No account needed for anyone else to
            join in.
          </p>

          <CTAButtons />
        </div>

        <div className="flex min-w-0 flex-col items-center pb-10 pt-8 md:pb-14 md:pt-10 lg:flex-1 lg:py-0 lg:relative">
          <BackdropCard />

          <div className="-mt-10 flex flex-wrap items-start justify-center gap-5 md:-mt-16 md:gap-8 lg:hidden">
            <SongCard song={songs[0]} className="w-[155px] md:w-[210px]" />
            <div className="hidden md:mt-6 md:block md:w-[200px]">
              <SongCard song={songs[2]} className="w-full" />
            </div>
            <SongCard
              song={songs[1]}
              className="mt-6 w-[157px] md:mt-2 md:w-[200px]"
            />
          </div>

          <div className="hidden absolute top-20 inset-x-0 items-start justify-between gap-6 lg:flex">
            <SongCard
              song={desktopSongs[0]}
              className="absolute top-0 -left-10 w-[190px]"
            />
            <SongCard
              song={desktopSongs[1]}
              className="absolute top-52 -left-8 w-[220px]"
            />
            <SongCard
              song={desktopSongs[2]}
              className="absolute top-4 -right-6 w-[190px]"
            />
            <SongCard
              song={desktopSongs[3]}
              className="absolute top-56 -right-2 w-[190px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
