import React from "react";
import firebase from "firebase";
import { useRouter } from "next/router";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { IconButton } from "@material-ui/core";
import MoreVertRounded from "@material-ui/icons/MoreVertRounded";
import { useSession } from "next-auth/client";

type Props = {
  doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
};

const DocumentRow: React.FC<Props> = ({ doc }) => {
  const id = doc.id;
  const { fileName, timestamp } = doc.data();
  const router = useRouter();
  const [session] = useSession();

  return (
    <div
      onClick={() => router.push(`/doc/${id}`)}
      className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer"
    >
      <AssignmentIcon
        style={{ color: "rgba(33, 150, 243)", fontSize: "30px" }}
      />
      <p className="flex-grow pl-5 pr-10 w-10 truncate">{fileName}</p>
      <p className="pr-5 text-sm">{timestamp.toDate().toLocaleDateString()}</p>
      <IconButton>
        <MoreVertRounded />
      </IconButton>
    </div>
  );
};

export default DocumentRow;
