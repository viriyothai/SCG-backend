# Backend application

> To get data from Google map API
> API document [_here_](https://developers.google.com/maps/documentation/places/web-service/search-nearby#maps_http_places_nearbysearch-js).

## Technologies Used

- Node.js
- Redis
- Clean architecture

## Installation Guide

- clone the project
- set the Google map API key in .env file
- setup Redis server and client [_here_](https://redis.io/docs/getting-started/installation/)
- run the application with npm start or npm run startdev for developing mode # if the application is not run on Port 3000, you need to config the API url in the Front end application
- make sure the redis server is connected.

## API information

Path: /api/restaurants/get_nearby
Method: Post
Body: {
lat: number # geolocation of the area you want to search for nearby restaurants,
long: number # geolocation of the area you want to search for nearby restaurants,
keyword: string # keyword to search by name of the restaurants
}

## Limitation

> The Google Map API can return up to 20 results with next page token if there are more than 20 results. Therefore, the developer need to use next page token to get 20 more results (with another next page token if possible). The issue is the short delay before the developer can send a new request to the API. So, it might take some seconds for searching new restaurants list.
> In this application, I apply 2 seconds delay time before getting next 20 results.

## Directory Layout

    .
    ├── adapters # to convert imcoming data into the application format data and to implement services  
    │  ├── controllers
    │  └── services
    ├── application # to set the application business rules and use case
    │  ├── repositories
    │  └── use-cases
    ├── config # to set configuration information
    ├── frameworks # outer layer for database connection, server connection, imported services
    │  ├── databases
    │  ├── services
    │  └── webserver
    └── README.md
