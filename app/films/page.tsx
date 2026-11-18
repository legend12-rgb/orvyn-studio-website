import Split from "@/components/Split";
import FilmsGrid from "@/components/FilmsGrid";
import TransitionLink from "@/components/TransitionLink";
import { Close } from "@/components/blocks";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Films: Hypermotion Reels, UGC and Product Films",
  description: "Short-form films by Orvyn for Coloressence, Doubleshot and more: hypermotion reels, creator-style UGC and cinematic product films built for Reels and ads.",
  path: "/films",
  kicker: "Films",
});

export default function FilmsPage() {
  return (
    <>
      <header className="phead wrap">
        <h1><Split text="Films" /><span className="count">(05)</span></h1>
        <p className="lead" data-fade>Hypermotion reels, creator-style UGC and product films, made for the first three seconds of a scroll. Hover or tap to play.</p>
      </header>
      <div className="wrap"><FilmsGrid /></div>
      <div className="wrap" style={{ paddingTop: 40 }}><p className="soft">Want one for your product? See the <TransitionLink href="/services/films">films service</TransitionLink>.</p></div>
      <Close />
    </>
  );
}
