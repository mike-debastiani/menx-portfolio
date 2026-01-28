export interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`border-t border-primary-200 py-5 ${className}`} style={{ borderTopWidth: '0.5px' }}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <p className="font-mono font-normal text-xs min-[450px]:text-sm leading-[1.4] text-primary-350">
          © 2026 Mike De Bastiani. All rights reserved.
        </p>
        <p className="hidden min-[800px]:block font-mono font-normal text-sm leading-[1.4] text-primary-350">
          Canton of Aargau, Switzerland
        </p>
      </div>
    </footer>
  );
}