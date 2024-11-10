import React, { useState } from 'react';
import uploadArea from '../assets/upload_area.png';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const AddModel = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [booking_info, setBooking_info] = useState("Available");
  const [achievementsText, setAchievementsText] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Convertimos el texto en un array de achievements
    const achievements = achievementsText.split(',').map(achievement => achievement.trim()).filter(Boolean);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("booking_info", booking_info);
      formData.append("achievements", JSON.stringify(achievements));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/model/add", formData, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setAchievementsText("");
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          {[image1, image2, image3, image4].map((image, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img className='w-20' src={!image ? uploadArea : URL.createObjectURL(image)} alt="" />
              <input onChange={(e) => eval(`setImage${index + 1}(e.target.files[0])`)} type="file" id={`image${index + 1}`} hidden />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Model name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Booking Information</p>
          <select onChange={(e) => setBooking_info(e.target.value)} className='w-full px-3 py-2'>
            <option value="Available">Available</option>
            <option value="Not available">Not available</option>
          </select>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Achievements</p>
        <input
          type="text"
          value={achievementsText}
          onChange={(e) => setAchievementsText(e.target.value)}
          placeholder="Enter achievements separated by commas"
          className='w-full max-w-[500px] px-3 py-2'
        />
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  );
};

export default AddModel;
