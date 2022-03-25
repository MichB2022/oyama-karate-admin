import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import Compressor from 'compressorjs';
import EditorToolbar, { formats } from './EditorToolbar';
import 'react-quill/dist/quill.snow.css';
import { httpRequest } from '../../utils/requests';
import { API_UPLOADS_URL } from '../../configs/api';

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}

function redoChange() {
  this.quill.history.redo();
}

const modules = {
  toolbar: {
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

export const TextEditor = ({
  text,
  setText,
  label,
  placeholder,
  toolbarId,
  imageUpload
}) => {
  // let quillObj = null;
  const quillObj = useRef();
  const [state, setState] = useState({ value: null });
  const handleChange = (value) => {
    setState({ value });
    setText(value);
  };

  modules.toolbar.container = `#${toolbarId || 'toolbar'}`;

  modules.toolbar.handlers.image = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      var file = input.files[0];

      const data = new FormData();
      data.append('img', file);
      const url = await new Promise(async (resolve, reject) => {
        const result = await httpRequest('POST', '/images', data);
        resolve(`${API_UPLOADS_URL}${result.data.data.url}`);
      });

      const range = quillObj.current.getEditorSelection();
      quillObj.current.getEditor().insertEmbed(range.index, 'image', url);
    };
  };

  return (
    <div className='text-editor'>
      <p>{label}</p>
      <EditorToolbar toolbarId={toolbarId} imageUpload={imageUpload} />
      <ReactQuill
        ref={quillObj}
        theme='snow'
        value={state.value ? state.value : text}
        onChange={handleChange}
        placeholder={placeholder}
        modules={{
          ...modules,
          toolbar: {
            ...modules.toolbar,
            container: `#${toolbarId || 'toolbar'}`
          }
        }}
        formats={formats}
      />
    </div>
  );
};

export default TextEditor;
