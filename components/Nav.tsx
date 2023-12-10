import React from "react";
import Image from "next/image";

const Nav = () => {
  const isSignedIn = true;

  return (
    <nav className="w-full flex justify-between p-3 px-5 shadow-md">
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

      <div className="flex gap-4 text-sm">
        {isSignedIn ? (
          <>
            <div className="flex gap-1 text-gray-400 hover:text-black cursor-pointer">
              <Image
                className="fill-red-500"
                src="/assets/icons/write.svg"
                alt="write_icon"
                width={20}
                height={20}
              />
              <button>Write</button>
            </div>
            <Image
              src="/assets/images/logo.svg"
              alt="profile picture"
              width={30}
              height={30}
              className="rounded-full"
            />
          </>
        ) : (
          <>
            {" "}
            <button className="font-medium">Log In</button>
            <button className="font-medium bg-black text-white rounded-full px-4">
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
