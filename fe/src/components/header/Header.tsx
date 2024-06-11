import React from 'react';
import { Link } from 'react-router-dom';

// Import components
import Button from '../buttons/Button';

// Import route names
import { RouteNames } from 'src/routes.config';

// Import types
import type { HeaderProps } from './Header.props';

export default function Header(props: HeaderProps) {
  const NavItem_Elements = React.useMemo(() => {
    return Object.keys(RouteNames).map(function(key: string, index: number) {
      if(
        index === 0 ||
        RouteNames[key].canHideFromHeader
      ) return;

      return (
        <li key={key} className="mx-2 font-semibold hover:text-blue-500">
          {
            <Link to={RouteNames[key].path}>{RouteNames[key].name}</Link>
          }
        </li>
      )
    })
  }, []);

  return (
    <header className="border-b sticky top-0 bg-background z-10">
      <div className="flex justify-between p-4 m-auto w-full">
        {
          !props.leftSide
            ? (
              <div>
                <h1 className="font-semibold text-xl">
                  <Link to={"/"}>Simple API</Link>
                </h1>
              </div>
            )
            : typeof props.leftSide === "function"
              ? props.leftSide()
              : props.leftSide
        }
        {
          !props.rightSide
            ? (
              <div className="flex items-center">
                <nav className="border-r px-3 hidden sm:block">
                  <ul className="flex flex-row">
                    {
                      NavItem_Elements
                    }
                  </ul>
                </nav>
                <Button
                  colorType="onPrimary"
                  buttonType="normal"
                  extendClassName="flex p-2 me-3 rounded sm:hidden"
                  onClick={() => alert("You clicked on menu")}
                >
                  <span className="material-symbols-outlined text-primary bg-on-primary">more_vert</span>
                </Button>
              </div>
            )
            : typeof props.rightSide === "function"
              ? props.rightSide(NavItem_Elements)
              : props.rightSide
        }
      </div>
    </header>
  )
}