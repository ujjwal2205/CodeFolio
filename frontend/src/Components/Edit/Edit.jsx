import React, { useState, useContext } from "react";
import "./Edit.css";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

function Edit() {
  const { url, checkAuth } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    userName: "",
    linkedIn: "",
    x: "",
    leetCode: "",
    codeChef: "",
    codeForces: "",
  });

  const handleChange = (field, e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (field) => {
    if (!formData[field]) {
      toast.error("Field cannot be empty");
      return;
    }

    const config = { withCredentials: true };

    try {
      let response;

      switch (field) {
        case "userName":
          response = await axios.post(
            `${url}/api/change/userName`,
            { newUserName: formData.userName },
            config
          );
          break;

        case "linkedIn":
          response = await axios.post(
            `${url}/api/change/linkedInChange`,
            { handle: formData.linkedIn },
            config
          );
          break;

        case "x":
          response = await axios.post(
            `${url}/api/change/XChange`,
            { handle: formData.x },
            config
          );
          break;

        case "leetCode":
          response = await axios.post(
            `${url}/api/change/leetCodeHandle`,
            { handle: formData.leetCode },
            config
          );
          break;

        case "codeChef":
          response = await axios.post(
            `${url}/api/change/codeChefHandle`,
            { handle: formData.codeChef },
            config
          );
          break;

        default:
          response = await axios.post(
            `${url}/api/change/codeForcesHandle`,
            { handle: formData.codeForces },
            config
          );
      }

      response.data.success
        ? toast.success(response.data.message)
        : toast.error(response.data.message);

      setFormData((prev) => ({ ...prev, [field]: "" }));
      checkAuth();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="ep-container">
      <h2 className="ep-title">Edit Profile</h2>

      <EditInput
        label="Username"
        placeholder="Enter new username"
        value={formData.userName}
        onChange={(e) => handleChange("userName", e)}
        onSubmit={() => handleSubmit("userName")}
      />

      <PrefixedInput
        label="LinkedIn"
        prefix="https://linkedin.com/in/"
        value={formData.linkedIn}
        onChange={(e) => handleChange("linkedIn", e)}
        onSubmit={() => handleSubmit("linkedIn")}
      />

      <PrefixedInput
        label="X (Twitter)"
        prefix="https://x.com/"
        value={formData.x}
        onChange={(e) => handleChange("x", e)}
        onSubmit={() => handleSubmit("x")}
      />

      <PrefixedInput
        label="LeetCode"
        prefix="https://leetcode.com/"
        value={formData.leetCode}
        onChange={(e) => handleChange("leetCode", e)}
        onSubmit={() => handleSubmit("leetCode")}
      />

      <PrefixedInput
        label="CodeChef"
        prefix="https://codechef.com/users/"
        value={formData.codeChef}
        onChange={(e) => handleChange("codeChef", e)}
        onSubmit={() => handleSubmit("codeChef")}
      />

      <PrefixedInput
        label="CodeForces"
        prefix="https://codeforces.com/profile/"
        value={formData.codeForces}
        onChange={(e) => handleChange("codeForces", e)}
        onSubmit={() => handleSubmit("codeForces")}
      />
    </div>
  );
}

function EditInput({ label, placeholder, value, onChange, onSubmit }) {
  return (
    <div className="ep-field">
      <label className="ep-label">{label}</label>
      <div className="ep-inputWrap">
        <input
          className="ep-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button className="ep-btn" onClick={onSubmit}>
          Change
        </button>
      </div>
    </div>
  );
}

function PrefixedInput({ label, prefix, value, onChange, onSubmit }) {
  return (
    <div className="ep-field">
      <label className="ep-label">{label}</label>
      <div className="ep-inputWrap">
        <span className="ep-prefix">{prefix}</span>
        <input
          className="ep-input"
          value={value}
          onChange={onChange}
        />
        <button className="ep-btn" onClick={onSubmit}>
          Change
        </button>
      </div>
    </div>
  );
}

export default Edit;
