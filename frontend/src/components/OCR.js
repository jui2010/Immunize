import React, { useEffect, useState } from 'react'
import { createWorker } from 'tesseract.js'
import img from '../assets/pan.jpg'

function OCR() {
  const worker = createWorker({
    logger: m => console.log(m),
  });
  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(img);
    setOcr(text);
  };
  const [ocr, setOcr] = useState('Recognizing...');
  useEffect(() => {
    doOCR();
  });
  return (
    <div className="OCR">
      <p>{ocr}</p>
    </div>
  );
}

export default OCR;
