import { useState } from 'react';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from './EditorToolbar';
import 'react-quill/dist/quill.snow.css';

export const TextEditor = ({ text, setText, label, placeholder }) => {
  const [state, setState] = useState({ value: null });
  const handleChange = (value) => {
    setState({ value });
    setText(value);
  };
  return (
    <div className='text-editor'>
      <p>{label}</p>
      <EditorToolbar />
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
