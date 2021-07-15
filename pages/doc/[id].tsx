import { Button } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import { getSession, signOut } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import TextEditor from "../../components/TextEditor";
import { db } from "../../firebase";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Doc = ({ session }) => {
  const router = useRouter();
  const classes = useStyles();

  const [snapshot, loadingSnapshot] = useDocumentOnce(
    db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .doc(router.query.id as string)
  );

  if (loadingSnapshot) {
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <Head>
          <title>Loading...</title>
        </Head>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (!snapshot.data().fileName) {
    router.replace("/");
  }

  const deleteDoc = async (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    await db
      .collection("userDocs")
      .doc(session?.user?.email)
      .collection("docs")
      .doc(router.query.id as string)
      .delete();
    router.replace("/");
  };

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
          <div className="items-center hidden md:flex text-sm space-x-1 h-8 text-gray-600 -ml-2.5">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">Insert</p>
            <p className="option">View</p>
            <p className="option">Format</p>
            <p className="option" onClick={(e) => deleteDoc(e)}>
              Delete
            </p>
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

  if (!session) {
    return {
      redirect: { destination: "/login" },
    };
  }

  return {
    props: {
      session,
    },
  };
}
