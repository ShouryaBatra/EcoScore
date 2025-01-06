"use client";
import "./App.css";
import Header from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import { LinkForm } from "./components/LinkForm";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { toast } from "@/components/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { reviews } from "./constants/reviews";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReviewsCard } from "./components/ReviewsCard";
import fetchAmazonData from "./components/FetchAmazonData";
import sentimentUtility from "./constants/sentimentUtility";

const FormSchema = z.object({
  link: z.string().min(10, {
    message: "Link must be at least 10 characters.",
  }),
});

function App() {
  // FUNCTION !!!!

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      link: "",
    },
  });

  async function onSubmit(data) {
    setIsLinkSubmitted(true);
    setIsLoading(true);

    try {
      const fetchedData = await fetchAmazonData();
      console.log("Fetched data: ", fetchedData);

      const texts = fetchedData.map((review) => review.reviewDescription);
      const sentimentScores = sentimentUtility(texts);
      console.log("Sentiment Scores:", sentimentScores);

      setReviewStrings(texts);
      const amazonReviewScores = Object.values(sentimentScores);
      setReviewScores(amazonReviewScores);

      const sum = amazonReviewScores.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const averageScore = sum / amazonReviewScores.length;
      setAverageScore(averageScore);

      console.log("Average Sentiment Score:", averageScore);

      // Mark data as ready
      setIsDataReady(true);
      setIsLoading(false);
    } catch (error) {
      setIsDataReady(true);
      console.error("Error fetching or processing data:", error);
    }
  }

  const [isLinkSubmitted, setIsLinkSubmitted] = useState(false);
  const [averageScore, setAverageScore] = useState(
    "Submit a link to get your score!"
  );
  const [reviewStrings, setReviewStrings] = useState();
  const [reviewScores, setReviewScores] = useState();
  const [isDataReady, setIsDataReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="p-[10px]">
          <div className="pb-[150px]">
            <Header />
          </div>

          <div className="flex justify-center align-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your link..." {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be used to give you an ecoScore
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>

          <div className="flex flex-row justify-center align-center pt-[50px]">
            <h1 className="text-2xl font-bold pr-[4px]">
              This products eco-score is:{" "}
            </h1>
            <h1 className="text-2xl font-bold">{averageScore}</h1>
          </div>
        </div>

        {isDataReady ? (
          <>
            {console.log(isDataReady)}
            <div className="px-[10px] ">
              <ReviewsCard
                className="w-full"
                reviewStrings={reviewStrings}
                reviewScores={reviewScores}
              />
            </div>
          </>
        ) : (
          <>
            <div className="px-[10px] ">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <h1 className="text-2xl">
                      {isLoading ? "Loading..." : "Submit a link!"}
                    </h1>
                  </CardTitle>
                  <CardDescription>
                    {isLoading ? "still loading" : "submit!"}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
