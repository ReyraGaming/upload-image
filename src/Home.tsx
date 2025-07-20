import { useState } from "react";

const styleInput:string = `rounded-md shadow-sm
    file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
    file:text-sm file:font-semibold file:bg-gray-600 file:text-gray-300
    hover:file:bg-gray-100 hover:file:text-gray-700 focus:outline-none focus:ring-2 focus-ring-gray-500`;

function Home() {
  const [image, setImage] = useState<string>('/blank-images.png')
  const [saveImage, setSaveImage]  = useState<File | null>(null);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    console.log(file)
    const uploaded = event.target.files?.[0];
    if (uploaded) {
      setImage(URL.createObjectURL(uploaded));
      setSaveImage(uploaded)
    }
  }

  function UploadImage(){
    if (!saveImage){
      alert('Please select an image first');
    } else {
      const formData = new FormData();
      formData.append('photo', saveImage);

      fetch('http://localhost:4000/api/upload/', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
       if(data.status === 'Success'){
        window.location.href = data.imageUrl;
      }
    })
    .catch(error => {
      console.error('Error uploading image:', error);
    });
   }
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="w-auto mt-5 mx-auto">
        <img src={image} alt="img-thumbnail" />
      </div>
      <div className='my-3 text-center flex flex-col justify-center items-center'>
        <label htmlFor="formFile" className="block my-3 text-sm font-medium text-gray-700">
          Upload a file
        </label>
        <input type='file' id="formFile" onChange={handleImageChange} className={`text-sm outline-none border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${styleInput}`} accept="image/*" />
        <button onClick={UploadImage} className="px-4 py-2 mt-4 rounded-md bg-gray-600 text-gray-100 font-semibold shadow hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition">
          Save My Photo
        </button>
      </div>
    </div>
  );
}

export default Home; 