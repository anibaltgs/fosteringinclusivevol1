import type React from 'react';

interface VideoProps {
  src: string;
  title: string;
}

const Video: React.FC<VideoProps> = ({ src, title }) => {
  return (
    <div className='relative aspect-video w-full'>
      <video
        className='h-full w-full'
        controls
        preload='metadata'
        title={title}
      >
        <source src={src} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
