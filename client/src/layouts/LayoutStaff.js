import HeaderAdmin from "~/components/AdminComponents/LayoutComponent/Header";
import HeaderBottom from "~/components/AdminComponents/LayoutComponent/HeaderBottom";

function LayoutStaff({ children }) {
    return (
        <>
            <HeaderAdmin />
            <div className="content">
                <HeaderBottom />
                {children}
            </div>
        </>
    );
}

export default LayoutStaff;