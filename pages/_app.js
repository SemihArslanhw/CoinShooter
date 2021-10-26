import "../styles/globals.css";
import { Provider } from "next-auth/client";
import Header from "../components/header";
import Banner from "../components/banner";
import Footer from "../components/footer";


function MyApp({ Component, pageProps }) {
  const { session } = pageProps;



  return (
    <div>

      <Provider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
        < Footer />
      </Provider>

    </div>
  );
}

export default MyApp;
