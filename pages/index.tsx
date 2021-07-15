import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import FolderRoundedIcon from "@material-ui/icons/FolderRounded";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import firebase from "firebase";
import { getSession } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import DocumentRow from "../components/DocumentRow";
import Header from "../components/Header";
import { db } from "../firebase";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: "#1a73e8",
    color: "white",
    marginBottom: 15,
  },
  actions: {
    paddingRight: 25,
    paddingBottom: 15,
    marginTop: 0,
  },
  btn: {
    textTransform: "none",
    backgroundColor: "#1a73e8",
  },
}));

export default function Home({ session }) {
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const classes = useStyles();

  const [snapshot] = useCollection(
    db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .orderBy("timestamp", "desc")
  );

  const createDocument = async () => {
    if (input.trim() === "") return;

    const doc = await db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .add({
        fileName: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    setInput("");
    setOpen(false);

    const id = doc.id;
    router.push(`/doc/${id}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modal = (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className={classes.title} id="form-dialog-title">
          Create a New Doc
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new document, please enter the name of the document
            here. We will do the rest for you.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Filename"
            type="text"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createDocument()}
          />
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button style={{ textTransform: "none" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className={classes.btn}
            variant="contained"
            onClick={createDocument}
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return (
    <div>
      <Head>
        <title>Docs</title>
      </Head>

      <Header />
      {modal}

      {/* Add doc section */}
      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="py-6 flex items-center justify-between">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            <Button>
              <MoreVertIcon style={{ fontSize: "32px", color: "gray" }} />
            </Button>
          </div>

          <div>
            <div
              onClick={handleClickOpen}
              className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-600 transition-all"
            >
              <Image
                className="active:opacity-50"
                src="https://links.papareact.com/pju"
                layout="fill"
              />
            </div>

            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-10 lg:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-12">Date Created</p>
            {/* <Icon name="folder" size="3xl" color="gray" /> */}
            <FolderRoundedIcon style={{ fontSize: "32px", color: "gray" }} />
          </div>

          {snapshot?.docs?.map((doc) => (
            <DocumentRow key={doc.id} doc={doc} />
          ))}
        </div>
      </section>
    </div>
  );
}

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
