import React from "react";
import { signIn } from "next-auth/client";
import { Button } from "@material-ui/core";
import Image from "next/image";
import Head from "next/head";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Login | Docsu</title>
      </Head>
      <Image
        src="https://links.papareact.com/1ui"
        height="300"
        width="550"
        objectFit="contain"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => signIn()}
        className="!mt-4 !w-56"
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
