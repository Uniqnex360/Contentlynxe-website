import { FormEvent, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  ChevronDown,
  CircleCheck,
  Globe2,
  Link2,
  Mail,
  Menu,
  Phone,
  Radar,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  User,
  X,
  Zap,
} from 'lucide-react';

type AttrPair = { key: string; value: string };
type Recommendation = {
  area: string;
  current?: string;
  suggested?: string;
  pairs?: AttrPair[];
};

type UseCase = {
  product: string;
  category: string;
  overall: number;
  llms: { name: string; value: number; color: string }[];
  competitors: { url: string; score: number }[];
  competitorEdge: string;
  recommendations: Recommendation[];
};

const heroLlms = [
  { name: 'ChatGPT', value: 72, color: 'pink' },
  { name: 'Gemini', value: 68, color: 'orange' },
  { name: 'Claude', value: 55, color: 'purple' },
  { name: 'Perplexity', value: 81, color: 'blue' },
];

const heroCompetitors = [
  { url: 'glowlab.com/vitamin-c-serum', score: 89 },
  { url: 'pureessence.co/serum', score: 84 },
];

const useCases: UseCase[] = [
  {
    product: 'Aurora Vitamin C Serum',
    category: 'Skincare',
    overall: 64,
    llms: [
      { name: 'ChatGPT', value: 72, color: 'pink' },
      { name: 'Gemini', value: 68, color: 'orange' },
      { name: 'Claude', value: 55, color: 'purple' },
      { name: 'Perplexity', value: 81, color: 'blue' },
    ],
    competitors: [
      { url: 'glowlab.com/vitamin-c-serum', score: 89 },
      { url: 'pureessence.co/serum', score: 84 },
    ],
    competitorEdge: 'Competitors include richer attribute data, structured FAQs, and review citations that AI engines prefer.',
    recommendations: [
      { area: 'Product title', current: 'Aurora Vitamin C Serum', suggested: 'Aurora 20% Vitamin C Serum with Hyaluronic Acid' },
      { area: 'Description', current: 'Brightening serum for daily use', suggested: 'Add skin-type compatibility, key active ingredients, and a visible results timeline' },
      { area: 'Attributes', pairs: [
        { key: 'Volume', value: '30ml' },
        { key: 'Shelf life', value: '24 months' },
        { key: 'Skin type', value: 'All types' },
        { key: 'Cruelty-free', value: 'Yes' },
        { key: 'Dermatologist-tested', value: 'Yes' },
        { key: 'Active ingredient', value: '20% L-Ascorbic Acid' },
      ]},
    ],
  },
  {
    product: 'Summit Pro Wireless Earbuds',
    category: 'Electronics',
    overall: 49,
    llms: [
      { name: 'ChatGPT', value: 45, color: 'pink' },
      { name: 'Gemini', value: 61, color: 'orange' },
      { name: 'Claude', value: 38, color: 'purple' },
      { name: 'Perplexity', value: 52, color: 'blue' },
    ],
    competitors: [
      { url: 'audiomax.io/earbuds-pro', score: 78 },
      { url: 'soundwave.tech/wireless', score: 72 },
    ],
    competitorEdge: 'Competitors use comparison tables, clear spec formatting, and buyer-guide mentions that AI engines surface more often.',
    recommendations: [
      { area: 'Product title', current: 'Summit Pro Wireless Earbuds', suggested: 'Summit Pro ANC Wireless Earbuds — Bluetooth 5.3, 30h Battery' },
      { area: 'Description', current: 'High-quality wireless earbuds with noise cancellation', suggested: 'Add battery life (30h), waterproof rating (IPX5), and use-case scenarios like commuting and workouts' },
      { area: 'Attributes', pairs: [
        { key: 'Driver size', value: '11mm' },
        { key: 'Battery life', value: '30 hours' },
        { key: 'Charging time', value: '1.5 hours' },
        { key: 'Waterproof', value: 'IPX5' },
        { key: 'Warranty', value: '1 year' },
        { key: 'Compatibility', value: 'iOS, Android, Windows' },
      ]},
    ],
  },
];

