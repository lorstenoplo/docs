import React, { useState } from "react";
import firebase from "firebase";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSession } from "next-auth/client";
import { deleteDoc } from "../utils/functions";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useRouter } from "next/router";

type Props = {
  doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
};

const DocumentRow: React.FC<Props> = ({ doc }) => {
  const id = doc.id;
  const { fileName, timestamp } = doc.data();
  const [session] = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const alertBox = (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete the document?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Remember once you delete the document its gone. We do not store any
          copy of the document that you delete, we simply delete it from our
          database.
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ paddingRight: 30, paddingBottom: 15 }}>
        <Button onClick={handleClose} color="primary" autoFocus>
          Cancel
        </Button>
        <Button
          onClick={() => deleteDoc({ email: session.user.email, id })}
          color="secondary"
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      {alertBox}
      <div
        className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer"
        onClick={() => router.push(`/doc/${id}`)}
      >
        <AssignmentIcon
          style={{ color: "rgba(33, 150, 243)", fontSize: "30px" }}
        />

        <p className="flex-grow pl-5 pr-10 w-10 truncate">{fileName}</p>
        <p className="pr-5 text-sm">
          {timestamp?.toDate().toLocaleDateString()}
        </p>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleClickOpen();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </>
  );
};

export default DocumentRow;
