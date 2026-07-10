import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * Layout for the public marketing site (home + insights). The Studio route
 * (/studio) lives outside this group so it renders chrome-free.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <div id="main-content">{children}</div>
      <Footer />
    </>
  );
}
