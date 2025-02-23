import React from "react";
import Navbar from "./navigation";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductList from "../body/task1/ProductList";
import StoreCreate from "../body/task1/StoreCreate";
import ProductDetail from "../body/task1/ProductDetail";
import Test from "../body/task1/test";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Home = () => <h1 className="text-center mt-10 text-2xl">Welcome to Home Page</h1>;
const About = () => <h1 className="text-center mt-10 text-2xl">About Us</h1>;
const Services = () => <h1 className="text-center mt-10 text-2xl">Our Services</h1>;
const Contact = () => <h1 className="text-center mt-10 text-2xl">Contact Us</h1>;


const Header = () => {
    return (
        <Router> {/* Router পুরো অ্যাপ জুড়ে রাখতে হবে */}
            <Navbar/>
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/StoreCreate" element={<StoreCreate/>}/>
                    <Route path="/product/:id" element={<ProductDetail />} /> {/* নতুন Route */}
                    <Route path="/products" element={<ProductList/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/services" element={<Services/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/test" element={<Test/>}/>
                </Routes>
            </div>
            <header className="bg-blue-500 text-white p-4 text-center text-xl font-bold">
                <p style={{color: "gold"}}>Welcome To My Simple App</p>
            </header>
        </Router>
    );
};

export default Header;
