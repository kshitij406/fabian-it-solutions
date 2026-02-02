import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { Container } from "@/components/Container"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
  },
  {
    name: "Email",
    href: "mailto:fabiankivipa@yahoo.com",
    icon: Mail,
  },
]

interface FooterProps {
  brandName: string
  description?: string
  logoExists: boolean
}

export function Footer({ brandName, description, logoExists }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-background">
      <Container>
        <div className="py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-3">
            {/* Brand */}
            <div className="space-y-4">
              {logoExists ? (
                <Image
                  src="/hero/logo.png"
                  alt="Fabian IT Solutions logo"
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
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <a
                    href="tel:+255714469423"
                    className="hover:text-foreground transition-colors"
                  >
                    +255 714 469 423
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:fabiankivipa@yahoo.com"
                    className="hover:text-foreground transition-colors"
                  >
                    fabiankivipa@yahoo.com
                  </a>
                </p>
              </div>
              <div className="flex space-x-4 pt-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
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
