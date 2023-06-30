"use client"
import React, { useEffect, useState } from 'react';
export default function BreedProfile({ params }) {
    const [dog, setDog] = useState([]);

    const dogName = params.name;
    const url = `https://api.api-ninjas.com/v1/dogs?name=${dogName}`;
  
    async function fetchData() {
      try {
        debugger
        const response = await fetch(url, {
          method: "GET",
          withCredentials: true,
          headers: {
            'X-Api-Key': 'zbVtT4sHgua4DpR1whcP8g==FCUerIXT1k940ngW',
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        console.log(data);
        setDog(data)
      } catch (error) {
        console.error(error);
      }
    }
  
    useEffect(() => {
      fetchData();
    }, []);
  
    return (<div>
        
    </div>
    );
  }
  