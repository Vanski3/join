let mainContent = document.getElementById('mainContent');

function loadLegalNoticeContent(params) {
   mainContent.innerHTML = '';
   mainContent.innerHTML += /*html*/ `
      <div class="content-div">
      <div class="headline-row">
            <h1>Legal Notice</h1>
            <img onclick="history.back()" src="/assets/img/privacy-legal-help/move-back-arrow.svg" alt="zurück" />
      </div>
      <h2>Imprint</h2>
      <!-- individual Names -->
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

function loadPrivacyPoliceContent(params) {
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

function loadSummaryContent(params) {
   mainContent.innerHTML = '';
   mainContent.innerHTML += /*html*/ `
      <main>
      <div class="headline-wrapper"><span class="headline">Good morning,</span><span id="username">Sofia Müller</span></div>
        <div class="summary-wrapper">
            <div class="row1">
                <div class="date-urgent-task">
                    <div class="urgent-task">
                        <div class="img-amount-container">
                            <img src="./assets/img/summary/urgent-frame.svg" alt="urgent task" />
                            <span id="urgent">1</span>
                        </div>
                        <p>Tasks Urgent</p>
                    </div>
                    <div class="separator"></div>
                    <div class="date">
                        <div>
                            <span id="date">October 16, 2022</span>
                            <p>Upcoming Deadline</p>
                        </div>
                    </div>
                </div>
                <div class="task">
                    <div class="img-amount-container">
                        <img src="./assets/img/summary/Board.svg" alt="Task in Board" />
                        <span id="task-in-board">5</span>
                    </div>
                    <p>Task in Board</p>
                </div>
            </div>
            <div class="row2">
                <div class="task">
                    <div class="img-amount-container">
                        <img src="./assets/img/summary/todo.svg" alt="Task To-do" />
                        <span id="todo">1</span>
                    </div>
                    <p>Task To-do</p>
                </div>
                <div class="task">
                    <div class="img-amount-container">
                        <img src="./assets/img/summary/In Progress.svg" alt="Task in Progress" />
                        <span id="in-progress">2</span>
                    </div>
                    <p>Task in Progress</p>
                </div>
                <div class="task">
                    <div class="img-amount-container">
                        <img src="./assets/img/summary/Awaiting feedback.svg" alt="Awaiting feedback" />
                        <span id="feedback">2</span>
                    </div>
                    <p>Awaiting Feedback</p>
                </div>
                <div class="task">
                    <div class="img-amount-container">
                        <img src="./assets/img/summary/Done.svg" alt="Task done">
                        <span id="done">1</span>
                    </div>
                    <p>Tasks Done</p>
                </div>
            </div>
        </div>
    </main>
   `;
}

function loadHelpContent(params) {
   mainContent.innerHTML = '';
   mainContent.innerHTML += /*html*/ `
    <div class="content-div">
   <div class="headline-row">
      <h1>Help</h1>
      <img onclick="history.back()" src="/assets/img/privacy-legal-help/move-back-arrow.svg" alt="zurück" />
   </div>
   <p>
      Welcome to the help page for Join, your guide to using our kanban project management tool. Here, we'll provide an overview
      of what Join is, how it can benefit you, and how to use it.
   </p>
   <h2>What is Join ?</h2>
   <p>
      Join is a kanban-based project management tool designed and built by a group of dedicated students as part of their web
      development bootcamp at the Developer Akademie. Kanban, a Japanese term meaning "billboard", is a highly effective method to
      visualize work, limit work-in-progress, and maximize efficiency (or flow). Join leverages the principles of kanban to help
      users manage their tasks and projects in an intuitive, visual interface. It is important to note that Join is designed as an
      educational exercise and is not intended for extensive business usage. While we strive to ensure the best possible user
      experience, we cannot guarantee consistent availability, reliability, accuracy, or other aspects of quality regarding Join.
   </p>
   <h2>How to use it</h2>
   <p>Here is a step-by-step guide on how to use Join:</p>
   <div>
      <div class="explain-div">
         <span>1.</span>
         <div>
            <h3>Exploring the Board</h3>
            <p>
               When you log in to Join, you'll find a default board. This board represents your project and contains four default
               lists: "To Do", "In Progress", “Await feedback” and "Done".
            </p>
         </div>
      </div>
      <div class="explain-div">
         <span>2.</span>
         <div>
            <h3>Creating Contacts</h3>
            <p>
               In Join, you can add contacts to collaborate on your projects. Go to the "Contacts" section, click on "New
               contact", and fill in the required information. Once added, these contacts can be assigned tasks and they can
               interact with the tasks on the board.
            </p>
         </div>
      </div>
      <div class="explain-div">
         <span>3.</span>
         <div>
            <h3>Adding Cards</h3>
            <p>
               Now that you've added your contacts, you can start adding cards. Cards represent individual tasks. Click the "+"
               button under the appropriate list to create a new card. Fill in the task details in the card, like task name,
               description, due date, assignees, etc.
            </p>
         </div>
      </div>
      <div class="explain-div">
         <span>4.</span>
         <div>
            <h3>Moving Cards</h3>
            <p>
               As the task moves from one stage to another, you can reflect that on the board by dragging and dropping the card
               from one list to another.
            </p>
         </div>
      </div>
      <div class="explain-div">
         <span>5.</span>
         <div>
            <h3>Delete Cards</h3>
            <p>
               Once a task is completed, you can either move it to the "Done" list or delete it. Deleting a card will permanently
               remove it from the board. Please exercise caution when deleting cards, as this action is irreversible. Remember
               that using Join effectively requires consistent updates from you and your team to ensure the board reflects the
               current state of your project. Have more questions about Join? Feel free to contact us at [Your Contact Email].
               We're here to help you!
            </p>
         </div>
      </div>
   </div>
</div>
   `;
}
