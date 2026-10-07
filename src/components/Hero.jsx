import { ArrowUpRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import HeroNavbar from '@/components/HeroNavbar';
import BrandLockup from '@/components/BrandLockup';
import HeroMobilePhoto from '@/components/HeroMobilePhoto';

const scooter = 'https://media.base44.com/images/public/user_6ab2feffdf4f789ad6c02029/ffa61c4cf_3090ac73-c497-448e-8e91-6b648a0dd8e9.jpg';
const scooterMobile = 'https://media.base44.com/images/public/6ab9a8c91318a2c8f812767d/bea06a1c2_d4d56faa-2f99-444e-9ca5-1b059ca90270.jpg';

export default function Hero() {
  return (
    <section id="inicio" className="campaign-hero">
      <HeroNavbar />
      <div className="hero-photography" aria-hidden="true">
        <Image src={scooter} alt="" originWidth={1024} originHeight={575} className="hero-photo" />
        <HeroMobilePhoto src={scooterMobile} />
      </div>
      <div className="hero-fade" aria-hidden="true" />
      <div className="hero-top-fade" aria-hidden="true" />
      <div className="hero-heading">
        <BrandLockup />
        <h1>MOVE DIFFERENT.</h1>
        <p>Uma nova forma de se mover.</p>
      </div>
      <a href="#scooters" className="hero-cta">CONHECER MODELOS <ArrowUpRight size={16} strokeWidth={1.4} aria-hidden="true" /></a>
      <a href="#scooters" className="hero-scroll"><span aria-hidden="true">↓</span> SCROLL</a>
    </section>
  );
}
