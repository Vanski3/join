document.addEventListener('DOMContentLoaded', function () {
   const currentUrl = window.location.pathname;
   const privacyLink = document.querySelector('a[href="./privacy.html"]');
   const legalNoticeLink = document.querySelector('a[href="./legal-notice.html"]');
   if (currentUrl.includes('privacy.html')) {
      privacyLink.classList.add('active-link');
   } else if (currentUrl.includes('legal-notice.html')) {
      legalNoticeLink.classList.add('active-link');
   }
});

function loadPrivacyPoliceContent() {
   let mainContent = document.getElementById('mainContent');
   mainContent.innerHTML = '';
   mainContent.innerHTML += /*html*/ `
<div class="content-div">
   <div class="headline-row">
      <h1>Privacy Policy</h1>
      <img onclick="returnToPreviousContent()" src="/assets/img/privacy-legal-help/move-back-arrow.svg" alt="zurück" />
   </div>
   <h3>1. Privacy at a Glance</h3>
   <h3>General Information</h3>
   <p>
      The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal
      data is any data with which you can be personally identified. Detailed information on the subject of data protection can be
      found in our privacy policy listed below this text.
   </p>
   <h3>Data Collection on This Website</h3>
   <h4>Who is responsible for data collection on this website?</h4>
   <p>
      The data processing on this website is carried out by the website operator. You can find the operator's contact details in
      the section “Notice on the Responsible Party” in this privacy policy.
   </p>
   <h4>How do we collect your data?</h4>
   <p>Your data is collected firstly by you providing it to us. This could, for example, be data you enter in a contact form.</p>
   <p>
      Other data is collected automatically or with your consent when you visit the website by our IT systems. This is mainly
      technical data (e.g., internet browser, operating system, or time of page access). The collection of this data happens
      automatically as soon as you enter this website.
   </p>
   <h4>What do we use your data for?</h4>
   <p>
      Part of the data is collected to ensure the error-free provision of the website. Other data can be used to analyze your user
      behavior.
   </p>
   <h4>What rights do you have regarding your data?</h4>
   <p>
      You have the right at any time to receive information free of charge about the origin, recipient, and purpose of your stored
      personal data. You also have the right to request the correction or deletion of this data. If you have given consent for
      data processing, you can revoke this consent at any time for the future. You also have the right, under certain
      circumstances, to request the restriction of the processing of your personal data. Furthermore, you have the right to lodge
      a complaint with the competent supervisory authority.
   </p>
   <p>For this and any other questions on the subject of data protection, you can contact us at any time.</p>
   <h3>2. General Information and Mandatory Information</h3>
   <h3>Data Protection</h3>
   <p>
      The operators of these pages take the protection of your personal data very seriously. We treat your personal data
      confidentially and in accordance with the statutory data protection regulations and this privacy policy.
   </p>
   <p>
      When you use this website, various personal data are collected. Personal data is data with which you can be personally
      identified. This privacy policy explains what data we collect and what we use it for. It also explains how and for what
      purpose this happens.
   </p>
   <p>
      We would like to point out that data transmission over the Internet (e.g., communication by e-mail) can have security gaps.
      A complete protection of the data against access by third parties is not possible.
   </p>
   <h3>Notice on the Responsible Party</h3>
   <p>The responsible party for data processing on this website is:</p>
</div>;
 `;
}

/* <div class="content-div">
   <div class="headline-row">
      <h1>Privacy Policy</h1>
      <img onclick="returnToPreviousContent()" src="/assets/img/privacy-legal-help/move-back-arrow.svg" alt="zurück" />
   </div>
   <h3>1. Privacy at a Glance</h3>
   <h3>General Information</h3>
   <p>
      The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal
      data is any data with which you can be personally identified. Detailed information on the subject of data protection can be
      found in our privacy policy listed below this text.
   </p>
   <h3>Data Collection on This Website</h3>
   <h4>Who is responsible for data collection on this website?</h4>
   <p>
      The data processing on this website is carried out by the website operator. You can find the operator's contact details in
      the section “Notice on the Responsible Party” in this privacy policy.
   </p>
   <h4>How do we collect your data?</h4>
   <p>Your data is collected firstly by you providing it to us. This could, for example, be data you enter in a contact form.</p>
   <p>
      Other data is collected automatically or with your consent when you visit the website by our IT systems. This is mainly
      technical data (e.g., internet browser, operating system, or time of page access). The collection of this data happens
      automatically as soon as you enter this website.
   </p>
   <h4>What do we use your data for?</h4>
   <p>
      Part of the data is collected to ensure the error-free provision of the website. Other data can be used to analyze your user
      behavior.
   </p>
   <h4>What rights do you have regarding your data?</h4>
   <p>
      You have the right at any time to receive information free of charge about the origin, recipient, and purpose of your stored
      personal data. You also have the right to request the correction or deletion of this data. If you have given consent for
      data processing, you can revoke this consent at any time for the future. You also have the right, under certain
      circumstances, to request the restriction of the processing of your personal data. Furthermore, you have the right to lodge
      a complaint with the competent supervisory authority.
   </p>
   <p>For this and any other questions on the subject of data protection, you can contact us at any time.</p>
   <h3>2. General Information and Mandatory Information</h3>
   <h3>Data Protection</h3>
   <p>
      The operators of these pages take the protection of your personal data very seriously. We treat your personal data
      confidentially and in accordance with the statutory data protection regulations and this privacy policy.
   </p>
   <p>
      When you use this website, various personal data are collected. Personal data is data with which you can be personally
      identified. This privacy policy explains what data we collect and what we use it for. It also explains how and for what
      purpose this happens.
   </p>
   <p>
      We would like to point out that data transmission over the Internet (e.g., communication by e-mail) can have security gaps.
      A complete protection of the data against access by third parties is not possible.
   </p>
   <h3>Notice on the Responsible Party</h3>
   <p>The responsible party for data processing on this website is:</p>
</div>; */
