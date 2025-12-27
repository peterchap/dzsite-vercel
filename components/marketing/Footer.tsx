import Link from "next/link"

const footerNavigation = {
    products: [
        { name: "Brand Protection", href: "/brand-protection" },
        { name: "Domain Intelligence", href: "/domain-intelligence" },
        { name: "Pricing", href: "/pricing" },
        { name: "API Docs", href: "/docs" },
    ],
    company: [
        { name: "Domain Intelligence", href: "/domain-intelligence" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
    ],
    legal: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
    ],
    social: [
        { name: "Twitter", href: "https://twitter.com/datazag" },
        { name: "GitHub", href: "https://github.com/datazag" },
        { name: "LinkedIn", href: "https://linkedin.com/company/datazag" },
    ],
}

export function Footer() {
    return (
        <footer className="bg-[#131326] text-gray-300 border-t border-white/10" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="container py-12 md:py-16">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Link href="/" className="text-2xl font-bold text-white">
                            Datazag
                        </Link>
                        <p className="text-sm leading-6 text-gray-400 max-w-xs">
                            Real-time threat detection and domain intelligence API. Detecting phishing in under 60 seconds.
                        </p>
                        <div className="flex space-x-6">
                            {footerNavigation.social.map((item) => (
                                <a key={item.name} href={item.href} className="text-gray-400 hover:text-[#56A8F5]">
                                    <span className="sr-only">{item.name}</span>
                                    {/* Add icons here if needed */}
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">Products</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {footerNavigation.products.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 hover:text-[#56A8F5]">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {footerNavigation.company.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 hover:text-[#56A8F5]">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {footerNavigation.legal.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 hover:text-[#56A8F5]">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-gray-400">
                        &copy; {new Date().getFullYear()} Datazag, Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
