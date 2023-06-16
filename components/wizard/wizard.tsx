"use client"

import { literaryGenres } from "@/data/literaryGenres"
import useWizardState from "@/store/store"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import GenreArtwork from "./genre-artwork"
import FirstStep from "./steps/first-step"
import SecondStep from "./steps/second-step"
import ThirdStep from "./steps/third-step"

function Wizard() {
  const { currentStep } = useWizardState()

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
        <CardTitle>Genre Selection</CardTitle>
        <CardDescription>
          Choose from a variety of genres to find your perfect book. Explore
          captivating worlds, thrilling mysteries, heartwarming romances, and
          more. Select the genres that resonate with your reading preferences
          and embark on a literary journey tailored just for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {literaryGenres.map((genre) => (
            <GenreArtwork
              name={genre.name}
              description={genre.description}
              cover={genre.cover}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}

export default Wizard
