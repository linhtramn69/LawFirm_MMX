import { EditorState } from 'draft-js';
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';

function Description() {
  
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  
  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
       
      />
    </>
  );
}

export default Description;