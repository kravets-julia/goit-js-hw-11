// const BASE_URL = 'https://pixabay.com/api/'
// const options = {
//     headers: {
// 'key': '33829392-49d1eab567acddcf43bdfe9f1'
//     }
// }

export default class PixApiService{
    constructor(){
        this.page = 1
        this.searchQuery = ''
    }


    getSearch(){
        const URL = `https://pixabay.com/api/?key=33829392-49d1eab567acddcf43bdfe9f1&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

        return fetch(URL).then(response => {
            if (!response.ok) {
               Notiflix.Notify.failure ('Sorry, there are no images matching your search query. Please try again.') 
                 }
          return response.json()  
           })
           .then((hits) => {this.nextPage();
           return hits})
                   }

            nextPage(){
                this.page += 1
            }

            resetPage(){
                this.page = 1
            }
  
}