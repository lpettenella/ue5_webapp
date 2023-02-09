import React, { useEffect, useState } from 'react'
import { SendToUE } from '../peer-stream';

function Create({isAuthenticated}: any) {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setFile(selectedFile!)
  
    if (selectedFile) {
      setUrl(URL.createObjectURL(selectedFile))
    }
  }

  return(
    <div className="app-body">
      <div>
        <input type="file" onChange={handleChange} />
        {file && (
          <div>
            <a href={url}>{url}</a>
            <button id="change_color_btn" onClick={(e) => {
              let button = e.currentTarget.classList
              button.add("disabled")
              SendToUE("data_response@" + url)
              button.remove("disabled")               
            }}>Change Color</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Create