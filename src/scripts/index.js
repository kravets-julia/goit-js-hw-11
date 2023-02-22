import PixApiService from "./apiService";
import Notiflix, {Notify} from "notiflix";

const formEl = document.getElementById('search-form')
console.log(formEl)
const galleryEl = document.querySelector('.gallery')
console.log(galleryEl)

const pixApiService = new PixApiService();
console.log(pixApiService)

formEl.addEventListener('submit', onSubmtFormSearch)


function onSubmtFormSearch(e) {
e.preventDefault()

    const form = e.currentTarget;
    const value = form.elements.searchQuery.value.trim()
    pixApiService.searchQuery = value

    

    if (!value){
      return
    }

    return pixApiService.getSearch(value)
    .then(({hits}) => {
      if (hits.length === 0)
      {Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')}
else
      {newMarkup(hits);
    }})
    .catch(error => console.log(error)).finally(()=> form.reset())

   
}

let markup=''

function newMarkup(data) {
  if(!data) 
{return}

else {
  createCard (data)
}
}

function createCard (hits){
  markup = hits
  .reduce((markup, hits) => 
createMarkup(hits) + markup, " ");
galleryEl.innerHTML = markup;
}


function createMarkup ({ webformatURL, tags, likes, views, comments, downloads }){
    return `
<div class="photo-card">
  <img src=${webformatURL} alt=${tags} loading="lazy" class="card-img"/>
  <div class="info">
    <p class="info-item">
      <b>Likes <br> ${likes} </b>
    </p>
    <p class="info-item">
      <b>Views <br> ${views} </b>
    </p>
    <p class="info-item">
      <b>Comments <br> ${comments} </b>
    </p>
    <p class="info-item">
      <b>Downloads <br> ${downloads}</b>
    </p>
  </div>
</div>
`
}


function clearGallery(){
  galleryEl.innerHTML = '';
}