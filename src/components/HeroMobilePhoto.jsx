import { Image } from '@/components/ui/image';

export default function HeroMobilePhoto({ src }) {
  return (
    <div className="hero-photo-mobile">
      <div className="hero-mobile-sky" aria-hidden="true">
        <Image src={src} alt="" originWidth={1080} originHeight={1920} className="hero-mobile-sky-photo" loading="eager" />
      </div>
      <Image src={src} alt="" originWidth={1080} originHeight={1920} className="hero-photo-mobile-main" loading="eager" />
    </div>
  );
}
