/**
 * Loads the help content into the main content area.
 *
 * @param {Object} [params] - Optional parameters (not used in the function).
 */
function loadHelpContent(params) {
   let mainContent = document.getElementById('mainContent');
   mainContent.innerHTML = '';
   mainContent.innerHTML += loadHelpContentHTML();
}

/**
 * Generates the HTML content for the help page.
 *
 * @param {Object} [params] - Optional parameters (not used in the function).
 * @returns {string} The HTML content for the help page.
 */
function loadHelpContentHTML(params) {
   return /*html*/ `
     <div class="content-div">
       <div class="headline-row">
         <h1>Help</h1>
         <img onclick="returnToPreviousContent()" src="./assets/img/privacy-legal-help/move-back-arrow.svg" alt="zurück" />
       </div>
       <p>
         Welcome to the help page for Join, your guide to using our kanban project management tool. Here, we'll provide an overview
         of what Join is, how it can benefit you, and how to use it.
       </p>
       <h2>What is Join?</h2>
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

/**
 * Navigates back to the previous page in the browser history.
 */
function goBack() {
   window.history.back();
}
