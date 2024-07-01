import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { TFeedbackItem } from "../../lib/types";
type TFeedbackListProps = {
    isLoading: boolean,
    errorMessage: string,
    feedbackItems: TFeedbackItem[]
}

export default function FeedbackList({ isLoading, errorMessage, feedbackItems }: TFeedbackListProps) {

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
