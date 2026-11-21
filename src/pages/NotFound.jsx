import PageMeta from '../components/PageMeta';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { SATURDAY_PAGE } from '../data/classes';

// Shown for any address that isn't a page. The build writes it to
// dist/404.html, which Vercel serves with a real "404 Not Found" status.
const LINKS = [
  ['/private-sessions', 'Private sessions'],
  [SATURDAY_PAGE, 'Saturday class'],
  ['/schedule', 'Weekly schedule'],
  ['/events', 'Events and retreats'],
  ['/', 'Home'],
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4EFE6] flex flex-col">
      <PageMeta path="/404" />
      <Nav theme="light" />

      <main className="flex-1 pt-40 pb-24 px-8 md:px-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-[#785E3D] mb-6">Page not found</p>
          <h1 className="text-4xl sm:text-5xl font-light leading-tight text-[#1C1410] mb-6">
            That page isn't here.
          </h1>
          <p className="text-[17px] text-[#5C4A36] leading-relaxed mb-10">
            It may have moved, or the link may be out of date. These will get you back on track:
          </p>
          <ul className="border-t border-[#C9B99A]">
            {LINKS.map(([href, label]) => (
              <li key={href} className="border-b border-[#C9B99A]">
                <a
                  href={href}
                  className="flex items-center justify-between min-h-[56px] text-[17px] text-[#1C1410] hover:text-[#785E3D] transition-colors"
                >
                  {label}
                  <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
