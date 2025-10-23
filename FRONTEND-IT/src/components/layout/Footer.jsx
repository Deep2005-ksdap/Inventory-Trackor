const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-4 shadow-inner footer ">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
        <span className="text-lg font-semibold">Inventory Trackor</span>
        <span className="text-sm mt-2 sm:mt-0">
          &copy; {new Date().getFullYear()} All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
