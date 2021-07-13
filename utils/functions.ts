import { db } from "../firebase";

export const deleteDoc = ({ id, email }: { id: string; email: string }) => {
  return db
    .collection("userDocs")
    .doc(email)
    .collection("docs")
    .doc(id)
    .delete();
};
