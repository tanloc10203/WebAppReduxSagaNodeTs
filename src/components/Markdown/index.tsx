import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Editor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { FileLoader, UploadAdapter } from '@ckeditor/ckeditor5-upload/src/filerepository';
import EventInfo from '@ckeditor/ckeditor5-utils/src/eventinfo';
import { uploadImgApi } from 'api';
import { FileResponse } from 'models';

const URL_IMG = process.env.REACT_APP_URL_IMG;

export interface MarkdownProps {
  value: string;
  onChangeValueInput?: (event: EventInfo, editor: Editor) => void;
}

function Markdown({ value, onChangeValueInput }: MarkdownProps) {
  const uploadAdapter = (loader: FileLoader) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          loader.file.then(async (file: File | null) => {
            try {
              if (file) {
                const response: FileResponse = await uploadImgApi.post(file);

                resolve({
                  default: `${URL_IMG}${response.filename}`,
                });
              }
            } catch (error) {
              reject(error);
            }
          });
        });
      },
    };
  };

  function uploadPlugin(editor: Editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: FileLoader) => {
      return uploadAdapter(loader) as UploadAdapter;
    };
  }

  return (
    <div className="App">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={onChangeValueInput}
        config={{
          extraPlugins: [uploadPlugin],
        }}
      />
    </div>
  );
}

export default Markdown;
