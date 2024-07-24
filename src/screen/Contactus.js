import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

let url = 'https://script.google.com/macros/s/AKfycbx1YDivT32BZiFFgVrqWcS_Ctf1P-iVfI-6njiiql_rgDHpPcXMPcgzgKtxHat0eHcI/exec'


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
                .then(response => response.json())
                .then(data => {
                    if (data.result === 'success') {
                        navigate('/Detail', { state: formData });
                    } else if (data.result === 'error' && data.code === 409) {
                        alert("Data already exists");
                    } else {
                        alert("Error while submitting data");
                    }
                })
                .catch((error) => {
                    console.log("Error", error);
                    alert("An unexpected error occurred");
                });

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


// //Sheet
// name	email	phone
// a	    a@a.aa	9835773216


//Server Side Code
// var sheetName = 'Sheet1';

// var scriptProp = PropertiesService.getScriptProperties();

// function intialSetup() {
//     var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
//     scriptProp.setProperty('key', activeSpreadsheet.getId());
// }

// function doPost(e) {
//     var lock = LockService.getScriptLock();
//     lock.tryLock(10000);

//     try {
//         var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
//         var sheet = doc.getSheetByName(sheetName);
//         var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
//         var values = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();

//         // Check if the data already exists
//         var dataExists = values.some(function (row) {
//             return headers.every(function (header, index) {
//                 return e.parameter[header] == row[index];
//             });
//         });

//         if (dataExists) {
//             return ContentService
//                 .createTextOutput(JSON.stringify({ 'result': 'error', 'error': 'Data already exists', 'code': 409 }))
//                 .setMimeType(ContentService.MimeType.JSON);
//         }

//         var nextRow = sheet.getLastRow() + 1;
//         var newRow = headers.map(function (header) {
//             return header === 'timestamp' ? new Date() : e.parameter[header];
//         });

//         sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

//         return ContentService
//             .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
//             .setMimeType(ContentService.MimeType.JSON);
//     } catch (e) {
//         return ContentService
//             .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e.message, 'code': 500 }))
//             .setMimeType(ContentService.MimeType.JSON);
//     } finally {
//         lock.releaseLock();
//     }
// }
