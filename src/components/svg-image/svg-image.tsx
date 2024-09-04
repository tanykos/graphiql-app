export default function SvgImage({
  url,
  className,
  ariaLabel,
}: {
  url: string;
  className: string;
  ariaLabel?: string;
}): React.ReactNode {
  return (
    <svg className={className} role="img" {...(ariaLabel && { 'aria-label': ariaLabel })}>
      <use xlinkHref={url} />
    </svg>
  );
}
