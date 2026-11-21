import { useEffect, useState } from 'react';

// A slim bar fixed to the bottom of the screen on phones and tablets, so the
// page's main action is never out of reach. Used on /private-sessions and
// /saturday-class.
//
// It appears once the visitor has scrolled past the buttons at the top of the
// page, and slides away again when the footer comes into view, so it never
// covers the footer.
export default function BookingBar({ children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('footer');
    let footerInView = false;

    const update = () => setVisible(window.scrollY > 480 && !footerInView);

    const observer = footer
      ? new IntersectionObserver(([entry]) => {
          footerInView = entry.isIntersecting;
          update();
        })
      : null;
    observer?.observe(footer);

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', update);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 bg-[#F4EFE6]/95 backdrop-blur border-t border-[#C9B99A] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      // Hidden from keyboard and screen readers while it is off screen.
      inert={!visible}
    >
      <div className="max-w-xl mx-auto flex gap-3">{children}</div>
    </div>
  );
}
