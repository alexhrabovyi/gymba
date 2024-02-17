import { memo } from 'react';
import { useAsyncValue } from 'react-router-dom';

const DynamicImage = memo(({ className, alt }) => {
  let src = useAsyncValue();

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
