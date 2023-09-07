import { Fragment, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const navigation = [
  { name: "Products", href: "/", current: true },
  { name: "Add a product", href: "/add-product", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavbarComponent() {
  const data = useSelector((state) => state.cart);
  const [navs, setNavs] = useState(navigation);
  const handleLinksClick = (index) => {
    if (index === "undefined") {
      setNavs(navs.map((nav) => (nav.current = false)));
      return;
    }
    setNavs(
      navs.map((nav, indx) => {
        if (indx === index) {
          nav.current = true;
        } else {
          nav.current = false;
        }
        return nav;
      })
    );
  };
  return (
    <Disclosure as="nav" className="bg-gray-800 ">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-12 w-12"
                    src="https://cdn-icons-png.flaticon.com/128/4396/4396722.png"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:flex sm:items-center sm:justify-center sm:ml-6">
                  <div className="flex space-x-4">
                    {navs.map((item, index) => (
                      <Link
                        onClick={(e) => handleLinksClick(index)}
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <div className="relative">
                  <Link to={"/cart"} onClick={handleLinksClick}>
                    <img
                      className=" h-12 w-12"
                      src="https://cdn-icons-png.flaticon.com/128/5542/5542671.png"
                      alt=""
                    />
                  </Link>
                  <p className="absolute text-lg font-bold text-gray-800 bg-amber-300 w-6 h-6 flex items-center justify-center rounded-full bottom-7 left-8">
                    {data.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navs.map((item, index) => (
                <Disclosure.Button
                  key={item.name}
                  onClick={(e) => handleLinksClick(index)}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
