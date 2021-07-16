import React, { useState, useEffect, FunctionComponent } from "react";
import MUIRichTextEditor from "mui-rte";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { db } from "../firebase";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import FormatColor from "@material-ui/icons/Palette";
import RemoveIcon from "@material-ui/icons/Remove";

const Block: FunctionComponent = () => {
  return <hr color="#2ECC40" style={{ height: 7 }} />;
};

const TextEditor: React.FC = () => {
  const defaultTheme = createTheme();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [session] = useSession();
  const router = useRouter();

  const { id } = router.query;

  const [snapshot] = useDocumentOnce(
    db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .doc(id as string)
  );

  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot?.data()?.editorState)
        )
      );
      // console.log(convertToRaw(editorState.getCurrentContent()));
    }
  }, [snapshot]);

  Object.assign(defaultTheme, {
    overrides: {
      MUIRichTextEditor: {
        toolbar: {
          borderBottom: "1px solid lightgray",
          borderTop: "1px solid lightgray",
          background: "white",
          display: "flex",
          justifyContent: "center",
          position: "sticky",
          top: 0,
        },
        editor: {
          maxWidth: "58rem",
          marginTop: "2rem",
          background: "white",
          marginLeft: "auto",
          marginRight: "auto",
          minHeight: "100vh",
          boxShadow: "rgb(60 64 67 / 15%) 0px 1px 3px 1px",
          boxSizing: "border-box",
          padding: "3.5rem",
          [defaultTheme.breakpoints.down("sm")]: {
            padding: "2rem",
          },
        },
        placeHolder: {
          marginTop: "5rem",
        },
      },
    },
  });

  const save = (data) => {
    db.collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .doc(id as string)
      .set(
        {
          editorState: JSON.parse(data),
        },
        { merge: true }
      );
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-16">
      <MuiThemeProvider theme={defaultTheme}>
        <MUIRichTextEditor
          inlineToolbar={true}
          defaultValue={JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          )}
          onSave={save}
          controls={[
            "title",
            "bold",
            "italic",
            "underline",
            "link",
            "numberList",
            "bulletList",
            "quote",
            "code",
            "clear",
            "save",
            "media",
            "strikethrough",
            "highlight",
            "change-color",
            "hr",
          ]}
          customControls={[
            {
              name: "change-color",
              icon: <FormatColor />,
              type: "inline",
              inlineStyle: {
                color: "#2ECC40",
              },
            },
            {
              name: "hr",
              icon: <RemoveIcon />,
              type: "block",
              blockWrapper: <Block />,
            },
          ]}
        />
      </MuiThemeProvider>
    </div>
  );
};

export default TextEditor;
