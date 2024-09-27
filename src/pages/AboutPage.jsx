import React from 'react';

const myPic = "https://firebasestorage.googleapis.com/v0/b/ecommerce-firebase-1d466.appspot.com/o/myPersonal%2Fabdullah.png?alt=media&token=ae65c70e-3b9c-4252-a317-c9fa8f562ad2"

const AboutPage = () => {
  return (
    <div className="sm:px-8 px-4 py-10 max-w-3xl mx-auto bg-white dark:bg-gray-800 mt-6 dark:text-gray-200 rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">About Me</h1>
      
      {/* Profile Picture Section */}
      <div className="flex justify-center mb-6">
        <img 
          src={myPic} // Replace with your actual image URL
          alt="Profile"
          className="w-32 h-32 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-125"
        />
      </div>
      
      <p className="text-lg mb-4">
        Hello! My name is Abdullah, and this project is a showcase of my skills as a web developer. 
        I specialize in frontend development using React.
      </p>
      <p className="text-lg mb-4">
        I have completed my B.Tech in Computer Science and have a strong foundation in various web technologies.
      </p>
      <p className="text-lg mb-4">
        In this project, I have utilized several core aspects of React, including:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>React Router for seamless navigation</li>
        <li>Tailwind CSS for responsive and modern UI design</li>
        <li>React Context API for state management</li>
        <li>Reducers for managing complex state logic</li>
        <li>Razorpay for payment integration</li>
        <li>Firebase as the backend for data management</li>
      </ul>
      <p className="text-lg mb-4">
        Additionally, I have hosted this project on Vercel, ensuring fast and reliable performance.
      </p>
      <p className="text-lg">
        Thank you for visiting my project, and I hope you enjoy exploring it!
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4 dark:text-white">Connect with Me</h2>
      <div className="flex gap-4">
        <a href="https://www.instagram.com/i_am_abdullahzubair" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline dark:text-blue-400">
          Instagram
        </a>
        <a href="https://www.linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline dark:text-blue-400">
          LinkedIn
        </a>
        <a href="https://github.com/mohammadabdullah8674" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline dark:text-blue-400">
          GitHub
        </a>
        <a href="https://github.com/iamabdullahzubair" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline dark:text-blue-400">
          GitHub
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
