import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/userSlice'
import Nav from './Nav';

const Home = () => {

  const user = useSelector((store) => store?.user?.User)
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch()
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    setPrediction(null);

    // Create a FormData object and append the file
    const fileInput = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
      const response = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setPrediction(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <Nav user={user} />
      <div className="flex flex-col items-center justify-center min-h-screen">
      <center>
            <h1 className="text-2xl font-bold mb-4 pt-5">Plant Leaf Disease Detection</h1>
          </center>
      <form>
        
        
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input type="file"  onChange={handleFileChange} className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100
      "/>
          </label>
          
          {preview && (
            <>
            <div className="flex flex-col items-center justify-center">
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Selected"
                  className="w-48 h-48 object-cover rounded-md border border-gray-300"
                />
              </div>
              
              <button
                type="button"
                onClick={handlePredict}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                disabled={loading}
              >
                {loading ? "Predicting..." : "Predict"}
              </button>
             

          {error && <p className="text-red-500 mt-2">{error}</p>}
          {prediction && (
            <p className="text-blue-500 font-bold mt-2">
              Predicted Disease: {prediction}
            </p>
          )}
         </div>
            </>
          )}
      </form>
      </div>
    </div>

  )
}
export default Home
