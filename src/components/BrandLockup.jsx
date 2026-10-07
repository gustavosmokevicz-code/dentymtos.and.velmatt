import { Image } from '@/components/ui/image';

const denty = 'https://media.base44.com/images/public/6ab9a8c91318a2c8f812767d/491bc98a8_generated_076a696c.png';
const velmatt = 'https://media.base44.com/images/public/6ab9a8c91318a2c8f812767d/279e8689e_generated_25902415.png';

export default function BrandLockup() {
  return (
    <div className="brand-lockup" aria-label="Denty Motos e Velmatt">
      <Image src={denty} alt="Denty Motos" originWidth={1024} originHeight={1024} className="brand-logo" />
      <span className="brand-plus" aria-hidden="true">+</span>
      <Image src={velmatt} alt="Velmatt" originWidth={1024} originHeight={1024} className="brand-logo" />
    </div>
  );
}
