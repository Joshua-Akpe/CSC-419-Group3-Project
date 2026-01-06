export default function StepCard({ step, isActive }) {
  return (
    <div
      className={`
        w-[150px] h-[120px]
        rounded-[15px]
        flex
        transition-all duration-300
        ${
          isActive
            ? "bg-white text-black"
            : "bg-white/30 text-white"
        }
      `}
    >
      <div className="flex flex-col justify-between p-6 w-full h-full">
        {/* Step number */}
        <span
          className={`
            w-8 h-8 w-sm-4 flex items-center justify-center rounded-full text-sm font-medium
            bg-[#02063E] text-white
          `}
        >
          {step.id}
        </span>

        {/* Step text */}
        <p className="text-sm font-medium leading-snug">
          {step.title}
        </p>
      </div>
    </div>
  );
}
