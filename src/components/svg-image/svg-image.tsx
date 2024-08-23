export default function SvgImage({ url, className }: { url: string; className: string }): React.ReactNode {
  return (
    <svg className={className}>
      <use xlinkHref={url} />
    </svg>
  );
}
