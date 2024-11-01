import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserDetails () {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState(""); 
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState(""); 
    const [city, setCity] = useState("");
    const [county, setCounty] =useState("");
    const [postcode, setPostcode] = useState("");
    const [country, setCountry] = useState("");
    const navigate = useNavigate();

    const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            username: username,
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            email: email,
            phone_number: phoneNumber,
            address_line_1: addressLine1,
            address_line_2: addressLine2,
            address_city: city,
            address_county: county,
            address_postcode: postcode,
            address_country: country,
        })
    };

    const handleSubmit = async () => {
        const res = await fetch('http://localhost:3001/users/userDetails', requestOptions);
        if (res.ok) {
            navigate('/profile');
        }
    };

    return (
        <section>
            <h1 id="userDetails">User Details</h1>
            <form onSubmit={handleSubmit} id="user-details">
                <p id="statement">Required fields are followed by <span className="required">*</span></p>
                <h2 id="personal">Personal Information</h2>
                <label for="username" className="userDetails-personal">Username: <span className="required">*</span></label>
                <input id="username" type="text" name="username" onChange={(e) => setUsername(e.target.value)} required/>
                <br/>
                <label for="first_name" className="userDetails-personal">First Name: <span className="required">*</span></label>
                <input id="first_name" type="text" name="first_name" onChange={(e) => setFirstName(e.target.value)} required/>
                <br/>
                <label for="middle_name" className="userDetails-personal">Middle Name: </label>
                <input id="middle_name" type="text" name="middle_name" onChange={(e) => setMiddleName(e.target.value)}/>
                <br/>
                <label for="last_name" className="userDetails-personal">Last Name: <span className="required">*</span></label>
                <input id="last_name" type="text" name="last_name" onChange={(e) => setLastName(e.target.value)} required/>
                <br/>
                <label for="email" className="userDetails-personal">Email: <span className="required">*</span></label>
                <input id="email" type="text" name="email" onChange={(e) => setEmail(e.target.value)} required/>
                <br/>
                <label for="phone_number" className="userDetails-personal">Phone Number: <span className="required">*</span></label>
                <input id="phone_number" type="text" name="phone_number" onChange={(e) => setPhoneNumber(e.target.value)} required/>

                <h2 id="address">Address Information</h2>
                <label for="address_line_1" className="userDetails-address">Address Line 1: <span className="required">*</span></label>
                <input id="address_line_1" type="text" name="address_line_1" onChange={(e) => setAddressLine1(e.target.value)} required/>
                <br/>
                <label for="address_line_2" className="userDetails-address">Address Line 2: </label>
                <input id="address_line_2" type="text" name="address_line_2" onChange={(e) => setAddressLine2(e.target.value)}/>
                <br/>
                <label for="address_city" className="userDetails-address">Address City: <span className="required">*</span></label>
                <input id="address_city" type="text" name="address_city" onChange={(e) => setCity(e.target.value)} required/>
                <br/>
                <label for="address_county" className="userDetails-address">Address County: <span className="required">*</span></label>
                <input id="address_county" type="text" name="address_country" onChange={(e) => setCounty(e.target.value)} required/>
                <br/>
                <label for="address_postcode" className="userDetails-address">Address PostCode: <span className="required">*</span></label>
                <input id="address_postcode" type="text" name="address_postcode" onChange={(e) => setPostcode(e.target.value)} required />
                <br/>
                <label for="address_country" className="userDetails-address">Address Country: <span className="required">*</span></label>
                <input id="address_country" type="text" name="address_country" onChange={(e) => setCountry(e.target.value)} required/>
                <br/>
                <button id="userDetails-submit" type="button" onClick={handleSubmit}>Submit</button>
            </form>
        </section>
    )
}