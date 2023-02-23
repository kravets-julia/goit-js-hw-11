import PixApiService from "./apiService";
import LoadMoreBtn from "./loadMoreBtn";
import Notiflix, {Notify} from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const formEl = document.getElementById('search-form')
console.log(formEl)
console.log(5)
const galleryEl = document.querySelector('.gallery')
console.log(galleryEl)
// const loadMore = document.querySelector('.load-more')
// console.log(loadMore)

const pixApiService = new PixApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true
});

let gallery = new SimpleLightbox('.gallery a', {
 });



console.log(loadMoreBtn)

console.log(pixApiService)

formEl.addEventListener('submit', onSubmtFormSearch)
loadMoreBtn.button.addEventListener('click', onLoadMore)


function onSubmtFormSearch(e) {
e.preventDefault()

    const form = e.currentTarget;
    const value = form.elements.searchQuery.value.trim()
    pixApiService.searchQuery = value
// gallery.open()
pixApiService. resetPage();
clearGallery();

    if (!value){
      return  }

    return pixApiService.getSearch(value)
    .then(({hits, totalHits}) => {
      if (hits.length === 0)
      { Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    loadMoreBtn.hide()  
  return}
  
      else 
      { newMarkup(hits);
        smoothPageScrolling ();
         Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`)
        
        //  if (`${hits.length} * ${pixApiService.page}) === ${totalHits.length}`) 
         if (`${hits.length}`< 40)
        {
          Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
          loadMoreBtn.hide();
        return}
        else
          loadMoreBtn.show() }   })
    .catch(error => console.log(error)).finally(()=> form.reset())

  }


async function onLoadMore (){
  loadMoreBtn.disable()
 try {return pixApiService.getSearch(pixApiService.searchQuery)
    .then(({hits, totalHits}) => {
      newMarkup(hits);
      smoothPageScrolling ();
      if (`${hits.length}`< 40)
      {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
        loadMoreBtn.hide();
      return}
      else
        loadMoreBtn.show() ;
  console.log(totalHits);
    })}
    catch (error)
    {onError}
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
galleryEl.insertAdjacentHTML('beforeend', markup);
gallery.refresh();
loadMoreBtn.enable();
}


function createMarkup ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }){
    return `
<div class="photo-card">
<a class='card-img' href=${largeImageURL}><img src=${webformatURL} alt=${tags} loading="lazy" class='img'/></a>
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


function onError(err){
  console.error(err);
  loadMoreBtn.hide();
          Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")


}

function smoothPageScrolling ()
{const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});}




//  if (`(${totalHits.length} - (${hits.length}*${pixApiService.page}))` > 0){
//         loadMoreBtn.enable()
//       }
//       else
//       {Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
//       loadMoreBtn.hide()}