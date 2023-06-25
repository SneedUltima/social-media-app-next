import React from "react";
import Buzz from "./Buzz";

const Buzzes = ({ buzzes, setBuzzes }) => {
  return (
    <>
      {buzzes.map((buzz) => (
        <div key={buzz._id}>
          <Buzz buzz={buzz} setBuzzes={setBuzzes} />
        </div>
      ))}
    </>
  );
};

export default Buzzes;
