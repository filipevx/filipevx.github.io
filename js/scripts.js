console.log('pagina iniciada')

window.addEventListener('scroll', function() {
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    var scrollThreshold = window.innerHeight / 2;
    var scrollToTopButton = document.querySelector('.scroll-to-top');
  
    if (scrollPosition > scrollThreshold) {
      scrollToTopButton.classList.add('show');
    } else {
      scrollToTopButton.classList.remove('show');
    }
});

// Event listener para o clique no botão "Voltar ao topo"
document.querySelector('.scroll-to-top').addEventListener('click', function() {
    // Faz scroll para o topo da página com animação suave
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  