import { ReactNode } from 'react'

interface IBrowserMockupProps {
  children: ReactNode;
}

const BrowserMockup = ({ children }: IBrowserMockupProps) => {
  return (
    <div className="mockup-browser border-base-300 border w-9/10 bg-background relative">
      <div className="mockup-browser-toolbar">
        <div className="input text-secondary">https://gitpaper.kasukabelabs.com</div>
      </div>
      <div className="grid w-full" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default BrowserMockup