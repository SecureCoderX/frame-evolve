// Input Components - Phase 2 Step 2.2
// Professional file upload system with drag & drop, progress tracking, and validation

export { default as FileDragDropZone } from './FileDragDropZone';
export { default as UploadProgress } from './UploadProgress';
export { default as FileInfoDisplay } from './FileInfoDisplay';
export { default as FileBrowser } from './FileBrowser';
export { default as UploadManager } from './UploadManager';

// Component usage examples:

/*
// Basic drag & drop zone
<FileDragDropZone
  onFileSelect={(file) => console.log('Selected:', file)}
  onError={(error) => console.error('Error:', error)}
  accept={['video/mp4', 'video/avi']}
  maxSize={5 * 1024 * 1024 * 1024} // 5GB
/>

// Upload progress indicator
<UploadProgress
  file={selectedFile}
  progress={75}
  status="uploading"
  onCancel={() => handleCancel()}
  estimatedTime={30000}
/>

// File information display
<FileInfoDisplay
  file={selectedFile}
  metadata={{
    duration: 180,
    resolution: { width: 1920, height: 1080 },
    frameRate: 30,
    codec: 'h264'
  }}
/>

// Complete upload manager
<UploadManager
  onFileProcessed={(file, metadata) => {
    console.log('File processed:', file, metadata);
  }}
/>
*/