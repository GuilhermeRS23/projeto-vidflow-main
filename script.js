const containerVideos = document.querySelector(".videos__container");
const barraDePesquisa = document.querySelector('.pesquisar__input');
const botaoCategoria = document.querySelectorAll('.superior__item');

async function buscarEMostrarVideos() {
    try {
        const busca = await fetch("http://localhost:3000/videos")
        const videos = await busca.json();
        // Erro personalizado
        videos.forEach((video) => {
            if (video.categoria == '') {
                throw new Error('Vídeo sem categoria.')
            }

            containerVideos.innerHTML += `
            <li class="videos__item">
            <iframe src="${video.url}" title"${video.titulo}" frameborder="0" allowfullscreen></iframe>
            <div class="descricao-video">
            <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
            <h3 class="titulo-video">${video.titulo}</h3>
            <p class="ttulo-canal">${video.descricao}</p>
            <p class="categoria" hidden>${video.categoria}</p>
            </div>
            </li>`
        })
    } catch (error) {
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos. \nMensagem original: ${error}`
        alert(`Houve um erro ao carregar os vídeos. \nMensagem original: ${error}`)
    }// finally {alert("Teste...")}
}

buscarEMostrarVideos();

//Filtrar vídeos
barraDePesquisa.addEventListener('input', filtrarPesquisa);

function filtrarPesquisa() {
    const valorPesquisa = barraDePesquisa.value.toLowerCase();
    const videos = document.querySelectorAll('.videos__item');

    videos.forEach((video) => {
        const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();

        video.style.display = valorPesquisa ? titulo.includes(valorPesquisa) ? "block" : "none" : "block";
    });
}

botaoCategoria.forEach((botao)=>{
    let nomeCategoria = botao.getAttribute('name');
    botao.addEventListener('click' , () => filtrarPorCategoria(nomeCategoria))
})

function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll('.videos__item');
videos.forEach((video) => {
    let categoria = video.querySelector('.categoria').textContent.toLowerCase();
    let valorFiltro = filtro.toLowerCase();

    video.style.display = !categoria.includes(valorFiltro) && valorFiltro != 'tudo' ? "none" : "block";
})
}
