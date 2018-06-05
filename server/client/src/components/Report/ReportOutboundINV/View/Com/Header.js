import React from "react";
import { Link } from "react-router-dom";

const Header = ({ date }) => {
  console.log(date);
  return (
    <div>
      <Link to="/report">
        <i className="medium material-icons">chevron_left</i>
      </Link>
      <h3>{date}</h3>
    </div>
  );
};

export default Header;
