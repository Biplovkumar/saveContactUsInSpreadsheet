import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

let url = 'https://script.google.com/macros/s/AKfycbz5rOYRRfTikBJBIcoxOefUOTao37AlkelYJ14-R0b39JoRSFyYmnr1cJXz536I9ZYj/exec'

const ContactUs = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('phone', formData.phone);

        try {

            fetch(url, { method: 'POST', body: data })
                .then(response => {
                    if (response.ok === true) {
                        navigate('/Detail', { state: formData })
                    }
                    else {
                        alert("error while submitting data")
                    }
                })
                .catch((error) => {
                    console.log("Error", error);
                })
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <br />
            <label>
                Phone:
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ContactUs;