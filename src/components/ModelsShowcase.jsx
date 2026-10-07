import { useState, useEffect, useRef, Fragment } from 'react';
import { ArrowLeft, ArrowRight, Gauge, Zap, BatteryCharging } from 'lucide-react';
import { Image } from '@/components/ui/image';

const MODELS = [
  {
    brand: 'VELMATT',
    model: 'X13',
    price: 'R$ 7.990',
    speed: '32 km/h',
    power: '1.000 W',
    range: 'Até 50 km',
    battery: 'Lítio removível',
    color: 'Preto',
    photo: 'https://media.base44.com/images/public/6ab9a8c91318a2c8f812767d/766f41d1b_c419b902-563e-49db-8110-30490420d6bf.jpg',
    photoClass: 'is-x13',
    scale: 0.62,
    offsetY: 50,
  },
  {
    brand: 'VELMATT',
    model: 'HARLEY',
    price: 'R$ 7.990',
    speed: '32 km/h',
    power: '1.000 W',
    range: 'Até 50 km',
    battery: 'Lítio removível',
    color: 'Azul',
    photo: 'https://media.base44.com/images/public/6ab9a8c91318a2c8f812767d/17c61a994_07a19960-7b64-4ae9-88aa-d3d3530a674e.jpg',
    photoClass: 'is-harley',
    scale: 0.62,
    offsetY: 50,
  },
];

const SPECS = (m) => [
  { icon: Gauge, label: 'VELOCIDADE MÁX.', value: m.speed },
  { icon: Zap, label: 'POTÊNCIA', value: m.power },
  { icon: BatteryCharging, label: 'AUTONOMIA', value: m.range },
];

const EXTRA = (m) => [
  { label: 'BATERIA', value: m.battery },
  { label: 'COR', value: m.color },
];

const renderIdentity = (m) => (
  <div className="models-identity">
    <span className="models-brand">{m.brand}</span>
    <span className="models-model">{m.model}</span>
  </div>
);

const renderPrice = (m) => (
  <div className="models-price">
    <span className="models-price-label">A PARTIR DE</span>
    <div className="models-price-row">
      <span className="models-price-line" aria-hidden="true" />
      <span className="models-price-value">{m.price}</span>
      <span className="models-price-line" aria-hidden="true" />
    </div>
  </div>
);

const renderSpecs = (m) => (
  <div className="models-specs">
    {SPECS(m).map((s, i) => (
      <Fragment key={s.label}>
        <div className="models-spec">
          <s.icon className="models-spec-icon" size={40} strokeWidth={1.5} aria-hidden="true" />
          <div className="models-spec-text">
            <span className="models-spec-label">{s.label}</span>
            <span className="models-spec-value">{s.value}</span>
          </div>
        </div>
        {i < 2 && <span className="models-spec-divider" aria-hidden="true" />}
      </Fragment>
    ))}
  </div>
);

const renderExtra = (m) => (
  <div className="models-extra">
    {EXTRA(m).map((e, i) => (
      <Fragment key={e.label}>
        <div className="models-extra-item">
          <span className="models-spec-label">{e.label}</span>
          <span className="models-spec-value">{e.value}</span>
        </div>
        {i < 1 && <span className="models-spec-divider models-extra-divider" aria-hidden="true" />}
      </Fragment>
    ))}
  </div>
);

function SlideText({ current, outgoing, animating, render }) {
  return (
    <div className="models-twrap">
      <div className="models-tstatic">{render(current)}</div>
      {animating && outgoing != null && (
        <>
          <div className="models-tout">{render(outgoing)}</div>
          <div className="models-tin">{render(current)}</div>
        </>
      )}
    </div>
  );
}

const modelStyleVars = (model) => ({
  '--scale': model.scale ?? 1,
  '--offset-y': `${model.offsetY ?? 0}px`,
});

function BgPhoto({ model }) {
  return (
    <Image
      src={model.photo}
      alt=""
      fittingType="fill"
      className={`models-bg-photo ${model.photoClass || ''}`}
      style={modelStyleVars(model)}
    />
  );
}

function MpPhoto({ model }) {
  return (
    <Image
      src={model.photo}
      alt=""
      fittingType="fit"
      className={`models-mp-photo ${model.photoClass || ''}`}
    />
  );
}

