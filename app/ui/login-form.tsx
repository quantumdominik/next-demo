'use client';

import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();



  const handleTwitterSignIn = async () => {
    console.log('Initiating Twitter sign-in');
    try {
      const result = await signIn('twitter', { callbackUrl: '/dashboard' });
      console.log('Sign-in result:', result);
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <form className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full">
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div className="mt-6 flex flex-col items-center space-y-4">
          <div className="text-sm text-gray-500">Or</div>
          <button
            className="flex items-center justify-center w-full px-4 py-2 text-white bg-[#1DA1F2] rounded-md hover:bg-[#1a91da] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1DA1F2]"
            onClick={(e) => {
              e.preventDefault();
              handleTwitterSignIn();
            }}
          >
            <Image
              src="/twitter-logo.png"
              alt="Twitter Logo"
              width={20}
              height={20}
              className="mr-2"
            />
            Sign in with Twitter
          </button>
          <div className="text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
