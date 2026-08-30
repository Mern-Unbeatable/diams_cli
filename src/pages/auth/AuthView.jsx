import AuthBrandSection from "./sections/AuthBrandSection";
import AuthFormSection from "./sections/AuthFormSection";

const AuthView = () => {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <AuthBrandSection />
      <AuthFormSection />
    </div>
  );
};

export default AuthView;
