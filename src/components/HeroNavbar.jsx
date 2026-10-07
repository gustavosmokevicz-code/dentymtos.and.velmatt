import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'INÍCIO', href: '#inicio' },
  { label: 'SCOOTERS', href: '#scooters' },
  { label: 'TECNOLOGIA', href: '#tecnologia' },
  { label: 'CONTATO', href: '#contato' },
];

export default function HeroNavbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="hero-nav">
      <nav aria-label="Navegação principal" className="hero-nav-inner">
        <div className="hero-nav-links">
          {links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
        </div>
        <button className="hero-menu-button" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={23} strokeWidth={1.3} /> : <Menu size={23} strokeWidth={1.3} />}
        </button>
      </nav>
      {open && <div className="hero-mobile-menu">{links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}</div>}
    </header>
  );
}
