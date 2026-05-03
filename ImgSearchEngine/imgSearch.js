const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let searchTerm = "";
let page = 1;
const access_key = "e50sqpwUArp1ZIs8TOrwiQQS3y1gJ5-DuRikuaEUW8U";

async function searchImages() {
  console.log(searchBox.value);
  searchTerm = searchBox.value;

  if (page === 1) {
    showSkeletons(); 
  }
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${searchTerm}&client_id=${access_key}&per_page=12`;
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });
  showMoreBtn.style.display = "block";
}

function showSkeletons(count = 12) {
  searchResult.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement("div");
    skeleton.classList.add("skeleton");
    searchResult.appendChild(skeleton);
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (searchBox.value === "") {
    window.alert("Please enter a valid search term");
    return;
  }
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
