import React from "react";

function Header() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="text-4xl font-extrabold tracking-tight lg:text-5xl flex justify-center"
    >
      <h1>EcoScore</h1>
    </div>
  );
}

export default Header;
