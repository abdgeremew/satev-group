"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowDownLeft, ArrowRight, ArrowUpRight, Check, CheckCircle2, ChevronDown, CircleHelp, Clock3, Coffee, Cookie, CreditCard, Droplets, MapPin, Minus, Plus, QrCode, Search, ShieldCheck, ShoppingBag, Smartphone, Sparkles, X } from "lucide-react";
import "./order.css";

type Product = { id: string; name: string; detail: string; price: number; category: string; icon: typeof Coffee; color: string; stock: number; };
const products: Product[] = [
  { id: "water", name: "Spring water", detail: "Ambo · 500 ml", price: 35, category: "Drinks", icon: Droplets, color: "water", stock: 8 },
  { id: "coffee", name: "Macchiato", detail: "Freshly brewed · hot", price: 85, category: "Drinks", icon: Coffee, color: "coffee", stock: 5 },
  { id: "juice", name: "Mango juice", detail: "100% fruit · 250 ml", price: 65, category: "Drinks", icon: Sparkles, color: "juice", stock: 4 },
  { id: "cookie", name: "Chocolate cookies", detail: "Crisp & cocoa · 45 g", price: 45, category: "Snacks", icon: Cookie, color: "cookie", stock: 6 },
  { id: "chips", name: "Golden crisps", detail: "Lightly salted · 35 g", price: 40, category: "Snacks", icon: ShoppingBag, color: "chips", stock: 3 },
  { id: "bar", name: "Energy bar", detail: "Peanut & honey · 40 g", price: 55, category: "Snacks", icon: Sparkles, color: "bar", stock: 4 },
];
const categories = ["All items", "Drinks", "Snacks"];
const money = (n: number) => `ETB ${n.toLocaleString("en-ET")}`;

