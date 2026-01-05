function RegisterLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {children}
    </div>
  );
}

export default RegisterLayout;
