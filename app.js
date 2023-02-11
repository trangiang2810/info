const allTabsBody = document.querySelectorAll('.tab-body-single');
const allTabHead = document.querySelectorAll('.tab-head-single');
const searchForm = document.querySelector('.app-header-search');
let searchList = document.getElementById('search-list')

let activeTab = 1, allData;

const init = () =>{
    showActiveTabBody();
    showActiveTabHead();
}

const showActiveTabHead = ()=> allTabHead[activeTab - 1].classList.add('active-tab')

const showActiveTabBody = () =>{
    hideAllTabBody();
    allTabsBody[activeTab - 1].classList.add('show-tab');
}
const hideAllTabBody = () => allTabsBody.forEach(singleTabBody => singleTabBody.classList.remove('show-tab'))
const hideAllTabHead = () => allTabHead.forEach(singleTabHead => singleTabHead.classList.remove('active-tab'))

window.addEventListener('DOMContentLoaded', () => init());

//button event listeners
allTabHead.forEach(singleTabHead =>{
    singleTabHead.addEventListener('click', ()=>{
        hideAllTabHead();
        activeTab = singleTabHead.dataset.id;
        showActiveTabHead();
        showActiveTabBody()
        // hideAllTabHead()
    })
});


const getInputValue = (event) =>{
    event.preventDefault();
    let searchText = searchForm.search.value;
    fetchAllSuperHero(searchText)
    // console.log(searchText)
}
searchForm.addEventListener('submit', getInputValue)

// api key => 691139406055099
const fetchAllSuperHero = async(searchText) => {
    let url = `https://www.superheroapi.com/api.php/727054372039115/search/${searchText}`;
    try{
        const response = await fetch(url);
        allData = await response.json();
        if(allData.response === 'success'){
            showSearchList(allData.results)
        }
    } catch(error){
        console.log(error);
    }
}

const showSearchList = (data) =>{
    searchList.innerHTML = "";
    data.forEach(dataItem => {
        const divElem = document.createElement('div');
        divElem.classList.add('search-list-item');
        divElem.innerHTML =`
                <img src="${dataItem.image.url ? dataItem.image.url : ""}" alt="">
                <p data-id = "${dataItem.id}">${dataItem.name}</p>
        `
        searchList.appendChild(divElem)
    })
}