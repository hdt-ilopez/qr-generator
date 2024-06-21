import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import QRCode from 'qrcode';
import QRCodeSVG from 'qrcode-svg';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [fileType, setFileType] = useState('png');

  const generateQrCode = async () => {
    if (!inputValue) {
      toast.error('Please enter a valid web url');
      return;
    }

    try {
      let qrCodeData;
      const fileName = `qrcode.${fileType}`;

      if (fileType === 'png' || fileType === 'jpg') {
        qrCodeData = await QRCode.toDataURL(inputValue, {
          type: fileType === 'png' ? 'image/png' : 'image/jpeg',
        });
        downloadQRCode(qrCodeData, fileName, fileType);
      } else if (fileType === 'svg') {
        const qrCodeSvg = new QRCodeSVG(inputValue);
        qrCodeData = qrCodeSvg.svg();
        const blob = new Blob([qrCodeData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        downloadQRCode(url, fileName, fileType);
      } else {
        toast.error('Unsupported file type');
      }
    } catch (error) {
      toast.error('Failed to generate QR code');
    }
  };

  const downloadQRCode = (dataUrl, fileName) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gradient-to-tr from-red-500 to-blue-700 h-screen w-full flex justify-center items-center p-4">
      <div className=" bg-white-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100 w-full md:w-1/3 h-96 p-4">
        <div className="flex justify-evenly flex-col w-full h-full items-center">
          <div className="text-center text-white">
            <h1 className=" font-bold text-center text-2xl mb-2">
              Website to Qr-Code Generator
            </h1>
            <p className="text-sm">Please enter a web address below</p>
          </div>
          <div className="w-full flex flex-col gap-4 items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="www.website.com"
              className="input input-ghost w-full text-white bg border-gray-100 focus-within:bg-gray-900/20 focus-within:text-white placeholder:text-gray-100"
            />
            <div className="custom-select">
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="select select-ghost bg-transparent text-white hover:bg-transparent focus-within:outline-none focus:border-none focus:text-white w-24"
              >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="svg">SVG</option>
              </select>
            </div>
          </div>
          <div>
            <button
              onClick={generateQrCode}
              className="btn bg-gray-50 text-black border-none font-bold hover:bg-gray-200"
            >
              Generate Qr-Code
            </button>
          </div>
        </div>
      </div>
      <Toaster />
      <div className="absolute bottom-10">
        <p
          onClick={() => (window.location.href = 'https://illuminatemybiz.com')}
          className="font-bold text-white cursor-pointer"
        >
          Made by Izaac Lopez
        </p>
      </div>
    </div>
  );
};

export default App;
