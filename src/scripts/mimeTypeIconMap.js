const mimeTypeIconMap = new Map();

mimeTypeIconMap.set(
    'application/vnd.google-apps.document',
    {
      icon: 'mdi-text-box',
      color: '#4285f3',
    });
mimeTypeIconMap.set(
    'application/pdf',
    {
      icon: 'mdi-pdf-box',
      color: '#ea4435',
    });
mimeTypeIconMap.set(
    'image/png',
    {
      icon: 'mdi-image',
      color: '#da3025',
    });
mimeTypeIconMap.set(
    'image/x-raw',
    {
      icon: 'mdi-image',
      color: '#da3025',
    });
mimeTypeIconMap.set(
    'text/plain',
    {
      icon: 'mdi-file-document',
      color: '#1b73e7',
    });
mimeTypeIconMap.set(
    'application/xml',
    {
      icon: 'mdi-file-document',
      color: '#1b73e7',
    });
mimeTypeIconMap.set(
    'application/zip',
    {
      icon: 'mdi-folder-zip',
      color: '#5f6367',
    });
mimeTypeIconMap.set(
    'application/x-zip-compressed',
    {
      icon: 'mdi-folder-zip',
      color: '#5f6367',
    });
mimeTypeIconMap.set(
    'application/octet-stream',
    {
      icon: 'mdi-file',
      color: '#1b73e7',
    });
mimeTypeIconMap.set(
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    {
      icon: 'mdi-file-word-box',
      color: '#1b73e7',
    });

exports.mimeTypeIconMap = mimeTypeIconMap;
