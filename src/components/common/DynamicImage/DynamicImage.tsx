import { memo } from 'react';
import { useAsyncValue } from 'react-router-dom';

interface DynamicImageProps {
  className: string,
  alt: string,
}

const DynamicImage = memo<DynamicImageProps>(({ className, alt }) => {
  let src = useAsyncValue() as any;

  if (typeof src !== 'string') src = src.default;

  return (
    <img
      className={className}
      src={src}
      alt={alt}
    />
  );
});

export default DynamicImage;
