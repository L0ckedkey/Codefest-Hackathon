import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from '../components/navbar.tsx';
export default function BaseLayout({ children }) {
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx("main", { id: 'main', className: 'relative bg-black min-w-screen w-full min-h-screen h-full   flex  flex-col justify-start items-center overflow-auto ', children: children })] }));
}
