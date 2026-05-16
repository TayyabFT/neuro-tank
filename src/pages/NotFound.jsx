import { HiArrowLeft } from 'react-icons/hi2'
import Container from '@/components/common/Container.jsx'
import AmbientBackdrop from '@/components/common/AmbientBackdrop.jsx'
import Button from '@/components/common/Button.jsx'

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden pt-32 pb-20">
      <AmbientBackdrop intensity="intense" />
      <Container className="relative text-center">
        <p className="font-display text-[clamp(6rem,18vw,14rem)] leading-none font-bold text-gradient">404</p>
        <h1 className="mt-3 font-display text-3xl md:text-5xl font-semibold text-white">This route slipped through the neural net.</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-200/85">The page you're looking for doesn't exist — but we'd love to send you somewhere useful.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button to="/" magnetic iconLeft={<HiArrowLeft />}>Back to home</Button>
          <Button to="/contact" variant="ghost">Contact support</Button>
        </div>
      </Container>
    </section>
  )
}
