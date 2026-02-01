import Link from "next/link"
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
    href: "mailto:contact@fabianit.com",
    icon: Mail,
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-background">
      <Container>
        <div className="py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-3">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-base font-medium tracking-tight">Fabian IT Solutions</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Delivering innovative IT solutions for your business needs.
              </p>
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
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium tracking-tight">Connect</h4>
              <div className="flex space-x-4">
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
            <p>© {currentYear} Fabian IT Solutions. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
