import { useState, type FormEvent, type ReactNode } from 'react'
import './App.css'

type IconName = 'arrow' | 'baseball' | 'calendar' | 'check' | 'clock' | 'facebook' | 'instagram' | 'mail' | 'map' | 'menu' | 'phone' | 'play' | 'target' | 'x'

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
    baseball: <><circle cx="12" cy="12" r="9" /><path d="M7 4.8c1.3 2.2 2 4.6 2 7.2s-.7 5-2 7.2M17 4.8c-1.3 2.2-2 4.6-2 7.2s.7 5 2 7.2" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    facebook: <path d="M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9a1 1 0 0 1 1-1Z" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z" /><path d="M9 3v15M15 6v15" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 8.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1Z" />,
    play: <><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4z" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
    x: <><path d="m18 6-12 12M6 6l12 12" /></>,
  }

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

const navLinks = [
  { label: 'Facility & Cages', href: '#facility' },
  { label: 'Private Lessons', href: '#coaching' },
  { label: 'HitTrax', href: '#hittrax' },
  { label: 'Membership', href: '#pricing' },
  { label: 'Location & Hours', href: '#location' },
]

const services = [
  {
    number: '01',
    icon: 'baseball' as const,
    title: 'Tunnel & cage rentals',
    description: 'Your reps, your rhythm. Book a tunnel for solo work, team practice, or add HitTrax to your session.',
    details: ['Balls, L-screens & tees included', 'Individual and team slots', 'HitTrax add-on available'],
    link: 'Explore rentals',
    href: '#pricing',
  },
  {
    number: '02',
    icon: 'target' as const,
    title: 'Private lessons',
    description: 'One-on-one instruction built around the athlete: smarter mechanics, more confidence, better play.',
    details: ['Hitting, pitching & fielding', 'Private and group options', 'Pro instructor-led'],
    link: 'Find your coach',
    href: '#coaching',
  },
  {
    number: '03',
    icon: 'arrow' as const,
    title: 'Athletic training',
    description: 'Build the speed, strength, and agility to make the next play—and the next level.',
    details: ['Youth & high school athletes', 'Speed and agility work', 'Strength development'],
    link: 'Train with purpose',
    href: '#coaching',
  },
  {
    number: '04',
    icon: 'check' as const,
    title: 'MVP membership',
    description: 'Make more room for reps with member hitting access, lesson savings, and priority scheduling.',
    details: ['Unlimited hitting access', 'Discounted lessons', 'Priority scheduling'],
    link: 'Meet the MVP Club',
    href: '#membership',
  },
]

const pricingTabs = ['Tunnel rentals', 'Lesson packages', 'MVP membership'] as const
type PricingTab = (typeof pricingTabs)[number]

