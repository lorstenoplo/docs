import React from "react";
import firebase from "firebase";
import { useRouter } from "next/router";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { db } from "../firebase";
import { useSession } from "next-auth/client";

type Props = {
  doc: any;
};

const DocumentRow: React.FC<Props> = ({ doc }) => {
  const id = doc.id;
  const { fileName, timestamp } = doc.data;
  const router = useRouter();
  const [session] = useSession();

  const deleteDoc = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    return db
      .collection("userDocs")
      .doc(session?.user?.email)
      .collection("docs")
      .doc(id)
      .delete();
  };

  return (
    <div
      onClick={() => router.push(`/doc/${id}`)}
      className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer"
    >
      <AssignmentIcon
        style={{ color: "rgba(33, 150, 243)", fontSize: "30px" }}
      />
      <p className="flex-grow pl-5 pr-10 w-10 truncate">{fileName}</p>
      <p className="pr-5 text-sm">{timestamp?.toDate().toLocaleDateString()}</p>
      <IconButton onClick={deleteDoc}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default DocumentRow;
