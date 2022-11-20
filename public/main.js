const input = document.querySelector(".input");
const btn = document.querySelector("button");
const link = "https://swapi.dev/api/people/?search=";

const charSearch = async (char) => {
  // set param as input value
  char = input.value;
  try {
    // queries the Star Wars API which returns an object populated with the query data

    await fetch(`${link}${char}`)
      .then((res) => res.json())
      .then(async (data) => {
        // console logs just the name of the queried result
        console.log(data.results[0].name);
        // initializes an object with the result of your query as the value.
        let obj = data

        // Uses fetch to post the object we just created using the fetched Star Wars data to the backend with a /api endpoint
        await fetch("/api", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          // Sends back confirmation when data is received on backend.
          .then((r) => r.json())
          .then((res) => console.log(res));
        console.log(obj);
        // if(data) {
        //   setTimeout(() => {
        //   location.reload();
        // }, 1000);
        // }
        
      });
  } catch (error) {
    console.error(error, "I find your lack of SW knowledge disturbing");
    alert("I find your lack of SW knowledge disturbing");
  }
  input.value = "";
};

btn.addEventListener("click", () => {
  // if the input is an empty string or less than 3 characters, alert
  if (input.value == "" || input.selectionEnd < 3) {
    alert("Please Enter Name");
  } else {
    charSearch();
  }
});
