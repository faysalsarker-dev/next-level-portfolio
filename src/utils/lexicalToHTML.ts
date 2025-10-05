// utils/lexicalToHTML.ts
import { $generateHtmlFromNodes } from "@lexical/html";
import { createEditor } from "lexical";

export function lexicalToHTML(content: string): string {
  if (!content) return "<p>No content available</p>";

  try {
    const editor = createEditor();
    const json = typeof content === "string" ? JSON.parse(content) : content;

    editor.setEditorState(editor.parseEditorState(json));

    const html = $generateHtmlFromNodes(editor);



editor.update(() => {
  const editorState = editor.parseEditorState(content);
  const htmlString = $generateHtmlFromNodes(editor, editorState);
  console.log(htmlString); // This will be your HTML representation
});


    return html;
  } catch (err) {
    console.error("Lexical parse error:", err);
    return "<p>Could not render content</p>";
  }
}


// Assuming you have your saved editorStateJSON
const savedEditorStateJSON = "YOUR_SAVED_LEXICAL_JSON_STRING";

const editor = createEditor(); // Create a headless editor instance
editor.update(() => {
  const editorState = editor.parseEditorState(savedEditorStateJSON);
  const htmlString = $generateHtmlFromNodes(editor, editorState);
  console.log(htmlString); // This will be your HTML representation
});