import React, { useEffect, useState } from 'react'
import { SendToUE } from '../peer-stream';

function Create({isAuthenticated}: any) {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file!);
  };

  useEffect(() => {
    if (!file) return 

    const url = URL.createObjectURL(new Blob([file], { type: 'model/gltf-binary' }))
    setUrl(url);
    
  }, [file]);

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {url && (
        <a href={url}>
          Download
          {file?.name}
        </a>
      )}
    </div>
  );
}

export default Create