const plans = [
  {
    name: 'Audit',
    price: '$1.25',
    unit: 'per product',
    description: 'Full visibility audit of your product across AI engines.',
    features: ['LLM visibility report', 'Competitor comparison', 'Gap analysis', 'Snapshot dashboard'],
    cta: 'Start with Audit',
    highlighted: false,
  },
  {
    name: 'Audit Plus',
    price: '$1.75',
    unit: 'per product',
    description: 'Audit plus AI-generated recommendations and content to fix the gaps.',
    features: ['Everything in Audit', 'Title & description rewrites', 'Attribute recommendations', 'AI content generation', 'Improvement roadmap'],
    cta: 'Get Audit Plus',
    highlighted: true,
  },
  {
    name: 'Audit Gold Plus',
    price: '$2.50',
    unit: 'per product',
    description: 'Everything in Audit Plus with hands-on implementation and consulting.',
    features: ['Everything in Audit Plus', 'Implementation support', 'Consulting sessions', 'Priority processing', 'Dedicated specialist'],
    cta: 'Get Audit Gold Plus',
    highlighted: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    unit: 'for large catalogs',
    description: 'For large-scale product catalogs and custom integrations.',
    features: ['Bulk product scanning', 'API access', 'Custom AI engine targeting', 'Dedicated support', 'SLA & onboarding'],
    cta: 'Contact us',
    highlighted: false,
  },
];

