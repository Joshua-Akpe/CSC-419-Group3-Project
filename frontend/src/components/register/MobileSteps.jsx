import StepCard from "./StepCard";

const steps = [
  { id: 1, title: "Sign up your account" },
  { id: 2, title: "Set up your profile" },
  { id: 3, title: "Set up your workspace" },
];

export default function MobileSteps({ activeStep = 1 }) {
  return (
    <div className="lg:hidden w-full bg-[#02063E] py-4">
      <div className="px-4 flex justify-center gap-3">
        {steps.map(step => (
          <StepCard
            key={step.id}
            step={step}
            isActive={step.id === activeStep}
          />
        ))}
      </div>
    </div>
  );
}
