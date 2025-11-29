type HomePageProps = {
  onLoginClick?: () => void
  errorMessage: string | null
}

export function HomePage({ onLoginClick, errorMessage }: HomePageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#10002B] via-[#240046] to-[#3C096C] px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-[#5A189A] bg-[#240046]/80 p-6 shadow-xl backdrop-blur md:p-8">
        {/* Logo / Title */}
        <div className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#E0AAFF]/80">
            Welcome to
          </p>
          <h1 className="mt-2 text-3xl font-semibold md:text-4xl">
            DevConnect
          </h1>
          <p className="mt-3 text-sm text-[#E0AAFF]/80 md:text-base">
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
            className="w-full rounded-full bg-[#7B2CBF] px-4 py-2.5 text-sm font-medium transition hover:bg-[#9D4EDD]"
          >
            Log in to DevConnect
          </button>
        </div>
        {errorMessage && (
          <p className="mt-2 rounded-lg bg-red-900/40 px-3 py-2 text-xs text-red-200">
            {errorMessage}
          </p>
        )}

        {/* Footer text */}
        <p className="mt-6 text-center text-[11px] text-[#E0AAFF]/60">
          This is a bootcamp project – some features may still be under
          construction.
        </p>
      </div>
    </div>
  )
}
