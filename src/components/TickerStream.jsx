const TICKER_DATA = [
  { sym: "$ANSON", val: "SE", chg: "+100.0%", up: true },
  { sym: "$EXP", val: "4 YRS", chg: "+15.2%", up: true },
  { sym: "$PROJ", val: "05", chg: "+02", up: true },
  { sym: "$INTERN", val: "05", chg: "+01", up: true },
  { sym: "$STACK", val: "10+", chg: "+03", up: true },
  { sym: "$LOC", val: "50K+", chg: "+8.2%", up: true },
  { sym: "$DEG", val: "B.ASc", chg: "UW", up: true },
  { sym: "$GEO", val: "YYZ", chg: "TORONTO", up: true },
  { sym: "$STATUS", val: "OPEN", chg: "BULLISH", up: true },
  { sym: "$BREWS", val: "∞", chg: "+1", up: true },
];

function TickerItem({ item }) {
  return (
    <span className="inline-flex items-center gap-2 px-5 py-1 text-xs font-mono whitespace-nowrap">
      <span className="text-frosted/80">{item.sym}</span>
      <span className="text-frosted font-semibold">{item.val}</span>
      <span className={item.up ? "text-bull" : "text-bear"}>
        {item.up ? "▲" : "▼"} {item.chg}
      </span>
      <span className="text-steel ml-2">|</span>
    </span>
  );
}

export default function TickerStream() {
  const items = [...TICKER_DATA, ...TICKER_DATA];
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-steel bg-obsidian/95 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-bull/10 border-r border-steel px-3 py-1.5">
          <span className="text-[10px] font-mono font-bold text-bull tracking-widest">LIVE</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex animate-marquee">
            <div className="flex">
              {items.map((item, i) => <TickerItem key={i} item={item} />)}
            </div>
            <div className="flex" aria-hidden="true">
              {items.map((item, i) => <TickerItem key={`d-${i}`} item={item} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}