import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Section = forwardRef(function Section(
  { id, className, children, padded = true, ...rest },
  ref,
) {
  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        'relative isolate scroll-mt-24',
        padded && 'py-24 sm:py-28 md:py-32',
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  )
})

export default Section
