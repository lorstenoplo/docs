import Login from "../../components/Login";
import { useSession, getSession, signOut } from "next-auth/client";
import Link from "next/link";
import TextEditor from "../../components/TextEditor";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button } from "@material-ui/core";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";

const Doc = () => {
  const [session] = useSession();
  const router = useRouter();

  if (!session) return <Login />;
  const [snapshot, loadingSnapshot] = useDocumentOnce(
    db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .doc(router.query.id as string)
  );

  if (loadingSnapshot) {
    return <p>Loading..</p>;
  }

  if (!snapshot.data().fileName) {
    router.replace("/");
  }

  return (
    <div>
      <Head>
        <title>{snapshot.data().fileName}</title>
      </Head>
      <header className="flex justify-between items-center p-3 pb-1">
        <Link href="/">
          <a>
            <DescriptionRoundedIcon
              style={{ color: "rgba(33, 150, 243)", fontSize: "48px" }}
              fontSize="large"
            />
          </a>
        </Link>

        <div className="flex-grow px-2">
          <h2>{snapshot.data().fileName}</h2>
          <div className="items-center hidden md:flex text-sm space-x-1 h-8 text-gray-600 -ml-2">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">Insert</p>
            <p className="option">View</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>

        <Button
          startIcon={<PeopleAltRoundedIcon />}
          className="!hidden md:!inline-flex h-10"
          variant="contained"
          color="primary"
        >
          Share
        </Button>

        <img
          src={session.user.image}
          alt="user_logo"
          className="rounded-full cursor-pointer h-10 w-10 ml-4 hover:ring-4 hover:ring-gray-300"
          onClick={() => signOut()}
        />
      </header>
      <TextEditor />
    </div>
  );
};

export default Doc;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
