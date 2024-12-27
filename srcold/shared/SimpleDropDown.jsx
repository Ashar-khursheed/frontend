import React from "react";
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';

export const SimpleDropDown = ({ classes, data }) => {
  return (
    <Menu
      align="center"
      arrow={true}
      menuButton={
        <MenuButton

          className={
            `bg-[#F1F1F2] text-black-100 transition-all hover:bg-primary hover:text-white duration-200 px-8 py-2 text-sm rounded-full flex flex-row items-center ${classes}`
          }
        >
          {data.iconSource}
          <span className="ml-1">{data.title}</span>
        </MenuButton>
      }
    >


      {data.text.map((item, index) => {
        return (
          <React.Fragment>
            <MenuItem key={index}>{item}</MenuItem>
          </React.Fragment>
        )
      })}
    </Menu>
  );
};
