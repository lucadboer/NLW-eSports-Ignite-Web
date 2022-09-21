interface GameCardProps {
  cardUrl: string;
  title: string;
  adsCount: number;
}

export function GameCard(props: GameCardProps) {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={props.cardUrl} alt="" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white">{props.title}</strong>
        <span className="text-zinc-400 text-sm block">
          {props.adsCount} anúncio(s)
        </span>
      </div>
    </a>
  );
}
