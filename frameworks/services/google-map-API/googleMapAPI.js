import axios from 'axios'

// Google Map API service implementation
export default function googleMapAPI() {
  const API_KEY = process.env.GOOGLE_MAP_API_KEY

  // use nearbysearch for searching the nearby places
  const nearbySearch = async (
    lat,
    long,
    keyword,
    radius,
    placetype,
    list,
    next_page_token,
  ) => {
    // set query parameters
    // keyword: text to search
    // location: format is latitude,longitude the comma will be encoded to %2C (for example, 13.6282112%2C100.51584)
    // radius: number of distance (metres)
    // type: type of place (for example, restaurant, travel_agency, hospital, etc.)
    // key: Google map API key (Ref: https://developers.google.com/maps/documentation/places/web-service/get-api-key)
    // pagetoken: if more than 20 results left, use next page token to get more results

    var location = lat + '%2C' + long
    var url =
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json' +
      '?keyword=' +
      keyword +
      '&location=' +
      location +
      '&radius=' +
      radius +
      '&type=' +
      placetype +
      '&key=' +
      API_KEY

    if (next_page_token) {
      url = url + '&pagetoken=' + next_page_token
    }

    var config = {
      method: 'get',
      url: url,
      headers: {},
    }

    // use callback for get more results if there is a next page token
    var result = new Promise((resolve, reject) => {
      axios(config)
        .then(async function (response) {
          resolve(
            new Promise((resolve, reject) => {
              if (response.data.next_page_token) {
                setTimeout(() => {
                  resolve(
                    nearbySearch(
                      lat,
                      long,
                      keyword,
                      radius,
                      placetype,
                      list.concat(response.data.results),
                      response.data.next_page_token,
                    ),
                  )
                }, 2000)
              } else {
                resolve(list.concat(response.data.results))
              }
            }),
          )
        })
        .catch(function (error) {
          console.log(error)
          resolve([])
        })
    })

    return result
  }

  return {
    nearbySearch,
  }
}
