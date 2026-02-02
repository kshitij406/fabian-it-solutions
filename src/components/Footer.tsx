import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"
import { Container } from "@/components/Container"
import type { ContactInfo, SanityImage, SocialLink } from "@/sanity/lib/types"

interface FooterProps {
  brandName: string
  description?: string
  logo?: SanityImage
  contact?: ContactInfo
  socials: SocialLink[]
}

export function Footer({ brandName, description, logo, contact, socials }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const logoUrl = logo?.asset?.url
  const logoAlt = logo?.alt || `${brandName} logo`

  return (
    <footer className="border-t border-border/50 bg-background">
      <Container>
        <div className="py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-3">
            {/* Brand */}
            <div className="space-y-4">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={logoAlt}
                  width={160}
                  height={36}
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <h3 className="text-base font-medium tracking-tight">{brandName}</h3>
              )}
              {description ? (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              ) : null}
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium tracking-tight">Quick Links</h4>
              <nav className="flex flex-col space-y-3">
                <Link
                  href="/services"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="/work"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Work
                </Link>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium tracking-tight">Contact</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                {contact?.phone ? (
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a
                      href={`tel:${contact.phone}`}
                      className="hover:text-foreground transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </p>
                ) : null}
                {contact?.email ? (
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="hover:text-foreground transition-colors"
                    >
                      {contact.email}
                    </a>
                  </p>
                ) : null}
                {contact?.address ? (
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4" />
                    <span className="leading-relaxed">{contact.address}</span>
                  </p>
                ) : null}
              </div>
              {socials.length > 0 ? (
                <div className="flex flex-wrap gap-3 pt-2">
                  {socials.map((social) => (
                    <a
                      key={`${social.platform}-${social.url}`}
                      href={social.url}
                      target={social.url.startsWith('http') ? "_blank" : undefined}
                      rel={social.url.startsWith('http') ? "noopener noreferrer" : undefined}
                      className="rounded-full border border-border/50 bg-background/60 px-3 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {social.platform}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>Copyright {currentYear} {brandName}. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
