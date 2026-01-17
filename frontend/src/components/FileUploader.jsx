import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '../lib/utils'

const FileUploader = ({ onFileSelect, selectedFile }) => {
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024;

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
    });

    const handleRemoveFile = (e) => {
        e.stopPropagation();
        onFileSelect?.(null);
    }

    return (
        <div className="w-full gradient-border">
            <div {...getRootProps()} className="uploader-drag-area">
                <input {...getInputProps()} />
                {selectedFile ? (
                    <div className="uploader-selected-file">
                        <img src="/pdf.png" alt="pdf" className="size-10" />
                        <div className="flex items-center space-x-3">
                            <div>
                                <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                                    {selectedFile.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {formatSize(selectedFile.size)}
                                </p>
                            </div>
                        </div>
                        <button className="p-2 cursor-pointer" onClick={handleRemoveFile}>
                            <img src="/cross.svg" alt="remove" className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                            <img src="/pdf.png" alt="upload" className="size-10" />
                        </div>
                        <p className="text-lg text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-lg text-gray-500">PDF (max {formatSize(maxFileSize)})</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default FileUploader;