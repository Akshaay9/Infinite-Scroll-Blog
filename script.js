const postContainer=document.getElementById("post-container")
const loading=document.querySelector(".loader")
const filter=document.getElementById("filter")
let limit=5
let page=1
// /fetch
async function getpost()
{
    const res= await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)

    // const res = await fetch(
    //     `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    //   );

    const data=await res.json()
    return data
}
// post
showPost()
async function showPost()
{
    const posts = await getpost()

     posts.forEach(post => {
        const postEl=document.createElement("div")
        postEl.classList.add("post")
        postEl.innerHTML=`
        <div class="number">${post.id}</div>
        <div class="post-info">
         <h2 class="post-title">${post.title}</h2>
                     </div>
            <p class="post-body">${post.body}</p>
        `
        postContainer.appendChild(postEl)
    })
    
}

// scroll

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading()
    }
  });

// show loading
function showLoading() {
    loading.classList.add('show');
  
    setTimeout(() => {
      loading.classList.remove('show');
  
      setTimeout(() => {
        page++;
        showPost();
      }, 300);
    }, 300);
  }


//   filter post
filter.addEventListener("input",filterPosts)
function filterPosts(e)
{
    const term=e.target.value.toUpperCase()
    const posts=document.querySelectorAll(".post")
    posts.forEach(post=>{
        const title=post.querySelector(".post-title").innerText.toUpperCase()
        const body=post.querySelector(".post-body").innerText.toUpperCase()
        console.log(body);

        if(title.indexOf(term)>-1 || body.indexOf(term)>-1)
        {
            post.style.display="flex"
        }else {
            post.style.display = 'none';
          }

    })
}