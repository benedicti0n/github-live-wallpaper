<<<<<<< HEAD:app/page.tsx
import Homepage from "./components/Homepage";

export default function Home() {
=======
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import React, { useRef } from 'react';
import { GithubGraph } from './components/ui/github';


const App = () => {
  const componentRef = useRef();

>>>>>>> parent of e7aa3e7 (app simplified):src/App.tsx
  return (
    <React.Fragment>
      <div ref={componentRef}>
        <GithubGraph username="benedicti0n" />
      </div>
      <button onClick={() => exportComponentAsJPEG(componentRef)}>
        Export As JPEG
      </button>
      <button onClick={() => exportComponentAsPDF(componentRef)}>
        Export As PDF
      </button>
      <button onClick={() => exportComponentAsPNG(componentRef)}>
        Export As PNG
      </button>
    </React.Fragment>
  );
}
