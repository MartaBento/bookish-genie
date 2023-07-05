"use client";

import { stepDescriptions, stepTitles } from "@/data/wizardData";
import useWizardState from "@/store/store";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LoadingSpinner from "../loading-spinner";
import FirstStep from "./steps/first-step";
import SecondStep from "./steps/second-step";
import ThirdStep from "./steps/third-step";

function Wizard() {
  const { currentStep, incrementStep, decrementStep, isLoading, setLoading } =
    useWizardState();

  const handleNextStep = () => {
    setLoading(true);
    incrementStep();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handlePreviousStep = () => {
    decrementStep();
  };

  const handleSubmit = () => {
    console.log("submitted");
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <FirstStep />;
      case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />;
      default:
        return <FirstStep />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{stepTitles[currentStep]}</CardTitle>
        <CardDescription>{stepDescriptions[currentStep]}</CardDescription>
      </CardHeader>
      {isLoading && (
        <CardContent className="flex items-center justify-center">
          <LoadingSpinner stepNumber={currentStep} />
        </CardContent>
      )}
      {!isLoading && (
        <>
          <CardContent>{renderStepComponent()}</CardContent>
          <CardFooter>
            <div className="mx-auto mt-6 flex space-x-6">
              <Button
                disabled={currentStep === 1}
                onClick={handlePreviousStep}
                aria-label="Go back to the previous step"
              >
                Go back
              </Button>
              {currentStep != 3 && (
                <Button
                  onClick={handleNextStep}
                  disabled={currentStep === 3}
                  aria-label="Continue to the next step"
                >
                  Continue
                </Button>
              )}
              {currentStep === 3 && (
                <Button onClick={handleSubmit} aria-label="Get recommendations">
                  Give me some recommendations! ✨
                </Button>
              )}
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}

export default Wizard;
