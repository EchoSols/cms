type StepperProps = {
  currentStep: 1 | 2 | 3
}

const steps = [
  { id: 1, label: 'Signup' },
  { id: 2, label: 'Verify' },
  { id: 3, label: 'Setup' },
]

const OnboardingStepper = ({ currentStep }: StepperProps) => {
  return (
    <div className="mb-6">
      <ol className="flex items-center w-full text-sm text-slate-300">
        {steps.map((step, idx) => {
          const isActive = currentStep === step.id
          const isDone = currentStep > step.id
          return (
            <li key={step.id} className="flex-1 flex items-center">
              <div className={`flex items-center gap-2 ${isActive ? 'text-indigo-400' : isDone ? 'text-green-400' : 'text-slate-500'}`}>
                <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${isActive ? 'border-indigo-400' : isDone ? 'border-green-500 bg-green-600 text-white' : 'border-slate-600 text-slate-300'}`}>
                  {isDone ? '✓' : step.id}
                </span>
                <span className="font-medium">{step.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`mx-3 h-px flex-1 ${currentStep > step.id ? 'bg-green-600' : 'bg-slate-700'}`}></div>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default OnboardingStepper


