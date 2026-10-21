import Image from 'next/image';
import './supplied-home.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], display: 'swap' });

const stats = [
  { value: '1,800+', label: 'RevoV transactions' },
  { value: '1.8M+', label: 'Capital / ETB' },
  { value: '6+', label: 'RevoV orders' },
  { value: '5+', label: 'Partners' },
];

const css = `
@scope (.zip-home) {

 .zip-home{--navy:#0b2a55;--deep:#071a3a;--gold:#f5b50a;--orange:#f27a1a;--red:#e8321e;
--grad-btn:linear-gradient(90deg,#f5a60a,#f0551a 60%,#e8321e);
--grad-text:linear-gradient(90deg,#ffe27a,#f5b50a 40%,#f27a1a 75%,#ec4b6a);
--maxw:1760px;--gutter:clamp(16px,4.5vw,88px)}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
 .zip-home{width:100%;overflow-x:clip;background:var(--deep)}
.zip-home{line-height:1.6;color:#fff;-webkit-text-size-adjust:100%}
img{max-width:100%;height:auto;display:block}
a{color:inherit;text-decoration:none}
a:focus-visible{outline:3px solid var(--gold);outline-offset:3px}
.container{width:100%;max-width:calc(var(--maxw) + 2*var(--gutter));margin-inline:auto;padding-inline:var(--gutter)}

.page{min-height:100vh;min-height:100svh;display:flex;flex-direction:column}
.btn{display:inline-flex;align-items:center;gap:10px;padding:14px 26px;border-radius:999px;background:var(--grad-btn);color:#fff;font-weight:700;font-size:14px;text-transform:uppercase;box-shadow:0 10px 24px rgba(240,85,26,.35);transition:transform .2s,box-shadow .2s}
.btn:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(240,85,26,.45)}

.header{background:#fff;position:relative;z-index:10}
.header-row{display:flex;align-items:center;justify-content:space-between;min-height:84px;gap:24px}
.logo{display:block;width:clamp(120px,14vw,160px)}
.nav{display:flex;gap:clamp(16px,2.4vw,40px);font-weight:700;font-size:14px;text-transform:uppercase;color:var(--deep)}
.nav a{padding:6px 0;border-bottom:2px solid transparent;transition:border-color .2s}
.nav a:hover{border-color:var(--orange)}

/* Hero: machine-only picture is the background, people photo sits on top */
.hero{flex:1;position:relative;display:flex;flex-direction:column;overflow:hidden;background:#041233}
.bg-blur,.bg-machine,.bg-shade{position:absolute;inset:0;pointer-events:none}
.bg-blur{background:radial-gradient(55% 85% at 60% 45%,rgba(30,110,220,.5),transparent 72%),linear-gradient(110deg,#041233,#082a5c 70%,#0a3470)}
.bg-machine{left:58%;right:auto;aspect-ratio:1023/1537;transform:translateX(-50%);background:url('/revov-machine.webp') center/cover no-repeat;
-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 30%,#000 70%,transparent 100%),linear-gradient(180deg,#000 80%,transparent 100%);-webkit-mask-composite:source-in;mask-image:linear-gradient(90deg,transparent 0,#000 30%,#000 70%,transparent 100%),linear-gradient(180deg,#000 80%,transparent 100%);mask-composite:intersect}
.bg-shade{background:linear-gradient(100deg,rgba(7,26,58,.97) 0%,rgba(7,26,58,.9) 34%,rgba(7,26,58,.45) 62%,rgba(7,26,58,.2) 100%)}

.hero-grid{position:relative;z-index:2;flex:1;display:grid;grid-template-columns:1.15fr .85fr;align-items:center;gap:clamp(24px,4vw,64px);padding-block:clamp(28px,4vw,56px)}
.eyebrow{display:flex;align-items:center;gap:14px;color:var(--gold);font-weight:700;font-size:13px;text-transform:uppercase;margin-bottom:clamp(12px,2.2svh,22px)}
.eyebrow::before{content:"";width:80px;height:2px;background:var(--gold)}
h1{font-size:clamp(36px,min(5.6vw,9svh),72px);line-height:1.08;font-weight:800;letter-spacing:-1.5px}
h1 span{background:var(--grad-text);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent}
.hero-text p{margin:clamp(14px,2.4svh,26px) 0 clamp(18px,3.2svh,34px);max-width:620px;font-size:clamp(15px,1.4vw,17px);color:#eaf1fb}

.hero-card{justify-self:end;width:100%;max-width:clamp(230px,calc((100svh - 340px) * .75 + 24px),420px);padding:12px;border-radius:26px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.35);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);box-shadow:0 30px 70px rgba(0,0,0,.4)}
.hero-card img{width:100%;aspect-ratio:3/4;object-fit:cover;object-position:35% 50%;border-radius:16px}

/* Stats bar is attached to the bottom edge, so there is no gap under it */
.stats-wrap{position:relative;z-index:3}
.stats{display:grid;grid-template-columns:repeat(4,1fr);background:#fff;color:var(--navy);border-radius:28px 28px 0 0;box-shadow:0 -16px 50px rgba(0,0,0,.25);overflow:hidden}
.stat{padding:22px 16px 20px;text-align:center;border-right:1px solid #dde4ee}
.stat:last-child{border-right:0}
.stat strong{display:block;font-size:clamp(28px,3.6vw,48px);font-weight:800;line-height:1.1}
.stat span{font-size:15px;color:#2a3d5c}

@media (max-width:900px){
.nav{display:none}
.hero-grid{grid-template-columns:1fr}
.hero-card{justify-self:start;max-width:260px}
.bg-machine{left:50%;opacity:.55}
.bg-shade{background:linear-gradient(180deg,rgba(7,26,58,.9),rgba(7,26,58,.7))}
.stats{grid-template-columns:repeat(2,1fr)}
.stat:nth-child(2){border-right:0}
.stat:nth-child(-n+2){border-bottom:1px solid #dde4ee}}
@media (max-width:560px){.hero-card{max-width:100%}.header .btn{padding:12px 18px;font-size:12px}}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
}
`;

