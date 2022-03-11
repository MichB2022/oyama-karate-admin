import { useState } from 'react';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from './EditorToolbar';
import 'react-quill/dist/quill.snow.css';

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}

function redoChange() {
  this.quill.history.redo();
}

export const TextEditor = ({
  text,
  setText,
  label,
  placeholder,
  toolbarId
}) => {
  const [state, setState] = useState({ value: null });
  const handleChange = (value) => {
    setState({ value });
    setText(value);
  };

  const modules = {
    toolbar: {
      container: `#${toolbarId || 'toolbar'}`,
      handlers: {
        undo: undoChange,
        redo: redoChange
      }
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    }
  };

  return (
    <div className='text-editor'>
      <p>{label}</p>
      <EditorToolbar toolbarId={toolbarId} />
      <ReactQuill
        theme='snow'
        value={state.value ? state.value : text}
        onChange={handleChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default TextEditor;
