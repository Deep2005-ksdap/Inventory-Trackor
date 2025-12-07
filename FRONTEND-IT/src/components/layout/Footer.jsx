import { motion } from "motion/react";

const Footer = () => {
  return (
    <motion.footer className="border-t border-gray-300 text-center bg-gray-800/80 w-full py-6 text-gray-200 text-sm">
          <p>
            © {new Date().getFullYear()} <b>Inventory Trackor</b>. All rights reserved.
          </p>
    </motion.footer>
  );
};

export default Footer;
