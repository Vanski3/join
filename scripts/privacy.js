function loadPrivacyPoliceContent(params) {
   let mainContent = document.getElementById('mainContent');
   mainContent.innerHTML = '';
   mainContent.innerHTML += /*html*/ `
       <div class="content-div">
    <div class="headline-row">
       <h1>Privacy Policy</h1>
       <img onclick="history.back()" src="/assets/img/privacy-legal-help/move-back-arrow.svg" alt="zurück" />
    </div>
    <h2>Subtitle</h2>
    <p>
       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem laboriosam earum quasi, pariatur reiciendis odio, rerum
       dolor perspiciatis eum quisquam iure neque nulla exercitationem at, minus distinctio reprehenderit deserunt sequi.
    </p>
    <h2>Subtitle</h2>
    <p>
       Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde minus quasi recusandae error harum, mollitia qui est
       aperiam, eaque earum! Consectetur tempora mollitia iusto maxime quas distinctio, libero dignissimos?
    </p>
 </div>
    `;
}
