document.addEventListener("DOMContentLoaded",async e=>{const a=(await axios.get("/graphql",{params:{query:"\nquery {\n  fetchAllBookRecord {\n    id\n    name\n    url\n    totalPages\n    currentPages\n  }\n}"}})).data.data.fetchAllBookRecord;if(Array.isArray(a)&&a.length>0){const e=document.querySelector(".books-container");e.insertAdjacentHTML("afterbegin",a.map(e=>`\n        <div class="book-item">\n          <span>《${e.name}》</span>\n          <span class="state">${e.currentPages} / ${e.totalPages}</span>\n          <button class="action-read" data-url="${e.url}" data-id="${e.id}" data-page="${e.currentPages}">阅读</button>\n        </div>`)),e.addEventListener("click",e=>{const{url:a,id:t,page:n}=e.target.dataset;e.target.dataset.url&&window.open(`/app-pdf-viewer/web/viewer.html?file=${encodeURIComponent(a)}#page=${n}`)})}});