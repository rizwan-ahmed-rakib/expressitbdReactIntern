import React from "react";
import Header from "./header/header";
import Footer from "./footer/footer";
import Body from "./body/body";

const MainComponent = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <Header />

      {/* Main Body Section */}
      <div className="flex-grow">
        <Body />
      </div>

      {/* Footer Section */}

      <Footer />

    </div>
  );
};

export default MainComponent;





