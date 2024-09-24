import React from "react";
import { DNA } from "react-loader-spinner";

const PageLoadingComplete = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 dark:text-white">
        <h1 className="text-3xl font-bold ">Exclusive</h1>
      <div>
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
      <p className="text-base font-semibold">We are setting up your system. Please wait!!</p>
    </div>
  );
};

export default PageLoadingComplete;
