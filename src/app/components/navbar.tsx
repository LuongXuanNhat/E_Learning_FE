"use client";
import React, { useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Dialog,
  Menu,
  MenuHandler,
  Avatar,
  MenuList,
  MenuItem,
  Collapse,
} from "@material-tailwind/react";
import { SidebarWithBurgerMenu } from "./sidebar";
import { LoginCard } from "./login_card/login";
import {
  ChevronDownIcon,
  PowerIcon,
  RocketLaunchIcon,
  Square3Stack3DIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import { Position, User } from "../../models/User";
import { set } from "date-fns";
import IsRole, { getCookieUser, Logout } from "../../services/authService";
import { AlertType, useAlert } from "./Alert/alertbase";
import { useRouter } from "next/navigation";

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const [showNavbar, setShowNavbar] = React.useState(true);
  const [isHovering, setIsHovering] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState<User>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { addAlert } = useAlert();
  const [isClient, setIsClient] = useState(false);

  const handleLoginSuccess = () => {
    const storedUser = getCookieUser();
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }
    setOpen(false);
  };
  const router = useRouter();

  const logout = () => {
    Logout();
    setUser(undefined);
    router.push("/");
    setIsLoggedIn(false);

    addAlert(AlertType.success, "Đã đăng xuất");
  };
  const handleOpen = () => setOpen((cur) => !cur);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    const storedUser = getCookieUser();
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY = window.scrollY;
    };
    setIsClient(true);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHovering]);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/gioi-thieu" className="flex items-center">
          Giới thiệu
        </a>
      </Typography>
      {isClient && IsRole([Position.EDUCATION]) ? <NavListMenu /> : null}
      {isClient && IsRole([Position.SECRETARY, Position.ADVISOR]) ? (
        <Typography
          as="li"
          variant="small"
          color="blue"
          className="p-1 font-bold"
        >
          <a href="/danh-gia-lop-hoc" className="flex items-center">
            Quản lý đánh giá lớp học
          </a>
        </Typography>
      ) : null}
      {isClient && IsRole([Position.STUDENT]) ? (
        <Typography
          as="li"
          variant="small"
          color="blue"
          className="p-1 font-bold"
        >
          <a href="/dang-ky-hoc-phan" className="flex items-center">
            Đăng ký học phần
          </a>
        </Typography>
      ) : null}

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/huong-dan" className="flex items-center">
          Hướng dẫn
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/lien-he" className="flex items-center">
          Liên hệ
        </a>
      </Typography>
    </ul>
  );

  return (
    <div className="h-20 relative z-[9998]">
      <div
        className={`fixed top-0 w-full transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
        onMouseEnter={() => setShowNavbar(true)}
        onMouseLeave={() => setShowNavbar(window.scrollY > 0 ? false : true)}
      >
        <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 ">
          <div className="flex items-center justify-between text-blue-gray-900">
            <div className="mr-4 cursor-pointer py-1.5 font-medium flex">
              <SidebarWithBurgerMenu />
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
              >
                <a href="/" className="flex items-center">
                  <img
                    src="/images/logo.jpg"
                    className="w-10 h-10 rounded-full"
                  />
                  <strong className="">E-Learning</strong>
                </a>
              </Typography>
            </div>
            <div className="flex items-center gap-4">
              <div className="mr-4 hidden lg:block">{navList}</div>
              <div className="flex items-center gap-x-1">
                <Button
                  ripple={true}
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                  onClick={user != null ? logout : handleOpen}
                >
                  <span>{isLoggedIn ? `Đăng xuất` : "Đăng nhập"}</span>
                </Button>
                <Dialog size="xs" open={open} handler={handleOpen}>
                  <LoginCard onLoginSuccess={handleLoginSuccess} />
                </Dialog>
              </div>
              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
              {isLoggedIn ? (
                <>
                  <span className="text-green-700 font-bold">
                    {user?.username}
                  </span>
                  <ProfileMenu />
                </>
              ) : (
                ""
              )}
            </div>
          </div>

          <Collapse open={openNav}>
            {navList}
            <div className="flex items-center gap-x-1">
              <Button
                fullWidth
                variant="gradient"
                size="sm"
                className=""
                onClick={handleOpen}
              >
                <span>Đăng nhập</span>
              </Button>
            </div>
          </Collapse>
        </Navbar>
      </div>
      <div
        className="fixed top-0 w-full h-4 z-40"
        onMouseEnter={() => {
          setIsHovering(true);
          setShowNavbar(true);
        }}
        onMouseLeave={() => setIsHovering(false)}
      ></div>
    </div>
  );
}

const profileMenuItems = [
  {
    label: "Cài đặt tài khoản",
    icon: UserCircleIcon,
    url: "/tai-khoan",
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="/images/user2.png"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1 z-[9999]">
        {profileMenuItems.map(({ label, icon, url }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded `}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 `,
                strokeWidth: 2,
              })}
              <Typography
                as="a"
                href={url}
                variant="small"
                className="font-normal"
                color={"inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

const navListMenuItems = [
  {
    title: "Quản lý nhân sự",
    url: "/quan-ly-nhan-su",
  },
  {
    title: "Quản lý sinh viên",
    url: "/quan-ly-sinh-vien",
  },
  {
    title: "Quản lý lớp học",
    url: "/quan-ly-lop-hoc",
  },
  {
    title: "Quản lý học phần",
    url: "/quan-ly-hoc-phan",
  },
  {
    title: "Quản lý môn học",
    url: "/quan-ly-mon-hoc",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(({ title, url }) => (
    <a href={url} key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
      </MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem className="hidden items-center gap-2  text-blue-500  font-bold lg:flex lg:rounded-full">
              <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-500 " />{" "}
              Quản lý đào tạo{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid z-[9999]">
          <Card
            color="green"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <img src="/images/menuManage.jpg" className="w-50" />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1 hover:border-none hover:outline-none ">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 font-medium text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
        Pages{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </React.Fragment>
  );
}
