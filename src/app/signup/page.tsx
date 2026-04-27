import SignupForm from '@/components/auth/SignupForm';

export const metadata = {
  title: 'Sign Up - HabitMe',
  description: 'Create your HabitMe account',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <SignupForm />
    </div>
  );
}