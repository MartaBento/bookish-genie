"use client"

import { stepDescriptions, stepTitles } from "@/data/wizardData"
import useWizardState from "@/store/store"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import FirstStep from "./steps/first-step"
import SecondStep from "./steps/second-step"
import ThirdStep from "./steps/third-step"

function Wizard() {
  const { currentStep, incrementStep, decrementStep } = useWizardState()

  const handleNextStep = () => {
    incrementStep()
  }

  const handlePreviousStep = () => {
    decrementStep()
  }

  const handleSubmit = () => {
    console.log("submitted")
  }

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <FirstStep />
      case 2:
        return <SecondStep />
      case 3:
        return <ThirdStep />
      default:
        return <FirstStep />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{stepTitles[currentStep]}</CardTitle>
        <CardDescription>{stepDescriptions[currentStep]}</CardDescription>
      </CardHeader>
      <CardContent>{renderStepComponent()}</CardContent>
      <CardFooter>
        <div className="flex justify-stretch">
          <Button disabled={currentStep === 1} onClick={handlePreviousStep}>
            Previous Step
          </Button>
          <Button onClick={handleNextStep} disabled={currentStep === 3}>
            Next step
          </Button>
          <Button onClick={handleSubmit} disabled={currentStep !== 3}>
            Give me some recommendations! ✨
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Wizard
