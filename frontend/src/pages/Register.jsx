import RegisterLayout from "../components/register/RegisterLayout";
import RegisterSidebar from "../components/register/RegisterSidebar";
import RegisterForm from "../components/register/RegisterForm";

function Register() {
  return (
    <RegisterLayout>
      <RegisterSidebar />
      <RegisterForm />
    </RegisterLayout>
  );
}

export default Register;
