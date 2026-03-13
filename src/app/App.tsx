import { Navigation } from './components/Navigation';
import { StickyConversionBar } from './components/StickyConversionBar';
import { MobileStickyButton } from './components/MobileStickyButton';
import { Hero } from './components/Hero';
import { CredibilityStrip } from './components/CredibilityStrip';
import { DataIntegrity } from './components/DataIntegrity';
import { FoundingOffer } from './components/FoundingOffer';
import { FAQ } from './components/FAQ';
import { Waitlist } from './components/Waitlist';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <StickyConversionBar />
      <MobileStickyButton />
      <Hero />
      <CredibilityStrip />
      <DataIntegrity />
      <FAQ />
      <FoundingOffer />
      <Waitlist />
      <Footer />
    </div>
  );
}