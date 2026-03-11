export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white mb-4">Redefinance</h3>
            <p className="text-sm">
              Built for boutique credit advisory firms working with SMEs.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:hello@redefinance.com" className="hover:text-white transition-colors">
                  hello@redefinance.com
                </a>
              </li>
              <li className="text-sm">
                Founding client support available during business hours
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-sm text-center">
          <p>© {currentYear} Redefinance. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Currently operating in Macedonia, Croatia, and Slovenia.
          </p>
        </div>
      </div>
    </footer>
  );
}