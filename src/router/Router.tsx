import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface RouteContextType {
  path: string;
  queryParams: Record<string, string>;
  navigate: (to: string, params?: Record<string, string>) => void;
}

const RouteContext = createContext<RouteContextType>({
  path: '/',
  queryParams: {},
  navigate: () => {},
});

export function parseHash(): { path: string; queryParams: Record<string, string> } {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  const [pathname, queryString] = hash.split('?');
  const queryParams: Record<string, string> = {};

  if (queryString) {
    const searchParams = new URLSearchParams(queryString);
    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });
  }

  return {
    path: pathname.startsWith('/') ? pathname : `/${pathname}`,
    queryParams,
  };
}

export const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState(parseHash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(parseHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (to: string, params?: Record<string, string>) => {
    let target = to.startsWith('/') ? to : `/${to}`;
    if (params && Object.keys(params).length > 0) {
      const search = new URLSearchParams(params).toString();
      target += `?${search}`;
    }
    window.location.hash = target;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouteContext.Provider
      value={{
        path: currentRoute.path,
        queryParams: currentRoute.queryParams,
        navigate,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};

export const useRouter = () => useContext(RouteContext);

export const Link: React.FC<{
  to: string;
  className?: string;
  children: ReactNode;
  params?: Record<string, string>;
  onClick?: () => void;
}> = ({ to, className = '', children, params, onClick }) => {
  const { navigate } = useRouter();

  return (
    <a
      href={`#${to}${params ? '?' + new URLSearchParams(params).toString() : ''}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
        navigate(to, params);
      }}
    >
      {children}
    </a>
  );
};
