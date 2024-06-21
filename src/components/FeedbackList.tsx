import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";


export default function FeedbackList() {

    const [feedbackItems, setFeedbackItems] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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

        // setIsLoading(true)
        // fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks")
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error("Failed to fetch feedbacks")
        //         }
        //         return response.json()
        //     })
        //     .then(data => {
        //         setFeedbackItems(data.feedbacks)
        //         setIsLoading(false)
        //     })
        //     .catch(() => {
        //         setIsLoading(false);
        //         setErrorMessage("Something wrodng");

        //     })
    }, [])

    return (
        <ol className="feedback-list">
            {
                isLoading && <Spinner />
            }
            {
                errorMessage && <ErrorMessage message={errorMessage} />
            }

            {
                feedbackItems.map((feedbackItem) => (<FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />))
            }

        </ol>
    )
}