function App() {
  const [activeTab, setActiveTab] = useState<PricingTab>('Tunnel rentals')
  const [menuOpen, setMenuOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  function handleInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData.entries())
    const subject = encodeURIComponent(`All Star Batting inquiry: ${values.service}`)
    const body = encodeURIComponent(
      `Name: ${values.name}\nPhone: ${values.phone}\nEmail: ${values.email}\nService: ${values.service}\nPreferred date/time: ${values.time}\n\nAdditional details: ${values.message || 'None'}`,
    )
    window.location.href = `mailto:allstarbattingrange@gmail.com?subject=${subject}&body=${body}`
    setFormSubmitted(true)
  }

  return (
    <>
      <header className="site-header">
        <div className="nav-wrap">
          <a className="brand" href="#top" aria-label="All Star Batting home">
            <span className="brand-mark"><Icon name="baseball" size={25} /></span>
            <span className="brand-name">ALL STAR <b>BATTING</b></span>
          </a>
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? 'x' : 'menu'} />
          </button>
          <nav className={`primary-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => {
                if (link.label === 'Membership') setActiveTab('MVP membership')
                setMenuOpen(false)
              }}>{link.label}</a>
            ))}
          </nav>
          <div className="nav-actions">
            <a className="nav-phone" href="tel:+12037408699"><Icon name="phone" size={16} /><span>(203) 740-8699</span></a>
            <a className="button button-small" href="#inquiry">Book a tunnel <Icon name="arrow" size={16} /></a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-background" aria-hidden="true" />
          <div className="hero-content page-container">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-line" />Brookfield, Connecticut <span className="eyebrow-dot">/</span> Open year-round</div>
              <h1 id="hero-title">Elevate your<br /><span className="hero-second-line">swing <em>year-round.</em></span></h1>
              <p className="hero-description">Fairfield &amp; Litchfield County’s premier indoor baseball and softball training facility. 12,000 sq. ft. built for your next big moment.</p>
              <div className="hero-actions">
                <a className="button" href="#pricing">View tunnel rentals <Icon name="arrow" size={18} /></a>
                <a className="button button-outline" href="#coaching"><Icon name="play" size={17} /> Explore lessons</a>
              </div>
              <div className="hero-note"><span className="live-dot" />6 full-length turf tunnels <span className="note-separator">·</span> HitTrax™ analytics</div>
            </div>
            <div className="hero-side-note" aria-hidden="true">
              <span className="side-note-rule" />
              <span>BUILT FOR<br />THE NEXT REP</span>
              <span className="side-note-number">01 / 04</span>
            </div>
            <a className="scroll-cue" href="#facility"><span className="scroll-line" /> Scroll to explore</a>
          </div>
        </section>

        <section className="proof-strip" aria-label="Facility highlights">
          <div className="proof-inner page-container">
            <div className="proof-item"><strong>12,000</strong><span>sq. ft. facility</span></div>
            <div className="proof-item"><strong>06</strong><span>full-length turf tunnels</span></div>
            <div className="proof-item proof-hittrax"><span className="proof-live" /><strong>HitTrax<sup>™</sup></strong><span>real-time analytics</span></div>
            <div className="proof-item"><strong>365</strong><span>days of climate control</span></div>
          </div>
        </section>

        <section className="section services-section" id="facility">
          <div className="page-container">
            <div className="section-heading">
              <div>
                <p className="section-kicker">A place to get better</p>
                <h2>Everything you need.<br /><span>Nothing holding you back.</span></h2>
              </div>
              <p className="section-intro">From a first swing to the next level, find the space, coaching, and tools to put in your best work.</p>
            </div>
            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" id={service.number === '02' ? 'coaching' : undefined} key={service.number}>
                  <div className="service-card-top"><span className="service-icon"><Icon name={service.icon} size={21} /></span><span className="service-number">{service.number}</span></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>{service.details.map((detail) => <li key={detail}><Icon name="check" size={14} />{detail}</li>)}</ul>
                  <a className="text-link" href={service.number === '04' ? '#pricing' : service.href} onClick={() => { if (service.number === '04') setActiveTab('MVP membership') }}>{service.link}<Icon name="arrow" size={16} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="hittrax-section" id="hittrax">
          <div className="hittrax-glow" aria-hidden="true" />
          <div className="page-container hittrax-layout">
            <div className="hittrax-copy">
              <p className="section-kicker">See your game differently</p>
              <h2>Good reps.<br /><span>Great data.</span></h2>
              <p>Take every swing further with HitTrax™. Track the details that matter, see your progress in real time, and turn practice into a plan.</p>
              <div className="hittrax-tag"><span className="tag-dot" /><Icon name="target" size={16} /> Pro-level data capture</div>
              <a className="text-link" href="#inquiry">Ask about HitTrax<Icon name="arrow" size={16} /></a>
            </div>
            <div className="data-panel" aria-label="Example HitTrax stats">
              <div className="data-panel-header"><div className="data-brand"><span className="data-mark"><Icon name="baseball" size={17} /></span><span>HITTRAX <b>PERFORMANCE</b></span></div><span className="session-status"><span /> SESSION ACTIVE</span></div>
              <div className="data-player"><div><span className="data-label">PLAYER SESSION</span><strong>Live batting practice</strong></div><span className="data-session-id">SESSION / 024</span></div>
              <div className="data-main-stat"><span className="data-label">EXIT VELOCITY</span><div><strong>78</strong><span>MPH</span></div><div className="stat-track"><i /></div><span className="stat-footnote">SWING SPEED <b>+4.2 MPH</b></span></div>
              <div className="data-small-stats">
                <div><span className="data-label">LAUNCH ANGLE</span><strong>18<span>°</span></strong><div className="angle-visual"><i /></div></div>
                <div><span className="data-label">EST. DISTANCE</span><strong>285<span> ft</span></strong><div className="distance-visual"><i /></div></div>
              </div>
              <div className="zone-row"><span className="data-label">STRIKE ZONE</span><div className="strike-zone"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><span className="zone-copy">CONTACT<br /><b>7 / 9 ZONES</b></span></div>
              <div className="data-panel-footer"><span><Icon name="play" size={15} /> VIDEO FEEDBACK AVAILABLE</span><span>LIVE · 60 FPS</span></div>
            </div>
          </div>
        </section>

        <section className="section pricing-section" id="pricing">
          <div className="page-container">
            <div className="section-heading pricing-heading">
              <div><p className="section-kicker">Make your next move</p><h2>Find your way <span>to more reps.</span></h2></div>
              <p className="section-intro">Choose a starting point. For current availability and rates, give us a call or send an inquiry.</p>
            </div>
            <div className="pricing-card">
              <div className="pricing-tabs" role="tablist" aria-label="Pricing options">
                {pricingTabs.map((tab) => (
                  <button className={`pricing-tab${activeTab === tab ? ' active' : ''}`} id={`tab-${pricingTabs.indexOf(tab)}`} key={tab} type="button" role="tab" aria-selected={activeTab === tab} aria-controls="pricing-panel" onClick={() => setActiveTab(tab)}>{tab}<span>{activeTab === tab ? <Icon name="arrow" size={16} /> : null}</span></button>
                ))}
              </div>
              <div className="pricing-content" id="pricing-panel" role="tabpanel" aria-labelledby={`tab-${pricingTabs.indexOf(activeTab)}`}>
                {activeTab === 'Tunnel rentals' && (
                  <>
                    <div className="pricing-summary"><div><span className="section-kicker">TUNNEL RENTALS</span><h3>Room to work.<br /><span>Reps that count.</span></h3><p>Book a half-hour or full-hour session. Great for individual practice, team training, or a HitTrax-powered session.</p></div><a className="button" href="tel:+12037408699"><Icon name="phone" size={16} /> Call for current rates</a></div>
                    <div className="rate-table"><div className="rate-header"><span>SESSION</span><span>INCLUDES</span><span>AVAILABILITY</span></div><div className="rate-row"><strong>Half-hour rental</strong><span>Balls, L-screen &amp; tees</span><span>Individual / team</span></div><div className="rate-row"><strong>Full-hour rental</strong><span>Balls, L-screen &amp; tees</span><span>Individual / team</span></div><div className="rate-row"><strong>HitTrax add-on</strong><span>Live stats &amp; video tools</span><span>Available with rental</span></div></div>
                  </>
                )}
                {activeTab === 'Lesson packages' && (
                  <>
                    <div className="pricing-summary"><div><span className="section-kicker">LESSONS &amp; COACHING</span><h3>Coaching that<br /><span>moves you forward.</span></h3><p>Get expert instruction for hitting, pitching, catching, and fielding—with options for one session or a multi-lesson plan.</p></div><a className="button" href="#inquiry">Ask about lessons <Icon name="arrow" size={16} /></a></div>
                    <div className="rate-table"><div className="rate-header"><span>PACKAGE</span><span>FORMAT</span><span>PRICING</span></div><div className="rate-row"><strong>Single lesson</strong><span>30-minute, 1-on-1</span><span>Member &amp; non-member rates</span></div><div className="rate-row"><strong>Lesson bundle</strong><span>Multi-session package</span><span>Member &amp; non-member rates</span></div></div>
                  </>
                )}
                {activeTab === 'MVP membership' && (
                  <>
                    <div className="pricing-summary"><div><span className="section-kicker">THE MVP CLUB</span><h3>More access.<br /><span>More opportunity.</span></h3><p>Stay ready all year with unlimited hitting access, savings on lessons, and priority scheduling for your training.</p></div><a className="button" href="#inquiry">Ask about membership <Icon name="arrow" size={16} /></a></div>
                    <div className="membership-perks"><div><Icon name="check" size={17} /><span><strong>Unlimited hitting access</strong><small>Build a consistent routine, all year long.</small></span></div><div><Icon name="check" size={17} /><span><strong>Discounted lessons</strong><small>Save on instruction from pro coaches.</small></span></div><div><Icon name="check" size={17} /><span><strong>Priority scheduling</strong><small>Make time for the work that matters.</small></span></div><a className="membership-rate-link" href="tel:+12037408699">Call for membership rates <Icon name="arrow" size={16} /></a></div>
                  </>
                )}
              </div>
              <div className="pricing-footnote"><Icon name="check" size={15} /> Ask us about current rates, availability, and member pricing.</div>
            </div>
          </div>
        </section>

        <section className="section location-section" id="location">
          <div className="page-container location-layout">
            <div className="location-card">
              <div className="location-card-heading"><div><p className="section-kicker">Come get your work in</p><h2>Right here in<br /><span>Brookfield.</span></h2></div><span className="location-pin"><Icon name="map" size={22} /></span></div>
              <div className="location-columns">
                <div className="location-info">
                  <h3><Icon name="clock" size={17} /> Facility hours</h3>
                  <div className="hours-row"><span>Monday – Friday</span><strong>1:00 PM – 8:00 PM</strong></div>
                  <div className="hours-row"><span>Saturday – Sunday</span><strong>11:00 AM – 4:00 PM</strong></div>
                  <h3 className="contact-heading">Get in touch</h3>
                  <a className="contact-row" href="tel:+12037408699"><Icon name="phone" size={17} /><span>(203) 740-8699</span></a>
                  <a className="contact-row" href="mailto:allstarbattingrange@gmail.com"><Icon name="mail" size={17} /><span>allstarbattingrange@gmail.com</span></a>
                  <a className="contact-row" href="https://maps.google.com/?q=1120+Federal+Rd,+Brookfield,+CT+06804" target="_blank" rel="noreferrer"><Icon name="map" size={17} /><span>1120 Federal Rd, Brookfield, CT 06804</span></a>
                </div>
                <div className="inquiry-wrap" id="inquiry">
                  <div className="inquiry-heading"><div><span className="section-kicker">LET’S GET YOU IN</span><h3>Plan your next session.</h3></div><Icon name="calendar" size={20} /></div>
                  <form className="inquiry-form" onSubmit={handleInquiry}>
                    <div className="form-row"><label>Name<input name="name" autoComplete="name" placeholder="Your name" required /></label><label>Phone<input name="phone" type="tel" autoComplete="tel" placeholder="(203) 555-0123" required /></label></div>
                    <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
                    <div className="form-row"><label>Service needed<select name="service" defaultValue="" required><option value="" disabled>Select a service</option><option>Tunnels</option><option>Lessons</option><option>HitTrax</option><option>Birthday / team event</option></select></label><label>Preferred date &amp; time<input name="time" placeholder="e.g. Saturday afternoon" required /></label></div>
                    <label className="message-label">Anything else? <span>Optional</span><textarea name="message" rows={2} placeholder="Tell us a little about what you're looking for" /></label>
                    <button className="button form-submit" type="submit">Send an inquiry <Icon name="arrow" size={17} /></button>
                    {formSubmitted && <p className="form-feedback" role="status">Your email app should open with your inquiry ready to send. If it doesn’t, call us at <a href="tel:+12037408699">(203) 740-8699</a>.</p>}
                  </form>
                  <p className="form-privacy">Submitting opens your email app with your details—no information is stored on this site.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-container footer-main">
          <div className="footer-brand-block"><a className="brand" href="#top"><span className="brand-mark"><Icon name="baseball" size={23} /></span><span className="brand-name">ALL STAR <b>BATTING</b></span></a><p>Put in the work.<br />Love the game.</p></div>
          <div className="footer-service-area"><span className="footer-label">PROUD TO TRAIN</span><p>Brookfield, New Milford, Danbury<br />and surrounding areas.</p></div>
          <div className="footer-social"><span className="footer-label">FOLLOW ALONG</span><div><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram" size={19} /></a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><Icon name="facebook" size={19} /></a></div></div>
          <a className="footer-call" href="tel:+12037408699"><span>READY WHEN YOU ARE</span><strong>(203) 740-8699 <Icon name="arrow" size={18} /></strong></a>
        </div>
        <div className="page-container footer-bottom"><span>© {new Date().getFullYear()} All Star Batting. All rights reserved.</span><span>1120 Federal Rd, Brookfield, CT 06804</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </>
  )
}

export default App
