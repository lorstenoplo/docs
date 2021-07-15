import React from "react";
import { Button } from "@material-ui/core";
import Image from "next/image";
import Head from "next/head";
import { providers, signIn, getSession, csrfToken } from "next-auth/client";

function signin({ providers }) {
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

      {Object.values(providers).map((provider) => {
        return (
          <div key={(provider as any).name}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => signIn((provider as any).id)}
              className="!mt-4 !w-56"
            >
              Login with Google
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default signin;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      providers: await providers(),
      csrfToken: await csrfToken(context),
    },
  };
}
