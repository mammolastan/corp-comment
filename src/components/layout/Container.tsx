import FeedbackList from "../feedback/FeedbackList";
import Header from "./Header";
import { TFeedbackItem } from "../../lib/types";

type ContainerProps = {
    isLoading: boolean,
    errorMessage: string,
    feedbackItems: TFeedbackItem[],
    handleAddToList: (text: string) => void
}

export default function Container({
    isLoading,
    errorMessage,
    feedbackItems,
    handleAddToList
}: ContainerProps) {
    return (
        <main className='container'>
            <Header handleAddToList={handleAddToList} />
            <FeedbackList
                isLoading={isLoading}
                feedbackItems={feedbackItems}
                errorMessage={errorMessage} />
        </main>
    )
}
