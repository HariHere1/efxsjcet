import { ArrowUpRight } from 'lucide-react';
import vagamonLake from '../assets/images/vagamon-lake.png';
import illickalKalluImg from '../assets/images/illickal-kallu.png';
import waterfallImg from '../assets/images/waterfall.png';
import ilaveezhapoonchiraImg from '../assets/images/ilaveezhapoonchira.png';
import aruvikkaalImg from '../assets/images/aruvikkachal.png';
import kumarakomImg from '../assets/images/kumarakom.png';
import pineForest from '../assets/images/pine-forest.jpg';

type Place = { name: string; description: string; image: string };

export function ExploreKeralaPage() {
  const places: Place[] = [
    { name: 'VAGAMON', description: 'Rolling hills & adventure', image: pineForest },
    { name: 'ILLICKAL KALLU', description: 'Mountains & panoramic views', image: illickalKalluImg },
    { name: 'MARMALA WATERFALL', description: 'Hidden waterfall experience', image: waterfallImg },
    { name: 'KUMARAKOM', description: 'Backwaters & bird sanctuary', image: kumarakomImg },
    { name: 'ILAVEEZHAPOONCHIRA', description: 'Hills & open landscapes', image: ilaveezhapoonchiraImg },
    { name: 'POONJAR', description: 'Heritage & history', image: aruvikkaalImg },
  ];

  return (
    <main className="explore-page">
      <section className="explore-page-hero">
        <div className="explore-hero-copy">
          <a className="back-link" href="#top"><ArrowUpRight /> Back to EFx India 2027</a>
          <p className="section-kicker">/ EXPLORE KERALA</p>
          <h1>God's Own<br /><em>Country.</em></h1>
          <p>Take a slower route through the hills, waterfalls, backwaters, and living history that surround Palai.</p>
        </div>
        <div className="explore-hero-image"><img src={vagamonLake} alt="Vagamon lake surrounded by tea gardens" /></div>
      </section>
      <section className="explore-places">
        <div className="explore-places-heading"><p className="section-kicker">/ CURATED DESTINATIONS</p><h2>Go beyond<br /><em>the venue.</em></h2><p>Build a little time into your EFx visit for the landscapes and stories of central Kerala.</p></div>
        <div className="places-grid">{places.map(({ name, description, image }, index) => <a className={`place-card place-card-${index + 1}`} href="#explore-kerala" key={name}><img src={image} alt={name} /><div><span>0{index + 1}</span><h3>{name}</h3><p>{description}</p></div></a>)}</div>
      </section>
    </main>
  );
}
