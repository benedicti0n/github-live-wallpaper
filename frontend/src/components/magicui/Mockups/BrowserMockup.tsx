import { ReactNode } from 'react'

interface IBrowserMockupProps {
  children?: ReactNode;
  imageUrl?: string;
  onClick?: () => void
}

const BrowserMockup = ({ children, imageUrl, onClick }: IBrowserMockupProps) => {
  return (
    <div className="mockup-browser border-base-300 border bg-background relative">
      <div className="mockup-browser-toolbar">
        <div className="input text-secondary">https://gitpaper.kasukabelabs.com</div>
      </div>
      <div className="grid w-full" onClick={(e) => e.stopPropagation()}>
        {children}
        {imageUrl && <img src={`${imageUrl}`} onClick={onClick} />}
      </div>
    </div>
  )
}

export default BrowserMockup