const faqs = [
  ['What is GEO?', 'Generative Engine Optimization is the practice of making your product data clear, credible, and easy for AI search engines to understand and recommend.'],
  ['Which AI platforms do you monitor?', 'ContentLynxe is built to monitor the answer engines your customers use every day, with more providers being added as the landscape evolves.'],
  ['Do I need to rewrite my whole website?', 'Not at all. ContentLynxe finds the highest-impact gaps first, then gives you focused recommendations and ready-to-use content.'],
  ['Is this for businesses or developers?', 'ContentLynxe is built for businesses of all sizes — from D2C brands to enterprise retailers — who want their products to be visible in AI-generated answers. No technical expertise required.'],
  ['Is it bound to one industry?', 'No, it works with any industry and any category of products.'],
];

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', company: '', mobile: '', url: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleDemoSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.url.trim() && form.name.trim() && form.email.trim() && form.company.trim()) {
      setSubmitted(true);
    }
  };

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const uc = useCases[activeUseCase];

  return (
    <div className="site-shell">
      <header className="topbar">
        <a href="#top" className="brand" aria-label="ContentLynxe home">
          <img src="/Contentlynxe_logo.png" alt="ContentLynxe" />
        </a>
        <nav className={mobileOpen ? 'nav-links nav-links-open' : 'nav-links'}>
          <a href="#platform" onClick={() => setMobileOpen(false)}>Platform</a>
          <a href="#use-cases" onClick={() => setMobileOpen(false)}>Use Cases</a>
          <a href="#how-it-works" onClick={() => setMobileOpen(false)}>How it works</a>
          <a href="#pricing" onClick={() => setMobileOpen(false)}>Pricing</a>
          <a className="mobile-cta" href="#demo" onClick={() => setMobileOpen(false)}>Get started</a>
        </nav>
        <a className="button button-small button-dark desktop-cta" href="#demo">Get started</a>
        <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> The visibility layer for AI search</div>
            <h1>Be the answer<br /><span>AI recommends.</span></h1>
            <p className="hero-text">Search has changed. People no longer click through ten blue links — they ask one question and trust one answer. ContentLynxe helps your business show up in that answer and get recommended more.</p>
            <div className="hero-actions">
              <a href="#demo" className="button button-primary">Check your visibility <ArrowRight size={17} /></a>
              <a href="#use-cases" className="text-link">See use cases <ArrowRight size={16} /></a>
            </div>
          </div>

          <div className="hero-visual" aria-label="ContentLynxe product visibility dashboard preview">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="dashboard-card">
              <div className="dash-top"><div className="mini-brand"><img src="/Contentlynxe_logo.png" alt="ContentLynxe" className="mini-logo" /></div><span className="live-pill"><span /> Live scan</span></div>
              <div className="dash-title"><div><span className="muted-label">PRODUCT VISIBILITY</span><h3>Aurora Vitamin C Serum</h3></div><span className="score-badge">64<span>/100</span></span></div>
              <div className="score-track"><span style={{ width: '64%' }} /></div>
              <div className="dash-section-label">VISIBILITY ACROSS AI ENGINES</div>
              <div className="scan-list">{heroLlms.map((llm) => <div className="scan-row" key={llm.name}><span>{llm.name}</span><strong>{llm.value}%</strong><div className={`scan-bar ${llm.color}`}><span style={{ width: `${llm.value}%` }} /></div></div>)}</div>
              <div className="dash-divider" />
              <div className="dash-section-label">TOP COMPETITORS</div>
              <div className="dash-comp-list">{heroCompetitors.map((comp) => <div className="dash-comp-row" key={comp.url}><Link2 size={13} /><span>{comp.url}</span><strong>{comp.score}</strong></div>)}</div>
              <div className="dash-comp-edge"><TrendingUp size={13} /> Competitors rank higher with richer attribute data and review citations</div>
              <div className="recommendation"><div className="rec-icon"><Sparkles size={16} /></div><div><span className="muted-label">NEXT BEST ACTION</span><p>Add material details and certifications to your product description</p></div><ArrowRight size={17} /></div>
            </div>
            <div className="floating-card floating-card-top"><div className="floating-icon green"><Check size={16} /></div><div><strong>4 AI engines scanned</strong><small>ChatGPT, Gemini, Claude, Perplexity</small></div></div>
            <div className="floating-card floating-card-bottom"><div className="mention-ring">+34%</div><div><strong>Visibility potential</strong><small>with recommended fixes</small></div></div>
          </div>
        </section>

        <section className="trust-strip"><div className="section-wrap trust-inner"><span>TRUSTED BY BUSINESSES ACROSS EVERY CATEGORY</span><div className="trust-categories">B2B DISTRIBUTORS &middot; D2C BRANDS &middot; ENTERPRISE RETAIL &middot; MARKETPLACES</div></div></section>

        <section id="platform" className="section-wrap platform-section">
          <div className="section-intro"><div className="eyebrow"><span className="eyebrow-dot" /> One platform, clear answers</div><h2>Stop guessing what<br /><em>AI sees.</em></h2><p>Your customers are asking AI for recommendations instead of clicking through search results. ContentLynxe turns this shift into a measurable growth channel for your business.</p></div>
          <div className="feature-grid">
            <article className="feature-card feature-large"><div className="feature-icon pink-icon"><Radar size={21} /></div><h3>See your AI visibility</h3><p>Track how often your product appears, which prompts trigger it, and how you compare to the competition.</p><div className="mini-chart"><div className="chart-label"><span>Visibility score</span><strong>+28.4%</strong></div><div className="chart-bars">{[38, 53, 46, 64, 59, 76, 88, 78, 96, 91].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div><div className="chart-dates"><span>JUL</span><span>AUG</span><span>SEP</span></div></div></article>
            <article className="feature-card"><div className="feature-icon orange-icon"><Target size={21} /></div><h3>Know what to fix</h3><p>Get prioritized recommendations based on the gaps holding your product back.</p><div className="check-stack"><span><Check size={13} /> Add comparison data</span><span><Check size={13} /> Clarify use cases</span><span><Check size={13} /> Strengthen proof points</span></div></article>
            <article className="feature-card"><div className="feature-icon purple-icon"><Sparkles size={21} /></div><h3>Create content that converts</h3><p>Generate useful, on-brand content designed to earn trust in the moments that matter.</p><div className="content-preview"><span className="content-line long" /><span className="content-line" /><span className="content-line short" /><div className="ai-chip"><Sparkles size={12} /> AI suggested</div></div></article>
          </div>
        </section>

        <section id="use-cases" className="section-wrap usecase-section">
          <div className="section-intro"><div className="eyebrow"><span className="eyebrow-dot" /> Real examples, real gaps</div><h2>See what AI sees —<br /><em>and what it doesn&apos;t.</em></h2><p>Explore how real products show up across AI engines, where competitors win, and exactly what to fix to improve visibility.</p></div>
          <div className="usecase-tabs">{useCases.map((item, index) => <button key={item.product} className={activeUseCase === index ? 'usecase-tab usecase-tab-active' : 'usecase-tab'} onClick={() => setActiveUseCase(index)}>{item.product}</button>)}</div>
          <div className="usecase-card">
            <div className="usecase-header"><div><span className="usecase-category">{uc.category}</span><h3>{uc.product}</h3></div><div className="usecase-overall"><span className="muted-label">OVERALL VISIBILITY</span><strong>{uc.overall}<span>/100</span></strong></div></div>
            <div className="usecase-body">
              <div className="usecase-llms"><span className="muted-label">VISIBILITY ACROSS AI ENGINES</span>{uc.llms.map((llm) => <div className="usecase-llm-row" key={llm.name}><span>{llm.name}</span><div className={`scan-bar ${llm.color}`}><span style={{ width: `${llm.value}%` }} /></div><strong>{llm.value}%</strong></div>)}</div>
              <div className="usecase-competitors"><span className="muted-label">TOP COMPETITORS</span>{uc.competitors.map((comp) => <div className="usecase-comp-row" key={comp.url}><div className="comp-url"><Link2 size={13} /> {comp.url}</div><span className="comp-score">{comp.score}<small>/100</small></span></div>)}<div className="comp-edge"><TrendingUp size={14} /><p>{uc.competitorEdge}</p></div></div>
            </div>
            <div className="usecase-recs"><span className="muted-label">RECOMMENDATIONS TO IMPROVE VISIBILITY</span><div className="rec-grid">{uc.recommendations.map((rec) => rec.pairs ? (
              <div className="rec-item rec-item-attrs" key={rec.area}>
                <div className="rec-attr-header"><Sparkles size={13} /> {rec.area}</div>
                <div className="rec-attr-grid">{rec.pairs.map((pair) => <div className="attr-pair" key={pair.key}><span className="attr-key">{pair.key}</span><span className="attr-val">{pair.value}</span></div>)}</div>
              </div>
            ) : (
              <div className="rec-item" key={rec.area}><div className="rec-area"><Sparkles size={13} /> {rec.area}</div><div className="rec-current">{rec.current}</div><div className="rec-arrow"><ArrowRight size={14} /></div><div className="rec-suggested">{rec.suggested}</div></div>
            ))}</div></div>
          </div>
        </section>

        <section id="search-evolution" className="search-evolution-section"><div className="section-wrap"><div className="section-intro section-intro-center"><div className="eyebrow"><span className="eyebrow-dot" /> How search has evolved</div><h2>One question.<br /><em>One trusted answer.</em></h2><p>Search used to mean scrolling through ten blue links and deciding for yourself. Now people ask a single question and trust the answer completely. That&rsquo;s where your product needs to show up.</p></div><div className="evolution-grid"><div className="evolution-card evolution-old"><span className="evolution-label">BEFORE</span><div className="evolution-icon"><Search size={22} /></div><h3>Ten blue links</h3><p>Users searched, scrolled through pages of results, opened multiple tabs, and made their own decision. Brand visibility meant ranking high on Google.</p></div><div className="evolution-arrow"><ArrowRight size={28} /></div><div className="evolution-scroll-wrap"><div className="evolution-scroll-track"><div className="evolution-card evolution-now evolution-slide"><span className="evolution-label evolution-label-now">NOW</span><div className="evolution-chat"><div className="chat-bubble chat-user"><div className="chat-avatar chat-avatar-user"><User size={13} /></div><div className="chat-text"><span>What are the famous chocolates to get from UK?</span></div></div><div className="chat-bubble chat-ai"><div className="chat-avatar chat-avatar-ai"><Sparkles size={13} /></div><div className="chat-text"><span>Here are the top chocolates to get from the UK:</span><ol><li>Hotel Chocolat &mdash; premium British chocolatier</li><li>Prestat &mdash; luxury, by royal appointment</li><li>Charbonnel et Walker &mdash; historic British fine chocolate</li><li>Montezuma&rsquo;s &mdash; British artisan chocolate</li></ol></div></div></div><div className="evolution-trust"><CircleCheck size={15} /> The user trusts this answer blindly. If your product isn&rsquo;t in the list, you don&rsquo;t exist.</div></div><div className="evolution-card evolution-now evolution-slide"><span className="evolution-label evolution-label-now">NOW</span><div className="evolution-chat"><div className="chat-bubble chat-user"><div className="chat-avatar chat-avatar-user"><User size={13} /></div><div className="chat-text"><span>Suggest me running shoes as a beginner</span></div></div><div className="chat-bubble chat-ai"><div className="chat-avatar chat-avatar-ai"><Sparkles size={13} /></div><div className="chat-text"><span>For beginners, these running shoes are great starting points:</span><ol><li>Nike Revolution 7 &mdash; cushioned, affordable, easy to find</li><li>Asics Gel-Excite 10 &mdash; reliable support and comfort</li><li>New Balance Fresh Foam 680 &mdash; soft ride for new runners</li><li>Hoka Clifton 9 &mdash; max cushioning, lightweight feel</li></ol></div></div></div><div className="evolution-trust"><CircleCheck size={15} /> The beginner picks one from the list and buys it. No further research needed.</div></div></div><div className="evolution-scroll-hint"><span className="scroll-dot scroll-dot-active" /><span className="scroll-dot" /><ArrowRight size={14} /> Scroll to see more</div></div></div></div></section>

        <section id="how-it-works" className="how-section"><div className="section-wrap"><div className="how-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> From invisible to inevitable</div><h2>Your next customer<br /><em>is asking AI.</em></h2></div><p>Meet them with product information that answers the question better than anyone else.</p></div><div className="steps"><div className="step"><div className="step-number">01</div><div className="step-icon"><Globe2 size={24} /></div><h3>Connect your product</h3><p>Paste a product URL and we&rsquo;ll map the signals AI uses to understand your offering.</p></div><div className="step-line" /><div className="step"><div className="step-number">02</div><div className="step-icon"><BarChart3 size={24} /></div><h3>Measure your presence</h3><p>See your visibility across real-world prompts, categories, and competitive searches.</p></div><div className="step-line" /><div className="step"><div className="step-number">03</div><div className="step-icon"><Zap size={24} /></div><h3>Make your move</h3><p>Turn insights into high-impact content that makes your product easier to recommend.</p></div></div></div></section>

        <section id="demo" className="demo-section section-wrap"><div className="demo-panel"><div className="demo-copy"><div className="eyebrow light-eyebrow"><span className="eyebrow-dot" /> See it for yourself</div><h2>How visible is<br /><span>your product?</span></h2><p>Share your details and we&rsquo;ll run a visibility snapshot across AI engines — showing where you stand and what to fix. Write to us at <a href="mailto:growth@contentlynxe.com" className="demo-email-link">growth@contentlynxe.com</a></p>{submitted ? <div className="demo-success-box"><div className="success-check"><CircleCheck size={28} /></div><h3>Thank you, {form.name}!</h3><p>You will receive your visibility report shortly in your email at <strong>{form.email}</strong>.</p></div> : <form className="demo-form" onSubmit={handleDemoSubmit}><div className="demo-field"><User size={16} /><input value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Name" aria-label="Name" required /></div><div className="demo-field"><Mail size={16} /><input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} placeholder="Email" aria-label="Email" required /></div><div className="demo-field"><Building2 size={16} /><input value={form.company} onChange={(e) => updateField('company', e.target.value)} placeholder="Company name" aria-label="Company name" required /></div><div className="demo-field"><Phone size={16} /><input type="tel" value={form.mobile} onChange={(e) => updateField('mobile', e.target.value)} placeholder="Mobile (optional)" aria-label="Mobile number" /></div><div className="demo-field demo-field-full"><Globe2 size={16} /><input value={form.url} onChange={(e) => updateField('url', e.target.value)} placeholder="Product URL" aria-label="Product URL" required /></div><button className="button button-light demo-submit" type="submit">Get my snapshot <ArrowRight size={16} /></button></form>}</div><div className="demo-result"><div className="result-window"><div className="window-head"><span /><span /><span /><label>visibility snapshot</label></div><div className="result-body">{submitted ? <div className="result-email-confirm"><div className="email-confirm-icon"><Mail size={28} /></div><span className="muted-label">REPORT INCOMING</span><h4>Your report is on its way</h4><p>We&rsquo;re analyzing your product across ChatGPT, Gemini, Claude, and Perplexity. You&rsquo;ll receive the full visibility report at <strong>{form.email}</strong> shortly.</p></div> : <div className="result-placeholder"><div className="result-ring result-ring-empty"><strong>&mdash;</strong><small>/ 100</small></div><div><span className="muted-label">CURRENT SCORE</span><h4>Waiting for your details</h4><p>Your visibility snapshot will appear here.</p></div></div>}</div></div></div></div></section>

        <section id="resources" className="section-wrap insight-section"><div className="insight-layout"><div><div className="eyebrow"><span className="eyebrow-dot" /> The new search playbook</div><h2>Build for the<br /><em>answer economy.</em></h2><p>Your customers now turn to AI for recommendations instead of scrolling through search results. We help your business become the answer they trust.</p><a href="#demo" className="text-link">Explore the platform <ArrowRight size={16} /></a></div><div className="quote-card"><div className="quote-mark">&ldquo;</div><blockquote>In the answer economy, the best product isn&apos;t the one with the biggest budget. It&apos;s the one AI can explain with confidence.</blockquote><div className="quote-author"><div className="author-avatar">CL</div><div><strong>ContentLynxe research</strong><span>Signal report &middot; 2026</span></div></div></div></div></section>

        <section id="pricing" className="pricing-section"><div className="section-wrap"><div className="section-intro section-intro-center"><div className="eyebrow"><span className="eyebrow-dot" /> Simple, per-product pricing</div><h2>Plans that scale<br /><em>with your catalog.</em></h2><p>Pay per product. No hidden fees. Cancel anytime.</p></div><div className="pricing-grid">{plans.map((plan) => <div className={plan.highlighted ? 'plan-card plan-card-highlighted' : 'plan-card'} key={plan.name}>{plan.highlighted && <span className="plan-badge">Most popular</span>}<h3>{plan.name}</h3><div className="plan-price"><strong>{plan.price}</strong><span>{plan.unit}</span></div><p>{plan.description}</p><ul className="plan-features">{plan.features.map((feature) => <li key={feature}><Check size={14} /> {feature}</li>)}</ul><a href="#demo" className={plan.highlighted ? 'button button-primary plan-cta' : 'button button-dark plan-cta'}>{plan.cta} <ArrowRight size={15} /></a></div>)}</div></div></section>

        <section id="faq" className="faq-section"><div className="section-wrap faq-layout"><div><div className="eyebrow"><span className="eyebrow-dot" /> Questions, answered</div><h2>Good to<br /><em>know.</em></h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={openFaq === index ? 'faq-item faq-open' : 'faq-item'} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><ChevronDown size={18} /></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div></section>

        <section className="join-section section-wrap"><div className="join-panel"><div><div className="eyebrow light-eyebrow"><span className="eyebrow-dot" /> Get ahead of the shift</div><h2>Make your product<br /><span>the obvious answer.</span></h2></div><div className="join-cta-wrap"><p>Start with a free visibility snapshot across AI engines.</p><a href="#demo" className="button button-light">Get started <ArrowRight size={16} /></a></div></div></section>
      </main>

      <footer className="footer"><div className="section-wrap footer-inner"><div className="footer-brand"><img src="/Contentlynxe_logo.png" alt="ContentLynxe" /><p>The visibility layer for AI search.</p></div><div className="footer-links"><div><span>Explore</span><a href="#platform">Platform</a><a href="#use-cases">Use Cases</a><a href="#how-it-works">How it works</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a></div><div><span>Connect</span><a href="mailto:growth@contentlynxe.com">growth@contentlynxe.com</a><a href="#demo">Get started</a></div></div></div><div className="section-wrap footer-bottom"><span>&copy; 2026 ContentLynxe. Built for the answer economy.</span><span>Optimize. Engage. Grow.</span></div></footer>
    </div>
  );
}

export default App;
