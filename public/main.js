const input = document.querySelector(".input");
const btn = document.querySelector("button");
const link = "https://swapi.dev/api/people/?search=";

const charSearch = async (char) => {
  char = input.value;
  try {
    await fetch(`${link}${char}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results[0].name);
        let obj = {
          name: data.results[0].name,
        };
        fetch("/api", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then((r) => r.json())
          .then((res) => console.log(res));
        console.log(obj);
      });
  } catch (error) {
    console.error(error, "oops, try again!");
  }
};

btn.addEventListener("click", () => {
  if (input.value == "" || input.selectionEnd < 3) {
    alert("Please Enter Name");
  } else {
    charSearch();
  }
});