export default function ModelsShowcase() {
  const n = MODELS.length;
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [outgoing, setOutgoing] = useState(null);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (!animating) return;
    const t = setTimeout(() => {
      setAnimating(false);
      setOutgoing(null);
    }, 1200);
    return () => clearTimeout(t);
  }, [animating]);

  const navigate = (dir) => {
    if (animating || n < 2) return;
    setDirection(dir);
    setOutgoing(index);
    setIndex((index + dir + n) % n);
    setAnimating(true);
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (dx < -40) navigate(1);
    else if (dx > 40) navigate(-1);
  };

  const m = MODELS[index];
  const out = outgoing != null ? MODELS[outgoing] : null;

  return (
    <section
      id="scooters"
      className="models"
      style={{ '--dir': direction }}
      aria-label="Modelos de scooters elétricas"
      aria-roledescription="carrossel"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="models-preload" aria-hidden="true">
        {MODELS.map((mdl) => (
          <img key={mdl.photo} src={mdl.photo} alt="" />
        ))}
      </div>

      {/* Desktop: full-bleed background photo */}
      <div className="models-bg-desktop">
        {animating && out ? (
          <>
            <div className="models-bg models-bg-out">
              <BgPhoto model={out} />
            </div>
            <div className="models-bg models-bg-in">
              <BgPhoto model={m} />
            </div>
          </>
        ) : (
          <div className="models-bg">
            <BgPhoto model={m} />
          </div>
        )}
      </div>

      <div className="models-overlay" aria-hidden="true" />

      <div className={`models-content ${animating ? 'models-animating' : ''}`}>
        <header className="models-head">
          <span className="models-kicker">SCOOTERS ELÉTRICOS</span>
          <h2 className="models-title">CONHEÇA NOSSOS MODELOS</h2>
          <span className="models-subtitle">SCOOTERS DE PNEU LARGO</span>
          <span className="models-divider" aria-hidden="true" />
        </header>

        <div className="models-identity-row">
          <button
            type="button"
            className="models-arrow-mobile models-arrow-mobile-prev"
            onClick={() => navigate(-1)}
            disabled={n < 2}
            aria-label="Modelo anterior"
          >
            <span className="models-arrow-mobile-circle">
              <ArrowLeft size={16} strokeWidth={1.4} aria-hidden="true" />
            </span>
          </button>
          <SlideText current={m} outgoing={out} animating={animating} render={renderIdentity} />
          <button
            type="button"
            className="models-arrow-mobile models-arrow-mobile-next"
            onClick={() => navigate(1)}
            disabled={n < 2}
            aria-label="Próximo modelo"
          >
            <span className="models-arrow-mobile-circle">
              <ArrowRight size={16} strokeWidth={1.4} aria-hidden="true" />
            </span>
          </button>
        </div>

        {/* Desktop: spacer gap with side arrows */}
        <div className="models-scooter-gap">
          <button
            type="button"
            className="models-arrow models-arrow-prev"
            onClick={() => navigate(-1)}
            disabled={n < 2}
            aria-label="Modelo anterior"
          >
            <ArrowLeft size={18} strokeWidth={1.4} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="models-arrow models-arrow-next"
            onClick={() => navigate(1)}
            disabled={n < 2}
            aria-label="Próximo modelo"
          >
            <ArrowRight size={18} strokeWidth={1.4} aria-hidden="true" />
          </button>
        </div>

        {/* Mobile: in-flow photo container (contain, 4/3, same for all slides) */}
        <div className="models-photo-mobile">
          {animating && out ? (
            <>
              <div className="models-mp models-bg-out">
                <MpPhoto model={out} />
              </div>
              <div className="models-mp models-bg-in">
                <MpPhoto model={m} />
              </div>
            </>
          ) : (
            <div className="models-mp">
              <MpPhoto model={m} />
            </div>
          )}
        </div>

        <SlideText current={m} outgoing={out} animating={animating} render={renderPrice} />
        <SlideText current={m} outgoing={out} animating={animating} render={renderSpecs} />
        <SlideText current={m} outgoing={out} animating={animating} render={renderExtra} />
      </div>
    </section>
  );
}
