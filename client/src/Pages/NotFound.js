import React from "react";

function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ borderBottom: "2px solid black", padding: "3px" }}>
        404 - Page Not Found
      </h1>
    </div>
  );
}

export default NotFound;
