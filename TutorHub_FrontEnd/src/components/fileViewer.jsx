import React from 'react';

const FileViewer = ({ fileUrl }) => {
  return (
    <iframe
      src={fileUrl}
      width="100%"
      height="500px"
      title="File Viewer"
    />
  );
};

export default FileViewer;
