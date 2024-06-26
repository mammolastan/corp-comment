import { useEffect, useState } from "react";
import Container from "./components/Container"
import Footer from "./components/Footer"
import HashtagList from "./components/HashtagList"
import { TFeedbackItem } from "./lib/types";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAddToList = async (text: string) => {

    const companyName = text
      .split(' ')
      .find((word) => word.includes('#'))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase()
    }
    setFeedbackItems([...feedbackItems, newItem])

    await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"

      },
      body: JSON.stringify(newItem)
    })
  }

  useEffect(() => {

    const fetchFeedbackItems = async () => {

      setIsLoading(true)

      try {
        const response = await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks")
        if (!response.ok) {
          throw new Error("Failed to fetch feedbacks")
        }
        const data = await response.json();
        setFeedbackItems(data.feedbacks);
      }
      catch (error) {
        setErrorMessage("Something went wrong");
      }

      setIsLoading(false);
    }
    fetchFeedbackItems();
  }, [])

  return (
    <div className="app">
      <Footer />

      <Container
        isLoading={isLoading}
        errorMessage={errorMessage}
        feedbackItems={feedbackItems}
        handleAddToList={handleAddToList} />

      <HashtagList />
    </div>
  )
}

export default App
