import { useRef } from "react";
import AddIcon from "@mui/icons-material/Add";

function UploadImageComponent({ image, setImage, divStyle, index, imgStyle }) {
  const inputRef = useRef(null);

  const handleBtnClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];

    // Validate each file
    const newValidFiles = files.filter((file) =>
      validTypes.includes(file.type)
    );

    console.log(files);
    // If files are valid, update the state
    if (newValidFiles.length > 0) {
      setImage({ files: newValidFiles, index });
    } else {
      alert("Only JPG, JPEG, and PNG files are allowed.");
    }
  };

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/jpeg, image/png, image/jpg"
        multiple
      />
      <div
        className={`${divStyle} rounded-full overflow-hidden min-w-0 flex-shrink-0`}
        onClick={handleBtnClick}
      >
        {image ? (
          <img
            src={image}
            className={`w-full h-full object-cover rounded-full ${imgStyle}`}
            alt="Uploaded"
            loading="lazy"
          />
        ) : (
          <AddIcon fontSize="large" className="text-secondary" />
        )}
      </div>
    </>
  );
}

export default UploadImageComponent;

//   // Function to handle individual image upload
//   const handleSetImage = ({ files, index }) => {
//     if (files.length == 1) {
//       const newImages = [...imageFiles];
//       newImages[index] = files[0];
//       setImageFiles(newImages);
//       return;
//     }
//     if (files.length == 5) {
//       setImageFiles(files);
//       return;
//     }
//     const newImages = [];
//     for (let i = 0; i < 5; i++) {
//       if (files && files[i]) {
//         newImages.push(files[i]);
//       } else {
//         newImages.push(null);
//       }
//     }
//     setImageFiles(newImages);
//   };
