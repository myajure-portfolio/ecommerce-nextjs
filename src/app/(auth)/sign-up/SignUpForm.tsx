'use client';

import { signUp } from '@/actions/auth/signup';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isHovered, setIsHovered] = useState(false);

  const [data, action] = useActionState(signUp, {
    success: false,
    message: '',
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const SignUpButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        className="w-full h-11 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-indigo-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/40 hover:-translate-y-0.5 rounded-xl font-medium text-[15px] cursor-pointer"
        variant="default"
        disabled={pending}
      >
        {pending ? 'Signing Up...' : 'Sign Up'}
      </Button>
    );
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative background glow */}
      <div
        className={`absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg transition-opacity duration-500 ${isHovered ? 'opacity-30' : 'opacity-10'} -z-10`}
      />

      <Card className="border border-border/50 shadow-2xl bg-card/95 backdrop-blur-sm sm:rounded-2xl relative overflow-hidden transition-all duration-300">
        {/* Top subtle gradient highlight */}
        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-500/40 via-indigo-500/40 to-blue-500/40" />

        <CardHeader className="space-y-1 pb-8 pt-8">
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
              <div className="relative h-14 w-14 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-md shadow-indigo-500/20 flex items-center justify-center transform transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3">
                <UserPlus className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 px-6 sm:px-8">
          {data.message !== '' && !data.success && (
            <div className="flex items-center justify-center gap-2 text-center text-destructive bg-destructive/10 rounded-md py-2 px-4">
              <span>{data.message}</span>
            </div>
          )}
          <form action={action} className="space-y-5">
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div className="space-y-2.5">
              <Label htmlFor="name" className="font-medium text-foreground/90">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                name="name"
                className="bg-muted/40 border-muted-foreground/20 focus:bg-background focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 h-11 rounded-xl"
              />
            </div>
            <div className="space-y-2.5">
              <Label htmlFor="email" className="font-medium text-foreground/90">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@email.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
                name="email"
                className="bg-muted/40 border-muted-foreground/20 focus:bg-background focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 h-11 rounded-xl"
              />
            </div>
            <div className="space-y-2.5">
              <Label htmlFor="password" className="font-medium text-foreground/90">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  required
                  name="password"
                  className="bg-muted/40 border-muted-foreground/20 focus:bg-background focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 h-11 rounded-xl pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1.5 h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-transparent rounded-lg transition-colors cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2.5">
              <Label htmlFor="confirmPassword" className="font-medium text-foreground/90">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  name="confirmPassword"
                  className="bg-muted/40 border-muted-foreground/20 focus:bg-background focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 h-11 rounded-xl pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1.5 h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-transparent rounded-lg transition-colors cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="pt-2">
              <SignUpButton />
            </div>
          </form>

          <div className="relative pt-4 pb-2">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground font-medium tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pb-2">
            <Button
              variant="outline"
              className="h-11 bg-background hover:bg-muted/50 border-border/60 hover:border-border transition-all duration-300 rounded-xl font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              className="h-11 bg-background hover:bg-muted/50 border-border/60 hover:border-border transition-all duration-300 rounded-xl font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 text-[#1877F2] cursor-pointer"
            >
              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-2 pb-8 bg-muted/10 border-t border-border/40 mt-2">
          <div className="text-center text-[14px] text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/sign-in"
              className="text-blue-600 hover:text-blue-700 hover:underline font-semibold transition-colors"
            >
              Sign in here
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
