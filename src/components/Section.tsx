import { cn } from '@/lib/utils'
import { Container } from './Container'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('py-20 md:py-32', className)}>
      <Container>{children}</Container>
    </section>
  )
}
