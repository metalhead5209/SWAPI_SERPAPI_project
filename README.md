# SWAPI_SERPAPI_project

Core funtionality for a larger scale project in the planning stages. When a user inputs the name of a star wars character, data is fetched from the Star Wars API, 
[SWAPI](https://swapi.dev/), sent to the backend using another fetch, this time using the POST method. The specified data, the name of the character in this case, 
is then deconstructed from the data object sent from the client side. This then triggers the [SerpAPI](https://serpapi.com/) library which scrapes google. I chose the 
specific functionality that scrapes google images. I appended the word 'toy' to the end of the search query therefor a picture of a toy is returned. Currently using 
express and handlebars so I could quickly render some images and get the core funtionality working correctly. So far so good. May need to handle my promises a bit 
differently since data comes back a bit slower on the SerpAPI request if you have a weaker signal. Promise.allSettled? maybe? We'll see. 
