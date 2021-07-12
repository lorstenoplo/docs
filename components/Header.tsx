import { IconButton } from "@material-ui/core";
import AppsRoundedIcon from "@material-ui/icons/AppsRounded";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { signOut, useSession } from "next-auth/client";
import React from "react";

const Header = () => {
  const [session] = useSession();

  return (
    <header className="sticky top-0 z-50 px-4 py-2  shadow-md flex items-center bg-white">
      <IconButton className="!hidden sm:!flex border-0 mr-2">
        <MenuRoundedIcon />
      </IconButton>
      <DescriptionRoundedIcon
        style={{ color: "rgba(33, 150, 243)" }}
        fontSize="large"
      />
      <h1 className="hidden md:!inline-flex ml-2 text-gray-700 text-xl">
        Docs
      </h1>

      {/* search box */}
      <div className="flex flex-grow mx-2 md:!mx-10 items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-md focus-within:shadow-md focus-within:text-black focus-within:ring-gray-100 focus-within:ring-2">
        <SearchRoundedIcon />
        <input
          type="text"
          placeholder="Search"
          className="flex-grow px-2 sm:!px-5 bg-transparent text-base outline-none"
        />
      </div>

      <IconButton className="!hidden sm:!flex ml-5 md:!ml-20 border-0 mr-2">
        <AppsRoundedIcon fontSize="medium" />
      </IconButton>

      <img
        src={session?.user?.image}
        alt="user_logo"
        className="cursor-pointer h-9 w-9 rounded-full ml-2 hover:ring-4 hover:ring-gray-300"
        loading="lazy"
        onClick={() => signOut()}
      />
    </header>
  );
};

export default Header;
