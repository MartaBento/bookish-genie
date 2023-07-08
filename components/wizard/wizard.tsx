"use client";

import { stepDescriptions, stepTitles } from "@/data/wizardData";
import useWizardState from "@/store/store";
import { parseRecommendations } from "@/utils/parseRecommendations";

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
  const {
    currentStep,
    incrementStep,
    decrementStep,
    isLoading,
    setLoading,
    favoriteGenre,
    setFavoriteGenre,
    selectedMood,
    setSelectedMood,
    bookLengthPreference,
    setBookLengthPreference,
    fetchRecommendations,
    recommendations,
    error,
  } = useWizardState();

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
    fetchRecommendations();
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FirstStep
            favoriteGenre={favoriteGenre}
            onSelectGenre={setFavoriteGenre}
          />
        );
      case 2:
        return (
          <SecondStep
            selectedMood={selectedMood}
            onSelectedMood={setSelectedMood}
          />
        );
      case 3:
        return (
          <ThirdStep
            selectedBookLength={bookLengthPreference}
            onSelectedLength={setBookLengthPreference}
          />
        );
      default:
        return <FirstStep onSelectGenre={setFavoriteGenre} />;
    }
  };

  const isStep1Disabled = currentStep === 1 && !favoriteGenre;
  const isStep2Disabled = currentStep === 2 && !selectedMood;

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
              {currentStep !== 1 && (
                <Button
                  disabled={currentStep === 1}
                  onClick={handlePreviousStep}
                  aria-label="Go back to the previous step"
                >
                  Go back
                </Button>
              )}
              {currentStep === 1 && (
                <Button
                  onClick={handleNextStep}
                  disabled={isStep1Disabled}
                  aria-label="Continue to the next step"
                >
                  Continue
                </Button>
              )}
              {currentStep === 2 && (
                <Button
                  onClick={handleNextStep}
                  disabled={isStep2Disabled}
                  aria-label="Continue to the next step"
                >
                  Continue
                </Button>
              )}
              {currentStep === 3 && bookLengthPreference && (
                <Button onClick={handleSubmit} aria-label="Get recommendations">
                  Give me some recommendations! ✨
                </Button>
              )}
              {error && <p>Error: {error}</p>}
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}

export default Wizard;
