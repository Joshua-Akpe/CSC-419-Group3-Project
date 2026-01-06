import StepCard from "./StepCard";

const steps = [
  { id: 1, title: "Sign up your account" },
  { id: 2, title: "Set up your workspace" },
  { id: 3, title: "Set up your profile" },
];

 function InfoCard({ activeStep = 1 }) {
  return (
    <div className="hidden lg:block bg-[#02063E] rounded-3xl px-8 pt-24 pb-16 text-white self-start shadow-xl md:max-w-[420px] lg:max-w-none">
      {/* Header row */}
      <div className="mt-28 flex items-start justify-between gap-2 mb-20">
        <h2 className="text-3xl font-semibold max-w-sm leading-snug">
          Get Started With us
        </h2>

        <h4 className="text-sm opacity-90 max-w-xs text-left leading-relaxed">
          Complete these steps to register your account
        </h4>
      </div>

      {/* Steps (horizontal) */}
      <div className="flex gap-2">
        {steps.map((step) => (
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
export default InfoCard;