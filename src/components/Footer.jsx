import React from "react";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-blue-300 text-base-content p-4 shadow-md dark:bg-gray-800 dark:text-white dark:border-t dark:border-white">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by DevDialogue
          Community
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
