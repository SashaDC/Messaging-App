type HomePageProps = {
  onLoginClick?: () => void
}

export function HomePage({ onLoginClick }: HomePageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#10002B] via-[#240046] to-[#3C096C] text-white px-4">
      <div className="w-full max-w-md bg-[#240046]/80 border border-[#5A189A] rounded-2xl shadow-xl p-6 md:p-8 backdrop-blur">
        {/* Logo / Title */}
        <div className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#E0AAFF]/80">
            Welcome to
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold">
            DevConnect
          </h1>
          <p className="mt-3 text-sm md:text-base text-[#E0AAFF]/80">
            A simple real-time messaging app built by our Dev Academy crew.
          </p>
        </div>

        {/* Feature bullets */}
        <div className="mb-6 space-y-2 text-sm text-[#E0AAFF]/90">
          <div className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-[#9D4EDD]" />
            <p>Chat with friends in real-time</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={onLoginClick}
            className="w-full rounded-full bg-[#7B2CBF] hover:bg-[#9D4EDD] px-4 py-2.5 text-sm font-medium transition"
          >
            Log in to DevConnect
          </button>

          <button
            type="button"
            className="w-full rounded-full border border-[#C77DFF] px-4 py-2.5 text-sm font-medium text-[#E0AAFF] hover:bg-[#10002B]/40 transition"
          >
            Continue as guest (placeholder)
          </button>
        </div>

        {/* Footer text */}
        <p className="mt-6 text-[11px] text-center text-[#E0AAFF]/60">
          This is a bootcamp project – some features may still be under
          construction.
        </p>
      </div>
    </div>
  )
}
