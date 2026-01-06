import InfoCard from "./InfoCard";
import RegisterForm from "./RegisterForm";

export default function RegisterLayout() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:-ml-24">
        <InfoCard />
        <RegisterForm />
      </div>
    </div>
  );
}
