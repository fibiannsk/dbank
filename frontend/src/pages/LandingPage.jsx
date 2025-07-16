import BankHeader from '../components/LandingPage/BankHeader';
import LoginSection from '../components/LandingPage/LoginSection';
import BankFooter from '../components/LandingPage/BankFooter';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <BankHeader />
      <main className="flex-1">
        <LoginSection />
        {/* Whitespace section */}
        <div className="h-16"></div>
      </main>
      <BankFooter />
    </div>
  );
};

export default LandingPage;
