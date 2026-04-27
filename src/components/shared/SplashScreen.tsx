'use client';

export default function SplashScreen() {
  return (
    <div
      data-testid="splash-screen"
      className="fixed inset-0 flex items-center justify-center bg-white"
    >
      <div className="text-center space-y-6">
        {/* Minimalist logo mark */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white rounded-full" />
            </div>
          </div>
        </div>

        {/* App name */}
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          HabitMe
        </h1>

        {/* Subtle loading indicator */}
        <div className="flex justify-center pt-4">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
}