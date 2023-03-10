// const BASE_URL = 'https://pixabay.com/api/'
// const options = {
//     headers: {
// 'API key': '33829392-49d1eab567acddcf43bdfe9f1'
//     }
// }

import axios from "axios";

export default class PixApiService{
    constructor(){
        this.page = 1
        this.searchQuery = ''
    }


    async getSearch(){
        const URL = `https://pixabay.com/api/?key=33829392-49d1eab567acddcf43bdfe9f1&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

        // return fetch(URL).then(response => {
        //   return response.json()  
        //    })

            return await axios.get(URL).then(({data}) => {console.log(data);
           return data})

        //    return axios.get(URL).then(({data}) => {console.log(data);
        //    return data})
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

//  if (`(${totalHits.length} - (${hits.length}*${pixApiService.page}))` > 0){
//         loadMoreBtn.enable()
//       }
//       else
//       {Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
//       loadMoreBtn.hide()}