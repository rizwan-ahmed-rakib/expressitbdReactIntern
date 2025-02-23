import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Row, Col, Spinner } from "react-bootstrap";

const StoreCreate = () => {
  // স্টেট ডিক্লেয়ার
  const [storeData, setStoreData] = useState({
    name: "",
    domain: "",
    currency: "BDT",
    country: "Bangladesh",
    category: "Fashion",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [domainChecking, setDomainChecking] = useState(false);
  const [domainMessage, setDomainMessage] = useState("");

  // ইনপুট চেঞ্জ হ্যান্ডলার
  const handleChange = (e) => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  // ✅ **ডোমেইন চেক করার ফাংশন**
  const checkDomainAvailability = async () => {
    if (!storeData.domain) {
      setDomainMessage("⚠️ দয়া করে একটি ডোমেইন লিখুন!");
      return;
    }

    setDomainChecking(true);
    setDomainMessage("");

    try {
      const domainCheckUrl = `https://interview-task-green.vercel.app/task/domains/check/${storeData.domain}.expressitbd.com`;
      const response = await axios.get(domainCheckUrl);

      if (response.data.data.taken) {
        setDomainMessage("❌ এই ডোমেইনটি ইতিমধ্যেই নেওয়া হয়েছে!");
      } else {
        setDomainMessage("✅ এই ডোমেইনটি ফ্রি আছে!");
      }
    } catch (err) {
      setDomainMessage("⚠️ ডোমেইন চেক করতে সমস্যা হয়েছে!");
    } finally {
      setDomainChecking(false);
    }
  };

  // ✅ **স্টোর তৈরি করার ফাংশন**
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (domainMessage.includes("❌")) {
      setError("⚠️ দয়া করে অন্য ডোমেইন চেষ্টা করুন, এটি ইতিমধ্যেই নেওয়া হয়েছে!");
      setLoading(false);
      return;
    }

    try {
      const storeCreateUrl = "https://interview-task-green.vercel.app/task/stores/create";
      const response = await axios.post(storeCreateUrl, storeData);

      if (response.status === 200) {
        setSuccess("✅ Store সফলভাবে তৈরি হয়েছে!");
        setStoreData({ name: "", domain: "", currency: "BDT", country: "Bangladesh", category: "Fashion", email: "" });
      }
    } catch (err) {
      setError("⚠️ কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Create a Store</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Give your online store a name</Form.Label>
              <Form.Control type="text" name="name" value={storeData.name} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Your online store subdomain</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  name="domain"
                  value={storeData.domain}
                  onChange={handleChange}
                  required
                />
                <span className="ms-2 mt-2">.expressitbd.com</span>
                <Button variant="info" className="ms-2" onClick={checkDomainAvailability} disabled={domainChecking}>
                  {domainChecking ? <Spinner animation="border" size="sm" /> : "Check"}
                </Button>
              </div>
              {domainMessage && <p className="mt-2">{domainMessage}</p>}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Where's your store located?</Form.Label>
              <Form.Select name="country" value={storeData.country} onChange={handleChange}>
                <option value="Bangladesh">Bangladesh</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>What's your Category?</Form.Label>
              <Form.Select name="category" value={storeData.category} onChange={handleChange}>
                <option value="Fashion">Fashion</option>
                <option value="Electronics">Electronics</option>
                <option value="Grocery">Grocery</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Choose store currency</Form.Label>
              <Form.Select name="currency" value={storeData.currency} onChange={handleChange}>
                <option value="BDT">BDT (Taka)</option>
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Store contact email</Form.Label>
              <Form.Control type="email" name="email" value={storeData.email} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Creating Store..." : "Create Store"}
        </Button>
      </Form>
    </Container>
  );
};

export default StoreCreate;



// import { useState } from "react";
// import axios from "axios";
//
//
//
// const CreateStore = () => {
//   // 📝 State for Form Fields
//   const [storeName, setStoreName] = useState("");
//   const [domain, setDomain] = useState("");
//   const [country, setCountry] = useState("Bangladesh");
//   const [category, setCategory] = useState("Fashion");
//   const [currency, setCurrency] = useState("BDT");
//   const [email, setEmail] = useState("");
//   const [domainAvailable, setDomainAvailable] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//
//   // ✅ 🔍 **Domain Check Function**
//   const checkDomainAvailability = async () => {
//     if (!domain) return alert("⚠️ দয়া করে একটি ডোমেইন লিখুন!");
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://interview-task-green.vercel.app/task/domains/check/${domain}.expressitbd.com`
//       );
//       const isTaken = response.data.data.taken;
//       setDomainAvailable(!isTaken);
//       setMessage(isTaken ? "❌ এই ডোমেইন ইতিমধ্যে নেওয়া হয়েছে!" : "✅ ডোমেইন পাওয়া যাচ্ছে!");
//     } catch (error) {
//       setMessage("❌ ডোমেইন চেক করতে সমস্যা হচ্ছে!");
//     }
//     setLoading(false);
//   };
//
//   // ✅ 🏪 **Store Create Function**
//   const createStore = async () => {
//     if (!domainAvailable) return alert("⚠️ দয়া করে একটি ফ্রি ডোমেইন চেক করুন!");
//
//     const storeData = {
//       name: storeName,
//       currency: currency,
//       country: country,
//       domain: domain,
//       category: category,
//       email: email,
//     };
//
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "https://interview-task-green.vercel.app/task/stores/create",
//         storeData
//       );
//       if (response.data.success) {
//         setMessage("✅ Store সফলভাবে তৈরি হয়েছে!");
//       } else {
//         setMessage("❌ Store তৈরি করতে ব্যর্থ!");
//       }
//     } catch (error) {
//       setMessage("❌ Store তৈরি করতে সমস্যা হয়েছে!");
//     }
//     setLoading(false);
//   };
//
//   return (
//     <div className="container">
//       <h2>Create a Store</h2>
//       <p>Add your basic store information and complete the setup</p>
//
//       <div className="form-group">
//         <label>Give your online store a name</label>
//         <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="How'd you like to call your store?" />
//       </div>
//
//       <div className="form-group">
//         <label>Your online store subdomain</label>
//         <div className="domain-check">
//           <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Enter your domain name" />
//           <span>.expressitbd.com</span>
//           <button onClick={checkDomainAvailability} disabled={loading}>
//             {loading ? "Checking..." : "Check"}
//           </button>
//         </div>
//         {message && <p className="message">{message}</p>}
//       </div>
//
//       <div className="form-group">
//         <label>Where's your store located?</label>
//         <select value={country} onChange={(e) => setCountry(e.target.value)}>
//           <option value="Bangladesh">Bangladesh</option>
//           <option value="India">India</option>
//           <option value="USA">USA</option>
//         </select>
//       </div>
//
//       <div className="form-group">
//         <label>What's your Category?</label>
//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="Fashion">Fashion</option>
//           <option value="Electronics">Electronics</option>
//           <option value="Grocery">Grocery</option>
//         </select>
//       </div>
//
//       <div className="form-group">
//         <label>Choose store currency</label>
//         <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
//           <option value="BDT">BDT (Taka)</option>
//           <option value="USD">USD (Dollar)</option>
//         </select>
//       </div>
//
//       <div className="form-group">
//         <label>Store contact email</label>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
//       </div>
//
//       <button onClick={createStore} className="create-btn" disabled={loading || !domainAvailable}>
//         {loading ? "Creating..." : "Create Store"}
//       </button>
//     </div>
//   );
// };
//
// export default CreateStore;

