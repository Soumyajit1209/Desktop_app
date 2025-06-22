import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: '#ffffff',
              colorBackground: '#1a1a1a',
              colorInputBackground: '#2a2a2a',
              colorInputText: '#ffffff',
              colorText: '#ffffff',
              colorTextSecondary: '#a1a1aa',
            },
            elements: {
              card: 'bg-[#1a1a1a] border border-gray-700',
              headerTitle: 'text-white',
              headerSubtitle: 'text-gray-300',
              socialButtonsBlockButton: 'bg-white text-black hover:bg-gray-100',
              formButtonPrimary: 'bg-white text-black hover:bg-gray-100',
              footerActionLink: 'text-white hover:text-gray-300',
            },
          }}
          forceRedirectUrl="/auth/electron"
          signUpUrl="/signup"
        />
      </div>
    </div>
  );
}
