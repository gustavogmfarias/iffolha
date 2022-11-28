import { Avatar } from "@chakra-ui/react";
import { useState } from "react";

export function UploadImage() {
  const [imgfile, uploadimg] = useState([]);
  console.log("Image FIles", imgfile);
  const imgFilehandler = (e) => {
    if (e.target.files.length !== 0) {
      uploadimg((imgfile) => [
        ...imgfile,
        URL.createObjectURL(e.target.files[0]),
      ]);
    }
  };
  return (
    <div className="App">
      <div>
        <center>
          <h2>Upload</h2>
          <input type="file" onChange={imgFilehandler} />
          <hr />
          <h2>Preview</h2>
          {imgfile.map((elem) => {
            return (
              <>
                <span key={elem}>
                  <Avatar src={elem} />
                </span>
              </>
            );
          })}
        </center>
      </div>
    </div>
  );
}
