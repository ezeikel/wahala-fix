import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faXTwitter,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import AppStoreButtons from "@/components/ui/AppStoreButtons";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  W
                </span>
              </div>
              <span className="font-bold text-xl">
                Wahala<span className="text-primary">Fix</span>
              </span>
            </Link>
            <p className="text-background/70 text-sm max-w-sm leading-relaxed">
              Empowering Nigerian citizens to report city problems and work
              together with local authorities for a better community.
            </p>

            <div className="mt-6">
              <AppStoreButtons variant="light" />
            </div>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="X"
              >
                <FontAwesomeIcon icon={faXTwitter} className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="TikTok"
              >
                <FontAwesomeIcon icon={faTiktok} className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-background transition-colors"
                >
                  How it Works
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-background transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#map"
                  className="hover:text-background transition-colors"
                >
                  Live Map
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Report Issue
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a
                  href="#about"
                  className="hover:text-background transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © 2026 WahalaFix. All rights reserved.
          </p>
          <p className="text-sm text-background/60">
            Made with love in Lagos, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
