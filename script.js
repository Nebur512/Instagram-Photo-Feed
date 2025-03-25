document.addEventListener('DOMContentLoaded', () => {
    const posts = document.querySelectorAll('.post');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageNumber = document.getElementById('pageNumber');
    const searchInput = document.getElementById('searchInput');
    const darkToggle = document.getElementById('darkModeToggle');
    const header = document.querySelector('h1');
  
    let currentPage = 0;
    const postsPerPage = 5;
    let filteredPosts = [...posts];
    let totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
    function showPosts() {
      filteredPosts.forEach((post, index) => {
        const start = currentPage * postsPerPage;
        const end = start + postsPerPage;
        post.style.display = index >= start && index < end ? 'block' : 'none';
      });
  
      pageNumber.textContent = `Página ${currentPage + 1} de ${totalPages}`;
      prevBtn.disabled = currentPage === 0;
      nextBtn.disabled = currentPage >= totalPages - 1;
  
      header.scrollIntoView({ behavior: 'smooth' });
    }
  
    prevBtn.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        showPosts();
      }
    });
  
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages - 1) {
        currentPage++;
        showPosts();
      }
    });
  
    searchInput.addEventListener('input', () => {
      const filter = searchInput.value.toLowerCase();
      filteredPosts = [...posts].filter(post => post.textContent.toLowerCase().includes(filter));
      currentPage = 0;
      totalPages = Math.ceil(filteredPosts.length / postsPerPage);
      posts.forEach(post => post.style.display = 'none');
      showPosts();
    });
  
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  
    // Botón volver arriba
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.textContent = '⬆';
    scrollToTopBtn.id = 'scrollToTop';
    document.body.appendChild(scrollToTopBtn);
  
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    // Comentarios
    posts.forEach(post => {
     
  
      const commentInput = document.createElement('input');
      commentInput.className = 'comment-input';
      commentInput.placeholder = 'Escribe un comentario...';
  
      const commentList = document.createElement('ul');
      commentList.className = 'comment-list';
  
      commentInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && commentInput.value.trim() !== '') {
          const li = document.createElement('li');
          li.textContent = commentInput.value;
          commentList.appendChild(li);
          commentInput.value = '';
        }
      });

      post.appendChild(commentInput);
      post.appendChild(commentList);
    });
  
    showPosts();
  });