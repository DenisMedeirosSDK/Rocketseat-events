interface GameBannerProps {
  title: string;
  bannerUrl: string;
  adsCount: number;
}

export function GameBanner({ title, bannerUrl, adsCount }: GameBannerProps) {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt="" />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute left-0 right-0 bottom-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm block">
          {adsCount} anúncio(s)
        </span>
      </div>
    </a>
  );
}
