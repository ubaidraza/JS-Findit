
var searchForm = document.getElementById('search-form');
var seacrInput = document.getElementById('search-input');
var parentDiv = document.getElementById('results');

searchForm.addEventListener('submit',e=>{
    
    var searchTerm = document.getElementById('search-input').value;
    var sort = document.querySelector('input[name=sortby]:checked').value;
    var limit = document.getElementById('limit').value;
    //console.log(limit);

    if(searchTerm==''){
        showMessage('please insert search string','alert-danger');
    }
    seacrInput.value='';

    fetchApi(searchTerm,sort,limit)
    // .then((results)=>{
    //     var output = `<div class="card-columns">`;
    //     results.forEach((post)=>{
    //               output+=`
    //               <div class="card">
    //                   <img class="card-img-top" src=".../100px180/" alt="Card image cap">
    //                   <div class="card-body">
    //                   <h5 class="card-title">Title</h5>
    //                   <p class="card-text">this text is from random</p>
    //                   <a href="#" class="btn btn-primary">Go somewhere</a>
    //                   </div>
    //               </div>`;
    //           });
    //       output+=`div`;
    
    //       results.innerHTML=output; 
    // })
    

    e.preventDefault();
});


function showMessage(message,className){
    var div = document.createElement('div');
    div.innerHTML=message;
    div.classList.add('alert');
    div.classList.add(className);
    // div.appendChild(document.createTextNode(message));
    // div.className =`alert ${className}`;


    var searchContainer = document.getElementById("search-container");
    var search = document.getElementById('search');

    searchContainer.insertBefore(div,search);

    setTimeout(function(){
       document.querySelector('.alert').remove();
       
    },2000)

}


function fetchApi(searchTerm,sort,limit){
    fetch( `http://www.reddit.com/search.json?q=${searchTerm}&limit=${limit}&sort=${sort}`)
    .then(res=>{
        return res.json();
    })
    .then((data)=> {
        var output = `<div class="card-columns">`;
        var arrayData = data.data.children;

        arrayData.forEach(element => {
            console.log(element.data);
            let image = (element.data.preview)?element.data.preview.images[0].source.url : 'https://cnet4.cbsistatic.com/img/tay4JHKNwejbFaG_tCM-MF0WbQY=/2015/07/09/7bbb900c-b51a-4b78-a791-5bd6fc9793cd/fd-reddit-alien.jpg'
            output+=`
                          <div class="card">
                              <img class="card-img-top" src="${image}" alt="Card image cap">
                              <div class="card-body">
                              <h5 class="card-title">${element.data.title}</h5>
                              <p class="card-text">${element.data.selftext}</p>
                              <a href="${element.data.url}" target="_blank" class="btn btn-primary">Read more...</a>
                              <hr/>
                              <span class="badge badge-secondary">${element.data.subreddit}</span>
                              <span class="badge badge-dark">${element.data.score}</span>
                              </div>
                          </div>`;
        });
        output+=`</div>`;
        parentDiv.innerHTML=output; 

    })
    .catch(err=>{
        console.log(err);
    })
}