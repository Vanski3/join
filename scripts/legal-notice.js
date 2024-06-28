/**
 * Loads the legal notice content into the main content area.
 *
 * @param {Object} [params] - Optional parameters (not used in the function).
 */
function loadLegalNoticeContent(params) {
  let userHeaderPopup = document.getElementById('userHeaderPopup');
  userHeaderPopup.style.display = 'none';
  let mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = '';
  mainContent.innerHTML += loadLegalNoticeContentHTML();
  removeBackgroundLowerSidebar();
  addBackgroundLegalNotice();
}

/**
 * Generates the HTML content for the legal notice.
 *
 * @param {Object} [params] - Optional parameters (not used in the function).
 * @returns {string} The HTML content for the legal notice.
 */
function loadLegalNoticeContentHTML(params) {
  return /*html*/ `
        <div class="content-div">
          <div class="headline-row">
            <h1>Legal Notice</h1>
            <img onclick="returnToPreviousContent()" src="./assets/img/privacy-legal-help/move-back-arrow.svg" alt="zurück" />
          </div>
          <h2>Imprint</h2>
          <ul style="cursor: auto">
            <ul><span style="font-weight: bold">Vanessa Sachs</span>  <br> Testweg 12 <br> 05484 Berlin</ul> <br>
            <ul><span style="font-weight: bold">Rene Lochschmidt</span> <br> Siedlerstrasse 1a <br> 82256 Fürstenfeldbruck</ul> <br>
            <ul><span style="font-weight: bold">Pascal Nehlsen</span> <br> Lüffringhauser Weg 12 <br> 42929 Wermelskirchen</ul>
          </ul>
          <h3>Exploring the Board</h3>
          <!-- individual email -->
          <h3>Acceptance of terms</h3>
          <p>
            By accessing and using Join (Product), you acknowledge and agree to the following terms and conditions, and any
            policies, guidelines, or amendments thereto that may be presented to you from time to time. We, the listed students,
            may update or change the terms and conditions from time to time without notice.
          </p>
          <h3>Scope and ownership of the product</h3>
          <p>
            Join has been developed as part of a student group project in a web development bootcamp at the Developer Akademie
            GmbH. It has an educational purpose and is not intended for extensive personal & business usage. As such, we cannot
            guarantee consistent availability, reliability, accuracy, or any other aspect of quality regarding this Product. The
            design of Join is owned by the Developer Akademie GmbH. Unauthorized use, reproduction, modification, distribution, or
            replication of the design is strictly prohibited.
          </p>
          <h3>Proprietary rights</h3>
          <p>
            Aside from the design owned by Developer Akademie GmbH, we, the listed students, retain all proprietary rights in
            Join, including any associated copyrighted material, trademarks, and other proprietary information.
          </p>
          <h3>Use of the product</h3>
          <p>
            Join is intended to be used for lawful purposes only, in accordance with all applicable laws and regulations. Any use
            of Join for illegal activities, or to harass, harm, threaten, or intimidate another person, is strictly prohibited.
            You are solely responsible for your interactions with other users of Join.
          </p>
          <h3>Disclaimer of warranties and limitation of liability</h3>
          <p>
            Join is provided "as is" without warranty of any kind, whether express or implied, including but not limited to the
            implied warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event will we,
            the listed students, or the Developer Akademie, be liable for any direct, indirect, incidental, special, consequential
            or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data, or other
            intangible losses, even if we have been advised of the possibility of such damages, arising out of or in connection
            with the use or performance of Join.
          </p>
          <h3>Indemnity</h3>
          <p>
            You agree to indemnify, defend and hold harmless us, the listed students, the Developer Akademie, and our affiliates,
            partners, officers, directors, agents, and employees, from and against any claim, demand, loss, damage, cost, or
            liability (including reasonable legal fees) arising out of or relating to your use of Join and/or your breach of this
            Legal Notice. For any questions or notices, please contact us at [Contact Email]. Date: July 26, 2023
          </p>
        </div>
      `;
}

/**
 * Adds a background to the legal notice button to highlight it.
 */
function addBackgroundLegalNotice() {
  let legalNoticeButton = document.getElementById('legalNoticeButton');
  legalNoticeButton.classList.add('active-link');
}