export default function OrderPage() {
  const [category, setCategory] = useState("All items");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [stage, setStage] = useState<"browse" | "pay" | "success">("browse");
  const [method, setMethod] = useState<"card" | "qr">("card");
  const [terminalReady, setTerminalReady] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [receiptId] = useState(() => `RV-${Math.floor(100000 + Math.random() * 900000)}`);
  const selected = useMemo(() => products.filter((p) => cart[p.id]), [cart]);
  const count = selected.reduce((sum, p) => sum + cart[p.id], 0);
  const total = selected.reduce((sum, p) => sum + p.price * cart[p.id], 0);
  const shown = products.filter((p) => (category === "All items" || p.category === category) && `${p.name} ${p.detail}`.toLowerCase().includes(query.toLowerCase()));
  const change = (id: string, amount: number) => setCart((current) => {
    const next = { ...current, [id]: Math.max(0, Math.min(9, (current[id] ?? 0) + amount)) };
    if (!next[id]) delete next[id];
    return next;
  });
  const pay = () => { setTerminalReady(true); setStage("success"); };

  return <main className="order-app">
    <header className="order-header">
      <Link className="order-brand" href="/"><span className="order-brand-mark"><Image src="/revov-mark.png" alt="" width={28} height={28} /></span><span>RevoV<small>by SATEV</small></span></Link>
      <nav className="order-nav"><a className="selected" href="#menu">Order</a><a href="#location">Locations</a><button type="button" onClick={() => setHelpOpen(true)}>Help</button></nav>
      <button className="location-pill" type="button" onClick={() => document.getElementById("location")?.scrollIntoView({ behavior: "smooth" })}><MapPin size={15} /><span>Arat Kilo</span><ChevronDown size={14} /></button>
    </header>

    <section className="order-main">
      <div className="order-content">
        <div className="order-location-card" id="location">
          <div className="location-art" aria-hidden="true"><div className="map-grid"/><span className="map-road road-a"/><span className="map-road road-b"/><span className="map-road road-c"/><span className="map-dot"><MapPin size={19} fill="currentColor"/></span><span className="map-label">REVOV · ARAT KILO</span></div>
          <div className="location-copy"><div className="location-eyebrow">DEMO LOCATION <span className="location-distance">· Arat Kilo</span></div><h1>Your next pick-me-up,<br/><em>just around the corner.</em></h1><p>Choose what you need. Pay securely at the RevoV terminal.</p><div className="location-meta"><span><MapPin size={14}/> Satev HQ · Arat Kilo</span><span><Clock3 size={14}/> Open 24 hours</span></div></div>
        </div>

        <section className="menu-section" id="menu">
          <div className="menu-heading"><div><div className="overline">FRESH FROM YOUR MACHINE</div><h2>Pick your favourites</h2><p>Available now at <strong>RevoV · Arat Kilo</strong></p></div><label className="search-box"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search items" aria-label="Search items"/><kbd>⌘ K</kbd></label></div>
          <div className="category-tabs" role="tablist" aria-label="Product category">{categories.map((c) => <button role="tab" aria-selected={category === c} className={category === c ? "active" : ""} key={c} onClick={() => setCategory(c)}>{c}{c === "All items" && <span>06</span>}</button>)}</div>
          <div className="product-grid">{shown.map((p) => { const Icon = p.icon; return <article className="product-card" key={p.id}><div className={`product-art ${p.color}`}><Icon size={37} strokeWidth={1.45}/><span className="product-art-tag">{p.category === "Drinks" ? "CHILLED" : "FRESH"}</span></div><div className="product-information"><div><h3>{p.name}</h3><p>{p.detail}</p></div><span className="product-price">{money(p.price)}</span></div><div className="product-actions"><span className={p.stock < 4 ? "stock low" : "stock"}>{p.stock <= 3 ? `Only ${p.stock} left` : "In stock"}</span>{cart[p.id] ? <div className="quantity-control"><button onClick={() => change(p.id, -1)} aria-label={`Remove one ${p.name}`}><Minus size={15}/></button><span>{cart[p.id]}</span><button onClick={() => change(p.id, 1)} aria-label={`Add one ${p.name}`}><Plus size={15}/></button></div> : <button className="add-button" onClick={() => change(p.id, 1)} aria-label={`Add ${p.name} to order`}><Plus size={17}/></button>}</div></article>; })}</div>
          {shown.length === 0 && <div className="empty-search">No items match “{query}”. Try another search.</div>}
          <div className="machine-note"><ShieldCheck size={17}/><span>Items are reserved for <strong>10 minutes</strong> after you start checkout.</span><span className="machine-id">MACHINE RV-014</span></div>
        </section>
      </div>

      <aside className="cart-panel">
        <div className="cart-title"><div><div className="overline">YOUR ORDER</div><h2>Order summary</h2></div><span className="cart-count">{String(count).padStart(2,"0")}</span></div>
        <div className="cart-machine"><span className="cart-machine-icon"><MapPin size={17}/></span><div><strong>RevoV · Arat Kilo</strong><small>Satev HQ · Machine RV-014</small></div><span className="machine-status"/></div>
        {selected.length ? <div className="cart-items">{selected.map((p) => <div className="cart-line" key={p.id}><span className={`cart-thumb ${p.color}`}><p.icon size={19}/></span><div className="cart-product"><strong>{p.name}</strong><small>{money(p.price)} each</small></div><div className="cart-line-qty"><button aria-label={`Remove one ${p.name}`} onClick={() => change(p.id, -1)}><Minus size={12}/></button><span>{cart[p.id]}</span><button aria-label={`Add one ${p.name}`} onClick={() => change(p.id, 1)}><Plus size={12}/></button></div><strong className="line-total">{money(p.price * cart[p.id])}</strong></div>)}</div> : <div className="cart-empty"><div className="empty-bag"><ShoppingBag size={23}/></div><strong>Your order is waiting</strong><p>Add something delicious<br/>and it will show up here.</p></div>}
        <div className="cart-bottom"><div className="cart-subtotal"><span>Subtotal <small>{count} {count === 1 ? "item" : "items"}</small></span><strong>{money(total)}</strong></div><div className="cart-fee"><span>Service fee</span><span>Free</span></div><div className="cart-total"><span>Total</span><strong>{money(total)}</strong></div><button className="checkout-button" disabled={!count} onClick={() => setStage("pay")}>Continue to payment <ArrowRight size={17}/></button><div className="secure-line"><ShieldCheck size={14}/> Payment completes at the terminal</div></div>
      </aside>
    </section>

    <footer className="order-footer"><span>© 2026 RevoV · SATEV Group</span><span><span className="live-dot"/> Design prototype</span><span>Sample location, products, stock &amp; ETB prices</span></footer>

    {stage === "pay" && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setStage("browse"); }}><section className="payment-modal" role="dialog" aria-modal="true" aria-labelledby="payment-title"><button className="modal-close" onClick={() => setStage("browse")} aria-label="Close"><X size={19}/></button><div className="modal-topline"><span className="terminal-icon"><CreditCard size={23}/></span><span className="step-mark">STEP 02 <i/> 02</span></div><div className="overline">SECURE CHECKOUT · RV-014</div><h2 id="payment-title">Pay at the terminal</h2><p className="modal-description">Your order is ready. Choose how you’d like to pay on the RevoV device.</p><div className="pay-total"><span>Amount due</span><strong>{money(total)}</strong></div><div className="payment-options"><button className={method === "card" ? "payment-option selected" : "payment-option"} onClick={() => setMethod("card")}><span className="option-icon"><CreditCard size={20}/></span><span><strong>Bank card</strong><small>Tap, insert or swipe at the terminal</small></span><span className="radio-dot"/></button><button className={method === "qr" ? "payment-option selected" : "payment-option"} onClick={() => setMethod("qr")}><span className="option-icon"><QrCode size={20}/></span><span><strong>QR payment</strong><small>Show your wallet QR to the device camera</small></span><span className="radio-dot"/></button></div><div className="device-hint"><span className="hint-pulse"><Smartphone size={17}/></span><span><strong>At RevoV · Arat Kilo</strong><small>The T6 accepts contactless cards, chip &amp; PIN, and magnetic stripe.</small></span></div><button className="checkout-button modal-pay" onClick={pay}>I’m at the machine <ArrowRight size={17}/></button><p className="demo-disclaimer">Demo flow · No payment will be taken</p></section></div>}

    {stage === "success" && <div className="modal-backdrop"><section className="payment-modal success-modal" role="dialog" aria-modal="true" aria-labelledby="success-title"><div className="success-confetti" aria-hidden="true"><span/><span/><span/><span/><span/></div><div className="success-mark"><Check size={31}/></div><div className="overline success-overline">ORDER READY</div><h2 id="success-title">You’re all set.</h2><p className="modal-description">{terminalReady ? (method === "card" ? "Tap or insert your card at the RevoV terminal to complete payment." : "Open your wallet and present its QR code to the RevoV camera.") : "Your order is ready at the RevoV terminal."}</p><div className="receipt-ticket"><div className="receipt-header"><span>REVOV · ARAT KILO</span><span>ORDER</span></div><strong>{receiptId}</strong><div className="receipt-items">{selected.map((p) => <div key={p.id}><span>{cart[p.id]} × {p.name}</span><span>{money(p.price * cart[p.id])}</span></div>)}</div><div className="receipt-total"><span>Total due at terminal</span><strong>{money(total)}</strong></div><div className="receipt-location"><MapPin size={14}/> Satev HQ, Arat Kilo · Machine RV-014</div></div><div className="step-instruction"><span>01</span><span>At the terminal, choose <strong>Pay for order</strong></span><ArrowDownLeft size={15}/></div><div className="step-instruction"><span>02</span><span>Enter code <strong>{receiptId}</strong> and complete your payment</span><ArrowUpRight size={15}/></div><button className="checkout-button" onClick={() => { setStage("browse"); setCart({}); setTerminalReady(false); }}>Done <CheckCircle2 size={17}/></button><p className="demo-disclaimer">This is a design prototype. No transaction has been made.</p></section></div>}

    {helpOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setHelpOpen(false); }}><section className="help-modal" role="dialog" aria-modal="true"><button className="modal-close" onClick={() => setHelpOpen(false)} aria-label="Close"><X size={19}/></button><span className="help-symbol"><CircleHelp size={24}/></span><div className="overline">WE’RE HERE TO HELP</div><h2>Need a hand?</h2><p>For a machine issue or question about your order, reach the RevoV support team.</p><a href="https://t.me/Revov_bot" target="_blank" rel="noreferrer" className="checkout-button help-link">Message RevoV support <ArrowRight size={16}/></a><button className="help-back" onClick={() => setHelpOpen(false)}>Back to your order</button></section></div>}
  </main>;
}
