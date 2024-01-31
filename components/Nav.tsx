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
import { useRouter } from "next/navigation";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const router = useRouter();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  console.log(session?.user);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    fetchProviders();
  }, []);

  useEffect(() => {
    const closeDropdown = () => {
      setToggleDropdown(false);
    };
    window.addEventListener("click", closeDropdown);
    return () => window.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <nav className="w-full flex justify-between items-center p-3 px-6 sm:px-10 shadow-md">
      <div
        className="flex gap-4 cursor-pointer"
        onClick={() => router.push("/")}
      >
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
            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center gap-4 relative">
              <div
                className="flex gap-1  cursor-pointer"
                onClick={() => router.push("/write-blog")}
              >
                <Image
                  className="fill-red-500"
                  src="/assets/icons/write.svg"
                  alt="write_icon"
                  width={20}
                  height={20}
                />
                <button className="font-medium">Write</button>
              </div>
              <button
                className="font-medium bg-black text-white rounded-full px-4 py-1"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
              <Image
                src={session?.user?.image!}
                alt="profile picture"
                width={35}
                height={35}
                className="rounded-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setToggleDropdown((prevState) => !prevState);
                }}
              />
              {toggleDropdown && (
                <div className="flex flex-col gap-2 absolute top-full -right-4 bg-white w-40 p-2 mt-2 shadow-md items-start">
                  <button
                    type="button"
                    className="flex gap-4"
                    onClick={() =>
                      router.push(
                        `/profile/${session?.user?.id}?name=${session?.user?.name}`
                      )
                    }
                  >
                    <Image
                      src="/assets/icons/profile.svg"
                      alt="profile-icon"
                      width={20}
                      height={20}
                    />
                    Profile
                  </button>
                  <button
                    className="flex gap-4"
                    onClick={() => router.push("/library")}
                  >
                    <Image
                      src="/assets/icons/bookmark.svg"
                      alt="bookmark icon"
                      width={20}
                      height={20}
                    />
                    Library
                  </button>
                </div>
              )}
            </div>
            {/* Mobile Navigation */}
            <div className="relative sm:hidden">
              <Image
                src={session?.user?.image!}
                alt="profile picture"
                width={35}
                height={35}
                className="rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setToggleDropdown((prevState) => !prevState);
                }}
              />
              {toggleDropdown && (
                <div className="flex flex-col gap-2 absolute top-full right-0 bg-white w-32 p-2 mt-2 shadow-md z-10">
                  <div
                    className="flex gap-4"
                    onClick={() => router.push("/write-blog")}
                  >
                    <Image
                      className="fill-red-500"
                      src="/assets/icons/write.svg"
                      alt="write_icon"
                      width={20}
                      height={20}
                    />
                    <button className="font-medium">Write</button>
                  </div>
                  <button
                    type="button"
                    className="flex gap-4"
                    onClick={() =>
                      router.push(
                        `/profile/${session?.user?.id}?name=${session?.user?.name}`
                      )
                    }
                  >
                    <Image
                      src="/assets/icons/profile.svg"
                      alt="profile-icon"
                      width={20}
                      height={20}
                    />
                    Profile
                  </button>
                  <button
                    className="flex gap-4"
                    onClick={() => router.push("/library")}
                  >
                    <Image
                      src="/assets/icons/bookmark.svg"
                      alt="bookmark icon"
                      width={20}
                      height={20}
                    />
                    Library
                  </button>
                  <button
                    className="font-medium bg-black text-white rounded-full px-4 py-1"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>{" "}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    className="font-medium bg-black text-white rounded-full px-4 py-1"
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
