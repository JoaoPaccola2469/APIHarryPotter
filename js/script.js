const UrlHarry = "https://hp-api.onrender.com/api/characters";

const listaPersonagens = document.getElementById("lista-personagens");

const inputBusca = document.getElementById("txt-busca");

async function CarregarPersonagens() {
    try {
        console.log("Carregando personagens...");
        const resposta = await fetch(UrlHarry); 
        const personagens = await resposta.json();
        console.log("Personagens:", personagens); 
        
        personagens.forEach((personagem) => {
            const li = document.createElement("li");

            const imageUrl = personagem.image && personagem.image.trim() !== ""
                ? personagem.image
                : "Mídia/avatarNulo.svg";

            li.innerHTML = `
                <div class="cardPersonagem">
                    <img src="${imageUrl}" alt="${personagem.name}" class="card-img">
                    <div class="card-content">
                        <strong>${personagem.name}</strong>
                        <p><strong>Casa:</strong> ${personagem.house}</p>
                        <p><strong>Ator:</strong> ${personagem.actor}</p>
                        <p><strong>Espécie:</strong> ${personagem.species}</p>
                    </div>
                </div>
            `;
            li.setAttribute('class', 'col-md-4 mb-3');
            listaPersonagens.appendChild(li);
        });
    } catch (error) {
        console.error("Erro ao carregar os personagens:", error);
    }
}

CarregarPersonagens();

inputBusca.addEventListener("input", () => {
    const termoBusca = inputBusca.value.toLowerCase(); 
    const todosPersonagens = listaPersonagens.getElementsByTagName("li"); 

    for (const item of todosPersonagens) { 
        if (item.textContent.toLowerCase().includes(termoBusca)) {
            item.style.display = "block"; 
        } else {
            item.style.display = "none"; 
        }
    }
});