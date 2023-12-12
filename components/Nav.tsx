"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
  LiteralUnion,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  console.log(session?.user);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    fetchProviders();
  }, []);

  return (
    <nav className="w-full flex justify-between items-center p-3 px-10 shadow-md">
      <div className="flex gap-4">
        <Image
          src="/assets/images/logo.svg"
          alt="robot head logo"
          width={30}
          height={30}
        />
        <h1 className="hidden sm:block text-lg font-semibold">
          Code Chronicle
        </h1>
      </div>

      <div className="flex items-center gap-4 text-sm">
        {session?.user ? (
          <>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                <Image
                  className="fill-red-500"
                  src="/assets/icons/write.svg"
                  alt="write_icon"
                  width={20}
                  height={20}
                />
                <button className="font-medium">Write</button>
              </div>
              <button className="font-medium bg-black text-white rounded-full px-4 py-1">
                Sign Out
              </button>
            </div>
            <Image
              src={session?.user?.image}
              alt="profile picture"
              width={35}
              height={35}
              className="rounded-full"
              onClick={() => signOut()}
            />
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    className="font-medium bg-black text-white rounded-full px-4"
                    onClick={() => signIn(provider.id)}
                    key={provider.name}
                  >
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
