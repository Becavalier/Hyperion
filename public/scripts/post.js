const DEFAULT_INDEX=0;document.addEventListener("DOMContentLoaded",async e=>{const t=()=>{"column"===window.getComputedStyle(document.body,null).getPropertyValue("flex-direction")?window.scrollTo({top:0,behavior:"smooth"}):document.querySelector("main").scrollTop=0};document.querySelector(".touch-top").addEventListener("touchstart",t),document.querySelector(".touch-top").addEventListener("click",t);const n=document.querySelector(".canvas-containter");let o=new Zoomage({container:n,enableDesktop:!0,enableGestureRotate:!0,dbclickZoomThreshold:.1,maxZoom:3,minZoom:.1});document.querySelector("article").addEventListener("click",e=>{const t=e.target||e.srcElement;"IMG"===t.tagName&&(n.style.opacity="1",n.style.display="block",n.style.zIndex="200",n.classList.add("animation-show"),n.classList.remove("animation-hide"),o.load(t.currentSrc))}),n.querySelector("span").addEventListener("click",()=>{n.style.opacity="0",n.style.zIndex="-200",n.classList.add("animation-hide"),n.classList.remove("animation-show")});const a=document.querySelector("article").getAttribute("post-id"),s=document.querySelector(".comments-input textarea"),r=document.querySelector('.comments-input input[type="text"]'),c=document.querySelector(".comments-display-container");c.addEventListener("click",e=>{const t=e.target||e.srcElement;"nickname"===t.className&&(s.value=`@${t.innerText} `+s.value)});const i=e=>`\n      <div class="comment-snippet">\n        <div>\n          <span class="nickname">${e.publisher.name}</span>\n          <span class="date">${e.publishTime}</span>\n        </div>\n        <div class="content">${e.content}</div>\n      </div>\n    `;document.querySelector(".submit-comment").addEventListener("click",async e=>{const t=e.target||e.srcElement,n=s.value,o=r.value;if(n&&o){t.disabled=!0,t.innerText="... 提交中 ...";try{const l=await axios.post("http://localhost:80/graphql",{query:"\n  mutation insertPostComment($comment: CommentInput!) {\n    insertPostComment(comment: $comment) {\n      ...post\n    }\n  }\n  \n  fragment post on PostComment {\n    id\n    publisher {\n      name\n      gender\n    }\n    content\n    ipAddr\n    publishTime\n  }\n          ",variables:{comment:{postId:a,content:n,publisher:o}}});if(Array.isArray(l.data.errors)&&l.data.errors.length>0)return void alert(l.data.errors[0].message);const{data:{data:{insertPostComment:m}}}=l;let d=c.querySelector(".placeholder");d&&d.remove(),c.insertAdjacentHTML("afterbegin",i(m)),(s.value="")||(r.value=""),window.location.href="#comments"}catch(e){console.error(e.message)}finally{t.disabled=!1,t.innerText="发布"}}else alert("STOP! Please check your input fields.")});(async(e=!1)=>{const{data:{data:{postComments:t}}}=await axios.get("http://localhost:80/graphql",{params:{query:`\n  query {\n    postComments(postId: "${a}") {\n      ...post\n    }\n  }\n  fragment post on PostComment {\n    id\n    publisher {\n      name\n      gender\n    }\n    content\n    publishTime\n  }\n        `}});if(Array.isArray(t)&&t.length>0){let e=c.querySelector(".placeholder");e&&e.remove(),t.forEach(e=>{c.insertAdjacentHTML("beforeend",i(e))})}e&&e()})()});