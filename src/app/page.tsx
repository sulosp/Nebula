import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { clerkConfigured } from "@/lib/env";

export default function HomePage() {
  const authReady = clerkConfigured();

  return (
    <div className="site">
      <header className="site-nav">
        <span className="nav-brand">Nebula</span>
        <nav className="site-links">
          <ThemeToggle />
          {authReady ? (
            <>
              <Link href="/sign-in">Log in</Link>
              <Link className="btn btn-primary" href="/sign-up">
                Start
              </Link>
            </>
          ) : (
            <span className="text-muted">Connect Clerk to enable signup</span>
          )}
        </nav>
      </header>

      <main className="site-main">
        <section className="hero">
          <p className="card-kicker">Phase 1 MVP</p>
          <h1>Your FAQs, answering themselves.</h1>
          <p className="hero-lede">
            Sign up, type in question-and-answer pairs, paste one script tag on
            your site. The widget answers from your FAQ or says “please contact us.”
          </p>
          <div className="hero-actions">
            {authReady ? (
              <Link className="btn btn-primary" href="/sign-up">
                Get started — $29/mo
              </Link>
            ) : (
              <span className="btn btn-secondary" aria-disabled="true">
                Setup required
              </span>
            )}
            <Link className="btn btn-secondary" href="#how">
              How it works
            </Link>
          </div>
        </section>

        <section id="how" className="section">
          <h2>Ship criteria</h2>
          <div className="steps">
            <article className="card elev-sm">
              <p className="card-kicker">1</p>
              <h3 className="card-title">Add your FAQ</h3>
              <p className="card-body">A simple table. Question, answer, done.</p>
            </article>
            <article className="card elev-sm">
              <p className="card-kicker">2</p>
              <h3 className="card-title">Paste the script</h3>
              <p className="card-body">
                One tag with your client ID. A chat bubble appears on any site.
              </p>
            </article>
            <article className="card elev-sm">
              <p className="card-kicker">3</p>
              <h3 className="card-title">It answers</h3>
              <p className="card-body">
                Groq reads only your FAQ. Unknown questions get a contact fallback.
              </p>
            </article>
          </div>
        </section>

        <section className="section pricing-block">
          <h2>One plan</h2>
          <article className="card elev-md pricing-card">
            <p className="card-kicker">FAQ bot</p>
            <p className="price">$29<span>/month</span></p>
            <p className="card-body">
              Dashboard, embeddable widget, name + color branding. Inquiry history
              comes later, only if you ask for it.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
