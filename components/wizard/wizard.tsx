"use client";

import { stepDescriptions, stepTitles } from "@/data/wizardData";
import useAPIRequestsState from "@/store/requestsStore";
import useWizardState from "@/store/wizardStore";
import Conffetti from "react-confetti";

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
import RecommendationsArtwork from "../recommendations/recommendations-artwork";
import FirstStep from "./steps/first-step";
import SecondStep from "./steps/second-step";
import ThirdStep from "./steps/third-step";

interface StepComponents {
  [key: number]: JSX.Element;
}

function Wizard() {
  const {
    currentStep,
    incrementStep,
    decrementStep,
    favoriteGenre,
    setFavoriteGenre,
    selectedMood,
    setSelectedMood,
    bookLengthPreference,
    setBookLengthPreference,
  } = useWizardState();

  const {
    isLoading,
    setLoading,
    fetchRecommendations,
    fetchBookInformation,
    recommendations,
    bookInformation,
  } = useAPIRequestsState();

  const handleNextStep = () => {
    setLoading(true);
    const nextStep = currentStep + 1;
    incrementStep();

    if (nextStep === 4) {
      fetchRecommendations();
      fetchBookInformation();
    }
    setLoading(false);
  };

  const handlePreviousStep = () => {
    setLoading(true);
    decrementStep();
    setLoading(false);
  };

  const stepComponents: StepComponents = {
    1: (
      <FirstStep
        favoriteGenre={favoriteGenre}
        onSelectGenre={setFavoriteGenre}
      />
    ),
    2: (
      <SecondStep
        selectedMood={selectedMood}
        onSelectedMood={setSelectedMood}
      />
    ),
    3: (
      <ThirdStep
        selectedBookLength={bookLengthPreference}
        onSelectedLength={setBookLengthPreference}
      />
    ),
    4: (
      <>
        <Conffetti numberOfPieces={200} opacity={0.6} recycle={false} />
        <RecommendationsArtwork
          recommendations={recommendations}
          bookInformation={bookInformation}
        />
      </>
    ),
  };

  const renderStepComponent = () => {
    return (
      stepComponents[currentStep] || (
        <FirstStep onSelectGenre={setFavoriteGenre} />
      )
    );
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
                <Button
                  onClick={handleNextStep}
                  aria-label="Get recommendations"
                >
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
