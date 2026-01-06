import RegisterLayout from "../components/register/RegisterLayout";
import InfoCard from "../components/register/InfoCard";
import RegisterForm from "../components/register/RegisterForm";

function Register() {
  return (
    <RegisterLayout>
      <InfoCard />
      <RegisterForm />
    </RegisterLayout>
  );
}

export default Register;
