import { useEffect, useMemo, useState } from "react";
import Container from "./components/layout/Container"
import Footer from "./components/layout/Footer"
import HashtagList from "./components/hashtag/HashtagList"
import { TFeedbackItem } from "./lib/types";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  const filteredFeedbackItems = useMemo(() => selectedCompany
    ? feedbackItems.filter(
      (item) => item.company === selectedCompany)
    : feedbackItems, [selectedCompany, feedbackItems])

  const companyList = useMemo(() => feedbackItems.map((item) => item.company).
    filter((company, index, array) => {
      return array.indexOf(company) === index
    }), [feedbackItems])

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

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
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
        feedbackItems={filteredFeedbackItems}
        handleAddToList={handleAddToList} />

      <HashtagList companyList={companyList} handleSelectCompany={handleSelectCompany} />
    </div>
  )
}

export default App
