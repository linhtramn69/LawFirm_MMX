import HeaderAdmin from "~/components/AdminComponents/LayoutComponent/Header";

function Layout({children}) {
    return ( 
        <>
        <HeaderAdmin/>
        {children}
        </>
     );
}

export default Layout;