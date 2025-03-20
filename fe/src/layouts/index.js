import Footer from "../components/layout/Default/Footer";
import Header from "../components/layout/Default/Header";

function DefaultLayout({children}) {
    return ( <>
        <Header />
         {children}
        <Footer />
    </> );
}

export default DefaultLayout;