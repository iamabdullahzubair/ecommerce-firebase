import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BreadCrumb = ({cut}) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if(cut){
    pathnames.pop()
  }
  return (
    <nav className="text-sm font-semibold text-gray-600 dark:text-gray-400">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="hover:text-secondary">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          
          return (
            <React.Fragment key={to}>
              <span>/</span>
              <li>
                {index === pathnames.length - 1 ? (
                  <span className="text-gray-500 dark:text-gray-300">{value}</span>
                ) : (
                  <Link to={to} className="hover:text-secondary">{value}</Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
