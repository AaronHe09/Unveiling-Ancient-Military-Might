import IntroPage from './IntroPage';
import NavBar from './NavBar';
import AncientEmpires from './AncientEmpires';
import EliteSoldiers from './EliteSoldiers';
import Quote from './Quote';

export default function LandingPage() {
  return (
    <>
      <NavBar />
      <main>
        <IntroPage />
        <AncientEmpires />
        <Quote />
        <EliteSoldiers />
      </main>
    </>
  );
}