export default function SuppliedHome() {
  return (
    <div id="home" className={`zip-home page ${poppins.className}`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header className="header">
        <div className="container header-row">
          <a href="#home" className="logo" aria-label="SATEV Group home">
            <Image src="/satev-logo.png" alt="SATEV Group" width={540} height={170} priority />
          </a>
          <nav className="nav" aria-label="Main">
            <a href="#home">Home</a>
            <a href="#about">About Us</a>
            <a href="#solutions">Our Solutions</a>
            <a href="#journey">Our Journey</a>
            <a href="#partners">Partners</a>
          </nav>
          <a className="btn" href="/redesign/contact">
            Get in touch <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </header>

      <main className="hero">
        <div className="bg-blur" />
        <div className="bg-machine" />
        <div className="bg-shade" />

        <div className="container hero-grid">
          <div className="hero-text">
            <div className="eyebrow">SATEV Group</div>
            <h1>
              The Ultimate <span>Engineering</span>
            </h1>
            <p>
              We bring engineering, automation, AI, and IoT together to build useful technology.
              From RevoV smart vending to connected systems, SATEV Group turns ambitious ideas
              into practical products, designed and developed in Ethiopia.
            </p>
            <a className="btn" href="/redesign/contact">
              Get in touch <span aria-hidden>&rarr;</span>
            </a>
          </div>

          <div className="hero-card">
            <Image
              src="/revov-people.webp"
              alt="Two customers scanning the QR code on a RevoV vending machine"
              width={810}
              height={1080}
              priority
              sizes="(max-width: 900px) 80vw, 360px"
            />
          </div>
        </div>

        <div className="container stats-wrap">
          <div className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
