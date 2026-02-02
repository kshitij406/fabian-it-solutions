import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { sanityFetch } from '@/sanity/lib/fetch'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import type { SiteSettings } from '@/sanity/lib/types'
import { existsSync } from 'fs'
import path from 'path'

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteSettings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
  }).catch(() => null)
  const brandName = siteSettings?.brandName || 'Fabian IT Solutions'
  const description = siteSettings?.description || ''
  const logoExists = existsSync(
    path.join(process.cwd(), 'public', 'hero', 'logo.png')
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar brandName={brandName} logoExists={logoExists} />
      <main className="flex-1">{children}</main>
      <Footer
        brandName={brandName}
        description={description}
        logoExists={logoExists}
      />
    </div>
  )
}
