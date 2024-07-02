import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProfile } from "@/store/userProfiles";
import { IUserProfile } from "@/types/UserProfile";
import { RootState, AppDispatch } from '@store/store';

interface UserProfileFormProps {}

const UserProfileForm: React.FC<UserProfileFormProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.userProfiles.loading);

  const [profile, setProfile] = useState<IUserProfile>({
    name: "",
    email: "",
    age: 0,
    tags: [],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    name: "",
    email: "",
    age: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const isValid = profile.name == "" || profile.email == "" ? false : Object.values(errors).every((error) => error === '');
    setIsButtonDisabled(!isValid);
  }, [errors, profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Clear previous error message for the field
    setErrors({ ...errors, [name]: "" });

    // Update profile state based on input name
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: name === "age" ? Number(value) : value, // Convert 'age' to number if needed
    }));

    // Validate input
    if (name === "name" && value.trim() === "") {
      setErrors({ ...errors, [name]: "Name is required" });
    } else if (name === "age" && (isNaN(Number(value)) || Number(value) <= 0)) {
      setErrors({ ...errors, [name]: "Age must be a valid positive number" });
    } else if (name === "email" && value.trim() === "") {
      setErrors({ ...errors, [name]: "Email is required" });
    } else if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setErrors({ ...errors, [name]: "Email must be a valid email address" });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if there are any errors
    if (Object.values(errors).some((error) => error !== "")) {
      console.error("Form has errors. Please fix them before submitting.");
      return;
    }

    try {
      setIsButtonDisabled(true);
      await dispatch(createProfile(profile));
      setProfile({ name: "", email: "", age: 0, tags: [] });
    } catch (error) {
      console.error("Failed to create profile:", error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Enter Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Type Your Name"
          required
        />
        {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Enter Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@email.com"
          required
        />
        {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Enter Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={profile.age}
          onChange={handleChange}
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.age && <div style={{ color: "red" }}>{errors.age}</div>}
      </div>
      {isButtonDisabled}
      <button
        disabled={isButtonDisabled}
        type="submit"
        className={`mt-5 disabled:bg-gray-400 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
          isButtonDisabled ? "pointer-events-none cursor-not-allowed" : ""
        }`}
      > 
        {
          loading && 
          <svg v-if="" aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
          </svg>
        }

        Submit
      </button>
    </form>
  );
};

export default UserProfileForm;
