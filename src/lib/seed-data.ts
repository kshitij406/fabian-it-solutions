import type {
  SiteSettings,
  Service,
  Project,
  Post,
  Author,
  Testimonial,
  Faq,
} from '@/sanity/lib/types'

export const seedSiteSettings: SiteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  title: 'Fabian IT Solutions',
  brandName: 'Fabian IT Solutions',
  description:
    'Enterprise-grade IT solutions designed to elevate your business. We deliver secure, scalable systems that drive growth.',
  primaryNav: [
    { label: 'Home', href: '/', blank: false, _type: 'link' },
    { label: 'Services', href: '/services', blank: false, _type: 'link' },
    { label: 'Work', href: '/work', blank: false, _type: 'link' },
    { label: 'About', href: '/about', blank: false, _type: 'link' },
    { label: 'Contact', href: '/contact', blank: false, _type: 'link' },
  ],
  socials: [
    { platform: 'linkedin', url: 'https://linkedin.com/company/fabian-it' },
    { platform: 'github', url: 'https://github.com/fabian-it' },
  ],
  contact: {
    email: 'fabiankivipa@yahoo.com',
    phone: '+255 714 469 423',
  },
}

export const seedServices: Service[] = [
  {
    _id: 'service-1',
    _type: 'service',
    title: 'Cloud Infrastructure',
    slug: { current: 'cloud-infrastructure', _type: 'slug' },
    shortDescription:
      'Scalable cloud architectures built for performance and reliability.',
    body: [],
    features: [
      'Multi-cloud deployment strategies',
      'Automated scaling and monitoring',
      'Disaster recovery planning',
      'Cost optimization',
    ],
  },
  {
    _id: 'service-2',
    _type: 'service',
    title: 'Security & Compliance',
    slug: { current: 'security-compliance', _type: 'slug' },
    shortDescription:
      'Enterprise security frameworks and compliance management.',
    body: [],
    features: [
      'Security audits and assessments',
      'Compliance automation',
      'Threat detection systems',
      'Incident response planning',
    ],
  },
  {
    _id: 'service-3',
    _type: 'service',
    title: 'System Integration',
    slug: { current: 'system-integration', _type: 'slug' },
    shortDescription:
      'Seamless integration of legacy and modern systems.',
    body: [],
    features: [
      'API development and management',
      'Data migration services',
      'Workflow automation',
      'Real-time synchronization',
    ],
  },
]

export const seedProjects: Project[] = [
  {
    _id: 'project-1',
    _type: 'project',
    title: 'Enterprise Cloud Migration',
    slug: { current: 'enterprise-cloud-migration', _type: 'slug' },
    shortDescription:
      'Migrated legacy infrastructure to modern cloud architecture, reducing costs by 40%.',
    tags: ['Cloud', 'Migration', 'Enterprise'],
    coverImage: {
      asset: { _ref: '', _type: 'reference' },
      alt: 'Cloud infrastructure diagram',
      _type: 'image',
    },
    body: [],
  },
  {
    _id: 'project-2',
    _type: 'project',
    title: 'Security Framework Implementation',
    slug: { current: 'security-framework', _type: 'slug' },
    shortDescription:
      'Implemented comprehensive security framework achieving SOC 2 compliance.',
    tags: ['Security', 'Compliance'],
    coverImage: {
      asset: { _ref: '', _type: 'reference' },
      alt: 'Security architecture',
      _type: 'image',
    },
    body: [],
  },
]

export const seedAuthor: Author = {
  _id: 'author-1',
  _type: 'author',
  name: 'Alex Fabian',
  slug: { current: 'alex-fabian', _type: 'slug' },
  bio: 'Principal architect and founder with 15+ years in enterprise IT.',
}

export const seedPosts: Post[] = [
  {
    _id: 'post-1',
    _type: 'post',
    title: 'The Future of Cloud Infrastructure',
    slug: { current: 'future-of-cloud', _type: 'slug' },
    excerpt:
      'Exploring emerging trends in cloud computing and how they reshape enterprise architecture.',
    publishedAt: new Date().toISOString(),
    author: seedAuthor,
    body: [],
  },
  {
    _id: 'post-2',
    _type: 'post',
    title: 'Security Best Practices for 2024',
    slug: { current: 'security-best-practices', _type: 'slug' },
    excerpt:
      'Essential security practices every organization should implement to protect against modern threats.',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    author: seedAuthor,
    body: [],
  },
]

export const seedTestimonials: Testimonial[] = [
  {
    _id: 'testimonial-1',
    _type: 'testimonial',
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechCorp',
    quote:
      'Fabian IT Solutions transformed our infrastructure. Their expertise and attention to detail are unmatched.',
    rating: 5,
  },
  {
    _id: 'testimonial-2',
    _type: 'testimonial',
    name: 'Michael Rodriguez',
    role: 'VP Engineering',
    company: 'InnovateLabs',
    quote:
      'Professional, reliable, and results-driven. They delivered exactly what we needed, on time and on budget.',
    rating: 5,
  },
]

export const seedFaqs: Faq[] = [
  {
    _id: 'faq-1',
    _type: 'faq',
    question: 'What services do you offer?',
    answer:
      'We provide comprehensive IT solutions including cloud infrastructure, security and compliance, system integration, and custom development services.',
    category: 'general',
    order: 1,
  },
  {
    _id: 'faq-2',
    _type: 'faq',
    question: 'How long do projects typically take?',
    answer:
      'Project timelines vary based on scope and complexity. We provide detailed timelines during our initial consultation and maintain transparent communication throughout.',
    category: 'general',
    order: 2,
  },
]
