import { cn } from '@/utils/cn'

export default function Container({ as: As = 'div', className, children, size = 'default' }) {
  const sizes = {
    sm:      'max-w-4xl',
    default: 'max-w-7xl',
    wide:    'max-w-[88rem]',
    narrow:  'max-w-5xl',
  }
  return (
    <As className={cn('mx-auto w-full px-5 sm:px-8 lg:px-10', sizes[size], className)}>
      {children}
    </As>
  )
}
