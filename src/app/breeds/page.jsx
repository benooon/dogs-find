"use client"

import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

 function SerachCategory({categoreyOptions}) {
  return (
    <Stack spacing={2} sx={{ width: 200 }} className='serachBar'>
      <Autocomplete
        id="categorey"
        categorey
        options={categoreyOptions.map((option) => option.strCategory)}
        renderInput={(params) => <TextField {...params} label="categorey" />}
      />

    </Stack>
  );
}




function CategoryCard({imgUrl,title,description}) {
  return (
    <Card sx={{ maxWidth: 345 }} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="90"
          image={imgUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body4" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


export default function Breeds() {
    const [dogs, setDogs] = useState([]);

  
    useEffect(() => {
      async function fetchData() {
        try {
            debugger
          const response = await fetch("https://dogs-api-production-c2fe.up.railway.app/dogs/breed");
          const data = await response.json();
          setDogs(data);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }, []);

    return (
      <div className='main'>
        <Grid container spacing={1}>
        {dogs.map((dog) => (
     <Grid item key={dog.id} xs={12} sm={6} md={4} lg={3}>
          <CategoryCard key={dog.id} imgUrl={dog.image_link} title={dog.name} description={dog.description.substring(0, 150)+"..."} />
          </Grid>
       
        ))}
   </Grid>   
   </div>
    );
  }